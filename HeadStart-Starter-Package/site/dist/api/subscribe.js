import { createHmac } from 'node:crypto';
import { put, get } from '@vercel/blob';

export const CONSENT = 'By signing up, I agree to receive HeadStart launch and product updates by email.';
export const DEMO_CONSENT = 'Save my email with HeadStart to open this demo. Product updates are optional.';
export const CONSENT_VERSION = 'headstart-updates-2026-09-10';
const MAX_BODY = 1024;
export function emailAddress(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email)) return null;
  const [local, domain] = email.split('@');
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..') || domain.split('.').some(part => part.length > 63)) return null;
  return email;
}
export function privatePath(email, secret, purpose = 'updates') {
  return 'signups/v1/' + createHmac('sha256', secret).update('headstart:email:v1\0' + email).digest('hex') + '/' + purpose + '.json';
}
function origins(env) {
  const values = (env.HEADSTART_ALLOWED_ORIGINS || '').split(',');
  for (const host of [env.VERCEL_URL, env.VERCEL_PROJECT_PRODUCTION_URL]) if (host) values.push('https://' + host);
  if (!env.VERCEL) values.push('http://127.0.0.1:8767', 'http://localhost:8767');
  return new Set(values.map(s => s.trim()).filter(Boolean));
}
async function bodyOf(req) {
  if (Number(req.headers['content-length'] || 0) > MAX_BODY) throw new Error('size');
  if (req.body !== undefined) {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (Buffer.byteLength(raw) > MAX_BODY) throw new Error('size');
    return JSON.parse(raw);
  }
  let size = 0; const chunks = [];
  for await (const chunk of req) { size += Buffer.byteLength(chunk); if (size > MAX_BODY) throw new Error('size'); chunks.push(Buffer.from(chunk)); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function createHandler({ write = put, read = get, env = process.env, now = () => new Date() } = {}) {
  return async function subscribe(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const reply = (status, message) => res.status(status).json({ message });
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, 'Use the signup form to subscribe.'); }
    if (!origins(env).has(req.headers.origin)) return reply(403, 'Please sign up from the HeadStart website.');
    if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) return reply(415, 'Please use the signup form.');
    let body;
    try { body = await bodyOf(req); } catch { return reply(400, 'Please enter a valid email address and try again.'); }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !['email', 'website', 'consentVersion', 'purpose', 'updates', 'gameId'].includes(key))) return reply(400, 'Please use the signup form.');
    if (typeof body.website !== 'string' || body.website !== '') return reply(400, 'Unable to accept this signup.');
    const email = emailAddress(body.email);
    if (!email || body.consentVersion !== CONSENT_VERSION) return reply(400, 'Please enter a valid email and accept the displayed signup terms.');
    const purpose = body.purpose || 'updates';
    if (!['updates', 'demo-access'].includes(purpose) || (purpose === 'demo-access' && (typeof body.updates !== 'boolean' || typeof body.gameId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.gameId)))) return reply(400, 'Please use the current signup form.');
    const token = env.BLOB_READ_WRITE_TOKEN;
    const secret = env.SIGNUP_HASH_SECRET || token;
    if (!token || !secret) return reply(503, 'Signups are temporarily unavailable. Please try again later.');
    const timestamp = now();
    const options = { access: 'private', token, addRandomSuffix: false, allowOverwrite: false, contentType: 'application/json', cacheControlMaxAge: 60 };
    try {
      // Vercel overwrites its forwarding header. Never trust a caller-supplied IP outside Vercel.
      const ip = env.VERCEL ? String(req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'] || 'unknown').split(',')[0].trim() : 'local-development';
      const bucket = Math.floor(timestamp.getTime() / 3600000);
      const digest = createHmac('sha256', secret).update('headstart:rate:v1\0' + bucket + '\0' + ip).digest('hex');
      let allowed = false;
      for (let slot = 0; slot < 5; slot++) {
        try { await write(`signup-rate/v1/${bucket}/${digest}-${slot}.json`, JSON.stringify({ expiresAt: new Date((bucket + 2) * 3600000).toISOString() }), options); allowed = true; break; }
        catch (error) { const existing = await read(`signup-rate/v1/${bucket}/${digest}-${slot}.json`, { access: 'private', token, useCache: false }); if (existing?.statusCode !== 200) throw error; await existing.stream.cancel(); }
      }
      if (!allowed) { res.setHeader('Retry-After', String(Math.ceil(((bucket + 1) * 3600000 - timestamp.getTime()) / 1000))); return reply(429, 'Too many attempts. Please try again in an hour.'); }
      const purposes = purpose === 'demo-access' && body.updates ? ['demo-access', 'updates'] : [purpose];
      for (const recordPurpose of purposes) {
        const record = { schemaVersion: 'headstart-email-signup-1', email, purpose: recordPurpose === 'updates' ? 'launch-and-product-updates' : 'demo-access', consentText: recordPurpose === 'updates' ? CONSENT : DEMO_CONSENT, consentVersion: CONSENT_VERSION, source: purpose === 'updates' ? 'homepage-signup' : 'demo-access', ...(recordPurpose === 'demo-access' ? { firstGameId: body.gameId } : {}), submittedAt: timestamp.toISOString(), identityStatus: 'unverified', emailDeliveryStatus: 'not-sent' };
        const path = privatePath(email, secret, recordPurpose);
        try { await write(path, JSON.stringify(record), options); }
        catch (error) { const existing = await read(path, { access: 'private', token, useCache: false }); if (existing?.statusCode !== 200) throw error; const saved = await new Response(existing.stream).json(); if (saved.email !== email || saved.schemaVersion !== record.schemaVersion || saved.purpose !== record.purpose) throw error; }
      }
      return reply(200, purpose === 'demo-access' ? 'Your email is saved. Your demo is ready to open.' : 'Thanks — your interest is saved. You can keep exploring HeadStart.');
    } catch {
      // Do not log tokens, request bodies, email addresses or private blob URLs.
      return reply(503, 'We couldn’t save your signup. Please try again later.');
    }
  };
}
export default createHandler();
