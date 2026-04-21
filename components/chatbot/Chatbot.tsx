"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse, BotResponse } from "./responseEngine";

interface Message {
  id: string;
  role: "user" | "bot";
  content: BotResponse | string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "What projects has he built?",
  "Tell me his skills",
  "About Amit",
  "Education background",
  "Is he available?",
];

function BotMessage({ response }: { response: BotResponse }) {
  if (response.type === "list" && response.items) {
    return (
      <div>
        <p className="text-slate-300 text-sm mb-2">{response.text}</p>
        <ul className="space-y-1.5">
          {response.items.map((item, i) => (
            <li key={i} className="text-slate-400 text-xs leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (response.type === "links" && response.links) {
    return (
      <div>
        <p className="text-slate-300 text-sm mb-3">{response.text}</p>
        <div className="space-y-2">
          {response.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return <p className="text-slate-300 text-sm leading-relaxed">{response.text}</p>;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: {
        type: "normal",
        text: "Hi! I'm Amit's AI assistant 🤖 Ask me anything about his skills, projects, or education!",
      } as BotResponse,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 600));

    const response = generateResponse(messageText);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);

    if (!isOpen) setHasUnread(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #a855f7, #3b82f6)",
          boxShadow: "0 0 30px rgba(168,85,247,0.4)",
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(168,85,247,0.6)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.span
              key="bot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-2xl"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-red-400 rounded-full animate-ping absolute" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(168,85,247,0.3)", animationDuration: "2s" }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-[149] w-[360px] max-h-[560px] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(13, 17, 23, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(168,85,247,0.2)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(168,85,247,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.08))",
                borderBottom: "1px solid rgba(168,85,247,0.15)",
              }}
            >
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "rgba(168,85,247,0.2)" }}
                >
                  🤖
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-900" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Amit&apos;s Assistant</div>
                <div className="text-emerald-400 text-xs">● Online</div>
              </div>
              <div className="flex items-center gap-1">
                {/* Decorative traffic lights */}
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5"
                      style={{ background: "rgba(168,85,247,0.15)" }}
                    >
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.2))",
                            border: "1px solid rgba(168,85,247,0.3)",
                            color: "#f1f5f9",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }
                    }
                  >
                    {msg.role === "user" ? (
                      <p className="text-sm">{msg.content as string}</p>
                    ) : (
                      <BotMessage response={msg.content as BotResponse} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                      style={{ background: "rgba(168,85,247,0.15)" }}
                    >
                      🤖
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                {SUGGESTIONS.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full text-purple-400 transition-all duration-200 whitespace-nowrap"
                    style={{
                      background: "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.2)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500/50 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
