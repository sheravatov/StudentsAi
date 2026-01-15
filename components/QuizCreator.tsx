
import React, { useState } from 'react';
import { RequestType, QuizPackage, Language } from '../types';

interface QuizCreatorProps {
  onSubmit: (type: RequestType, data: any) => void;
  onCancel: () => void;
  onManualAdd: (pkg: QuizPackage) => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ onSubmit, onCancel, onManualAdd }) => {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [activeTab, setActiveTab] = useState<RequestType>(RequestType.ADMIN_REQUEST);
  
  // AI Fields
  const [subject, setSubject] = useState('Matematika');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [count, setCount] = useState(10);
  const [topic, setTopic] = useState('');
  const [rawText, setRawText] = useState('');

  // Manual Fields
  const [manualTitle, setManualTitle] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: { A: '', B: '', C: '', D: '' },
      correct_answer: 'A',
      explanation: ''
    }]);
  };

  const updateManualQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field.includes('options.')) {
      const opt = field.split('.')[1];
      updated[index].options[opt] = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleManualSubmit = () => {
    if (!manualTitle || questions.length === 0) return alert("Ma'lumotlarni to'liq kiriting");
    const pkg: QuizPackage = {
      id: Math.random().toString(36).substr(2, 9),
      title: manualTitle,
      subject: "Custom",
      language: 'uz',
      questions: questions.map(q => ({ ...q, id: Math.random().toString(36).substr(2, 5) })),
      created_at: new Date().toISOString(),
      difficulty: 'medium'
    };
    onManualAdd(pkg);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-50 border border-slate-100 overflow-hidden">
        <div className="flex bg-slate-50 p-2 m-6 rounded-3xl">
          <button 
            onClick={() => setMode('ai')}
            className={`flex-1 py-4 rounded-2xl font-black transition-all ${mode === 'ai' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'}`}
          >
            <i className="fas fa-robot mr-2"></i> AI ENGINE
          </button>
          <button 
            onClick={() => setMode('manual')}
            className={`flex-1 py-4 rounded-2xl font-black transition-all ${mode === 'manual' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400'}`}
          >
            <i className="fas fa-edit mr-2"></i> MANUAL QO'SHISH
          </button>
        </div>

        {mode === 'ai' ? (
          <div className="p-10 pt-4">
            <div className="flex space-x-4 mb-10 overflow-x-auto pb-4">
              {[RequestType.ADMIN_REQUEST, RequestType.DOCUMENT_PARSE, RequestType.CERTIFICATE_QUIZ].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border-2 ${activeTab === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
                >
                  {t === RequestType.ADMIN_REQUEST ? "Mavzu bo'yicha" : t === RequestType.DOCUMENT_PARSE ? "Faylni tahlil qilish" : "Milliy Sertifikat"}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Fan Yo'nalishi</label>
                  <select 
                    value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 font-bold transition-all"
                  >
                    <option>Matematika</option>
                    <option>Tarix</option>
                    <option>Ona tili</option>
                    <option>Kimyo</option>
                    <option>Biologiya</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Savollar Soni</label>
                  <input 
                    type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 font-bold"
                  />
                </div>
              </div>

              {activeTab === RequestType.DOCUMENT_PARSE ? (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Fayl Matni (PDF/Word matnini nusxalang)</label>
                  <textarea 
                    placeholder="Savollar raqamlangan yoki #### bilan ajratilgan bo'lishi mumkin..."
                    value={rawText} onChange={(e) => setRawText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-5 py-4 h-64 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-sm leading-relaxed"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Mavzu yoki Kalit so'zlar</label>
                  <input 
                    type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                    placeholder="Masalan: Ikkinchi jahon urushi, Logarifmlar..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 font-bold"
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                <button onClick={onCancel} className="text-slate-400 font-black hover:text-slate-600 transition-all">Bekor qilish</button>
                <button 
                  onClick={() => onSubmit(activeTab, { subject, difficulty, question_count: count, topic, content: rawText })}
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
                >
                  <i className="fas fa-bolt mr-2"></i> GENERATSIYA
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 pt-4 space-y-8">
             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Test Nomi</label>
                <input 
                  type="text" value={manualTitle} onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 font-bold"
                />
             </div>

             <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative group">
                    <div className="absolute -left-3 top-6 w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center font-black shadow-sm">{idx+1}</div>
                    <div className="ml-8 space-y-4">
                      <textarea 
                        placeholder="Savol matni..."
                        className="w-full bg-white border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                        value={q.question} onChange={(e) => updateManualQuestion(idx, 'question', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        {['A', 'B', 'C', 'D'].map(opt => (
                          <div key={opt} className="flex items-center space-x-2">
                             <input 
                                type="radio" name={`correct_${idx}`} checked={q.correct_answer === opt}
                                onChange={() => updateManualQuestion(idx, 'correct_answer', opt)}
                             />
                             <input 
                                placeholder={`Variant ${opt}`}
                                className="flex-1 bg-white border border-slate-100 rounded-xl px-3 py-2 text-xs"
                                value={q.options[opt]} onChange={(e) => updateManualQuestion(idx, `options.${opt}`, e.target.value)}
                             />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleAddQuestion}
                  className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-black hover:bg-slate-50 transition-all"
                >
                  <i className="fas fa-plus-circle mr-2"></i> SAVOL QO'SHISH
                </button>
             </div>

             <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                <button onClick={onCancel} className="text-slate-400 font-black hover:text-slate-600 transition-all">Bekor qilish</button>
                <button 
                  onClick={handleManualSubmit}
                  className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:scale-105 transition-all"
                >
                  SAQLASH
                </button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCreator;
