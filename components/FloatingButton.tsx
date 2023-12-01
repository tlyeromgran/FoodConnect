import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Define the Message interface...
interface Message {
  type: 'user' | 'bot';
  text: string;
}

const FloatingActionButton: React.FC = () => {
  // State variables for chat functionality...
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs for input and chat content...
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom when chat opens or new messages are added...
  useEffect(() => {
    if (isChatOpen && inputRef.current && chatContentRef.current) {
      const isNewMessageAdded = messages.length > 0;
      
      if (isNewMessageAdded) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }

      inputRef.current.focus();
    }
  }, [isChatOpen, messages]);

  // Effect to focus on the input when new messages are added...
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  // Event handler to send a message...
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // User message...
    const userMessage: Message = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    try {
      // Send message to API...
      const response = await axios.post('/api/chat', { message: inputValue });
      const botMessage: Message = { type: 'bot', text: response.data.message };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in sending message to API:', error);
      setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, there was an error processing your message.' }]);
    } finally {
      // Reset state and focus on input...
      setIsLoading(false);
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };


  // Event handler for Enter key in the input...
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Rendered JSX...
  return (
    <div>
      {/* Floating button to open the chat */}
      <button onClick={() => setChatOpen(true)} className="floating-button">
        <span className="sr-only">Chat</span>
        <svg className="fabIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2l-4-4H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      </button>

      {/* Chat modal */}
      {isChatOpen && (
        <div className="chat-modal">
          {/* Chat header with title and close button */}
          <div className="chat-header">
            <h2>Newt Trition</h2>
            <button onClick={() => setChatOpen(false)}>Close</button>
          </div>

          {/* Chat content area with messages and loading indicator */}
          <div className="chat-content" ref={chatContentRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}>
                {/* Bot or user icon based on message type */}
                {message.type === 'bot' && <Image src="/images/newt.png" alt="Bot" className="message-icon" width={70} height={70} />}
                {message.type === 'user' && <Image src="/images/user.png" alt="User" className="message-icon" width={50} height={50} />}
                {/* Message text */}
                <div className={`message-text`}>{message.text}</div>
              </div>
            ))}
            {/* Loading indicator */}
            {isLoading && <p>Loading...</p>}
          </div>

          {/* Input area for typing messages */}
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              ref={inputRef}
            />
            {/* Button to send a message */}
            <button onClick={handleSendMessage} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;
