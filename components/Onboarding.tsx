
import React, { useState } from 'react';
import { UserProfile, UserStatus } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    full_name: '',
    status: UserStatus.STUDENT,
    phone: '',
    location: ''
  });

  const next = () => {
    if (step < 3) setStep(step + 1);
    else {
      onComplete({
        id: Date.now(),
        username: "@user",
        full_name: data.full_name,
        phone: data.phone,
        location: data.location,
        status: data.status,
        is_blocked: false,
        score: 0,
        solved_quizzes: 0,
        rank: 99,
        joined_date: new Date().toLocaleDateString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center items-center text-center">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl mb-8 shadow-xl">
        <i className="fas fa-graduation-cap"></i>
      </div>
      
      {step === 1 && (
        <div className="w-full max-w-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-800">Xush kelibsiz!</h2>
          <p className="text-slate-500 text-sm">StudentsAi yordamida bilimingizni oshiring. Ismingizni kiriting:</p>
          <input 
            type="text" 
            placeholder="Ism Familiya"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            value={data.full_name} onChange={e => setData({...data, full_name: e.target.value})}
          />
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-800">Siz kimsiz?</h2>
          <div className="grid grid-cols-1 gap-3">
            {[UserStatus.STUDENT, UserStatus.PUPIL, UserStatus.WORKER].map(s => (
              <button 
                key={s}
                onClick={() => setData({...data, status: s})}
                className={`py-4 rounded-2xl font-bold border-2 transition-all ${data.status === s ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-800">So'nggi qadam</h2>
          <p className="text-slate-500 text-sm italic">Telegram orqali telefon raqam va joylashuv ulashish (Simulyatsiya)</p>
          <div className="space-y-3">
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
              <i className="fas fa-phone"></i> <span>Raqamni ulashish</span>
            </button>
            <button className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
              <i className="fas fa-location-arrow"></i> <span>Joylashuvni ulashish</span>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={next}
        className="mt-12 w-full max-w-xs bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
      >
        {step === 3 ? "BOSHLASH" : "DAVOM ETISH"}
      </button>
    </div>
  );
};

export default Onboarding;
