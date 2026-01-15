
import React from 'react';
import { AppRole, Language } from '../types';

interface SidebarProps {
  role: AppRole;
  setRole: (r: AppRole) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onNavigate: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, setRole, lang, setLang, onNavigate }) => {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 hidden xl:flex shadow-sm">
      <div className="p-8">
        <div className="flex items-center space-x-3 text-blue-600 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <i className="fas fa-paper-plane text-xl"></i>
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900">QuizPilot</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <button 
          onClick={onNavigate}
          className="w-full flex items-center space-x-3 p-4 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all group"
        >
          <i className="fas fa-house w-6 text-xl opacity-60 group-hover:opacity-100"></i>
          <span className="font-bold">Asosiy Panel</span>
        </button>

        <div className="pt-8 pb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] px-4 mb-4">Mening Sozlamalarim</p>
          
          <div className="px-4 mb-6">
            <label className="text-xs font-bold text-slate-500 block mb-2">Platforma Tili</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
              {(['uz', 'ru', 'en'] as Language[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`py-1.5 rounded-lg text-xs font-black uppercase transition-all ${lang === l ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4">
            <label className="text-xs font-bold text-slate-500 block mb-2">Foydalanuvchi Rol</label>
            <div className="flex bg-slate-900 p-1.5 rounded-2xl">
              <button 
                onClick={() => setRole(AppRole.ADMIN)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${role === AppRole.ADMIN ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
              >
                ADMIN
              </button>
              <button 
                onClick={() => setRole(AppRole.STUDENT)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${role === AppRole.STUDENT ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
              >
                STUDENT
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
            <i className="fas fa-user-shield"></i>
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 uppercase">Pro User</div>
            <div className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Premium Account</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
