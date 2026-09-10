"""Network-free boundary and HTTP audit behavior tests."""
import json
import socket
import unittest
from unittest.mock import MagicMock, patch

import check_links as links


def dns(host, port, **kwargs):
    return [(socket.AF_INET, socket.SOCK_STREAM, 6, '', ('93.184.216.34', port))]


def response(status=200, location=None):
    return {'http_status': status, 'location': location, 'bytes_read': 0}


class URLTests(unittest.TestCase):
    def test_rejects_unsafe_syntax_before_dns(self):
        for url in ['file:///etc/passwd', 'ftp://example.com/a', 'https://user:secret@example.com',
                    'https://localhost/a', 'https://x.local/a', 'https://x.internal/a',
                    'https://example.com:8080/', 'https://[broken', 'https://exa\\mple.com',
                    'https://example.com/\nsecret', 'https://%31%32%37.0.0.1/', '']:
            with self.subTest(url=url):
                with self.assertRaises(links.UnsafeURL):
                    links.validate_url(url, lambda *a, **kw: self.fail('DNS must not run'))

    def test_rejects_all_non_public_addresses_and_mixed_dns(self):
        for ip in ['127.0.0.1', '10.0.0.1', '169.254.169.254', '192.168.1.1', '100.64.0.1',
                   '224.0.0.1', 'ff02::1', '::1', 'fc00::1', 'fe80::1', '::ffff:127.0.0.1', '0.0.0.0']:
            resolver = lambda *a, **kw: dns(*a, **kw) + [(socket.AF_INET, 1, 6, '', (ip, 443))]
            with self.subTest(ip=ip), self.assertRaises(links.UnsafeURL):
                links.validate_url('https://example.com/', resolver)

    def test_public_url_preserves_hostname_for_tls_and_approved_ip(self):
        parsed, host, port, addresses = links.validate_url('https://example.com/a?b=c#fragment', dns)
        self.assertEqual((host, port, addresses), ('example.com', 443, ['93.184.216.34']))
        self.assertEqual(parsed.path, '/a')

    def test_connection_pins_to_checked_ip_without_second_hostname_lookup(self):
        with patch.object(links.socket, 'create_connection') as connect:
            connection = links.PinnedHTTPConnection('example.com', 80, '93.184.216.34', 15)
            connection.connect()
            connect.assert_called_once_with(('93.184.216.34', 80), 15)


class AuditTests(unittest.TestCase):
    def test_one_get_fallback_and_restricted_result(self):
        request = MagicMock(side_effect=[response(403), response(403)])
        result = links.audit_url('https://example.com/', request)
        self.assertEqual([c.args[1] for c in request.call_args_list], ['HEAD', 'GET'])
        self.assertEqual(result['result'], 'restricted')
        self.assertEqual(result['interactive_status'], 'not_tested')

    def test_head405_falls_back_but_not_for_archives(self):
        request = MagicMock(side_effect=[response(405), response(206)])
        self.assertEqual(links.audit_url('https://example.com/demo', request)['result'], 'reachable')
        request = MagicMock(return_value=response(405))
        self.assertEqual(links.audit_url('https://example.com/a.zip', request)['result'], 'restricted')
        self.assertEqual(request.call_count, 1)

    def test_redirect_revalidates_scheme_and_private_dns(self):
        for target in ['file:///etc/passwd', 'http://private.example/internal']:
            visited = []
            def request(url, method, timeout):
                resolver = dns if 'private.example' not in url else lambda *a, **kw: [(2, 1, 6, '', ('10.0.0.1', 80))]
                links.validate_url(url, resolver)
                visited.append(url)
                return response(302, target)
            result = links.audit_url('https://example.com/', request)
            self.assertEqual(result['result'], 'blocked')
            self.assertEqual(visited, ['https://example.com/'])
            self.assertEqual(result['error']['type'], 'UnsafeURL')

    def test_relative_redirect_preserves_public_host(self):
        request = MagicMock(side_effect=[response(302, '../new'), response(200)])
        result = links.audit_url('https://example.com/path/old', request)
        self.assertEqual(result['final_url'], 'https://example.com/new')
        self.assertEqual(result['result'], 'reachable')

    def test_redirect_limit_and_missing_location_are_errors(self):
        request = MagicMock(return_value=response(302, '/again'))
        result = links.audit_url('https://example.com/', request)
        self.assertEqual(result['result'], 'error')
        self.assertEqual(request.call_count, links.REDIRECT_LIMIT + 1)
        result = links.audit_url('https://example.com/', lambda *a: response(302))
        self.assertIn('Location', result['error']['message'])

    def test_network_and_malformed_url_errors_are_serializable(self):
        result = links.audit_url('https://example.com/', MagicMock(side_effect=TimeoutError('timed out')))
        self.assertEqual(result['error'], {'type': 'TimeoutError', 'message': 'timed out'})
        self.assertEqual(result['http_status'], None)
        json.dumps(result)
        result = links.audit_url('https://[broken')
        self.assertEqual(result['result'], 'blocked')
        json.dumps(result)

    def test_get_read_is_capped_and_archives_are_never_read(self):
        for content_type, path, read_expected in [('text/html', '/demo', True), ('application/zip', '/download', False), ('text/html', '/a.tar.gz', False)]:
            with self.subTest(content_type=content_type), patch.object(links, 'PinnedHTTPSConnection') as cls:
                response_obj = cls.return_value.getresponse.return_value
                response_obj.status = 200
                response_obj.getheader.side_effect = lambda name, default=None: content_type if name == 'Content-Type' else default
                response_obj.read.return_value = b'x' * links.BODY_LIMIT
                result = links.request_once('https://example.com' + path, 'GET', 15, dns)
                if read_expected:
                    response_obj.read.assert_called_once_with(links.BODY_LIMIT)
                    self.assertEqual(result['bytes_read'], links.BODY_LIMIT)
                else:
                    response_obj.read.assert_not_called()
                    self.assertEqual(result['bytes_read'], 0)
                cls.return_value.close.assert_called_once()

    def test_signed_redirect_credentials_are_removed_from_durable_report(self):
        signed = 'https://cdn.example.com/image?X-Amz-Credential=secret-id&X-Amz-Signature=secret-sig'
        result = links.audit_url('https://example.com/image', MagicMock(side_effect=[response(302, signed), response(200)]))
        result['attempts'][1]['url'] = signed
        links.sanitize_report_urls(result)
        encoded = json.dumps(result)
        self.assertNotIn('secret-id', encoded)
        self.assertNotIn('secret-sig', encoded)
        self.assertEqual(result['final_url'], 'https://cdn.example.com/image')
        self.assertIn('final_url', result['url_redactions'])

    def test_deduplicates_urls_and_preserves_record_field_references(self):
        records = [{'id': 'a', 'repo_url': 'https://example.com', 'project_url': 'https://example.com',
                    'demo': {'url': None}, 'preview': {'source_url': 'https://example.com/image'},
                    'source': {'evidence': [{'url': 'https://example.com/source'}]}}]
        basic = links.collect_urls(records)
        self.assertEqual(len(basic), 2)
        self.assertEqual(len(basic['https://example.com']), 2)
        self.assertEqual(len(links.collect_urls(records, True)), 3)


if __name__ == '__main__':
    unittest.main()
