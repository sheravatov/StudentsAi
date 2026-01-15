
import React, { useState, useEffect } from 'react';
import { UserProfile, UserStatus, QuizPackage } from './types';
import Onboarding from './components/Onboarding';
import HomeView from './components/HomeView';
import QuizBotStylePlayer from './components/QuizBotStylePlayer';
import QuizCreatorView from './components/QuizCreatorView';
import CertificateView from './components/CertificateView';
import AiAssistantModal from './components/AiAssistantModal';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'cert'>('home');
  const [activeQuiz, setActiveQuiz] = useState<QuizPackage | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('students_ai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('students_ai_user', JSON.stringify(profile));
  };

  if (loading) return <Loader />;
  if (!user) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <header className="p-5 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-black text-[#2563EB] tracking-tighter uppercase">StudentsAi</h1>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Personal Assistant</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase leading-none">Reyting</div>
            <div className="text-sm font-black text-slate-800">#{user.rank}</div>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
             <i className="fas fa-crown text-xs"></i>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        {activeQuiz ? (
          <QuizBotStylePlayer 
            quiz={activeQuiz} 
            onCancel={() => setActiveQuiz(null)} 
          />
        ) : (
          <>
            {activeTab === 'home' && <HomeView user={user} onStartQuiz={(q) => setActiveQuiz(q)} />}
            {activeTab === 'quiz' && <QuizCreatorView />}
            {activeTab === 'cert' && <CertificateView subjects={[]} />}
          </>
        )}
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Floating AI Button */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#2563EB] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white animate-bounce-slow"
      >
        <i className="fas fa-robot text-xl"></i>
      </button>

      {isAiOpen && <AiAssistantModal user={user} onClose={() => setIsAiOpen(false)} />}
    </div>
  );
};

export default App;
