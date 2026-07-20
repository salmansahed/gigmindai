"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import { FiX, FiSend, FiUser, FiCornerDownRight } from "react-icons/fi";
import { FaWandMagicSparkles, FaRobot } from "react-icons/fa6";
import Link from "next/link";

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm GigMind AI. How can I help you navigate the platform or post a gig today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "How to post a Custom Gig?",
    "Where can I find open jobs?",
    "What is average web dev budget?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (userQuery) => {
    const queryToSend = userQuery || input;
    if (!queryToSend.trim()) return;

    const newMessages = [...messages, { role: "user", content: queryToSend }];
    setMessages(newMessages);
    if (!userQuery) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Stream Failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const parsed = JSON.parse(line.replace("data: ", ""));
              const contentToken = parsed.choices[0]?.delta?.content || "";

              if (contentToken) {
                setMessages((prev) => {
                  if (prev.length === 0) return prev;
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: updated[lastIdx].content + contentToken,
                  };
                  return updated;
                });
              }
            } catch (e) {
              // Ignore partial JSON parse chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Stream Error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Sorry, I encountered an error connecting to GigMind AI.",
        },
      ]);
    }
  };

  const renderMessageContent = (text) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          onClick={() => setIsOpen(false)}
          className="text-emerald-400 font-bold underline hover:text-emerald-300 mx-1 inline-flex items-center gap-1"
        >
          {match[1]} <FiCornerDownRight className="size-3" />
        </Link>,
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onPress={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full size-14 shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20 cursor-pointer"
        >
          <FaWandMagicSparkles className="size-6 animate-pulse" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-[#0a0f1d]/95 backdrop-blur-xl border border-white/15 rounded-3xl w-[90vw] sm:w-95 h-130 shadow-2xl flex flex-col overflow-hidden text-white transition-all animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
                <FaRobot className="size-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  GigMind AI Assistant
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[10px] text-slate-400">Context-Aware AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX className="size-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FaRobot className="size-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${msg.role === "user" ? "bg-emerald-500 text-slate-950 font-medium rounded-tr-none" : "bg-white/10 border border-white/10 text-slate-200 rounded-tl-none"}`}
                >
                  {renderMessageContent(msg.content)}
                </div>
                {msg.role === "user" && (
                  <div className="size-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <FiUser className="size-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-1">
                <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FaRobot className="size-3.5" />
                </div>
                <div className="flex gap-1 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <span className="size-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="size-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 border-t border-white/5 bg-white/2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="whitespace-nowrap text-[10px] bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-300 px-2.5 py-1 rounded-full transition-all cursor-pointer shrink-0"
              >
                💡 {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 flex items-center gap-2 bg-slate-950/50"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <Button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 min-w-10 h-8 rounded-xl font-bold flex items-center justify-center cursor-pointer"
            >
              <FiSend className="size-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
