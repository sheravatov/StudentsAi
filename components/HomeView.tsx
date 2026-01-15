
import React from 'react';
import { UserProfile } from '../types';

interface HomeViewProps {
  user: UserProfile;
  motivation: string;
}

const HomeView: React.FC<HomeViewProps> = ({ user, motivation }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* AI Motivation Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[32px] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <i className="fas fa-brain animate-pulse"></i>
            <span className="text-[10px] font-black uppercase tracking-[2px] opacity-70">AI MOTIVATSIYA</span>
          </div>
          <p className="text-lg font-bold leading-snug">
            {motivation || "Bilim olishdan to'xtama, bugun kechagidan yaxshiroq bo'l!"}
          </p>
        </div>
        <i className="fas fa-bolt absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12"></i>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Ballaringiz</div>
          <div className="text-2xl font-black text-slate-800">{user.score}</div>
          <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Testlar</div>
          <div className="text-2xl font-black text-slate-800">{user.solved_quizzes}</div>
          <div className="mt-2 text-[10px] font-bold text-green-500">Top 5% ichida</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4 flex items-center">
          <i className="fas fa-user-circle mr-2 text-blue-500"></i> Profil Ma'lumotlari
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Username:</span>
            <span className="font-bold text-slate-700">{user.username}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">A'zo bo'lingan:</span>
            <span className="font-bold text-slate-700">{user.joined_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
