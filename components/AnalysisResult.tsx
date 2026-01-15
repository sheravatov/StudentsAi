
import React from 'react';
import { StudentAnalysis } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface AnalysisResultProps {
  data: StudentAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const chartData = [
    { name: 'To\'g\'ri', value: data.summary.accuracy },
    { name: 'Xato', value: 100 - data.summary.accuracy },
  ];

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Umumiy Aniqlik</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-4xl font-black text-slate-800 mt-4">{data.summary.accuracy}%</div>
          <p className="text-slate-500 text-sm mt-2">O'rtacha ko'rsatkich</p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Kuchli va Bo'sh mavzular</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Kuchli mavzular</span>
                {data.summary.strong_topics.map((topic, i) => (
                  <div key={i} className="flex items-center text-slate-700 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {topic}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Bo'sh mavzular</span>
                {data.summary.weak_topics.map((topic, i) => (
                  <div key={i} className="flex items-center text-slate-700 bg-rose-50 px-3 py-2 rounded-lg border border-rose-100">
                    <i className="fas fa-exclamation-circle text-rose-500 mr-2"></i>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-2xl text-white shadow-lg shadow-blue-100">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-lightbulb mr-2"></i> Tavsiyalar
            </h3>
            <ul className="space-y-3">
              {data.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start text-blue-50 text-sm">
                  <span className="mr-3 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
