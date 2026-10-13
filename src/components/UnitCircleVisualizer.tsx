import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { Eye, Info, RefreshCw, Zap } from 'lucide-react';

interface UnitCircleVisualizerProps {
  language: Language;
  initialFunction?: 'arcsin' | 'arccos' | 'arctg' | 'arcctg';
}

const PRESET_ANGLES = [
  { label: '0', val: 0, sin: '0', cos: '1', tan: '0', cot: 'undefined' },
  { label: 'π/6 (30°)', val: Math.PI / 6, sin: '1/2', cos: '√3/2', tan: '√3/3', cot: '√3' },
  { label: 'π/4 (45°)', val: Math.PI / 4, sin: '√2/2', cos: '√2/2', tan: '1', cot: '1' },
  { label: 'π/3 (60°)', val: Math.PI / 3, sin: '√3/2', cos: '1/2', tan: '√3', cot: '√3/3' },
  { label: 'π/2 (90°)', val: Math.PI / 2, sin: '1', cos: '0', tan: 'undefined', cot: '0' },
  { label: '2π/3 (120°)', val: (2 * Math.PI) / 3, sin: '√3/2', cos: '−1/2', tan: '−√3', cot: '−√3/3' },
  { label: '3π/4 (135°)', val: (3 * Math.PI) / 4, sin: '√2/2', cos: '−√2/2', tan: '−1', cot: '−1' },
  { label: '5π/6 (150°)', val: (5 * Math.PI) / 6, sin: '1/2', cos: '−√3/2', tan: '−√3/3', cot: '−√3' },
  { label: 'π (180°)', val: Math.PI, sin: '0', cos: '−1', tan: '0', cot: 'undefined' },
  { label: '−π/6 (−30°)', val: -Math.PI / 6, sin: '−1/2', cos: '√3/2', tan: '−√3/3', cot: '−√3' },
  { label: '−π/4 (−45°)', val: -Math.PI / 4, sin: '−√2/2', cos: '√2/2', tan: '−1', cot: '−1' },
  { label: '−π/3 (−60°)', val: -Math.PI / 3, sin: '−√3/2', cos: '1/2', tan: '−√3', cot: '−√3/3' },
  { label: '−π/2 (−90°)', val: -Math.PI / 2, sin: '−1', cos: '0', tan: 'undefined', cot: '0' },
];

