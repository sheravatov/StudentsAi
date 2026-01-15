
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: 'fa-house', label: 'Asosiy' },
    { id: 'quiz', icon: 'fa-bolt', label: 'Quiz AI' },
    { id: 'cert', icon: 'fa-certificate', label: 'Sertifikat' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-3 flex justify-between items-center z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center space-y-1 transition-all ${activeTab === tab.id ? 'text-[#2563EB]' : 'text-slate-400'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-50' : 'bg-transparent'}`}>
            <i className={`fas ${tab.icon} text-lg`}></i>
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
