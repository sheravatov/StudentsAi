
import React from 'react';
import { QuizPackage } from '../types';

interface AdminDashboardProps {
  quizzes: QuizPackage[];
  onCreate: () => void;
  onDelete: (id: string) => void;
  onPlay: (pkg: QuizPackage) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ quizzes, onCreate, onDelete, onPlay }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <i className="fas fa-file-invoice text-xl"></i>
          </div>
          <div className="text-3xl font-black text-slate-900">{quizzes.length}</div>
          <div className="text-slate-500 font-bold text-sm uppercase tracking-wide">Jami Testlar</div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <i className="fas fa-users text-xl"></i>
          </div>
          <div className="text-3xl font-black text-slate-900">0</div>
          <div className="text-slate-500 font-bold text-sm uppercase tracking-wide">Faol Talabalar</div>
        </div>

        <button 
          onClick={onCreate}
          className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 flex flex-col items-start hover:bg-blue-700 transition-all group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-plus text-xl"></i>
          </div>
          <div className="text-xl font-black">Yangi Test Yaratish</div>
          <div className="text-blue-100 text-sm opacity-80">AI yoki qo'lda qo'shish</div>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900">Testlar Kutubxonasi</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                placeholder="Qidirish..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
                <th className="px-8 py-4">Test Nomi</th>
                <th className="px-8 py-4">Fan / Til</th>
                <th className="px-8 py-4">Savollar</th>
                <th className="px-8 py-4">Sana</th>
                <th className="px-8 py-4">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {quizzes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">
                    Hozircha testlar mavjud emas. Yangi test yarating!
                  </td>
                </tr>
              ) : quizzes.map(q => (
                <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-black text-slate-800">{q.title}</div>
                    <div className={`text-[10px] font-black uppercase tracking-wider ${q.difficulty === 'hard' ? 'text-rose-500' : 'text-emerald-500'}`}>{q.difficulty}</div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">
                    {q.subject} <span className="mx-2 text-slate-300">•</span> {q.language.toUpperCase()}
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-700">
                      {q.questions.length} TA
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs text-slate-400 font-medium">
                    {new Date(q.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => onPlay(q)} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                        <i className="fas fa-play text-xs"></i>
                      </button>
                      <button onClick={() => onDelete(q.id)} className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