export const UnitCircleVisualizer: React.FC<UnitCircleVisualizerProps> = ({
  language,
  initialFunction = 'arcsin',
}) => {
  const [selectedFunction, setSelectedFunction] = useState<'arcsin' | 'arccos' | 'arctg' | 'arcctg'>(initialFunction);
  const [angle, setAngle] = useState<number>(Math.PI / 6);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [showHelperLines, setShowHelperLines] = useState<boolean>(true);

  const cx = 200;
  const cy = 200;
  const r = 140;

  const xCoord = cx + r * Math.cos(angle);
  const yCoord = cy - r * Math.sin(angle); // Screen SVG Y is flipped

  const sinVal = Math.sin(angle);
  const cosVal = Math.cos(angle);
  const tanVal = Math.tan(angle);
  const cotVal = 1 / Math.tan(angle);

  // Check if current angle is in valid range of selected function
  const inRange =
    selectedFunction === 'arcsin'
      ? angle >= -Math.PI / 2 - 0.001 && angle <= Math.PI / 2 + 0.001
      : selectedFunction === 'arccos'
      ? angle >= -0.001 && angle <= Math.PI + 0.001
      : selectedFunction === 'arctg'
      ? angle > -Math.PI / 2 + 0.001 && angle < Math.PI / 2 - 0.001
      : angle > 0.001 && angle < Math.PI - 0.001;

  // Principal value corresponding to the current trig value
  const getPrincipalAngle = () => {
    if (selectedFunction === 'arcsin') return Math.asin(sinVal);
    if (selectedFunction === 'arccos') return Math.acos(cosVal);
    if (selectedFunction === 'arctg') return Math.atan(tanVal);
    return Math.PI / 2 - Math.atan(cotVal);
  };

  const principal = getPrincipalAngle();
  const principalX = cx + r * Math.cos(principal);
  const principalY = cy - r * Math.sin(principal);

  const formatAngleLabel = (rad: number) => {
    const deg = Math.round((rad * 180) / Math.PI);
    return `${(rad / Math.PI).toFixed(2)}π (${deg}°)`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            {language === 'en' ? 'Interactive Unit Circle: Restricted Arcs' : 'Интерактивті бірлік шеңбер: Шектелген доғалар'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Explore why inverse functions require restricted ranges [−π/2; π/2] or [0; π]'
              : 'Кері тригонометриялық функциялардың бірмәнді болу шарттарын көрнекі зерттеу'}
          </p>
        </div>

        {/* Function selector pills */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['arcsin', 'arccos', 'arctg', 'arcctg'] as const).map((fn) => {
            const active = selectedFunction === fn;
            return (
              <button
                key={fn}
                onClick={() => setSelectedFunction(fn)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  active
                    ? fn === 'arcsin'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : fn === 'arccos'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : fn === 'arctg'
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Circle */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-[360px] h-auto select-none bg-slate-950/60 rounded-2xl border border-slate-800/80 p-2"
          >
            <defs>
              <linearGradient id="arcsinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="arccosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid & Axes */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="20" y1={cy} x2="380" y2={cy} stroke="#475569" strokeWidth="1.5" />
            <line x1={cx} y1="20" x2={cx} y2="380" stroke="#475569" strokeWidth="1.5" />
            <text x="385" y={cy + 4} fill="#94a3b8" fontSize="11" textAnchor="start">x</text>
            <text x={cx} y="15" fill="#94a3b8" fontSize="11" textAnchor="middle">y</text>

            {/* RESTRICTED ARCS HIGHLIGHTS */}
            {/* arcsin: [−π/2, π/2] -> Right semicircle (x >= 0, angle from -π/2 to π/2) */}
            {selectedFunction === 'arcsin' && (
              <path
                d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="7"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            )}

            {/* arccos: [0, π] -> Upper semicircle (y >= 0, angle from 0 to π) */}
            {selectedFunction === 'arccos' && (
              <path
                d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx - r} ${cy}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="7"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            )}

            {/* arctg: (−π/2, π/2) open right semicircle & tangent line x = 1 */}
            {selectedFunction === 'arctg' && (
              <>
                <path
                  d={`M ${cx} ${cy - r + 3} A ${r} ${r} 0 0 1 ${cx} ${cy + r - 3}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="6"
                  strokeDasharray="6 3"
                />
                {/* Tangent line at x = 1 */}
                <line x1={cx + r} y1="30" x2={cx + r} y2="370" stroke="#f59e0b" strokeWidth="2.5" />
                <text x={cx + r + 6} y="40" fill="#f59e0b" fontSize="11" fontWeight="bold">x = 1 (tg)</text>
              </>
            )}

            {/* arcctg: (0, π) open top semicircle & cotangent line y = 1 */}
            {selectedFunction === 'arcctg' && (
              <>
                <path
                  d={`M ${cx + r - 3} ${cy} A ${r} ${r} 0 0 0 ${cx - r + 3} ${cy}`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="6"
                  strokeDasharray="6 3"
                />
                {/* Cotangent line at y = 1 */}
                <line x1="30" y1={cy - r} x2="370" y2={cy - r} stroke="#a855f7" strokeWidth="2.5" />
                <text x="40" y={cy - r - 8} fill="#a855f7" fontSize="11" fontWeight="bold">y = 1 (ctg)</text>
              </>
            )}

            {/* Helper Lines (Sine / Cosine bars) */}
            {showHelperLines && (
              <>
                {/* Cosine line (on x-axis) */}
                <line x1={cx} y1={cy} x2={xCoord} y2={cy} stroke="#10b981" strokeWidth="3" />
                {/* Sine line (vertical from x-axis to point) */}
                <line x1={xCoord} y1={cy} x2={xCoord} y2={yCoord} stroke="#3b82f6" strokeWidth="3" strokeDasharray="2 2" />
                {/* Radial ray to selected angle */}
                <line x1={cx} y1={cy} x2={xCoord} y2={yCoord} stroke="#94a3b8" strokeWidth="2" />
              </>
            )}

            {/* Current point */}
            <circle
              cx={xCoord}
              cy={yCoord}
              r="7"
              fill={inRange ? '#22c55e' : '#f43f5e'}
              stroke="#ffffff"
              strokeWidth="2.5"
              className="cursor-pointer"
            />

            {/* If angle is out of range, show principal root point on valid arc */}
            {!inRange && (
              <>
                <line
                  x1={cx}
                  y1={cy}
                  x2={principalX}
                  y2={principalY}
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={principalX}
                  cy={principalY}
                  r="8"
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <text x={principalX + 10} y={principalY - 10} fill="#38bdf8" fontSize="11" fontWeight="bold">
                  Principal / Басты мән
                </text>
              </>
            )}

            {/* Unit Labels */}
            <text x={cx + r + 8} y={cy + 15} fill="#64748b" fontSize="10">1</text>
            <text x={cx - r - 15} y={cy + 15} fill="#64748b" fontSize="10">−1</text>
            <text x={cx - 15} y={cy - r - 6} fill="#64748b" fontSize="10">1</text>
            <text x={cx - 15} y={cy + r + 15} fill="#64748b" fontSize="10">−1</text>
          </svg>

          {/* Quick angle range status badge */}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                inRange ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${inRange ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              {inRange
                ? language === 'en'
                  ? 'Inside Restricted Range (Valid Inverse)'
                  : 'Шектелген мәндер облысында (Дұрыс мән)'
                : language === 'en'
                ? 'Outside Range! Reduced to Principal Arc'
                : 'Аралықтан тыс! Басты доғаға келтіріледі'}
            </span>
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="lg:col-span-5 space-y-4">
          {/* Angle Slider */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
              <span>{language === 'en' ? 'Drag Angle θ:' : 'θ бұрышын таңдау:'}</span>
              <span className="font-mono text-indigo-400 text-sm">{formatAngleLabel(angle)}</span>
            </div>
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step={0.01}
              value={angle}
              onChange={(e) => setAngle(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>−π (−180°)</span>
              <span>0</span>
              <span>+π (180°)</span>
            </div>
          </div>

          {/* Preset Standard Table Values */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {language === 'en' ? 'Standard Exact Angles:' : 'Кестелік стандарт бұрыштар:'}
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto pr-1">
              {PRESET_ANGLES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setAngle(preset.val)}
                  className={`text-[11px] font-mono py-1 px-1.5 rounded-lg border text-center transition-all ${
                    Math.abs(angle - preset.val) < 0.05
                      ? 'bg-indigo-600/40 border-indigo-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {preset.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Current Values Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="text-slate-400 font-semibold flex items-center justify-between">
              <span>{language === 'en' ? 'Trigonometric Values' : 'Тригонометриялық мәндер'}</span>
              <button
                onClick={() => setShowCoordinates(!showCoordinates)}
                className="text-slate-500 hover:text-slate-300 p-1"
                title="Toggle coordinates"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-200 font-mono">
              <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/60">
                <span className="text-emerald-400 font-bold">cos θ:</span> {cosVal.toFixed(3)}
              </div>
              <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/60">
                <span className="text-blue-400 font-bold">sin θ:</span> {sinVal.toFixed(3)}
              </div>
              <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/60">
                <span className="text-amber-400 font-bold">tg θ:</span> {Math.abs(cosVal) < 0.001 ? 'undef' : tanVal.toFixed(3)}
              </div>
              <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/60">
                <span className="text-purple-400 font-bold">ctg θ:</span> {Math.abs(sinVal) < 0.001 ? 'undef' : cotVal.toFixed(3)}
              </div>
            </div>

            {/* Deep Insight for Current Selection */}
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-900/40">
              {selectedFunction === 'arcsin' && (
                <div>
                  <strong className="text-blue-400">arcsin({sinVal.toFixed(2)}): </strong>
                  {language === 'en' ? (
                    <>
                      Returns <strong>{(principal / Math.PI).toFixed(2)}π</strong> in{' '}
                      <span className="text-blue-300 font-mono">[−π/2; π/2]</span>. Notice that even if θ = 5π/6 (150°),
                      arcsin(sin(5π/6)) = arcsin(1/2) = <strong>π/6 (30°)</strong>!
                    </>
                  ) : (
                    <>
                      Нәтижесі: <strong>{(principal / Math.PI).toFixed(2)}π</strong>, ол{' '}
                      <span className="text-blue-300 font-mono">[−π/2; π/2]</span> аралығында. Бұрыш 5π/6 (150°) болса да,
                      arcsin(1/2) = <strong>π/6 (30°)</strong> болады!
                    </>
                  )}
                </div>
              )}
              {selectedFunction === 'arccos' && (
                <div>
                  <strong className="text-emerald-400">arccos({cosVal.toFixed(2)}): </strong>
                  {language === 'en' ? (
                    <>
                      Returns <strong>{(principal / Math.PI).toFixed(2)}π</strong> in{' '}
                      <span className="text-emerald-300 font-mono">[0; π]</span>. Negative cosines always yield angles in Quadrant II.
                    </>
                  ) : (
                    <>
                      Нәтижесі: <strong>{(principal / Math.PI).toFixed(2)}π</strong>, ол{' '}
                      <span className="text-emerald-300 font-mono">[0; π]</span> аралығында. Теріс косинус бұрышты II ширекке ауыстырады.
                    </>
                  )}
                </div>
              )}
              {selectedFunction === 'arctg' && (
                <div>
                  <strong className="text-amber-400">arctg({tanVal.toFixed(2)}): </strong>
                  {language === 'en' ? (
                    <>
                      Bounded inside open interval{' '}
                      <span className="text-amber-300 font-mono">(−π/2; π/2)</span>. As x → ∞, arctg x → π/2.
                    </>
                  ) : (
                    <>
                      <span className="text-amber-300 font-mono">(−π/2; π/2)</span> ашық аралығымен шектелген. x → ∞ болғанда, arctg x → π/2 ұмтылады.
                    </>
                  )}
                </div>
              )}
              {selectedFunction === 'arcctg' && (
                <div>
                  <strong className="text-purple-400">arcctg: </strong>
                  {language === 'en' ? (
                    <>
                      Bounded inside open interval{' '}
                      <span className="text-purple-300 font-mono">(0; π)</span>. Always strictly positive.
                    </>
                  ) : (
                    <>
                      <span className="text-purple-300 font-mono">(0; π)</span> ашық аралығында жатыр. Мәні әрдайым оң сан.
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
