import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, Send, User, X, Folder,
  Code,
  Send as SendIcon,
  User as UserIcon,
  Github as GithubIcon,
} from 'lucide-react';
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

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const getResponse = (message) => {
    const text = message.toLowerCase();

    // Greet the user
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return `👋 Hi there! I'm Benjamin's assistant. Ask me about projects, skills, contact info, or how to get started.`;

      // Skills response updated
    } else if (text.includes('skills') || text.includes('technologies') || text.includes('tech stack')) {
      return `🛠️ Benjamin works with:\n\nFrontend: React, TypeScript, Tailwind, Bootstrap\nBackend: Flask, Django, Node.js, FastAPI, Python\nDatabases: PostgreSQL, MongoDB, MySQL\nOthers: Git, GitHub, REST APIs, WordPress, Figma`;

      // Projects response updated
    } else if (text.includes('project')) {
      return `💼 Recent projects include:\n\n• Task Management System (React + Flask)\n• Micro-Donation App (M-Pesa API + PostgreSQL)\n• E-Commerce Platform for Becof Chemicals\n• Turkana Tech Youth Hub\n• Eco Home Guide\n• Movie Character Explorer (JS SPA)\n• CLI Reading Tracker`;

      // Contact info
    } else if (text.includes('contact') || text.includes('reach')) {
      return `📬 You can contact Benjamin via:\nEmail: b3njaminbaya@gmail.com\nWhatsApp: +254 783 797132\nOr use the Contact Me form on this site.`;

      // About info
    } else if (text.includes('about') || text.includes('you')) {
      return `👨‍💻 Benjamin Mweri Baya is a Full-Stack Software Developer with an engineering background. He’s the Founder of Tevexa Technologies and loves building impactful web apps.`;

      // GitHub profile
    } else if (text.includes('github') || text.includes('code')) {
      return `📂 Explore Benjamin's code on GitHub:\nhttps://github.com/benjaminmweribaya`;

      // Unexpected input fallback
    } else {
      return `🤖 I'm not sure how to answer that. Try asking about "skills", "projects", "contact", or "GitHub".`;
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

  const handleQuickReply = (label) => {
    setMessages((prev) => [...prev, { user: true, text: label }]);
    setIsTyping(true);
    setTimeout(() => {
      const botReply = getResponse(label);
      setMessages((prev) => [...prev, { user: false, text: botReply }]);
      setIsTyping(false);
    }, 1200);
  };

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

            {/* 👇 Quick Reply Buttons with Icons */}
            {!isTyping && (
              <div className="px-3 pb-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickReply('Show me your projects')}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition flex items-center gap-1"
                >
                  <Folder size={12} />
                  Projects
                </button>
                <button
                  onClick={() => handleQuickReply('What are your skills?')}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition flex items-center gap-1"
                >
                  <Code size={12} />
                  Skills
                </button>
                <button
                  onClick={() => handleQuickReply('How can I contact you?')}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition flex items-center gap-1"
                >
                  <SendIcon size={12} />
                  Contact
                </button>
                <button
                  onClick={() => handleQuickReply('Tell me about you')}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition flex items-center gap-1"
                >
                  <UserIcon size={12} />
                  About
                </button>
                <button
                  onClick={() => handleQuickReply('GitHub link')}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition flex items-center gap-1"
                >
                  <GithubIcon size={12} />
                  GitHub
                </button>
              </div>
            )}

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

