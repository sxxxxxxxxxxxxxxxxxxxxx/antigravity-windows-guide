/* A deterrent for casual copying, not an access-control boundary. */
(() => {
  const editableOrCode = target => target instanceof Element && Boolean(target.closest('pre, code, input, textarea, [contenteditable="true"]'));
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('selectstart', event => {
    if (!editableOrCode(event.target)) event.preventDefault();
  });
  document.addEventListener('copy', event => {
    const selection = window.getSelection();
    const node = selection && selection.anchorNode;
    const target = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
    if (!editableOrCode(event.target) && !editableOrCode(target)) event.preventDefault();
  });
  document.addEventListener('dragstart', event => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
  });
})();
