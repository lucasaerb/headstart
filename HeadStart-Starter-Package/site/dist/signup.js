const REMEMBERED_EMAIL_KEY = 'headstart.remembered-email.v1';
const normalizeEmail = value => value.trim().toLowerCase();
function readRememberedEmail() {
  try {
    const record = JSON.parse(localStorage.getItem(REMEMBERED_EMAIL_KEY));
    if (record?.version !== 1 || typeof record.email !== 'string') return '';
    const email = normalizeEmail(record.email);
    return email && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
  } catch { return ''; }
}
function writeRememberedEmail(email) {
  try { localStorage.setItem(REMEMBERED_EMAIL_KEY, JSON.stringify({ version: 1, email })); return true; }
  catch { return false; }
}
function clearRememberedEmail() {
  try { localStorage.removeItem(REMEMBERED_EMAIL_KEY); return true; }
  catch { return false; }
}

const signup = document.getElementById('email-signup');
const rememberedPanel = document.getElementById('remembered-email');
const rememberedValue = document.getElementById('remembered-email-value');
let rememberedEmail = readRememberedEmail();
let demoSessionSaved = Boolean(rememberedEmail);
function renderRememberedEmail() {
  rememberedPanel.hidden = !rememberedEmail;
  rememberedValue.textContent = rememberedEmail;
  if (rememberedEmail) signup.elements.email.value = rememberedEmail;
}
renderRememberedEmail();
document.getElementById('forget-email').addEventListener('click', () => {
  const status = document.getElementById('signup-status');
  const cleared = clearRememberedEmail();
  rememberedEmail = '';
  demoSessionSaved = false;
  signup.elements.email.value = '';
  renderRememberedEmail();
  status.textContent = cleared ? 'This browser no longer remembers your email.' : 'This browser could not clear its saved preference. You can still re-enter your email.';
  signup.elements.email.focus();
});
if (signup) signup.addEventListener('submit', async event => {
  event.preventDefault();
  if (!signup.reportValidity()) return;
  const button = signup.querySelector('button[type="submit"]');
  const status = document.getElementById('signup-status');
  button.disabled = true; button.textContent = 'Saving…'; status.textContent = '';
  try {
    const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: signup.elements.email.value, website: signup.elements.website.value, consentVersion: 'headstart-updates-2026-09-10' }), signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'We couldn’t save your signup. Please try again.');
    const email = normalizeEmail(signup.elements.email.value);
    const remembered = writeRememberedEmail(email);
    rememberedEmail = remembered ? email : '';
    demoSessionSaved = true;
    signup.reset();
    renderRememberedEmail();
    status.textContent = result.message + (remembered ? ' This browser will remember your email for demos.' : ' Your email was saved, but this browser could not remember it for later demos.');
  } catch (error) { status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Please retry; a duplicate won’t create another signup.' : error instanceof TypeError || error instanceof SyntaxError ? 'We couldn’t reach signups. Please try again later.' : error.message; }
  finally { button.disabled = false; button.textContent = 'Sign me up'; }
});

const demoDialog = document.getElementById('demo-email-dialog');
const demoForm = document.getElementById('demo-email-form');
let demoChoice = null;
let demoBusy = false;
let demoAttempt = 0;
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-demo-game]');
  if (!link || demoSessionSaved) return;
  event.preventDefault();
  demoChoice = { url: link.href, gameId: link.dataset.demoGame, title: link.dataset.demoTitle, opener: link };
  demoForm.reset(); demoForm.hidden = false;
  if (rememberedEmail) demoForm.elements.email.value = rememberedEmail;
  document.getElementById('demo-launch').hidden = true;
  document.getElementById('demo-email-status').textContent = '';
  document.getElementById('demo-email-context').textContent = 'Play ' + demoChoice.title + '.';
  demoDialog.showModal();
  document.getElementById('demo-email').focus();
});
demoDialog.addEventListener('close', () => {
  demoAttempt++; demoBusy = false; demoForm.reset();
  demoForm.querySelector('button[type="submit"]').disabled = false;
  demoChoice?.opener.focus();
});
demoForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (demoBusy || !demoForm.reportValidity() || !demoChoice) return;
  demoBusy = true;
  const attempt = ++demoAttempt;
  const button = demoForm.querySelector('button[type="submit"]');
  const status = document.getElementById('demo-email-status');
  button.disabled = true; status.textContent = 'Saving your email…';
  const choice = demoChoice;
  try {
    const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: demoForm.elements.email.value, website: demoForm.elements.website.value, consentVersion: 'headstart-updates-2026-09-10', purpose: 'demo-access', updates: demoForm.elements.updates.checked, gameId: choice.gameId }), signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'We couldn’t save your email. Please try again.');
    if (attempt !== demoAttempt || !demoDialog.open) return;
    const email = normalizeEmail(demoForm.elements.email.value);
    const remembered = writeRememberedEmail(email);
    rememberedEmail = remembered ? email : '';
    demoSessionSaved = true; demoForm.reset(); demoForm.hidden = true; renderRememberedEmail();
    status.textContent = 'Your email is saved. ' + (remembered ? 'This browser will remember it for later demos. ' : 'This browser could not remember it for later demos. ') + 'Open ' + choice.title + ' when you’re ready.';
    const launch = document.getElementById('demo-launch'); launch.href = choice.url; launch.target = '_blank'; launch.rel = 'noopener noreferrer'; launch.hidden = false; launch.focus();
  } catch (error) {
    if (attempt === demoAttempt && demoDialog.open) status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Please retry.' : error instanceof TypeError || error instanceof SyntaxError ? 'We couldn’t save your email. Please try again later.' : error.message;
  } finally {
    if (attempt === demoAttempt) { demoBusy = false; button.disabled = false; }
  }
});
