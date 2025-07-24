chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getPageContent') {
    sendResponse({ content: document.body.innerText });
  }
});
