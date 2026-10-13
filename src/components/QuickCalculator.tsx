import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { Calculator, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface QuickCalculatorProps {
  language: Language;
}

const TABLE_PRESETS = [
  { label: '0', val: 0 },
  { label: '1/2', val: 0.5 },
  { label: '√2/2', val: Math.SQRT2 / 2 },
  { label: '√3/2', val: Math.sqrt(3) / 2 },
  { label: '1', val: 1 },
  { label: '−1/2', val: -0.5 },
  { label: '−√2/2', val: -Math.SQRT2 / 2 },
  { label: '−√3/2', val: -Math.sqrt(3) / 2 },
  { label: '−1', val: -1 },
  { label: '√3/3', val: Math.sqrt(3) / 3 },
  { label: '√3', val: Math.sqrt(3) },
  { label: '−√3/3', val: -Math.sqrt(3) / 3 },
  { label: '−√3', val: -Math.sqrt(3) },
];

export const QuickCalculator: React.FC<QuickCalculatorProps> = ({ language }) => {
  const [fn, setFn] = useState<'arcsin' | 'arccos' | 'arctg' | 'arcctg'>('arcsin');
  const [inputVal, setInputVal] = useState<number>(0.5);

  const getExactLabel = () => {
    // Exact symbolic matchers
    const eps = 0.005;
    if (fn === 'arcsin') {
      if (inputVal < -1 - eps || inputVal > 1 + eps) return { valid: false, error: '|a| > 1' };
      if (Math.abs(inputVal - 0) < eps) return { valid: true, exact: '0', deg: '0°', step: 'sin 0 = 0, 0 ∈ [−π/2; π/2]' };
      if (Math.abs(inputVal - 0.5) < eps) return { valid: true, exact: 'π/6', deg: '30°', step: 'sin(π/6) = 1/2' };
      if (Math.abs(inputVal - Math.SQRT2 / 2) < eps) return { valid: true, exact: 'π/4', deg: '45°', step: 'sin(π/4) = √2/2' };
      if (Math.abs(inputVal - Math.sqrt(3) / 2) < eps) return { valid: true, exact: 'π/3', deg: '60°', step: 'sin(π/3) = √3/2' };
      if (Math.abs(inputVal - 1) < eps) return { valid: true, exact: 'π/2', deg: '90°', step: 'sin(π/2) = 1' };
      if (Math.abs(inputVal - -0.5) < eps) return { valid: true, exact: '−π/6', deg: '−30°', step: 'arcsin(−x) = −arcsin x = −π/6' };
      if (Math.abs(inputVal - -Math.SQRT2 / 2) < eps) return { valid: true, exact: '−π/4', deg: '−45°', step: 'arcsin(−x) = −arcsin x = −π/4' };
      if (Math.abs(inputVal - -Math.sqrt(3) / 2) < eps) return { valid: true, exact: '−π/3', deg: '−60°', step: 'arcsin(−x) = −arcsin x = −π/3' };
      if (Math.abs(inputVal - -1) < eps) return { valid: true, exact: '−π/2', deg: '−90°', step: 'sin(−π/2) = −1' };
      const rad = Math.asin(inputVal);
      return { valid: true, exact: `${(rad / Math.PI).toFixed(3)}π`, deg: `${((rad * 180) / Math.PI).toFixed(1)}°`, step: 'Numerical estimate' };
    }

    if (fn === 'arccos') {
      if (inputVal < -1 - eps || inputVal > 1 + eps) return { valid: false, error: '|a| > 1' };
      if (Math.abs(inputVal - 1) < eps) return { valid: true, exact: '0', deg: '0°', step: 'cos 0 = 1' };
      if (Math.abs(inputVal - Math.sqrt(3) / 2) < eps) return { valid: true, exact: 'π/6', deg: '30°', step: 'cos(π/6) = √3/2' };
      if (Math.abs(inputVal - Math.SQRT2 / 2) < eps) return { valid: true, exact: 'π/4', deg: '45°', step: 'cos(π/4) = √2/2' };
      if (Math.abs(inputVal - 0.5) < eps) return { valid: true, exact: 'π/3', deg: '60°', step: 'cos(π/3) = 1/2' };
      if (Math.abs(inputVal - 0) < eps) return { valid: true, exact: 'π/2', deg: '90°', step: 'cos(π/2) = 0' };
      if (Math.abs(inputVal - -0.5) < eps) return { valid: true, exact: '2π/3', deg: '120°', step: 'π − arccos(1/2) = π − π/3 = 2π/3' };
      if (Math.abs(inputVal - -Math.SQRT2 / 2) < eps) return { valid: true, exact: '3π/4', deg: '135°', step: 'π − π/4 = 3π/4' };
      if (Math.abs(inputVal - -Math.sqrt(3) / 2) < eps) return { valid: true, exact: '5π/6', deg: '150°', step: 'π − π/6 = 5π/6' };
      if (Math.abs(inputVal - -1) < eps) return { valid: true, exact: 'π', deg: '180°', step: 'cos π = −1' };
      const rad = Math.acos(inputVal);
      return { valid: true, exact: `${(rad / Math.PI).toFixed(3)}π`, deg: `${((rad * 180) / Math.PI).toFixed(1)}°`, step: 'Numerical estimate' };
    }

    if (fn === 'arctg') {
      if (Math.abs(inputVal - 0) < eps) return { valid: true, exact: '0', deg: '0°', step: 'tg 0 = 0' };
      if (Math.abs(inputVal - Math.sqrt(3) / 3) < eps) return { valid: true, exact: 'π/6', deg: '30°', step: 'tg(π/6) = √3/3' };
      if (Math.abs(inputVal - 1) < eps) return { valid: true, exact: 'π/4', deg: '45°', step: 'tg(π/4) = 1' };
      if (Math.abs(inputVal - Math.sqrt(3)) < eps) return { valid: true, exact: 'π/3', deg: '60°', step: 'tg(π/3) = √3' };
      if (Math.abs(inputVal - -Math.sqrt(3) / 3) < eps) return { valid: true, exact: '−π/6', deg: '−30°', step: 'arctg(−x) = −arctg x = −π/6' };
      if (Math.abs(inputVal - -1) < eps) return { valid: true, exact: '−π/4', deg: '−45°', step: 'arctg(−1) = −π/4' };
      if (Math.abs(inputVal - -Math.sqrt(3)) < eps) return { valid: true, exact: '−π/3', deg: '−60°', step: 'arctg(−√3) = −π/3' };
      const rad = Math.atan(inputVal);
      return { valid: true, exact: `${(rad / Math.PI).toFixed(3)}π`, deg: `${((rad * 180) / Math.PI).toFixed(1)}°`, step: 'Numerical estimate' };
    }

    // arcctg
    if (Math.abs(inputVal - Math.sqrt(3)) < eps) return { valid: true, exact: 'π/6', deg: '30°', step: 'ctg(π/6) = √3' };
    if (Math.abs(inputVal - 1) < eps) return { valid: true, exact: 'π/4', deg: '45°', step: 'ctg(π/4) = 1' };
    if (Math.abs(inputVal - Math.sqrt(3) / 3) < eps) return { valid: true, exact: 'π/3', deg: '60°', step: 'ctg(π/3) = √3/3' };
    if (Math.abs(inputVal - 0) < eps) return { valid: true, exact: 'π/2', deg: '90°', step: 'ctg(π/2) = 0' };
    if (Math.abs(inputVal - -Math.sqrt(3) / 3) < eps) return { valid: true, exact: '2π/3', deg: '120°', step: 'π − π/3 = 2π/3' };
    if (Math.abs(inputVal - -1) < eps) return { valid: true, exact: '3π/4', deg: '135°', step: 'π − π/4 = 3π/4' };
    if (Math.abs(inputVal - -Math.sqrt(3)) < eps) return { valid: true, exact: '5π/6', deg: '150°', step: 'π − π/6 = 5π/6' };
    const rad = Math.PI / 2 - Math.atan(inputVal);
    return { valid: true, exact: `${(rad / Math.PI).toFixed(3)}π`, deg: `${((rad * 180) / Math.PI).toFixed(1)}°`, step: 'Numerical estimate' };
  };

  const result = getExactLabel();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            {language === 'en' ? 'Exact Value Quick Evaluator' : 'Нақты мәндерді жылдам есептеу'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Evaluate exact inverse trig angles with domain validation'
              : 'Анықталу облысы мен басты мәнді тексеру арқылы бұрышты табу'}
          </p>
        </div>

        {/* Function selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['arcsin', 'arccos', 'arctg', 'arcctg'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFn(f)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                fn === f
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Input Presets */}
      <div className="mb-4">
        <span className="text-xs text-slate-400 font-semibold block mb-2">
          {language === 'en' ? 'Select Standard Value (a):' : 'Стандарт кестелік мәнді таңдаңыз (a):'}
        </span>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {TABLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInputVal(p.val)}
              className={`py-1.5 px-2 rounded-lg text-xs font-mono border text-center transition-all ${
                Math.abs(inputVal - p.val) < 0.005
                  ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output Display Card */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            {language === 'en' ? 'Expression:' : 'Өрнек:'}
          </span>
          <div className="text-xl font-mono font-bold text-indigo-300">
            {fn}({inputVal.toFixed(2)})
          </div>
        </div>

        {result.valid ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-0.5">{language === 'en' ? 'Exact Radians:' : 'Радианда:'}</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">{result.exact}</span>
            </div>
            <div className="text-right pl-4 border-l border-slate-800">
              <span className="text-xs text-slate-400 block mb-0.5">{language === 'en' ? 'Degrees:' : 'Градуста:'}</span>
              <span className="text-lg font-mono text-slate-200">{result.deg}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold bg-rose-950/40 px-3 py-2 rounded-xl border border-rose-500/30">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {language === 'en'
                ? `Undefined! ${result.error}. Argument must be in [−1; 1].`
                : `Анықталмаған! Аргумент [−1; 1] аралығында болуы тиіс.`}
            </span>
          </div>
        )}
      </div>

      {result.valid && result.step && (
        <div className="mt-3 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>
            {language === 'en' ? 'Reasoning:' : 'Негіздеме:'}{' '}
            <strong className="text-slate-200 font-mono">{result.step}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
