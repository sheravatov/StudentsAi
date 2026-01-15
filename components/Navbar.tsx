
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: 'fa-house', label: 'Asosiy' },
    { id: 'quiz', icon: 'fa-magic', label: 'Quiz AI' },
    { id: 'cert', icon: 'fa-certificate', label: 'Sertifikat' },
    { id: 'admin', icon: 'fa-user-shield', label: 'Admin' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center space-y-1 transition-all ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <i className={`fas ${tab.icon} text-lg`}></i>
          <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          {activeTab === tab.id && <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
