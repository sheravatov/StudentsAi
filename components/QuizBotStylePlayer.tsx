
import React, { useState } from 'react';
import { QuizPackage } from '../types';

interface QuizBotStylePlayerProps {
  quiz: QuizPackage;
  onCancel: () => void;
}

const QuizBotStylePlayer: React.FC<QuizBotStylePlayerProps> = ({ quiz, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = quiz.questions[currentIdx];

  const handleSelect = (key: string) => {
    if (selected) return;
    setSelected(key);
    setTimeout(() => setShowExplanation(true), 500);
  };

  const next = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      onCancel();
    }
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-lg mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onCancel} className="text-slate-400 font-bold text-sm"><i className="fas fa-times mr-1"></i> To'xtatish</button>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Savol {currentIdx + 1}/{quiz.questions.length}</div>
      </div>

      <div className="space-y-4">
        {/* Question Bubble */}
        <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 inline-block max-w-full">
          <p className="font-bold text-slate-800 leading-relaxed">{q.question}</p>
        </div>

        {/* Options Bubbles */}
        <div className="space-y-2 pt-4">
          {Object.entries(q.options).map(([key, val]) => (
            <button 
              key={key}
              onClick={() => handleSelect(key)}
              disabled={!!selected}
              className={`w-full p-4 rounded-2xl text-left font-bold transition-all flex items-center justify-between border-2 ${
                selected === key 
                  ? key === q.correct_answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'
                  : selected && key === q.correct_answer 
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-white border-white text-slate-600 shadow-sm'
              }`}
            >
              <span>{val}</span>
              {selected === key && (
                <i className={`fas ${key === q.correct_answer ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
              )}
            </button>
          ))}
        </div>

        {/* AI Explanation Bubble */}
        {showExplanation && (
          <div className="bg-blue-600 p-6 rounded-3xl rounded-tr-none text-white shadow-xl animate-in slide-in-from-left-4 duration-500">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fas fa-robot text-xs opacity-70"></i>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Izoh</span>
            </div>
            <p className="text-sm font-medium italic opacity-90">{q.explanation}</p>
            <button 
              onClick={next}
              className="mt-4 w-full bg-white text-blue-600 py-3 rounded-xl font-black text-xs hover:bg-blue-50 transition-colors"
            >
              KEYINGI SAVOL <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizBotStylePlayer;
