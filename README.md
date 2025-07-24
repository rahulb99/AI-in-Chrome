# ChatGPT Page Context Extension

This Chrome extension allows you to share the content of the current web page with ChatGPT and have a conversation about it. It also supports voice input and output for a hands-free experience.

## Features

- **Share Page Content:** Send the entire text content of the current page to ChatGPT as context for your conversation.
- **ChatGPT Conversation:** Have a back-and-forth conversation with ChatGPT, with the page content as a reference.
- **Voice Input:** Use your voice to ask questions.
- **Voice Output:** Hear ChatGPT's responses spoken aloud.
- **Modern UI:** A clean and modern user interface inspired by the ChatGPT website.

## Installation

1.  **Download the code:** Clone or download this repository to your local machine.
2.  **Get an API Key:** You will need an API key from OpenAI. You can get one from the [OpenAI website](https://beta.openai.com/signup/).
3.  **Add your API Key:** Open the `background.js` file and replace `'YOUR_CHATGPT_API_KEY'` with your actual OpenAI API key.
4.  **Load the extension in Chrome:**
    *   Open Chrome and navigate to `chrome://extensions`.
    *   Enable "Developer mode" in the top right corner.
    *   Click "Load unpacked" and select the directory where you have saved the extension's files.

## How to Use

1.  Navigate to any web page you want to discuss with ChatGPT.
2.  Click the extension icon in the Chrome toolbar.
3.  Click the "Share Page Content" button to send the page's text to ChatGPT.
4.  Type your question in the input box and press Enter, or click the microphone icon to speak your question.
5.  The conversation will be displayed in the popup window, and you will hear ChatGPT's response.