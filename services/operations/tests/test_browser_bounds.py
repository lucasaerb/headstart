import unittest
from unittest.mock import patch
from services.operations.browser import resource,validate_plan

class BrowserBoundsTests(unittest.TestCase):
    def test_query_is_rejected_not_silently_removed(self):
        with patch('services.operations.browser.socket.getaddrinfo') as dns:
            with self.assertRaises(ValueError):resource('https://example.com/game?version=2')
            dns.assert_not_called()
    def test_private_subresource_never_opens_tls(self):
        with patch('services.operations.browser.socket.getaddrinfo',return_value=[(2,1,6,'',('127.0.0.1',443))]),patch('services.operations.browser.PinnedHTTPS') as tls:
            with self.assertRaises(ValueError):resource('https://example.com/private')
            tls.assert_not_called()
    def test_redirect_not_followed_or_body_downloaded(self):
        with patch('services.operations.browser.socket.getaddrinfo',return_value=[(2,1,6,'',('93.184.216.34',443))]),patch('services.operations.browser.PinnedHTTPS') as tls:
            response=tls.return_value.getresponse.return_value;response.status=302;response.getheader.side_effect=lambda key,default=None:default
            with self.assertRaises(ValueError):resource('https://example.com/game')
            response.read.assert_not_called();self.assertEqual(tls.call_count,1)
