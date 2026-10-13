import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { KeyRound, X, CheckCircle, Printer, Download } from 'lucide-react';

interface AnswerKeysModalProps {
  language: Language;
  onClose: () => void;
}

export const AnswerKeysModal: React.FC<AnswerKeysModalProps> = ({ language, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'sor1' | 'sor2'>('w1');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {language === 'en' ? 'Master Answer Keys & Solutions' : 'Барлық жауаптар мен шешімдер кілті'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Official answers for Worksheets 1–5 and Summative Assessment Variants 1 & 2'
                  : '№1–5 Жұмыс парақтары және БЖБ (СОР) 1–2 нұсқаларының ресми жауаптары'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
              title="Print Answer Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'w1', label: 'Worksheet 1' },
            { id: 'w2', label: 'Worksheet 2' },
            { id: 'w3', label: 'Worksheet 3' },
            { id: 'w4', label: 'Worksheet 4' },
            { id: 'w5', label: 'Worksheet 5' },
            { id: 'sor1', label: 'СОР Variant 1' },
            { id: 'sor2', label: 'СОР Variant 2' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedTab === t.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans text-slate-200">
          {selectedTab === 'w1' && (
            <div className="space-y-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">PART A. Find the value:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1. arcsin 0 = <strong>0</strong>;  2. arcsin 1 = <strong>π/2</strong>;  3. arcsin(√2/2) = <strong>π/4</strong>;  4. arcsin(−1/2) = <strong>−π/6</strong>;  5. arcsin(−√3/2) = <strong>−π/3</strong>;  6. arccos 0 = <strong>π/2</strong>;  7. arccos 1 = <strong>0</strong>;  8. arccos(−1) = <strong>π</strong>;  9. arccos(√3/2) = <strong>π/6</strong>;  10. arccos(−√2/2) = <strong>3π/4</strong>;  11. arccos(−1/2) = <strong>2π/3</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">PART B. Does it make sense? Justify:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  • <strong>arcsin 1.5</strong> — No (1.5 &gt; 1, outside [−1; 1])<br/>
                  • <strong>arccos(−0.3)</strong> — Yes (−0.3 ∈ [−1; 1])<br/>
                  • <strong>arcsin(π/4)</strong> — Yes (π/4 ≈ 0.785 ≤ 1)<br/>
                  • <strong>arccos √3</strong> — No (√3 ≈ 1.73 &gt; 1)<br/>
                  • <strong>arcsin(π/3)</strong> — No (π/3 ≈ 1.047 &gt; 1)
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">PART C. Calculate:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1. arcsin(1/2) + arccos(1/2) = <strong>π/2</strong><br/>
                  2. 2 arcsin(−√2/2) − arccos 0 = 2(−π/4) − π/2 = <strong>−π</strong><br/>
                  3. arccos(−√3/2) − arcsin(√3/2) = 5π/6 − π/3 = <strong>π/2</strong><br/>
                  4. 3 arccos(1/2) + 2 arcsin(−1) = 3(π/3) + 2(−π/2) = π − π = <strong>0</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">PART D. Compare:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  • arcsin(−0.6) &lt; arcsin 0.2 (arcsin is strictly increasing)<br/>
                  • arccos 0.3 &gt; arccos 0.7 (arccos is strictly decreasing)
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">PART E. Calculate if possible:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1. sin(arcsin 0.4) = <strong>0.4</strong><br/>
                  2. cos(arccos(−2/3)) = <strong>−2/3</strong><br/>
                  3. sin(arcsin 3) = <strong>Does not exist</strong> (3 &gt; 1)
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'w2' && (
            <div className="space-y-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">PART A. Find the value:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1. arctg 0 = <strong>0</strong>;  2. arctg 1 = <strong>π/4</strong>;  3. arctg √3 = <strong>π/3</strong>;  4. arctg(−√3/3) = <strong>−π/6</strong>;  5. arctg(−1) = <strong>−π/4</strong>;  6. arcctg 0 = <strong>π/2</strong>;  7. arcctg 1 = <strong>π/4</strong>;  8. arcctg √3 = <strong>π/6</strong>;  9. arcctg(−1) = <strong>3π/4</strong>;  10. arcctg(−√3/3) = <strong>2π/3</strong>;  11. arcctg(−√3) = <strong>5π/6</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">PART B. Calculate:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1. arctg 1 + arcctg 1 = π/4 + π/4 = <strong>π/2</strong><br/>
                  2. arctg √3 − arcctg(−√3) = π/3 − 5π/6 = <strong>−π/2</strong><br/>
                  3. 4 arctg(−1) + 3 arcctg(−1) = 4(−π/4) + 3(3π/4) = −π + 9π/4 = <strong>5π/4</strong><br/>
                  4. arcsin(−1) + arccos(1/2) + arctg(−√3) = −π/2 + π/3 − π/3 = <strong>−π/2</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">PARTS C, D, E:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  • tg(arctg 5) = <strong>5</strong>;  ctg(arcctg(−7)) = <strong>−7</strong><br/>
                  • arctg 1000 and arcctg(−10⁶) <strong>both exist</strong> (domain is all real numbers ℝ)<br/>
                  • arctg 2 &gt; π/4 &gt; arcctg 2, so <strong>arctg 2 &gt; arcctg 2</strong>
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'w3' && (
            <div className="space-y-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">1. Find Domain (D):</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) y = arcsin(2x − 1)  ⇒  <strong>[0; 1]</strong><br/>
                  2) y = arccos(x²)  ⇒  <strong>[−1; 1]</strong><br/>
                  3) y = arcsin((x − 3)/2)  ⇒  <strong>[1; 5]</strong><br/>
                  4) y = arctg(1/x)  ⇒  <strong>x ≠ 0</strong> (or (−∞; 0) ∪ (0; +∞))<br/>
                  5) y = arccos(3 − x)  ⇒  <strong>[2; 4]</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">2. Find Range (E):</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) y = 2 arcsin x  ⇒  <strong>[−π; π]</strong><br/>
                  2) y = arccos x + π/2  ⇒  <strong>[π/2; 3π/2]</strong><br/>
                  3) y = −arctg x  ⇒  <strong>(−π/2; π/2)</strong><br/>
                  4) y = 3 arcctg x − π  ⇒  <strong>(−π; 2π)</strong><br/>
                  5) y = π/2 − arccos x  ⇒  <strong>[−π/2; π/2]</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">3. Parity:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  • f(x) = x · arcsin x: <strong>Even (Жұп)</strong><br/>
                  • f(x) = arctg x + x³: <strong>Odd (Тақ)</strong><br/>
                  • f(x) = arccos x: <strong>Neither (Жұп та, тақ та емес)</strong><br/>
                  • f(x) = arcsin x · arctg x: <strong>Even (Жұп)</strong>
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'w4' && (
            <div className="space-y-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">1. Exact Values via Triangles:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) cos(arcsin(3/5)) = <strong>4/5</strong><br/>
                  2) sin(arccos(−5/13)) = <strong>12/13</strong><br/>
                  3) tg(arccos(4/5)) = <strong>3/4</strong><br/>
                  4) sin(arctg 2) = <strong>2√5/5</strong><br/>
                  5) cos(arcctg(−3/4)) = <strong>−3/5</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">2. Double Angles & Additions:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) sin(2 arcsin(1/3)) = <strong>4√2/9</strong><br/>
                  2) cos(2 arccos 0.6) = <strong>−0.28</strong><br/>
                  3) tg(2 arctg 3) = <strong>−3/4</strong><br/>
                  4) sin(arcsin(3/5) + arccos(4/5)) = <strong>24/25</strong><br/>
                  5) cos(arcsin(3/5) − arccos(5/13)) = <strong>56/65</strong>
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">3. Principal Reductions:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) arcsin(sin(2π/3)) = <strong>π/3</strong><br/>
                  2) arccos(cos(−π/4)) = <strong>π/4</strong><br/>
                  3) arctg(tg(5π/6)) = <strong>−π/6</strong><br/>
                  4) arccos(cos(4π/3)) = <strong>2π/3</strong><br/>
                  5) arcsin(sin 3) = <strong>π − 3</strong><br/>
                  6) arccos(cos 5) = <strong>2π − 5</strong>
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'w5' && (
            <div className="space-y-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">1. Simplest Equations:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) arcsin x = π/6  ⇒  <strong>x = 1/2</strong><br/>
                  2) arccos x = 2π/3  ⇒  <strong>x = −1/2</strong><br/>
                  3) arctg x = −π/4  ⇒  <strong>x = −1</strong><br/>
                  4) arcctg x = π/3  ⇒  <strong>x = √3/3</strong><br/>
                  5) arcsin x = 2π/3  ⇒  <strong>No solutions</strong> (2π/3 &gt; π/2)<br/>
                  6) arccos x = −π/6  ⇒  <strong>No solutions</strong> (−π/6 &lt; 0)<br/>
                  7) arctg x = π/2  ⇒  <strong>No solutions</strong> (range is open)
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">2. Composite & Substitutions:</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  1) arcsin(2x − 1) = π/6  ⇒  2x − 1 = 1/2  ⇒  <strong>x = 3/4</strong><br/>
                  2) arccos(3x + 1) = π/2  ⇒  3x + 1 = 0  ⇒  <strong>x = −1/3</strong><br/>
                  3) arctg(x² − 1) = π/4  ⇒  x² − 1 = 1  ⇒  <strong>x = ±√2</strong><br/>
                  4) arccos(x − 2) = π  ⇒  x − 2 = −1  ⇒  <strong>x = 1</strong><br/>
                  5) 12 arctg²x − π arctg x − π² = 0  ⇒  <strong>x = √3 or x = −1</strong><br/>
                  6) arccos(x² − 1) = arccos(x + 1)  ⇒  <strong>x = −1</strong> (x = 2 rejected)<br/>
                  7) 2 arcsin x = arccos x  ⇒  <strong>x = 1/2</strong>
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'sor1' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono">
              <span className="text-indigo-400 font-bold text-sm block">СОР / БЖБ — Variant 1:</span>
              <p className="text-slate-300 leading-relaxed font-sans">
                <strong>1(a)</strong> arcsin(−√3/2) + arccos(−1/2) = −π/3 + 2π/3 = <strong>π/3</strong> [2 marks]<br/>
                <strong>1(b)</strong> arctg(−1) − arcctg(−√3) = −π/4 − 5π/6 = <strong>−13π/12</strong> [2 marks]<br/>
                <strong>2(a)</strong> Domain: <strong>[0; 2]</strong> [1 mark]<br/>
                <strong>2(b)</strong> Range: <strong>[π/2; 5π/2]</strong> [1 mark]<br/>
                <strong>2(c)</strong> Decreasing curve passing through (0; 5π/2), (1; 3π/2), (2; π/2) [2 marks]<br/>
                <strong>3(a)</strong> tg(arccos(−4/5)): sin = 3/5  ⇒  tg = <strong>−3/4</strong> [2 marks]<br/>
                <strong>3(b)</strong> cos(arcsin(5/13) + arcsin(4/5)) = 12/13 · 3/5 − 5/13 · 4/5 = <strong>16/65</strong> [3 marks]<br/>
                <strong>4(a)</strong> arccos(2x − 3) = π/3  ⇒  2x − 3 = 1/2  ⇒  <strong>x = 7/4</strong> [2 marks]<br/>
                <strong>4(b)</strong> 18t² − 3πt − π² = 0  ⇒  t = π/3, −π/6  ⇒  <strong>x = √3/2, x = −1/2</strong> [3 marks]
              </p>
            </div>
          )}

          {selectedTab === 'sor2' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono">
              <span className="text-indigo-400 font-bold text-sm block">СОР / БЖБ — Variant 2:</span>
              <p className="text-slate-300 leading-relaxed font-sans">
                <strong>1(a)</strong> arcsin(−1/2) + arccos(−√2/2) = −π/6 + 3π/4 = <strong>7π/12</strong> [2 marks]<br/>
                <strong>1(b)</strong> arcctg(−1) − arctg(−√3) = 3π/4 − (−π/3) = <strong>13π/12</strong> [2 marks]<br/>
                <strong>2(a)</strong> Domain: <strong>[−3; −1]</strong> [1 mark]<br/>
                <strong>2(b)</strong> Range: <strong>[−5π/2; π/2]</strong> [1 mark]<br/>
                <strong>2(c)</strong> Increasing curve passing through (−3; −5π/2), (−2; −π), (−1; π/2) [2 marks]<br/>
                <strong>3(a)</strong> ctg(arcsin(−3/5)): cos = 4/5  ⇒  ctg = <strong>−4/3</strong> [2 marks]<br/>
                <strong>3(b)</strong> sin(arccos(3/5) − arccos(12/13)) = 4/5 · 12/13 − 3/5 · 5/13 = <strong>33/65</strong> [3 marks]<br/>
                <strong>4(a)</strong> arcsin(3x + 2) = −π/6  ⇒  3x + 2 = −1/2  ⇒  <strong>x = −5/6</strong> [2 marks]<br/>
                <strong>4(b)</strong> 18t² − 9πt − 2π² = 0  ⇒  t = 2π/3 (t = −π/6 rejected &lt; 0)  ⇒  <strong>x = −1/2</strong> [3 marks]
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
