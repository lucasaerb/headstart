const signup = document.getElementById('email-signup');
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
    status.textContent = result.message;
    signup.reset();
  } catch (error) { status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Please retry; a duplicate won’t create another signup.' : error instanceof TypeError || error instanceof SyntaxError ? 'We couldn’t reach signups. Please try again later.' : error.message; }
  finally { button.disabled = false; button.textContent = 'Sign me up'; }
});

const demoDialog = document.getElementById('demo-email-dialog');
const demoForm = document.getElementById('demo-email-form');
let demoChoice = null;
let demoSessionSaved = false;
let demoBusy = false;
let demoAttempt = 0;
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-demo-game]');
  if (!link || demoSessionSaved) return;
  event.preventDefault();
  demoChoice = { url: link.href, gameId: link.dataset.demoGame, title: link.dataset.demoTitle, opener: link };
  demoForm.reset(); demoForm.hidden = false;
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
    demoSessionSaved = true; demoForm.reset(); demoForm.hidden = true;
    status.textContent = 'Your email is saved. Open ' + choice.title + ' when you’re ready.';
    const launch = document.getElementById('demo-launch'); launch.href = choice.url; launch.target = '_blank'; launch.rel = 'noopener noreferrer'; launch.hidden = false; launch.focus();
  } catch (error) {
    if (attempt === demoAttempt && demoDialog.open) status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Please retry.' : error instanceof TypeError || error instanceof SyntaxError ? 'We couldn’t save your email. Please try again later.' : error.message;
  } finally {
    if (attempt === demoAttempt) { demoBusy = false; button.disabled = false; }
  }
});
