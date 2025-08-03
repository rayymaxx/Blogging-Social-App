import { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, PaperClipIcon, FaceSmileIcon, MagnifyingGlassIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I understand your question. Let me help you with that!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Clear chat"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a new message here..."
                className="flex-1 input-field text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 