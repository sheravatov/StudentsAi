
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-slate-800">Quiz Generator</h2>
          <button 
            onClick={() => setShowGuide(true)}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <i className="fas fa-question text-xs"></i>
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savol va variantlarni shu yerga yozing..."
          className="w-full h-48 bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-sm"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center space-x-2"
        >
          {loading ? 'AI TAHLIL QILMOQDA...' : <><i className="fas fa-magic"></i> <span>YARATISH</span></>}
        </button>
      </div>

      {showGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] p-8 max-w-sm w-full animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-4">Qadam-baqadam:</h3>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li className="flex items-start"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-3 mt-0.5">1</span> Matn ichida #savol belgisini ishlating yoki ixtiyoriy matn yozing.</li>
              <li className="flex items-start"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-3 mt-0.5">2</span> Variantlarni A, B, C, D harflari bilan belgilang.</li>
              <li className="flex items-start"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-3 mt-0.5">3</span> To'g'ri javobni matn oxirida ko'rsating.</li>
            </ul>
            <button onClick={() => setShowGuide(false)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black">Tushunarli</button>
          </div>
        </div>
      )}

      {result && result.quiz && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Natija</h3>
          {result.quiz.map((q: any, i: number) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <div className="font-bold text-slate-800">{i+1}. {q.question}</div>
              <div className="mt-2 text-xs text-green-600 font-bold uppercase tracking-wider">To'g'ri javob: {q.correct_answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizCreatorView;
