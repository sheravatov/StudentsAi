
import React, { useState } from 'react';
import { QuizPackage, UserResult } from '../types';

interface QuizPlayerProps {
  quiz: QuizPackage;
  onFinish: (res: UserResult) => void;
  onCancel: () => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onFinish, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const q = quiz.questions[currentStep];

  const handleSelect = (opt: string) => {
    setAnswers({ ...answers, [q.id]: opt });
  };

  const next = () => {
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach(ques => {
      if (answers[ques.id] === ques.correct_answer) correctCount++;
    });
    return correctCount;
  };

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto text-center py-20 bg-white rounded-[50px] shadow-2xl shadow-blue-50 border border-slate-100 px-10">
        <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
          <i className="fas fa-trophy"></i>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">Tabriklaymiz!</h2>
        <p className="text-slate-500 font-bold mb-8 italic">Test muvaffaqiyatli yakunlandi.</p>
        
        <div className="flex justify-center space-x-12 mb-12">
          <div>
            <div className="text-5xl font-black text-slate-900">{score}</div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">To'g'ri</div>
          </div>
          <div className="w-px h-16 bg-slate-100"></div>
          <div>
            <div className="text-5xl font-black text-slate-900">{quiz.questions.length - score}</div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Xato</div>
          </div>
        </div>

        <button 
          onClick={() => onFinish({ quiz_id: quiz.id, score, total: quiz.questions.length, date: new Date().toISOString() })}
          className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black shadow-2xl shadow-blue-200 hover:scale-105 transition-all"
        >
          NATIJANI SAQLASH
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <button onClick={onCancel} className="text-slate-400 font-bold hover:text-slate-800 transition-colors">
          <i className="fas fa-times mr-2"></i> Chiqish
        </button>
        <div className="bg-white px-6 py-2 rounded-2xl border border-slate-100 text-sm font-black text-slate-700 shadow-sm">
          {currentStep + 1} / {quiz.questions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-100 border border-slate-100 relative overflow-hidden">
             <div className="text-xs font-black text-blue-600 uppercase tracking-[3px] mb-4">Savol matni</div>
             <h3 className="text-2xl font-black text-slate-900 leading-snug">
               {q.question}
             </h3>
             {q.image_url && (
               <img src={q.image_url} alt="Question Illust" className="mt-8 rounded-3xl w-full h-48 object-cover border border-slate-100" />
             )}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(q.options).map(([key, text]) => (
            <button 
              key={key}
              onClick={() => handleSelect(key)}
              className={`w-full p-6 rounded-3xl text-left border-2 transition-all flex items-center space-x-6 group ${answers[q.id] === key ? 'border-blue-600 bg-blue-50 shadow-xl shadow-blue-50' : 'border-white bg-white hover:border-slate-100 shadow-sm'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${answers[q.id] === key ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                {key}
              </div>
              <div className={`font-bold text-lg ${answers[q.id] === key ? 'text-blue-900' : 'text-slate-700'}`}>
                {text}
              </div>
            </button>
          ))}

          <div className="pt-8">
            <button 
              onClick={next}
              disabled={!answers[q.id]}
              className={`w-full py-6 rounded-[30px] font-black text-lg shadow-2xl transition-all ${!answers[q.id] ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white shadow-slate-200 hover:scale-[1.02] active:scale-95'}`}
            >
              {currentStep === quiz.questions.length - 1 ? "YAKUNLASH" : "KEYINGI SAVOL"} <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
