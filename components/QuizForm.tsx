
import React, { useState } from 'react';
import { RequestType } from '../types';

interface QuizFormProps {
  type: RequestType;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    subject: 'Matematika',
    difficulty: 'medium',
    question_count: 10,
    topic: '',
    content: '',
    level: 'Milliy Sertifikat'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
        <i className="fas fa-sliders-h mr-3 text-blue-500"></i>
        Parametrlarni sozlash
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Fan</label>
            <select 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option>Matematika</option>
              <option>Tarix</option>
              <option>Ona tili va adabiyot</option>
              <option>Kimyo</option>
              <option>Biologiya</option>
              <option>Ingliz tili</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Savollar soni</label>
            <input 
              type="number"
              name="question_count"
              min="1"
              max="50"
              value={formData.question_count}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {type === RequestType.CERTIFICATE_QUIZ && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Daraja</label>
              <select 
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option>Milliy Sertifikat</option>
                <option>CEFR B1</option>
                <option>CEFR B2</option>
                <option>CEFR C1</option>
                <option>Abituriyent</option>
              </select>
            </div>
          )}

          {(type === RequestType.ADMIN_REQUEST || type === RequestType.CERTIFICATE_QUIZ) && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Murakkablik</label>
              <select 
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="easy">Oson</option>
                <option value="medium">O'rta</option>
                <option value="hard">Qiyin</option>
              </select>
            </div>
          )}

          {(type === RequestType.ADMIN_REQUEST || type === RequestType.CERTIFICATE_QUIZ) && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mavzu (ixtiyoriy)</label>
              <input 
                type="text"
                name="topic"
                placeholder="Masalan: Logarifmlar, Amir Temur davri..."
                value={formData.topic}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          )}

          {type === RequestType.DOCUMENT_PARSE && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Hujjat matni (Raw text)</label>
              <textarea 
                name="content"
                rows={8}
                placeholder="PDF yoki Word'dan nusxa olingan matnni shu yerga joylang..."
                value={formData.content}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          )}

          {type === RequestType.STUDENT_ANALYSIS && (
            <div className="md:col-span-2 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
              <i className="fas fa-info-circle mr-2"></i>
              Tizim ushbu talabaning oxirgi ishlagan testlari tarixini tahlil qiladi va natijalarni generatsiya qiladi.
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-all"
          >
            Bekor qilish
          </button>
          <button 
            type="submit" 
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center"
          >
            <i className="fas fa-magic mr-2"></i> Generatsiya qilish
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
