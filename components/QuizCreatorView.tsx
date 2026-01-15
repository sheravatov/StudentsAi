
import React, { useState } from 'react';
import { parseQuizWithAI } from '../geminiService';
import Loader from './Loader';

const QuizCreatorView: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await parseQuizWithAI(input);
      setResult(data);
    } catch (err) {
      alert("Xatolik yuz berdi. Matnni tekshirib qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <button 
            onClick={() => setShowGuide(!showGuide)}
            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <i className="fas fa-info text-[10px]"></i>
          </button>
        </div>

        <h2 className="text-xl font-black text-slate-800 mb-2">Quiz Generator</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6 italic">Powered by StudentsAi Pro</p>

        {showGuide && (
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in slide-in-from-top-2">
            <h4 className="text-xs font-black text-slate-800 mb-2 uppercase tracking-wider">Qanday ishlatiladi?</h4>
            <ul className="text-[11px] text-slate-500 space-y-2 font-medium">
              <li>1. Matnni (PDF yoki Word'dan) nusxalab bu yerga joylang.</li>
              <li>2. #savol yoki variantlarni alohida qatorlarda yozing.</li>
              <li>3. "Yaratish" tugmasini bosing va AI hammasini tahlil qiladi.</li>
            </ul>
          </div>
        )}

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savollar yoki matnni shu yerga kiriting..."
          className="w-full h-48 bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-sm leading-relaxed"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-4 bg-[#2563EB] text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          {loading ? 'AI TAHLIL QILMOQDA...' : <><i className="fas fa-magic"></i> <span>GENERATSIYA QILISH</span></>}
        </button>
      </div>

      {result && result.quiz && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Natija ({result.quiz.length})</h3>
            <button className="text-blue-600 text-[10px] font-black uppercase">Hammasini saqlash</button>
          </div>
          {result.quiz.map((q: any, i: number) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm animate-in slide-in-from-bottom-2">
              <div className="font-bold text-slate-800 text-sm mb-3 leading-snug">{i+1}. {q.question}</div>
              <div className="flex items-center space-x-2 bg-green-50 p-2.5 rounded-xl border border-green-100">
                <i className="fas fa-check-circle text-green-500 text-xs"></i>
                <span className="text-[10px] font-black text-green-700 uppercase">Javob: {q.correct_answer}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCreatorView;
