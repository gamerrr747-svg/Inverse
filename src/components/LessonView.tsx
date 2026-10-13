import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { TeacherToolbar } from './TeacherToolbar';
import { UnitCircleVisualizer } from './UnitCircleVisualizer';
import { GraphExplorer } from './GraphExplorer';
import { MatchingGame } from './MatchingGame';
import { TriangleVisualizer } from './TriangleVisualizer';
import { PrincipalReducer } from './PrincipalReducer';
import { ErrorHuntInteractive } from './ErrorHuntInteractive';
import { ConfidenceGrid } from './ConfidenceGrid';
import { WorksheetViewer } from './WorksheetViewer';
import { QuickCalculator } from './QuickCalculator';
import { TRANSFORMATION_FORMULAS } from '../data/curriculumData';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
  FileCheck,
} from 'lucide-react';

interface LessonViewProps {
  lessonId: number;
  language: Language;
  onSelectLesson: (id: number) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lessonId,
  language,
  onSelectLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'worksheet' | 'tools'>('content');
  const [exitTicket1Answer, setExitTicket1Answer] = useState<string>('');
  const [exitTicket2Answer, setExitTicket2Answer] = useState<string>('');
  const [exitTicketChecked, setExitTicketChecked] = useState<boolean>(false);

  // Lesson titles and metadata
  const lessonMeta: Record<
    number,
    { titleEn: string; titleKk: string; lo: string; descEn: string; descKk: string }
  > = {
    1: {
      titleEn: 'Lesson 1: Arcsine and Arccosine',
      titleKk: '1-сабақ: Арксинус және арккосинус',
      lo: '10.2.3.3',
      descEn: 'Definitions of arcsin a and arccos a, restricted domain |a| ≤ 1, and unit circle principal arcs',
      descKk: 'arcsin a және arccos a анықтамалары, |a| ≤ 1 шарты және бірлік шеңбердегі басты доғалар',
    },
    2: {
      titleEn: 'Lesson 2: Arctangent and Arccotangent',
      titleKk: '2-сабақ: Арктангенс және арккотангенс',
      lo: '10.2.3.3',
      descEn: 'Definitions of arctg a and arcctg a on open intervals, tangent/cotangent lines, and matching game',
      descKk: 'arctg a және arcctg a анықтамалары, тангенс және котангенс сызықтары, сәйкестендіру ойыны',
    },
    3: {
      titleEn: 'Lesson 3: Inverse Trig Functions: Properties & Graphs',
      titleKk: '3-сабақ: Кері тригонометриялық функциялардың қасиеттері мен графиктері',
      lo: '10.2.3.4, 10.2.3.5',
      descEn: 'Reflection across y = x, domain, range, monotonicity, parity, and function transformations',
      descKk: 'y = x түзуі бойынша шағылу, анықталу және мәндер облысы, тақтық және созылу/ығысу түрлендірулері',
    },
    4: {
      titleEn: 'Lesson 4: Transforming Expressions with Inverse Trig Functions',
      titleKk: '4-сабақ: Кері тригонометриялық функциялары бар өрнектерді түрлендіру',
      lo: '10.2.3.4, 10.2.3.6',
      descEn: 'Right triangle construction, Pythagorean relations, double angle identities, and principal branch reduction',
      descKk: 'Тікбұрышты үшбұрыш тәсілі, қос бұрыш формулалары және басты аралыққа келтіру ережелері',
    },
    5: {
      titleEn: 'Lesson 5: The Simplest Equations with Inverse Trig Functions',
      titleKk: '5-сабақ: Кері тригонометриялық функциялары бар қарапайым теңдеулер',
      lo: '10.2.3.7',
      descEn: 'Error hunt, standard equation types, domain check validation, quadratic substitutions, and confidence rating',
      descKk: 'Қатені тап, қарапайым теңдеулер, мүмкін мәндерді тексеру, жаңа айнымалы енгізу және өзін-өзі бағалау',
    },
  };

  const current = lessonMeta[lessonId] || lessonMeta[1];

