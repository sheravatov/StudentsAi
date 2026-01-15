
import React from 'react';
import { QuizPackage, UserResult } from '../types';

interface StudentHubProps {
  quizzes: QuizPackage[];
  results: UserResult[];
  onPlay: (pkg: QuizPackage) => void;
}

const StudentHub: React.FC<StudentHubProps> = ({ quizzes, results, onPlay }) => {
  return (
    <div className="space-y-12">
      <div className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-blue-100">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-black mb-4">O'quv Akademiyasiga xush kelibsiz!</h2>
          <p className="text-slate-400 font-medium mb-8 leading-relaxed">
            Siz uchun tayyorlangan testlarni yeching, bilimingizni tahlil qiling va Milliy Sertifikat imtihonlariga tayyorlaning.
          </p>
          <div className="flex space-x-8">
            <div>
              <div className="text-2xl font-black">{results.length}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bajarilgan</div>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <div className="text-2xl font-black">{results.length > 0 ? (results.reduce((acc, r) => acc + (r.score/r.total), 0) / results.length * 100).toFixed(0) : 0}%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">O'rtacha natija</div>
            </div>
          </div>
        </div>
        <i className="fas fa-graduation-cap absolute right-10 bottom-0 text-[200px] text-slate-800 opacity-40 -mb-10"></i>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 px-2">Barcha Testlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.length === 0 ? (
            <div className="col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold italic">
              Hozircha ochiq testlar mavjud emas.
            </div>
          ) : quizzes.map(q => (
            <div key={q.id} className="bg-white p-8 rounded-[40px] shadow-lg shadow-slate-100 border border-slate-100 flex flex-col hover:scale-[1.02] transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className="fas fa-book-open text-xl"></i>
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{q.language.toUpperCase()}</div>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">{q.title}</h4>
              <p className="text-slate-500 text-sm font-bold mb-8">{q.subject} • {q.questions.length} Savollar</p>
              
              <button 
                onClick={() => onPlay(q)}
                className="mt-auto bg-slate-100 py-4 rounded-2xl font-black text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center space-x-2"
              >
                <span>Boshlash</span>
                <i className="fas fa-play text-[10px]"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHub;
