
import React, { useState, useEffect } from 'react';
import { UserProfile, UserStatus, QuizPackage } from './types';
import Onboarding from './components/Onboarding';
import HomeView from './components/HomeView';
import QuizBotStylePlayer from './components/QuizBotStylePlayer';
import QuizCreatorView from './components/QuizCreatorView';
import AiAssistantModal from './components/AiAssistantModal';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'leaderboard'>('home');
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
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pb-20">
      <header className="p-5 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-black text-blue-600 tracking-tighter uppercase">StudentsAi</h1>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-100">
          <span className="text-xs font-black text-blue-700">{user.score} XP</span>
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
            #{user.rank}
          </div>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        {activeQuiz ? (
          <QuizBotStylePlayer quiz={activeQuiz} onCancel={() => setActiveQuiz(null)} />
        ) : (
          <>
            {activeTab === 'home' && <HomeView user={user} onStartQuiz={(q) => setActiveQuiz(q)} />}
            {activeTab === 'quiz' && <QuizCreatorView />}
          </>
        )}
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white"
      >
        <i className="fas fa-robot text-xl"></i>
      </button>

      {isAiOpen && <AiAssistantModal user={user} onClose={() => setIsAiOpen(false)} />}
    </div>
  );
};

export default App;
