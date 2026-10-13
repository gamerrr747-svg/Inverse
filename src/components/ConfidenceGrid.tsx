import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { LEARNING_OBJECTIVES } from '../data/curriculumData';
import { Star, CheckCircle, BarChart3 } from 'lucide-react';

interface ConfidenceGridProps {
  language: Language;
}

export const ConfidenceGrid: React.FC<ConfidenceGridProps> = ({ language }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({
    '10.2.3.3': 4,
    '10.2.3.4': 4,
    '10.2.3.5': 3,
    '10.2.3.6': 3,
    '10.2.3.7': 4,
  });

  const handleRate = (code: string, value: number) => {
    setRatings((prev) => ({ ...prev, [code]: value }));
  };

  const totalScore = Object.values(ratings).reduce((a, b) => a + b, 0);
  const maxScore = LEARNING_OBJECTIVES.length * 5;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            {language === 'en'
              ? 'Unit Confidence Self-Assessment (1–5 Scale)'
              : 'Бөлім бойынша өзін-өзі бағалау (1–5 балдық шкала)'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Rate your readiness for the Section Summative Assessment (СОР) across all 5 learning objectives'
              : 'Бөлім бойынша жиынтық бағалау (БЖБ/СОР) алдында 5 оқу мақсаты бойынша дайындығыңызды бағалаңыз'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">{language === 'en' ? 'Readiness Score:' : 'Дайындық деңгейі:'}</span>
          <span className="font-bold text-indigo-400 text-sm font-mono">{percentage}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {LEARNING_OBJECTIVES.map((lo) => {
          const currentRating = ratings[lo.code] || 0;
          return (
            <div
              key={lo.code}
              className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[11px] font-bold border border-indigo-800">
                    {lo.code}
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  {language === 'en' ? lo.en : lo.kk}
                </p>
              </div>

              {/* 5-Star Rating Buttons */}
              <div className="flex items-center gap-1 shrink-0 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(lo.code, star)}
                    className="p-1 hover:scale-110 transition-transform"
                    title={`Rate ${star} / 5`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= currentRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-slate-400 ml-1.5 w-4">
                  {currentRating}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
