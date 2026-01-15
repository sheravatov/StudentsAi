
import React from 'react';
import { QuizQuestion, RequestType } from '../types';

interface QuizResultProps {
  data: { quiz?: QuizQuestion[], status?: string };
  type: RequestType;
}

const QuizResult: React.FC<QuizResultProps> = ({ data, type }) => {
  const quiz = data.quiz || [];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Generatsiya qilingan testlar</h2>
          <p className="text-slate-500 text-sm">Jami: {quiz.length} ta savol</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <i className="fas fa-download"></i>
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.map((q, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
                  {q.question}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(q.options).map(([key, val]) => (
                    <div 
                      key={key}
                      className={`p-4 rounded-xl border flex items-center space-x-4 ${q.correct_answer === key ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${q.correct_answer === key ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {key}
                      </span>
                      <span className="text-slate-700">{val}</span>
                      {q.correct_answer === key && <i className="fas fa-check-circle text-green-500 ml-auto"></i>}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                  <span className="font-bold text-slate-600 block mb-1">Izoh:</span>
                  <p className="text-slate-500 italic">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
