/* Presentational icons; original tutorial source and heading IDs remain intact. */
(() => {
 const paths = {
 bulb: '<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z"/>',
 phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
 shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
 sparkle: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
 search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6m-14-11h6m-3-3v6"/>',
 arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
 warning: '<path d="m12 3 10 18H2Z"/><path d="M12 9v5m0 3h.01"/>',
 check: '<path d="m5 12 4 4L19 6"/>',
 refresh: '<path d="M20 7v5h-5M4 17v-5h5M5 7a8 8 0 0 1 14-1l1 6M4 12l1 6a8 8 0 0 0 14-1"/>',
 tool: '<path d="m14 6 4 4 3-3a6 6 0 0 1-8 8l-6 6-4-4 6-6a6 6 0 0 1 8-8Z"/>',
 bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>'
 };
 const map = {'💡':'bulb','📱':'phone','🛡':'shield','🌟':'sparkle','✨':'sparkle','🔍':'search','🔎':'search','👉':'arrow','➡':'arrow','🚨':'warning','⚠':'warning','🛑':'warning','✅':'check','✔':'check','🔄':'refresh','🔧':'tool','🛠':'tool','⚡':'bolt','🚑':'shield','🛂':'shield','📌':'bulb','📋':'phone','📖':'phone','🎯':'sparkle','🚀':'arrow','💻':'phone','🔐':'shield','🔒':'shield','👀':'search','🥇':'sparkle','🥈':'sparkle','🥉':'sparkle','🤖':'phone','📬':'phone','📎':'tool','❌':'warning','❗':'warning','🔴':'warning','🟢':'check','📍':'bulb','📢':'warning','🎉':'sparkle'};
 const pattern = new RegExp('(' + Object.keys(map).join('|') + ')\\uFE0F?', 'gu');
 function decorate(root) {
  if (!root || (root.nodeType !== 1 && root.nodeType !== 3)) return;
  const nodes = [];
  if (root.nodeType === 3) nodes.push(root);
  else { const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); while(walker.nextNode()) nodes.push(walker.currentNode); }
  for (const node of nodes) {
   if (!node.parentElement || node.parentElement.closest('script,style,pre,code,textarea,input,svg,.notebook-icon,.guide-icon')) continue;
   const text = node.textContent; pattern.lastIndex = 0;
   if (!pattern.test(text)) continue;
   pattern.lastIndex = 0; const fragment = document.createDocumentFragment(); let last = 0;
   for (const match of text.matchAll(pattern)) {
    fragment.append(document.createTextNode(text.slice(last,match.index)));
    const icon = document.createElement('span'); icon.className = 'guide-icon'; icon.setAttribute('role','img'); icon.setAttribute('aria-label',match[0]);
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[map[match[1]]]+'</svg>';
    fragment.append(icon); last = match.index + match[0].length;
   }
   fragment.append(document.createTextNode(text.slice(last))); node.replaceWith(fragment);
  }
 }
 decorate(document.body);
 const observer = new MutationObserver(records => {
  observer.disconnect();
  for (const record of records) for (const node of record.addedNodes) decorate(node);
  observer.observe(document.body,{childList:true,subtree:true});
 });
 observer.observe(document.body,{childList:true,subtree:true});
})();
