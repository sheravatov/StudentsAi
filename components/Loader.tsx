
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-brain text-blue-600 text-xl animate-pulse"></i>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mt-6">AI tahlil qilmoqda...</h3>
      <p className="text-slate-500 mt-2">Ushbu jarayon bir necha soniya vaqt olishi mumkin</p>
      
      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
