import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import '@n8n/chat/dist/style.css'
import { createChat } from '@n8n/chat'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


createChat({
  webhookUrl: 'http://localhost:5678/webhook/ef3a0d03-c746-45e4-99f9-627ff67568ee/chat'
});




const n8nStyle = document.createElement('style');
n8nStyle.innerHTML = `
  
  .n8n-chat-toggle, button[class*="chat-button"] {
    background: linear-gradient(135deg, #007aff, #ff2d55) !important;
    box-shadow: 0px 8px 25px rgba(255, 45, 85, 0.5) !important;
    position: relative !important;
    animation: floatButton 3s ease-in-out infinite !important;
  }

  
  .n8n-chat-toggle svg, button[class*="chat-button"] svg {
    display: none !important;
  }

  
  .n8n-chat-toggle::after, button[class*="chat-button"]::after {
    content: "🤖" !important;
    font-size: 30px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    animation: shakeEyes 2s infinite alternate !important;
  }

  
  .n8n-chat-toggle::before, button[class*="chat-button"]::before {
    content: "Chat with AI ⚡" !important;
    position: absolute !important;
    top: -45px !important;
    right: -10px !important;
    background-color: #34c759 !important;
    color: white !important;
    padding: 6px 12px !important;
    border-radius: 20px !important;
    font-size: 11px !important;
    font-weight: bold !important;
    font-family: sans-serif !important;
    white-space: nowrap !important;
    box-shadow: 0px 4px 15px rgba(52, 199, 89, 0.4) !important;
    animation: pulseText 1.5s infinite alternate !important;
  }

  
  @keyframes floatButton {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulseText {
    0% { transform: scale(1); }
    100% { transform: scale(1.08); }
  }
  @keyframes shakeEyes {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(-5deg) scale(1.1); }
    100% { transform: rotate(5deg) scale(1); }
  }
`;
document.head.appendChild(n8nStyle); 