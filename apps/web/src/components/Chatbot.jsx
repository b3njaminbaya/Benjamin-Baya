import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, X, Folder, Code, Mail, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-server-kbti.onrender.com';

const QUICK_REPLIES = [
  { label: 'Projects', icon: Folder, prompt: 'Tell me about your most interesting projects.' },
  { label: 'Skills', icon: Code, prompt: 'What are your core technical skills?' },
  { label: 'Contact', icon: Mail, prompt: 'How can I get in touch with you?' },
  { label: 'About', icon: User, prompt: 'Tell me about yourself and your background.' },
  { label: 'GitHub', icon: Github, prompt: 'Where can I find your code on GitHub?' },
];

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chatMessages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch {
      // Storage quota exceeded or unavailable — fail silently
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (showChat) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showChat]);

  const sendMessage = async (text) => {
    const userText = text.trim();
    if (!userText || isTyping) return;

    const updatedMessages = [...messages, { user: true, text: userText }];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Cancel any in-flight request before starting a new one
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    // 15-second timeout — accounts for Render cold starts
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-4), // last 2 conversation turns for context
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { user: false, text: data.reply }]);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setMessages((prev) => [
          ...prev,
          {
            user: false,
            text: "I'm waking up — Render's cold start can take a moment. Please try again shortly, or use the contact form.",
            error: true,
          },
        ]);
      } else {
        const isRateLimit = err.message?.toLowerCase().includes('rate');
        setMessages((prev) => [
          ...prev,
          {
            user: false,
            text: isRateLimit
              ? "You've been chatting a lot! Please wait a few minutes before sending more messages."
              : "Something went wrong on my end. Please try again or reach out via the contact form.",
            error: true,
          },
        ]);
      }
    } finally {
      setIsTyping(false);
      controllerRef.current = null;
    }
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Drag only activates from the header handle — not the message area
  const handleDragStart = (e) => {
    if (!e.target.closest('[data-drag-handle]')) return;
    const rect = chatbotRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const x = Math.max(0, Math.min(window.innerWidth - 320, e.clientX - dragStart.x));
    const y = Math.max(0, Math.min(window.innerHeight - 440, e.clientY - dragStart.y));
    setPosition({ x, y });
  };

  const handleDragEnd = () => setIsDragging(false);

  const clearHistory = () => {
    setMessages([]);
    try { localStorage.removeItem('chatMessages'); } catch { /* ok */ }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!showChat && (
        <motion.button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 left-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          aria-label="Open AI portfolio assistant"
          title="Chat with Benjamin's AI assistant"
        >
          <Bot size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {showChat && (
          <motion.div
            ref={chatbotRef}
            className="fixed w-80 bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              height: '440px',
              cursor: isDragging ? 'grabbing' : 'default',
            }}
            initial={{ scale: 0.85, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {/* Header — drag handle */}
            <div
              data-drag-handle
              className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center cursor-grab active:cursor-grabbing select-none flex-shrink-0"
              onMouseDown={handleDragStart}
            >
              <span className="font-semibold flex items-center gap-2 text-sm">
                <Bot size={15} aria-hidden />
                Benjamin's AI Assistant
              </span>
              <div className="flex items-center gap-3">
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-indigo-200 hover:text-white text-xs underline-offset-2 hover:underline"
                    aria-label="Clear chat history"
                  >
                    Clear
                  </button>
                )}
                <button onClick={() => setShowChat(false)} aria-label="Close assistant">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm" role="log" aria-live="polite">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-6 px-3">
                  <Bot size={32} className="mx-auto mb-2 text-indigo-200" aria-hidden />
                  <p className="text-xs font-medium text-gray-500">Hi! I'm Benjamin's AI assistant.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ask me about his work, skills, or how to get in touch.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[88%] flex items-start gap-1.5 text-xs leading-relaxed ${
                      msg.user
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : msg.error
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {!msg.user && <Bot size={11} className="mt-0.5 flex-shrink-0 opacity-60" aria-hidden />}
                    {msg.user && <User size={11} className="mt-0.5 flex-shrink-0 opacity-70" aria-hidden />}
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-400 px-3 py-2.5 rounded-xl rounded-bl-none text-xs flex items-center gap-1.5">
                    <Bot size={11} aria-hidden />
                    <span className="flex gap-1" aria-label="Typing">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies — shown only on empty state */}
            {messages.length === 0 && !isTyping && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map(({ label, icon: Icon, prompt }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1"
                  >
                    <Icon size={11} aria-hidden />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="border-t border-gray-100 p-2.5 flex items-center gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
                placeholder="Ask me anything…"
                aria-label="Chat message input"
                disabled={isTyping}
                maxLength={500}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
