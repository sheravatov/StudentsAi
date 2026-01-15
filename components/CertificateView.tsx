
import React from 'react';
import { CertSubject } from '../types';

interface CertificateViewProps {
  subjects: CertSubject[];
}

const CertificateView: React.FC<CertificateViewProps> = ({ subjects }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
        <h2 className="text-2xl font-black mb-2 relative z-10">Milliy Sertifikat</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest relative z-10">Tayyorgarlik Markazi</p>
        <i className="fas fa-graduation-cap absolute -right-6 -bottom-6 text-[150px] opacity-10"></i>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {subjects.map(subject => (
          <button key={subject.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className={`fas ${subject.icon} text-lg`}></i>
              </div>
              <div className="text-left">
                <div className="font-black text-slate-800">{subject.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">{subject.total_questions} ta savol</div>
              </div>
            </div>
            <i className="fas fa-chevron-right text-slate-200 group-hover:text-blue-500 transition-colors"></i>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
          <i className="fas fa-chart-pie text-blue-500 mb-3 text-xl"></i>
          <span className="text-[10px] font-black uppercase text-slate-400">Statistika</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
          <i className="fas fa-life-ring text-orange-500 mb-3 text-xl"></i>
          <span className="text-[10px] font-black uppercase text-slate-400">Yordam</span>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
