(function exposeAstraAction(root) {
  'use strict';
  const CHATGPT_URL = 'https://chatgpt.com/';

  async function continueWithAstra(prompt, environment = {}) {
    if (typeof prompt !== 'string' || !prompt.trim()) throw new TypeError('A nonempty prompt is required');
    const openWindow = environment.openWindow || ((url, target) => root.open(url, target));
    const writeClipboard = environment.writeClipboard || (text => root.navigator.clipboard.writeText(text));
    let opened = false;
    try {
      const tab = openWindow('about:blank', '_blank');
      if (tab) {
        tab.opener = null;
        tab.location.replace(CHATGPT_URL);
        opened = true;
      }
    } catch {
      opened = false;
    }
    let copied = false;
    try {
      await writeClipboard(prompt);
      copied = true;
    } catch {
      copied = false;
    }
    return { opened, copied };
  }

  root.HeadStartAstra = Object.freeze({ CHATGPT_URL, continueWithAstra });
})(typeof window === 'undefined' ? globalThis : window);
