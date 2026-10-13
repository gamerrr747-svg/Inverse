import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { Triangle, BookOpen, Check } from 'lucide-react';

interface TriangleVisualizerProps {
  language: Language;
}

const PRESET_TRIANGLES = [
  { name: '3 - 4 - 5', opp: 3, adj: 4, hyp: 5, expr: 'arcsin(3/5)' },
  { name: '5 - 12 - 13', opp: 5, adj: 12, hyp: 13, expr: 'arcsin(5/13)' },
  { name: '1 - 1 - √2', opp: 1, adj: 1, hyp: Math.SQRT2, expr: 'arcsin(√2/2)', hypStr: '√2' },
  { name: '1 - √3 - 2', opp: 1, adj: Math.sqrt(3), hyp: 2, expr: 'arcsin(1/2)', adjStr: '√3' },
];

export const TriangleVisualizer: React.FC<TriangleVisualizerProps> = ({ language }) => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_TRIANGLES[0]);
  const [activeFunc, setActiveFunc] = useState<'sin' | 'cos' | 'tg' | 'ctg'>('cos');

  const { opp, adj, hyp, hypStr, adjStr } = selectedPreset;

  const displayHyp = hypStr || hyp.toString();
  const displayAdj = adjStr || adj.toString();
  const displayOpp = opp.toString();

  // Trigonometric outputs for angle alpha = arcsin(opp/hyp)
  const sinVal = (opp / hyp).toFixed(3);
  const cosVal = (adj / hyp).toFixed(3);
  const tanVal = (opp / adj).toFixed(3);
  const cotVal = (adj / opp).toFixed(3);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Triangle className="w-5 h-5 text-emerald-400" />
            {language === 'en'
              ? 'Right-Triangle & Pythagorean Visualizer (Lesson 4)'
              : 'Тікбұрышты үшбұрыш және Пифагор тәсілі (4-сабақ)'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Find trig values of inverse functions by constructing reference right triangles'
              : 'Кері функцияның аргументі бойынша тікбұрышты үшбұрыш құрып, қалған мәндерді табу'}
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {PRESET_TRIANGLES.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPreset(t)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedPreset.name === t.name
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Right Triangle */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 240" className="w-full max-w-[280px] bg-slate-950 rounded-2xl border border-slate-800 p-2">
            {/* Triangle Coordinates */}
            {/* Base = adj, Height = opp, Angle at origin (30, 200) */}
            <polygon
              points="40,200 260,200 260,50"
              fill="rgba(16, 185, 129, 0.12)"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Right angle marker at (260, 200) */}
            <polyline
              points="242,200 242,182 260,182"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* Angle α arc at (40, 200) */}
            <path
              d="M 80 200 A 40 40 0 0 0 74 175"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="88" y="190" fill="#38bdf8" fontSize="13" fontWeight="bold">α</text>

            {/* Side Labels */}
            {/* Adjacent (Bottom) */}
            <text x="150" y="222" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">
              {language === 'en' ? 'Adjacent' : 'Іргелес'} = {displayAdj}
            </text>

            {/* Opposite (Right) */}
            <text x="272" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold">
              {language === 'en' ? 'Opposite' : 'Қарсы'} = {displayOpp}
            </text>

            {/* Hypotenuse (Diagonal) */}
            <text x="135" y="110" fill="#a78bfa" fontSize="13" fontWeight="bold" textAnchor="middle">
              {language === 'en' ? 'Hypotenuse' : 'Гипотенуза'} = {displayHyp}
            </text>
          </svg>

          <div className="mt-3 text-xs text-slate-400 font-mono text-center">
            {language === 'en' ? 'Pythagorean Check: ' : 'Пифагор теңдігі: '}
            <span className="text-emerald-400">{displayAdj}² + {displayOpp}² = {displayHyp}²</span>
          </div>
        </div>

        {/* Calculation Cards */}
        <div className="md:col-span-6 space-y-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1 font-semibold">
              {language === 'en' ? 'Let α be the angle:' : 'α бұрышы болсын:'}
            </div>
            <div className="text-base font-mono font-bold text-indigo-300">
              α = {selectedPreset.expr}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {language === 'en'
                ? `Therefore, sin α = ${displayOpp}/${displayHyp} and α ∈ [0; π/2].`
                : `Демек, sin α = ${displayOpp}/${displayHyp} және α ∈ [0; π/2].`}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5 font-semibold">cos α:</span>
              <div className="font-mono text-emerald-400 text-sm font-bold">
                {displayAdj} / {displayHyp}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">≈ {cosVal}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5 font-semibold">tg α:</span>
              <div className="font-mono text-amber-400 text-sm font-bold">
                {displayOpp} / {displayAdj}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">≈ {tanVal}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5 font-semibold">ctg α:</span>
              <div className="font-mono text-purple-400 text-sm font-bold">
                {displayAdj} / {displayOpp}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">≈ {cotVal}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-0.5 font-semibold">Formula rule:</span>
              <div className="font-mono text-blue-300 text-[11px]">
                cos(arcsin a) = √(1 − a²)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
