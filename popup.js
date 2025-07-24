document.addEventListener('DOMContentLoaded', function() {
  const conversationDiv = document.getElementById('conversation');
  const input = document.getElementById('input');
  const sendButton = document.getElementById('send');
  const voiceInputButton = document.getElementById('voiceInput');

  const sendMessage = () => {
    const message = input.value;
    if (message.trim() === '') return;
    input.value = '';
    displayMessage(message, 'user');
    chrome.runtime.sendMessage({ type: 'message', message });
  };

  sendButton.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  const displayMessage = (message, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerText = message;
    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  };

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceInputButton.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    input.value = speechResult;
    sendMessage();
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'response') {
      displayMessage(request.message, 'chatgpt');
      const utterance = new SpeechSynthesisUtterance(request.message);
      speechSynthesis.speak(utterance);
    }
  });
});
