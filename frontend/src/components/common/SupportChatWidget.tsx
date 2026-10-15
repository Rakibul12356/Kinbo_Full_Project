"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, ArrowUp, Send, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function SupportChatWidget() {
  const { isCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "livechat">("menu");
  const [chatMessages, setChatMessages] = useState<
    { sender: "agent" | "user"; text: string; time: string }[]
  >([
    {
      sender: "agent",
      text: "Hello! Welcome to Kinbo Support. How can we assist you today?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");

  // Track scroll position for Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMsg = {
      sender: "user" as const,
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputText("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Thank you for reaching out! A representative will connect with you shortly. You can also contact us directly via WhatsApp or Messenger for instant replies.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  if (isCartOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Support Chat Popup Card */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-zinc-200/90 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {activeTab === "menu" ? (
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-1.5">
                    Hi there! <span className="animate-wiggle">👋</span>
                  </h3>
                  <p className="text-sm text-zinc-600 mt-1 leading-snug">
                    Let us know if we can help you with anything at all.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                {/* LiveChat Button */}
                <button
                  onClick={() => setActiveTab("livechat")}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#0bb07b] hover:bg-[#099a6a] text-white font-medium text-base shadow-sm transition active:scale-[0.99] text-left cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold">LiveChat</span>
                </button>

                {/* Messenger Button */}
                <a
                  href="https://m.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-medium text-base border border-zinc-200 transition active:scale-[0.99] text-left shadow-2xs"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="messenger-grad-common"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#006AFF" />
                        <stop offset="50%" stopColor="#00B2FF" />
                        <stop offset="100%" stopColor="#A033FF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2C6.477 2 2 6.145 2 11.258C2 14.17 3.447 16.748 5.714 18.39V22L9.167 20.1C10.07 20.37 11.018 20.516 12 20.516C17.523 20.516 22 16.371 22 11.258C22 6.145 17.523 2 12 2Z"
                      fill="url(#messenger-grad-common)"
                    />
                    <path
                      d="M6.8 14.2L10.2 10.6L12.6 13L17.2 8.2L13.8 11.8L11.4 9.4L6.8 14.2Z"
                      fill="white"
                    />
                  </svg>
                  <span className="font-semibold">Messenger</span>
                </a>

                {/* Whatsapp Button */}
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-medium text-base border border-zinc-200 transition active:scale-[0.99] text-left shadow-2xs"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 14.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.7.1-.2.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.6.2-1.7-.1-.1-.3-.2-.7-.4z"
                      fill="#25D366"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.5 5.1L2 22l5.1-1.4c1.4.9 3.1 1.4 4.9 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.3.9.9-3.2-.2-.3c-.9-1.4-1.4-3-1.4-4.7 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.7-8.3 8.7z"
                      fill="#25D366"
                    />
                  </svg>
                  <span className="font-semibold">Whatsapp</span>
                </a>
              </div>
            </div>
          ) : (
            /* LiveChat Interface */
            <div className="flex flex-col h-[400px]">
              <div className="bg-[#0bb07b] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">Kinbo Support</h4>
                    <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="text-xs px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#0bb07b] text-white rounded-tr-none"
                          : "bg-white text-zinc-800 border border-zinc-200/80 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-zinc-100 text-zinc-800 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0bb07b]/40 transition placeholder:text-zinc-400"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-[#0bb07b] hover:bg-[#099a6a] disabled:opacity-40 text-white transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Floating Buttons Column */}
      <div className="flex flex-col items-center gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-[#1F2937] text-white flex items-center justify-center shadow-lg hover:bg-[#111827] active:scale-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setActiveTab("menu");
          }}
          title="Customer Support"
          aria-label="Customer Support Chat"
          className="w-13 h-13 rounded-full bg-[#0bb07b] text-white flex items-center justify-center shadow-xl hover:bg-[#099a6a] active:scale-95 transition-all transform hover:scale-105 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