  return (
    <div className="space-y-6">
      {/* 40-Minute Lesson Facilitator Toolbar */}
      <TeacherToolbar lessonId={lessonId} language={language} />

      {/* Lesson Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              LO {current.lo}
            </span>
            <span className="text-xs text-slate-400">40 min • Grade 10 Algebra</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {language === 'en' ? current.titleEn : current.titleKk}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {language === 'en' ? current.descEn : current.descKk}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Interactive Lesson' : 'Интерактивті сабақ'}
          </button>
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'worksheet'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? `Worksheet ${lessonId}` : `№${lessonId} Тапсырмалар`}
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'tools'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Visualizer Sandbox' : 'Зертхана'}
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'worksheet' ? (
        <WorksheetViewer lessonId={lessonId} language={language} />
      ) : activeTab === 'tools' ? (
        <div className="space-y-6">
          <UnitCircleVisualizer
            language={language}
            initialFunction={lessonId === 1 ? 'arcsin' : lessonId === 2 ? 'arctg' : 'arcsin'}
          />
          <GraphExplorer language={language} />
          <QuickCalculator language={language} />
        </div>
      ) : (
        /* ACTIVE INTERACTIVE LESSON FLOW */
        <div className="space-y-6">
          {/* ===================== LESSON 1 ===================== */}
          {lessonId === 1 && (
            <>
              {/* Warm-Up / Show-me Board */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                  {language === 'en' ? 'Stage 1: Warm-Up & Show-Me Boards (5 min)' : '1-кезең: Сергіту және мини-тақташа (5 мин)'}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">
                  {language === 'en'
                    ? 'Question: "Find all x with sin x = 1/2. Which ONE answer would a calculator give, and why?"'
                    : 'Сұрақ: "sin x = 1/2 теңдеуін шешіңіз. Калькулятор неге тек БІР ғана жауап береді және ол қайсы?"'}
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p>
                    {language === 'en' ? (
                      <>
                        General solutions of <code className="text-indigo-300">sin x = 1/2</code> are{' '}
                        <strong className="text-white">x = π/6 + 2πn</strong> and{' '}
                        <strong className="text-white">x = 5π/6 + 2πn</strong>. However, a function must output a{' '}
                        <em>single unique value</em>!
                      </>
                    ) : (
                      <>
                        <code className="text-indigo-300">sin x = 1/2</code> теңдеуінің шексіз көп шешімі бар:{' '}
                        <strong className="text-white">x = π/6 + 2πn</strong> және{' '}
                        <strong className="text-white">x = 5π/6 + 2πn</strong>. Бірақ функция болу үшін әр санға{' '}
                        <em>тек бір ғана мән</em> сәйкес келуі тиіс!
                      </>
                    )}
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    {language === 'en'
                      ? 'Conclusion: We restrict sin x to [−π/2; π/2] to make it one-to-one (strictly increasing), defining arcsin(1/2) = π/6 (30°).'
                      : 'Қорытынды: sin x функциясы өзара бірмәнді болуы үшін оны [−π/2; π/2] аралығында шектейміз, сөйтіп arcsin(1/2) = π/6 (30°) анықталады.'}
                  </p>
                </div>
              </div>

              {/* Unit Circle Arc Visualizer */}
              <UnitCircleVisualizer language={language} initialFunction="arcsin" />

              {/* Key Definitions & Symmetry Formulas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    Definition: Arcsine
                  </span>
                  <div className="text-base font-mono font-bold text-white mb-2">
                    arcsin a = t  ⇔  sin t = a, t ∈ [−π/2; π/2], |a| ≤ 1
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div>
                      <strong className="text-blue-300">Odd symmetry: </strong>
                      <span className="font-mono text-white">arcsin(−a) = −arcsin a</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Example: arcsin(−1/2) = −arcsin(1/2) = −π/6.
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Definition: Arccosine
                  </span>
                  <div className="text-base font-mono font-bold text-white mb-2">
                    arccos a = t  ⇔  cos t = a, t ∈ [0; π], |a| ≤ 1
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div>
                      <strong className="text-emerald-300">Symmetry formula: </strong>
                      <span className="font-mono text-white">arccos(−a) = π − arccos a</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Example: arccos(−√3/2) = π − arccos(√3/2) = π − π/6 = 5π/6.
                    </div>
                  </div>
                </div>
              </div>

              {/* Exit Ticket Interactive */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  {language === 'en' ? 'Stage 5: Exit Ticket Reflection (5 min)' : '5-кезең: Шығу билеті (5 мин)'}
                </span>
                <h4 className="text-sm font-bold text-white mb-3">
                  {language === 'en' ? 'Check your understanding:' : 'Біліміңді тексер:'}
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-semibold block mb-1">
                      1. {language === 'en' ? 'Why is arcsin(1/2) not equal to 5π/6?' : 'Неге arcsin(1/2) мәні 5π/6-ға тең емес?'}
                    </span>
                    <p className="text-emerald-400 font-medium">
                      ✓ {language === 'en'
                        ? 'Because 5π/6 > π/2, outside the defined range [−π/2; π/2].'
                        : 'Себебі 5π/6 мәні [−π/2; π/2] мәндер жиынынан тыс.'}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-semibold block mb-1">
                      2. {language === 'en' ? 'Find arccos(−√2/2):' : 'arccos(−√2/2) табыңыз:'}
                    </span>
                    <p className="text-emerald-400 font-medium font-mono">
                      ✓ arccos(−√2/2) = π − arccos(√2/2) = π − π/4 = 3π/4
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-semibold block mb-1">
                      3. {language === 'en' ? 'Does arccos 1.2 exist in real numbers?' : 'Нақты сандарда arccos 1.2 бар ма?'}
                    </span>
                    <p className="text-emerald-400 font-medium">
                      ✓ {language === 'en'
                        ? 'No, because |1.2| > 1, outside the domain [−1; 1].'
                        : 'Жоқ, себебі 1.2 > 1, [−1; 1] анықталу облысынан тыс.'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== LESSON 2 ===================== */}
          {lessonId === 2 && (
            <>
              {/* Tangent and Cotangent Lines Definition Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Definition: Arctangent
                  </span>
                  <div className="text-base font-mono font-bold text-white mb-2">
                    arctg a = t  ⇔  tg t = a, t ∈ (−π/2; π/2), a ∈ ℝ
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div>
                      <strong className="text-amber-300">Odd symmetry: </strong>
                      <span className="font-mono text-white">arctg(−a) = −arctg a</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Defined for ALL real numbers a ∈ ℝ. Range has OPEN ends (−π/2; π/2).'
                        : 'Барлық нақты сандарда a ∈ ℝ анықталған. Мәндер жиыны ашық аралық (−π/2; π/2).'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
                    Definition: Arccotangent
                  </span>
                  <div className="text-base font-mono font-bold text-white mb-2">
                    arcctg a = t  ⇔  ctg t = a, t ∈ (0; π), a ∈ ℝ
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div>
                      <strong className="text-purple-300">Symmetry formula: </strong>
                      <span className="font-mono text-white">arcctg(−a) = π − arcctg a</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Example: arcctg(−√3) = π − arcctg √3 = π − π/6 = 5π/6.'
                        : 'Мысалы: arcctg(−√3) = π − arcctg √3 = π − π/6 = 5π/6.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Unit circle with tangent & cotangent lines */}
              <UnitCircleVisualizer language={language} initialFunction="arctg" />

              {/* Interactive Matching Game */}
              <MatchingGame language={language} />
            </>
          )}

          {/* ===================== LESSON 3 ===================== */}
          {lessonId === 3 && (
            <>
              {/* Graph Explorer with reflection across y = x and transformation sliders */}
              <GraphExplorer language={language} />

              {/* Key Points Reference Table from Curriculum */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  {language === 'en'
                    ? 'Key Points for Plotting (Lesson 3 Poster)'
                    : 'Графиктерді тұрғызуға арналған негізгі нүктелер кестесі'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Function</th>
                        <th className="p-3 border-b border-slate-800">Key Points (x; y)</th>
                        <th className="p-3 border-b border-slate-800">Asymptotes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900">
                      <tr>
                        <td className="p-3 font-bold text-blue-400">y = arcsin x</td>
                        <td className="p-3 text-slate-300">(−1; −π/2), (−1/2; −π/6), (0; 0), (1/2; π/6), (1; π/2)</td>
                        <td className="p-3 text-slate-500">none</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-emerald-400">y = arccos x</td>
                        <td className="p-3 text-slate-300">(−1; π), (−1/2; 2π/3), (0; π/2), (1/2; π/3), (1; 0)</td>
                        <td className="p-3 text-slate-500">none</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-amber-400">y = arctg x</td>
                        <td className="p-3 text-slate-300">(−√3; −π/3), (−1; −π/4), (0; 0), (1; π/4), (√3; π/3)</td>
                        <td className="p-3 text-amber-400">y = −π/2, y = π/2</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-purple-400">y = arcctg x</td>
                        <td className="p-3 text-slate-300">(−√3; 5π/6), (−1; 3π/4), (0; π/2), (1; π/4), (√3; π/6)</td>
                        <td className="p-3 text-purple-400">y = 0, y = π</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ===================== LESSON 4 ===================== */}
          {lessonId === 4 && (
            <>
              {/* Right Triangle Construction Visualizer */}
              <TriangleVisualizer language={language} />

              {/* Principal Range Reducer */}
              <PrincipalReducer language={language} />

              {/* Formula Sheet & Proofs */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  {language === 'en'
                    ? 'Transformation Formulas & Rigorous Proofs (Lesson 4)'
                    : 'Түрлендіру формулалары және дәлелдеулер (4-сабақ)'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300 block mb-2">
                      Proof 1: arcsin x + arccos x = π/2
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      Let α = arcsin x, so α ∈ [−π/2; π/2]. Then (π/2 − α) ∈ [0; π].<br/>
                      By co-function identity: cos(π/2 − α) = sin α = x.<br/>
                      Therefore, by definition of arccosine, π/2 − α = arccos x.<br/>
                      Substituting α back gives: <strong>arcsin x + arccos x = π/2</strong>. Q.E.D.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="font-bold text-emerald-300 block mb-2">
                      Proof 2: cos(2 arcsin x) = 1 − 2x²
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      Let α = arcsin x, so sin α = x.<br/>
                      Using the standard cosine double-angle identity:<br/>
                      cos(2α) = 1 − 2 sin²α.<br/>
                      Substituting sin α = x gives: <strong>cos(2 arcsin x) = 1 − 2x²</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== LESSON 5 ===================== */}
          {lessonId === 5 && (
            <>
              {/* Error Hunt Interactive */}
              <ErrorHuntInteractive language={language} />

              {/* Standard Equation Solution Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h4 className="text-base font-bold text-white mb-3">
                  {language === 'en'
                    ? 'Classification of Equations with Inverse Trig Functions'
                    : 'Кері тригонометриялық функциялары бар теңдеулердің түрлері мен шешу ережелері'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
                      <tr>
                        <th className="p-3 border-b border-slate-800">Equation</th>
                        <th className="p-3 border-b border-slate-800">Solution Exists When</th>
                        <th className="p-3 border-b border-slate-800">Solution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900 text-slate-200">
                      <tr>
                        <td className="p-3 font-bold text-blue-400">arcsin x = a</td>
                        <td className="p-3 text-indigo-300">−π/2 ≤ a ≤ π/2</td>
                        <td className="p-3 font-bold text-emerald-400">x = sin a</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-emerald-400">arccos x = a</td>
                        <td className="p-3 text-indigo-300">0 ≤ a ≤ π</td>
                        <td className="p-3 font-bold text-emerald-400">x = cos a</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-amber-400">arctg x = a</td>
                        <td className="p-3 text-indigo-300">−π/2 &lt; a &lt; π/2</td>
                        <td className="p-3 font-bold text-emerald-400">x = tg a</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-purple-400">arcctg x = a</td>
                        <td className="p-3 text-indigo-300">0 &lt; a &lt; π</td>
                        <td className="p-3 font-bold text-emerald-400">x = ctg a</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-300">arcsin f(x) = arcsin g(x)</td>
                        <td className="p-3 text-slate-400">Domain check: −1 ≤ f(x) ≤ 1</td>
                        <td className="p-3 font-bold text-emerald-400">f(x) = g(x)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Confidence Self-Assessment Grid */}
              <ConfidenceGrid language={language} />
            </>
          )}

          {/* Quick jump to worksheet button */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('worksheet')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>
                {language === 'en'
                  ? `Launch Worksheet ${lessonId} Exercises`
                  : `№${lessonId} Жұмыс парағын орындау`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
