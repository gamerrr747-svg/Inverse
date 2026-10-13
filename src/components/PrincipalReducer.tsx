import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { Compass, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface PrincipalReducerProps {
  language: Language;
}

const REDUCER_PRESETS = [
  { func: 'arcsin', arg: '5π/6', argRad: (5 * Math.PI) / 6, range: '[−π/2; π/2]', result: 'π/6', explanationEn: '5π/6 > π/2 (outside range). But sin(5π/6) = sin(π − 5π/6) = sin(π/6). Since π/6 ∈ [−π/2; π/2], the answer is π/6.', explanationKk: '5π/6 > π/2 (мәндер облысынан тыс). sin(5π/6) = sin(π − 5π/6) = sin(π/6). π/6 ∈ [−π/2; π/2] болғандықтан, нәтиже π/6.' },
  { func: 'arccos', arg: '4π/3', argRad: (4 * Math.PI) / 3, range: '[0; π]', result: '2π/3', explanationEn: '4π/3 > π. But cos(4π/3) = cos(2π − 4π/3) = cos(2π/3). Since 2π/3 ∈ [0; π], the answer is 2π/3.', explanationKk: '4π/3 > π. cos(4π/3) = cos(2π − 4π/3) = cos(2π/3). 2π/3 ∈ [0; π] болғандықтан, нәтиже 2π/3.' },
  { func: 'arcsin', arg: '2π/3', argRad: (2 * Math.PI) / 3, range: '[−π/2; π/2]', result: 'π/3', explanationEn: '2π/3 > π/2. sin(2π/3) = sin(π − 2π/3) = sin(π/3). π/3 is inside range, so answer is π/3.', explanationKk: '2π/3 > π/2. sin(2π/3) = sin(π/3). π/3 ∈ [−π/2; π/2] болғандықтан, жауабы π/3.' },
  { func: 'arctg', arg: '5π/6', argRad: (5 * Math.PI) / 6, range: '(−π/2; π/2)', result: '−π/6', explanationEn: 'tg is π-periodic: tg(5π/6) = tg(5π/6 − π) = tg(−π/6). Since −π/6 ∈ (−π/2; π/2), the answer is −π/6.', explanationKk: 'tg периоды π: tg(5π/6) = tg(5π/6 − π) = tg(−π/6). −π/6 ∈ (−π/2; π/2) болғандықтан, жауабы −π/6.' },
  { func: 'arcsin', arg: '3 (rad)', argRad: 3, range: '[−π/2; π/2]', result: 'π − 3', explanationEn: '3 rad ≈ 171.9° is in Quadrant II. π ≈ 3.1416, so π − 3 ≈ 0.1416 ∈ [−π/2; π/2]. Answer is π − 3.', explanationKk: '3 радиан II ширекте орналасқан. sin 3 = sin(π − 3). π − 3 ≈ 0.1416 ∈ [−π/2; π/2], сондықтан жауабы: π − 3.' },
  { func: 'arccos', arg: '5 (rad)', argRad: 5, range: '[0; π]', result: '2π − 5', explanationEn: '5 rad ≈ 286.5° is in Quadrant IV. cos 5 = cos(2π − 5). 2π − 5 ≈ 6.283 − 5 = 1.283 ∈ [0; π]. Answer is 2π − 5.', explanationKk: '5 радиан IV ширекте. cos 5 = cos(2π − 5). 2π − 5 ≈ 1.28 ∈ [0; π], сондықтан жауабы: 2π − 5.' },
];

export const PrincipalReducer: React.FC<PrincipalReducerProps> = ({ language }) => {
  const [selectedCase, setSelectedCase] = useState(REDUCER_PRESETS[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            {language === 'en'
              ? 'Principal Range Reduction Tool'
              : 'Басты аралыққа келтіру құралы'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Why arcsin(sin x) ≠ x when x is outside [−π/2; π/2]'
              : 'Неге бұрыш басты аралықтан тыс болса, arcsin(sin x) ≠ x болады?'}
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {REDUCER_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCase(p)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedCase.arg === p.arg && selectedCase.func === p.func
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.func}({p.arg})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Input Expression & Comparison */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
              {language === 'en' ? 'Expression to Simplify:' : 'Ықшамдалатын өрнек:'}
            </div>
            <div className="text-xl font-mono font-bold text-white mb-2">
              {selectedCase.func}({selectedCase.func === 'arcsin' ? 'sin' : selectedCase.func === 'arccos' ? 'cos' : 'tg'}({selectedCase.arg}))
            </div>

            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <strong>{language === 'en' ? 'Common Mistake:' : 'Жиі кездесетін қате:'} </strong>
                {language === 'en'
                  ? `Writing directly = ${selectedCase.arg}! This fails because ${selectedCase.arg} is outside the range ${selectedCase.range}.`
                  : `Бірден = ${selectedCase.arg} деп жазу! Бұл қате, себебі ${selectedCase.arg} мәні ${selectedCase.range} аралығына кірмейді.`}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <span className="font-semibold">{language === 'en' ? 'Exact Simplified Answer:' : 'Дұрыс ықшамдалған мән:'}</span>
            <span className="text-base font-mono font-bold text-white bg-emerald-600/50 px-2.5 py-0.5 rounded border border-emerald-400">
              {selectedCase.result}
            </span>
          </div>
        </div>

        {/* Right: Step-by-Step Derivation */}
        <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {language === 'en' ? 'Mathematical Reduction Logic:' : 'Математикалық келтіру қадамдары:'}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-sans">
            {language === 'en' ? selectedCase.explanationEn : selectedCase.explanationKk}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 font-mono">
            <span>Range: {selectedCase.range}</span>
            <span className="text-indigo-400">
              {language === 'en' ? 'Principal branch rule' : 'Басты мәндер ережесі'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
