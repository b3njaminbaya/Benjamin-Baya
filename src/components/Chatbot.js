import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatbotRef = useRef(null);

  const topics = ['projects', 'skills', 'contact', 'about', 'GitHub'];

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const getResponse = (message) => {
    const text = message.toLowerCase();

    if (text.includes('hi') || text.includes('hello')) {
      return `👋 Hi! I'm Benjamin's assistant. Ask me about ${topics.join(', ')}.`;
    } else if (text.includes('projects')) {
      return `💼 Here are my projects:\n• Becof Web App\n• Reading Tracker CLI\n• Eco Home Guide\n• Textile Waste Recycling\n• Turkana Youth Hub`;
    } else if (text.includes('skills')) {
      return '🧠 I specialize in React, Node.js, Flask, Tailwind CSS, PostgreSQL, and MongoDB.';
    } else if (text.includes('contact')) {
      return '📬 You can reach me via email (b3njaminbaya@gmail.com) or WhatsApp (+254783797132).';
    } else if (text.includes('about')) {
      return "👨‍💻 I'm a full-stack developer trained at Moringa School, passionate about building impactful software.";
    } else if (text.includes('github')) {
      return '📂 Visit my GitHub: https://github.com/benjaminmweribaya';
    } else {
      return "🤖 Sorry, I didn’t understand that. Try asking about projects, skills, contact, or GitHub.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;

    setMessages([...messages, { user: true, text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getResponse(userMsg);
      setMessages((prev) => [...prev, { user: false, text: botReply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleDragStart = (e) => {
    const rect = chatbotRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const x = Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragStart.x));
    const y = Math.max(0, Math.min(window.innerHeight - 400, e.clientY - dragStart.y));
    setPosition({ x, y });
  };

  const handleDragEnd = () => setIsDragging(false);

  const toggleChat = () => setShowChat(!showChat);

  return (
    <>
      {/* Floating Chat Button */}
      {!showChat && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-6 left-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          title="Open Chat"
        >
          <Bot size={24} />
        </motion.button>
      )}

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            ref={chatbotRef}
            className="fixed w-72 md:w-80 h-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col border"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
              <span className="font-semibold flex items-center gap-2">
                <Bot size={16} /> Assistant
              </span>
              <button onClick={toggleChat}>
                <X size={16} />
              </button>
            </div>

            {/* Chat Window */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs ${msg.user
                      ? 'bg-indigo-600 text-white flex items-center gap-2'
                      : 'bg-gray-100 text-gray-800 flex items-center gap-2'
                      }`}
                  >
                    {msg.user ? <User size={14} /> : <Bot size={14} />}
                    <span>{msg.text}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                    <Bot size={14} />
                    <span>Typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
                placeholder="Ask me anything..."
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

