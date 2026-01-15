
import React, { useState } from 'react';
import { CertSubject } from '../types';

interface AdminPanelProps {
  subjects: CertSubject[];
  setSubjects: (s: any) => void;
}

const AdminPanelView: React.FC<AdminPanelProps> = ({ subjects, setSubjects }) => {
  const [newSubject, setNewSubject] = useState('');
  const [mandatoryChannels, setMandatoryChannels] = useState(['@quizpilot_news', '@edu_portal']);

  const addSubject = () => {
    if (!newSubject) return;
    setSubjects([...subjects, {
      id: Math.random().toString(),
      name: newSubject,
      icon: 'fa-book',
      total_questions: 0,
      questions: []
    }]);
    setNewSubject('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-rose-500 p-6 rounded-[32px] text-white flex items-center justify-between shadow-xl shadow-rose-100">
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">Admin Panel</h2>
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">/admin control room</p>
        </div>
        <i className="fas fa-user-shield text-3xl opacity-20"></i>
      </div>

      {/* Subject Management */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4">Milliy Sertifikat Fanlari</h3>
        <div className="flex space-x-2 mb-4">
          <input 
            type="text" 
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Yangi fan nomi..." 
            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={addSubject} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-sm">Qo'shish</button>
        </div>
        <div className="space-y-2">
          {subjects.map(s => (
            <div key={s.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-700 text-sm">{s.name}</span>
              <button className="text-rose-500 hover:text-rose-700 transition-colors"><i className="fas fa-trash-alt text-xs"></i></button>
            </div>
          ))}
        </div>
      </div>

      {/* User Control Simulation */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4">Foydalanuvchilarni Boshqarish</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="User ID yoki Username yozing..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-500"
          />
          <div className="flex space-x-2">
            <button className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-black text-xs">BLOKLASH</button>
            <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-black text-xs">BLOKDAN OCHISH</button>
          </div>
        </div>
      </div>

      {/* Mandatory Channels */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4">Majburiy Kanallar</h3>
        <div className="space-y-2">
          {mandatoryChannels.map((c, i) => (
            <div key={i} className="p-3 bg-blue-50 rounded-xl flex justify-between items-center text-blue-700 font-bold text-xs">
              <span>{c}</span>
              <i className="fas fa-times opacity-50"></i>
            </div>
          ))}
          <button className="w-full border-2 border-dashed border-slate-200 p-3 rounded-xl text-slate-400 font-black text-[10px] hover:bg-slate-50 transition-all">+ KANAL QO'SHISH</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelView;
