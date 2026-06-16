import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); 

  const sendMessageToBot = async (userMessage) => {
    try {
      
      const response = await fetch('https://wirkha-n8n-bot.hf.space/webhook/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: userMessage 
        }),
      });

      if (!response.ok) throw new Error('Sfr n8n ma jawbch');

      const data = await response.json();
      return data.output; 

    } catch (error) {
      console.error("Erreur:", error);
      return "سمح ليا، وقع مشكل فـ السيرفور. عاود جرب مورا شوية!";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    const textToSend = input;
    setInput('');

    const botReply = await sendMessageToBot(textToSend);
    setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, fontFamily: 'sans-serif' }}>
      {}
      <button onClick={() => setIsOpen(!isOpen)} style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
        {isOpen ? '❌' : '💬'}
      </button>

      {}
      {isOpen && (
        <div style={{ position: 'absolute', bottom: '75px', right: '0', width: '330px', height: '450px', background: 'white', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: 'black' }}>
          <div style={{ background: '#007bff', color: 'white', padding: '15px', fontWeight: 'bold' }}>AI Assistant 🤖</div>
          
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', background: '#f8f9fa' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
                <span style={{ padding: '8px 12px', borderRadius: '12px', background: msg.sender === 'user' ? '#007bff' : '#e9ecef', color: msg.sender === 'user' ? 'white' : 'black', display: 'inline-block', maxWidth: '80%', fontSize: '14px' }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', padding: '10px', gap: '5px', borderTop: '1px solid #ddd' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="كـتـب مـيـسّـاج..." style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: 'black' }} />
            <button onClick={handleSend} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;