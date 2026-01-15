
import React, { useState, useEffect } from 'react';
import { QuizPackage } from '../types';

interface QuizBotStylePlayerProps {
  quiz: QuizPackage;
  onCancel: () => void;
}

const QuizBotStylePlayer: React.FC<QuizBotStylePlayerProps> = ({ quiz, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<{correct: number, wrong: number}>({correct: 0, wrong: 0});

  const q = quiz.questions[currentIdx];

  const handleSelect = (key: string) => {
    if (selected) return;
    setSelected(key);
    
    if (key === q.correct_answer) {
      setResults(prev => ({...prev, correct: prev.correct + 1}));
    } else {
      setResults(prev => ({...prev, wrong: prev.wrong + 1}));
    }

    setTimeout(() => setShowExplanation(true), 600);
  };

  const next = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      alert(`Test tugadi! Natija: ${results.correct} to'g'ri, ${results.wrong} xato.`);
      onCancel();
    }
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <button onClick={onCancel} className="text-rose-500 font-bold text-xs flex items-center">
          <i className="fas fa-times-circle mr-1.5"></i> Chiqish
        </button>
        <div className="flex items-center space-x-3">
          <div className="text-xs font-black text-green-600">{results.correct}</div>
          <div className="w-px h-3 bg-slate-200"></div>
          <div className="text-xs font-black text-rose-500">{results.wrong}</div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentIdx + 1}/{quiz.questions.length}</div>
      </div>

      <div className="space-y-4">
        {/* Question Bubble - Telegram Style */}
        <div className="flex justify-start">
          <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 max-w-[90%]">
            <p className="font-bold text-slate-800 text-[15px] leading-relaxed">{q.question}</p>
          </div>
        </div>

        {/* Options - Transparent with distinctive buttons */}
        <div className="space-y-2 mt-4">
          {Object.entries(q.options).map(([key, val]) => (
            <button 
              key={key}
              onClick={() => handleSelect(key)}
              disabled={!!selected}
              className={`w-full p-4 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between ${
                selected 
                  ? key === q.correct_answer 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : selected === key 
                      ? 'bg-rose-50 border-rose-500 text-rose-700' 
                      : 'bg-white border-slate-50 text-slate-300'
                  : 'bg-white border-white text-slate-600 shadow-sm hover:border-blue-100'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 text-xs ${selected === key ? 'bg-transparent' : 'bg-slate-50'}`}>{key}</span>
                <span className="text-sm">{val}</span>
              </div>
              {selected && key === q.correct_answer && <i className="fas fa-check-circle text-green-500"></i>}
              {selected === key && key !== q.correct_answer && <i className="fas fa-times-circle text-rose-500"></i>}
            </button>
          ))}
        </div>

        {/* Explanation Bubble */}
        {showExplanation && (
          <div className="flex justify-start animate-in zoom-in-95 duration-300">
            <div className="bg-[#2563EB] p-5 rounded-3xl rounded-tl-none text-white shadow-xl max-w-[85%]">
              <div className="flex items-center space-x-2 mb-2 opacity-70">
                <i className="fas fa-lightbulb text-[10px]"></i>
                <span className="text-[9px] font-black uppercase tracking-widest">StudentsAi Izohi</span>
              </div>
              <p className="text-xs font-medium leading-relaxed italic">{q.explanation}</p>
              <button 
                onClick={next}
                className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all"
              >
                Keyingisi <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizBotStylePlayer;
