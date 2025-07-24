let pageContent = '';
let conversationHistory = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'sharePage') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getPageContent' }, (response) => {
        if (response && response.content) {
          pageContent = response.content;
          pageContent = response.content;
          conversationHistory = [
            { role: 'system', content: 'You are a helpful assistant that can answer questions about the content of a web page. The user has provided the following content:' },
            { role: 'system', content: pageContent }
          ];
          chrome.runtime.sendMessage({ type: 'response', message: 'Page content has been shared. You can now ask questions.' });
        }
      });
    });
  } else if (request.type === 'message') {
    conversationHistory.push({ role: 'user', content: request.message });
    // Send to ChatGPT API
    const apiKey = 'YOUR_CHATGPT_API_KEY'; // Replace with your actual API key
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: conversationHistory
      })
    })
    .then(response => response.json())
    .then(data => {
      const response = data.choices[0].message.content;
      conversationHistory.push({ role: 'assistant', content: response });
      chrome.runtime.sendMessage({ type: 'response', message: response });
    })
    .catch(error => {
      console.error('Error:', error);
      chrome.runtime.sendMessage({ type: 'response', message: 'Error communicating with ChatGPT API.' });
    });
  }
});
