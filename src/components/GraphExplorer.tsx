import React, { useState, useMemo } from 'react';
import { Language } from '../types/curriculum';
import { Sliders, RotateCcw, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface GraphExplorerProps {
  language: Language;
}

export const GraphExplorer: React.FC<GraphExplorerProps> = ({ language }) => {
  const [activeFunc, setActiveFunc] = useState<'arcsin' | 'arccos' | 'arctg' | 'arcctg'>('arcsin');
  const [showReflection, setShowReflection] = useState<boolean>(true);
  const [showIdentity, setShowIdentity] = useState<boolean>(false);
  const [showPoints, setShowPoints] = useState<boolean>(true);

  // Transformation parameters: y = a * f(b * (x - c)) + d
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(1);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);

  // SVG coordinate transformation
  // Math domain: x in [-3, 3], y in [-3, 3] or customized based on function
  const width = 500;
  const height = 400;
  const xMin = -3.5;
  const xMax = 3.5;
  const yMin = -3.2;
  const yMax = 3.8;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  // Base function evaluator
  const evalBase = (fn: string, x: number): number | null => {
    switch (fn) {
      case 'arcsin':
        if (x < -1 || x > 1) return null;
        return Math.asin(x);
      case 'arccos':
        if (x < -1 || x > 1) return null;
        return Math.acos(x);
      case 'arctg':
        return Math.atan(x);
      case 'arcctg':
        return Math.PI / 2 - Math.atan(x);
      default:
        return null;
    }
  };

  // Transformed function evaluator
  const evalTransformed = (x: number): number | null => {
    const inner = b * (x - c);
    const baseVal = evalBase(activeFunc, inner);
    if (baseVal === null) return null;
    return a * baseVal + d;
  };

  // Forward trig function for reflection demonstration
  const evalForward = (fn: string, x: number): number | null => {
    switch (fn) {
      case 'arcsin':
        if (x < -Math.PI / 2 || x > Math.PI / 2) return null;
        return Math.sin(x);
      case 'arccos':
        if (x < 0 || x > Math.PI) return null;
        return Math.cos(x);
      case 'arctg':
        if (x <= -Math.PI / 2 || x >= Math.PI / 2) return null;
        return Math.tan(x);
      case 'arcctg':
        if (x <= 0 || x >= Math.PI) return null;
        return 1 / Math.tan(x);
      default:
        return null;
    }
  };

  // Generate SVG path for transformed function
  const mainPath = useMemo(() => {
    const points: string[] = [];
    const steps = 300;
    let isDrawing = false;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = evalTransformed(x);
      if (y !== null && !isNaN(y) && y >= yMin - 1 && y <= yMax + 1) {
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        if (!isDrawing) {
          points.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
          isDrawing = true;
        } else {
          points.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
      } else {
        isDrawing = false;
      }
    }
    return points.join(' ');
  }, [activeFunc, a, b, c, d]);

  // Generate path for forward trig function
  const forwardPath = useMemo(() => {
    if (!showReflection) return '';
    const points: string[] = [];
    const steps = 250;
    let isDrawing = false;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = evalForward(activeFunc, x);
      if (y !== null && !isNaN(y) && y >= yMin - 1 && y <= yMax + 1) {
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        if (!isDrawing) {
          points.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
          isDrawing = true;
        } else {
          points.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
      } else {
        isDrawing = false;
      }
    }
    return points.join(' ');
  }, [activeFunc, showReflection]);

  // Key points for active function (untransformed)
  const keyPoints = useMemo(() => {
    if (activeFunc === 'arcsin') {
      return [
        { x: -1, y: -Math.PI / 2, label: '(-1, -π/2)' },
        { x: -0.5, y: -Math.PI / 6, label: '(-1/2, -π/6)' },
        { x: 0, y: 0, label: '(0, 0)' },
        { x: 0.5, y: Math.PI / 6, label: '(1/2, π/6)' },
        { x: 1, y: Math.PI / 2, label: '(1, π/2)' },
      ];
    }
    if (activeFunc === 'arccos') {
      return [
        { x: -1, y: Math.PI, label: '(-1, π)' },
        { x: -0.5, y: (2 * Math.PI) / 3, label: '(-1/2, 2π/3)' },
        { x: 0, y: Math.PI / 2, label: '(0, π/2)' },
        { x: 0.5, y: Math.PI / 3, label: '(1/2, π/3)' },
        { x: 1, y: 0, label: '(1, 0)' },
      ];
    }
    if (activeFunc === 'arctg') {
      return [
        { x: -Math.sqrt(3), y: -Math.PI / 3, label: '(-√3, -π/3)' },
        { x: -1, y: -Math.PI / 4, label: '(-1, -π/4)' },
        { x: 0, y: 0, label: '(0, 0)' },
        { x: 1, y: Math.PI / 4, label: '(1, π/4)' },
        { x: Math.sqrt(3), y: Math.PI / 3, label: '(√3, π/3)' },
      ];
    }
    return [
      { x: -Math.sqrt(3), y: (5 * Math.PI) / 6, label: '(-√3, 5π/6)' },
      { x: -1, y: (3 * Math.PI) / 4, label: '(-1, 3π/4)' },
      { x: 0, y: Math.PI / 2, label: '(0, π/2)' },
      { x: 1, y: Math.PI / 4, label: '(1, π/4)' },
      { x: Math.sqrt(3), y: Math.PI / 6, label: '(√3, π/6)' },
    ];
  }, [activeFunc]);

  const resetTransforms = () => {
    setA(1);
    setB(1);
    setC(0);
    setD(0);
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'arcsin(2x-1)') {
      setActiveFunc('arcsin');
      setA(1);
      setB(2);
      setC(0.5);
      setD(0);
    } else if (presetName === '2arccos(x)+pi/2') {
      setActiveFunc('arccos');
      setA(2);
      setB(1);
      setC(0);
      setD(Math.PI / 2);
    } else if (presetName === '2arctgx') {
      setActiveFunc('arctg');
      setA(2);
      setB(1);
      setC(0);
      setD(0);
    } else if (presetName === 'identity') {
      setShowIdentity(true);
      resetTransforms();
    }
  };

  const isTransformed = a !== 1 || b !== 1 || c !== 0 || d !== 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            {language === 'en'
              ? 'Graph Studio & Transformation Explorer'
              : 'Графиктер және түрлендірулер шеберханасы'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Investigate reflection across y = x, asymptotic behavior, domain, range, and transformations'
              : 'y = x түзуіне қатысты симметрия, асимптоталар және функцияның созылу/ығысуын зерттеу'}
          </p>
        </div>

        {/* Function selection */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['arcsin', 'arccos', 'arctg', 'arcctg'] as const).map((fn) => {
            const active = activeFunc === fn;
            return (
              <button
                key={fn}
                onClick={() => {
                  setActiveFunc(fn);
                  resetTransforms();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fn} x
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas SVG */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full relative bg-slate-950 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
              {/* Axes and Grid lines */}
              <line
                x1={toSvgX(xMin)}
                y1={toSvgY(0)}
                x2={toSvgX(xMax)}
                y2={toSvgY(0)}
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(yMin)}
                x2={toSvgX(0)}
                y2={toSvgY(yMax)}
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Grid ticks on X */}
              {[-3, -2, -1, 1, 2, 3].map((val) => (
                <g key={`x-${val}`}>
                  <line
                    x1={toSvgX(val)}
                    y1={toSvgY(yMin)}
                    x2={toSvgX(val)}
                    y2={toSvgY(yMax)}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <line
                    x1={toSvgX(val)}
                    y1={toSvgY(0) - 4}
                    x2={toSvgX(val)}
                    y2={toSvgY(0) + 4}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <text
                    x={toSvgX(val)}
                    y={toSvgY(0) + 16}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {/* Grid ticks on Y (multiples of π/2) */}
              {[
                { val: -Math.PI / 2, label: '-π/2' },
                { val: Math.PI / 2, label: 'π/2' },
                { val: Math.PI, label: 'π' },
                { val: (3 * Math.PI) / 2, label: '3π/2' },
              ].map(({ val, label }) => (
                <g key={`y-${val}`}>
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(val)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(val)}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <line
                    x1={toSvgX(0) - 4}
                    y1={toSvgY(val)}
                    x2={toSvgX(0) + 4}
                    y2={toSvgY(val)}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <text
                    x={toSvgX(0) - 8}
                    y={toSvgY(val) + 3}
                    fill="#94a3b8"
                    fontSize="10"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                </g>
              ))}

              {/* Diagonal reflection line: y = x */}
              {showReflection && (
                <g>
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(xMin)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(xMax)}
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <text
                    x={toSvgX(2.2)}
                    y={toSvgY(2.2) - 8}
                    fill="#818cf8"
                    fontSize="10"
                    fontStyle="italic"
                  >
                    y = x
                  </text>
                </g>
              )}

              {/* Asymptotes for arctg (y = ±π/2) and arcctg (y = 0, y = π) */}
              {activeFunc === 'arctg' && (
                <>
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(Math.PI / 2)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(Math.PI / 2)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                  />
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(-Math.PI / 2)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(-Math.PI / 2)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                  />
                </>
              )}

              {activeFunc === 'arcctg' && (
                <>
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(Math.PI)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(Math.PI)}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                  />
                  <line
                    x1={toSvgX(xMin)}
                    y1={toSvgY(0)}
                    x2={toSvgX(xMax)}
                    y2={toSvgY(0)}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                  />
                </>
              )}

              {/* Forward trigonometric curve (Original trig function restricted) */}
              {showReflection && forwardPath && (
                <path
                  d={forwardPath}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
              )}

              {/* Main Transformed Inverse Trig Curve */}
              {mainPath && (
                <path
                  d={mainPath}
                  fill="none"
                  stroke={
                    activeFunc === 'arcsin'
                      ? '#38bdf8'
                      : activeFunc === 'arccos'
                      ? '#34d399'
                      : activeFunc === 'arctg'
                      ? '#fbbf24'
                      : '#c084fc'
                  }
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              )}

              {/* Identity curve: if toggled, show complementary function */}
              {showIdentity && activeFunc === 'arcsin' && (
                <path
                  d={(() => {
                    const pts: string[] = [];
                    for (let i = 0; i <= 200; i++) {
                      const x = -1 + (i / 200) * 2;
                      const y = Math.acos(x);
                      const sx = toSvgX(x);
                      const sy = toSvgY(y);
                      pts.push(i === 0 ? `M ${sx} ${sy}` : `L ${sx} ${sy}`);
                    }
                    return pts.join(' ');
                  })()}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              )}

              {/* Key points markers if untransformed */}
              {showPoints &&
                !isTransformed &&
                keyPoints.map((pt, idx) => {
                  const sx = toSvgX(pt.x);
                  const sy = toSvgY(pt.y);
                  return (
                    <g key={idx}>
                      <circle cx={sx} cy={sy} r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Quick toggle chips */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <button
              onClick={() => setShowReflection(!showReflection)}
              className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                showReflection
                  ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'en' ? 'Show Reflection y = x' : 'y = x түзуі бойынша шағылу'}
            </button>
            <button
              onClick={() => setShowIdentity(!showIdentity)}
              className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                showIdentity
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'en' ? 'Identity arcsin x + arccos x = π/2' : 'arcsin x + arccos x = π/2'}
            </button>
          </div>
        </div>

        {/* Transformation Sliders & Properties Table */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active equation formula badge */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                {language === 'en' ? 'Transformed Equation:' : 'Түрлендірілген теңдеу:'}
              </span>
              {isTransformed && (
                <button
                  onClick={resetTransforms}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700"
                >
                  <RotateCcw className="w-3 h-3" />
                  {language === 'en' ? 'Reset' : 'Қалпына келтіру'}
                </button>
              )}
            </div>
            <div className="text-base font-mono font-bold text-indigo-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              y = {a !== 1 ? `${a} · ` : ''}
              {activeFunc}(
              {b !== 1 ? `${b}x` : 'x'}
              {c !== 0 ? (c > 0 ? ` − ${c}` : ` + ${Math.abs(c)}`) : ''})
              {d !== 0 ? (d > 0 ? ` + ${d.toFixed(2)}` : ` − ${Math.abs(d).toFixed(2)}`) : ''}
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Vertical Stretch (a):</span>
                  <span className="font-mono text-white">{a}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Horiz Compression (b):</span>
                  <span className="font-mono text-white">{b}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Horiz Shift (c):</span>
                  <span className="font-mono text-white">{c}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Vert Shift (d):</span>
                  <span className="font-mono text-white">{d.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={d}
                  onChange={(e) => setD(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>

            {/* Worksheet 3 Quick Presets */}
            <div className="mt-3 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                {language === 'en' ? 'Curriculum Tasks Presets (Worksheet 3):' : '№3 Жұмыс парағының мысалдары:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => applyPreset('arcsin(2x-1)')}
                  className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300"
                >
                  arcsin(2x − 1)
                </button>
                <button
                  onClick={() => applyPreset('2arccos(x)+pi/2')}
                  className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300"
                >
                  2 arccos x + π/2
                </button>
                <button
                  onClick={() => applyPreset('2arctgx')}
                  className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-300"
                >
                  2 arctg x
                </button>
              </div>
            </div>
          </div>

          {/* Properties Summary Table */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <h4 className="font-bold text-white mb-2.5 flex items-center justify-between">
              <span>{language === 'en' ? 'Core Properties (LO 10.2.3.4)' : 'Негізгі қасиеттері (10.2.3.4)'}</span>
              <span className="text-[11px] text-indigo-400 font-mono">y = {activeFunc} x</span>
            </h4>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{language === 'en' ? 'Domain (D):' : 'Анықталу облысы:'}</span>
                <span className="font-mono font-bold text-indigo-300">
                  {activeFunc === 'arcsin' || activeFunc === 'arccos' ? '[−1; 1]' : 'ℝ (−∞; +∞)'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{language === 'en' ? 'Range (E):' : 'Мәндер жиыны:'}</span>
                <span className="font-mono font-bold text-emerald-300">
                  {activeFunc === 'arcsin'
                    ? '[−π/2; π/2]'
                    : activeFunc === 'arccos'
                    ? '[0; π]'
                    : activeFunc === 'arctg'
                    ? '(−π/2; π/2)'
                    : '(0; π)'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{language === 'en' ? 'Monotonicity:' : 'Бірсарындылығы:'}</span>
                <span className="font-medium text-slate-200">
                  {activeFunc === 'arcsin' || activeFunc === 'arctg'
                    ? language === 'en' ? 'Strictly Increasing' : 'Қатаң өспелі'
                    : language === 'en' ? 'Strictly Decreasing' : 'Қатаң кемімелі'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{language === 'en' ? 'Parity:' : 'Жұп/Тақтығы:'}</span>
                <span className="font-medium text-slate-200">
                  {activeFunc === 'arcsin' || activeFunc === 'arctg'
                    ? language === 'en' ? 'Odd (f(−x) = −f(x))' : 'Тақ (f(−x) = −f(x))'
                    : language === 'en' ? 'Neither (arccos(−x) = π − arccos x)' : 'Жұп та, тақ та емес'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{language === 'en' ? 'Zeros:' : 'Нөлдері:'}</span>
                <span className="font-mono text-slate-200">
                  {activeFunc === 'arcsin' || activeFunc === 'arctg'
                    ? 'x = 0'
                    : activeFunc === 'arccos'
                    ? 'x = 1'
                    : language === 'en' ? 'None' : 'Жоқ'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{language === 'en' ? 'Asymptotes:' : 'Асимптоталары:'}</span>
                <span className="font-mono text-slate-200">
                  {activeFunc === 'arctg'
                    ? 'y = ±π/2'
                    : activeFunc === 'arcctg'
                    ? 'y = 0, y = π'
                    : language === 'en' ? 'None' : 'Жоқ'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
