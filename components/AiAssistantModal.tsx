
import React, { useState, useRef, useEffect } from 'react';
import { getStudentsAiAssistantResponse } from '../geminiService';
import { UserProfile } from '../types';

interface AiAssistantModalProps {
  user: UserProfile;
  onClose: () => void;
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ user, onClose }) => {
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: `Salom ${user.full_name}! Men StudentsAi yordamchisiman. Sizga qanday yordam bera olaman?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);
    
    try {
      const response = await getStudentsAiAssistantResponse(userText, user);
      setMessages(prev => [...prev, { role: 'bot', text: response || "Kechirasiz, xatolik yuz berdi." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Aloqa uzildi..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white sm:rounded-[40px] rounded-t-[40px] h-[85vh] sm:h-[600px] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <div className="font-black text-sm uppercase tracking-tighter">StudentsAi Assistant</div>
              <div className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Sun'iy Intellekt</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20"><i className="fas fa-times"></i></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-3xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-100' : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-sm'}`}>
                <p className="text-sm font-medium leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-bl-none animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Xabar yozing..." 
            className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
          <button 
            onClick={sendMessage}
            className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantModal;
