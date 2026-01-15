
import React from 'react';
import { AppRole, RequestType } from '../types';

interface DashboardViewProps {
  role: AppRole;
  onAction: (type: RequestType) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ role, onAction }) => {
  const adminTools = [
    {
      type: RequestType.DOCUMENT_PARSE,
      title: "Hujjatni tahlil qilish",
      desc: "PDF yoki Docx matnidan avtomatik testlar yaratish",
      icon: "fa-file-alt",
      color: "bg-blue-500"
    },
    {
      type: RequestType.ADMIN_REQUEST,
      title: "Yangi test yaratish",
      desc: "Fan va mavzu bo'yicha maxsus testlar generatsiyasi",
      icon: "fa-plus-circle",
      color: "bg-purple-500"
    },
    {
      type: RequestType.CERTIFICATE_QUIZ,
      title: "Milliy Sertifikat",
      desc: "Davlat imtihon standartlari asosida testlar",
      icon: "fa-certificate",
      color: "bg-amber-500"
    }
  ];

  const studentTools = [
    {
      type: RequestType.CERTIFICATE_QUIZ,
      title: "Imtihonga tayyorgarlik",
      desc: "Darajangizga mos testlarni yeching",
      icon: "fa-graduation-cap",
      color: "bg-green-500"
    },
    {
      type: RequestType.STUDENT_ANALYSIS,
      title: "Bilim tahlili",
      desc: "O'zlashtirish va kamchiliklarni tekshiring",
      icon: "fa-chart-line",
      color: "bg-rose-500"
    }
  ];

  const tools = role === AppRole.ADMIN ? adminTools : studentTools;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => onAction(tool.type)}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-${tool.color.split('-')[1]}-100`}>
            <i className={`fas ${tool.icon} text-xl`}></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
            {tool.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {tool.desc}
          </p>
        </button>
      ))}

      <div className="md:col-span-2 lg:col-span-3 mt-8">
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">QuizPilot Pro AI imkoniyatlari</h2>
            <p className="text-slate-400 max-w-lg mb-6">
              Bizning AI o'zbek ta'lim standartlari asosida murakkab matematik, tarixiy va filologik savollarni soniyalar ichida yarata oladi.
            </p>
            <div className="flex space-x-4">
               <span className="flex items-center text-sm"><i className="fas fa-check-circle text-green-400 mr-2"></i> 99% Aniqlik</span>
               <span className="flex items-center text-sm"><i className="fas fa-check-circle text-green-400 mr-2"></i> Milliy Sertifikat</span>
               <span className="flex items-center text-sm"><i className="fas fa-check-circle text-green-400 mr-2"></i> Tezkor Tahlil</span>
            </div>
          </div>
          <i className="fas fa-robot absolute right-10 bottom-0 text-9xl text-slate-800 opacity-50 -mb-10"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
