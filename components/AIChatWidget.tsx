"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Languages } from "lucide-react";

import { Vocabulary, Topic } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatWidgetProps {
  selectedTopic: Topic | null;
  vocabularies: Vocabulary[];
}

const formatText = (text: string) => {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
          <strong key={j}>{part.slice(2, -2)}</strong> : part
        )}
        {i !== text.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
};

export default function AIChatWidget({ selectedTopic, vocabularies }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const vocabContext = vocabularies.map(v => `- ${v.word}: ${Array.isArray(v.meanings) ? v.meanings[0] : v.meanings}`).join('\n');
  const topicName = selectedTopic?.name || "General";

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translatingIds, setTranslatingIds] = useState<Set<string>>(new Set());

  const handleTranslate = async (msgId: string, text: string) => {
    if (translations[msgId]) return;
    setTranslatingIds(prev => new Set(prev).add(msgId));
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const data = await res.json();
        setTranslations(prev => ({ ...prev, [msgId]: data.translation }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTranslatingIds(prev => {
        const next = new Set(prev);
        next.delete(msgId);
        return next;
      });
    }
  };
  const [messages, setMessages] = useState<{id: string, role: 'user' | 'assistant', content: string}[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Chào bạn! Mình là Trợ lý AI EngMaster. Hôm nay chúng ta sẽ luyện tập các từ vựng thuộc chủ đề "${topicName}". Bạn muốn đóng vai (role-play) trong tình huống nào?`
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          vocabContext,
          topicName
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader available");

      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: "" }]);

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.id === aiMsgId) {
              updated[updated.length - 1] = { ...last, content: last.content + chunk };
            }
            return updated;
          });
        }
      }

      // Xử lý fallback: Nếu model trả về rỗng (bị lỗi ngầm từ API Provider như Rate Limit)
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.id === aiMsgId && !last.content.trim()) {
          updated[updated.length - 1] = { ...last, content: "⚠️ (Hệ thống) AI Provider hiện đang quá tải hoặc từ chối kết nối. Hệ thống xoay tua sẽ tự động chọn Model khác ở lượt tiếp theo. Vui lòng gửi lại tin nhắn!" };
        }
        return updated;
      });
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: `Lỗi: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const suggestedPrompts = [
    "Gợi ý tình huống",
    "Hỏi tôi Tiếng Anh",
    "Kiểm tra từ vựng",
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat if topic changes
  useEffect(() => {
    if (!isOpen) return; // Only reset if open or we can just reset anyway
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Chào bạn! Mình là Trợ lý AI EngMaster. Hôm nay chúng ta sẽ luyện tập các từ vựng thuộc chủ đề "${topicName}". Bạn muốn đóng vai (role-play) trong tình huống nào?`
      }
    ]);
  }, [topicName, setMessages, isOpen]);


  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white border-2 border-indigo-100 shadow-2xl rounded-3xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold">AI English Tutor</h3>
                  <p className="text-xs text-indigo-200">Practicing: {topicName}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${m.role === 'user' ? 'bg-indigo-500 text-white rounded-tr-sm' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'}`}>
                    {formatText(m.content)}
                    
                    {m.role === 'assistant' && !translations[m.id] && m.content.trim().length > 10 && (
                      <button 
                        onClick={() => handleTranslate(m.id, m.content)}
                        disabled={translatingIds.has(m.id)}
                        className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-indigo-500 mt-2.5 transition-colors font-medium border border-slate-100 bg-slate-50 px-2 py-1 rounded-md active:scale-95"
                      >
                        <Languages size={12} />
                        {translatingIds.has(m.id) ? "Đang dịch..." : "Dịch sang Tiếng Việt"}
                      </button>
                    )}
                    {translations[m.id] && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-[13px] text-slate-500/90 italic leading-relaxed">
                        {formatText(translations[m.id])}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex gap-3 justify-start">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                     <Sparkles size={16} className="animate-spin" />
                   </div>
                   <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-sm text-slate-400 text-sm italic shadow-sm">
                     AI is typing...
                   </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-3 pb-3 bg-slate-50 flex gap-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    className="text-[13px] bg-white border border-indigo-100 text-indigo-600 px-3.5 py-1.5 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-sm shrink-0 font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 bg-slate-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700 font-medium"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:grayscale transition-all active:scale-95 shadow-md shadow-indigo-200"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-300 transition-all hover:scale-110 active:scale-95 group relative"
      >
        {isOpen ? <X size={24} /> : (
           <>
             <MessageCircle size={24} />
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse"></div>
           </>
        )}
      </button>
    </div>
  );
}
