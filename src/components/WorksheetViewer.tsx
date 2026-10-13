import React, { useState } from 'react';
import { Language, WorksheetData, WorksheetQuestion } from '../types/curriculum';
import { WORKSHEETS_DATA } from '../data/curriculumData';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  Printer,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorksheetViewerProps {
  lessonId: number;
  language: Language;
}

export const WorksheetViewer: React.FC<WorksheetViewerProps> = ({ lessonId, language }) => {
  const worksheet: WorksheetData = WORKSHEETS_DATA[lessonId] || WORKSHEETS_DATA[1];

  // User answers keyed by question ID
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Question evaluation status: 'correct' | 'incorrect' | undefined
  const [evalStatus, setEvalStatus] = useState<Record<string, 'correct' | 'incorrect'>>({});
  // Toggled hints and solutions
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<string>(worksheet.sections[0]?.name || 'A');

  const handleInput = (qId: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
    // Reset status when user types new answer
    if (evalStatus[qId]) {
      setEvalStatus((prev) => {
        const next = { ...prev };
        delete next[qId];
        return next;
      });
    }
  };

  const insertSymbol = (qId: string, symbol: string) => {
    const current = userAnswers[qId] || '';
    handleInput(qId, current + symbol);
  };

  const normalizeAnswer = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/pi/g, 'π')
      .replace(/-/g, '−')
      .replace(/sqrt/g, '√');
  };

  const checkSingleQuestion = (q: WorksheetQuestion) => {
    const userVal = userAnswers[q.id] || '';
    if (!userVal.trim()) return;

    const normUser = normalizeAnswer(userVal);
    const normCorrect = normalizeAnswer(q.correctAnswer);
    const acceptable = (q.acceptableAnswers || []).map(normalizeAnswer);

    const isCorrect =
      normUser === normCorrect || acceptable.includes(normUser);

    setEvalStatus((prev) => ({
      ...prev,
      [q.id]: isCorrect ? 'correct' : 'incorrect',
    }));

    if (isCorrect) {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
    }
  };

  const checkAllQuestions = () => {
    let allRight = true;
    const newStatuses: Record<string, 'correct' | 'incorrect'> = {};

    worksheet.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        const userVal = userAnswers[q.id] || '';
        if (userVal.trim()) {
          const normUser = normalizeAnswer(userVal);
          const normCorrect = normalizeAnswer(q.correctAnswer);
          const acceptable = (q.acceptableAnswers || []).map(normalizeAnswer);
          const isCorrect = normUser === normCorrect || acceptable.includes(normUser);
          newStatuses[q.id] = isCorrect ? 'correct' : 'incorrect';
          if (!isCorrect) allRight = false;
        } else {
          allRight = false;
        }
      });
    });

    setEvalStatus(newStatuses);
    if (allRight && Object.keys(newStatuses).length > 0) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const toggleHint = (qId: string) => {
    setOpenHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleSolution = (qId: string) => {
    setOpenSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Stats
  const totalQuestions = worksheet.sections.reduce((acc, s) => acc + s.questions.length, 0);
  const correctCount = Object.values(evalStatus).filter((s) => s === 'correct').length;

  const currentSectionData = worksheet.sections.find((s) => s.name === activeSection) || worksheet.sections[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Worksheet Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {language === 'en' ? `Worksheet ${lessonId}` : `№${lessonId} Жұмыс парағы`}
            </span>
            <span className="text-xs text-slate-400">
              {language === 'en' ? 'Interactive Classroom Sheet' : 'Интерактивті сыныптық парақ'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {language === 'en' ? worksheet.titleEn : worksheet.titleKk}
          </h3>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-emerald-400 font-bold">{correctCount}</span> / {totalQuestions}{' '}
            {language === 'en' ? 'Solved' : 'Орындалды'}
          </div>

          <button
            onClick={checkAllQuestions}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'en' ? 'Check All' : 'Барлығын тексеру'}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
            title="Print worksheet"
          >
            <Printer className="w-3.5 h-3.5" />
            {language === 'en' ? 'Print' : 'Басып шығару'}
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 mr-2">
          {language === 'en' ? 'Sections:' : 'Бөлімдер:'}
        </span>
        {worksheet.sections.map((sec) => (
          <button
            key={sec.name}
            onClick={() => setActiveSection(sec.name)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSection === sec.name
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {language === 'en' ? `Part ${sec.name}` : `${sec.name} бөлімі`}
          </button>
        ))}
      </div>

      {/* Section Description */}
      {currentSectionData && (
        <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-300">
            {language === 'en'
              ? currentSectionData.descriptionEn
              : currentSectionData.descriptionKk}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {currentSectionData.questions.length} {language === 'en' ? 'questions' : 'сұрақ'}
          </span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {currentSectionData?.questions.map((q) => {
          const status = evalStatus[q.id];
          const isHintOpen = openHints[q.id];
          const isSolOpen = openSolutions[q.id];

          return (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border transition-all ${
                status === 'correct'
                  ? 'bg-emerald-950/20 border-emerald-500/50'
                  : status === 'incorrect'
                  ? 'bg-rose-950/20 border-rose-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  {q.prompt}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isSolOpen
                      ? language === 'en' ? 'Hide Solution' : 'Жасыру'
                      : language === 'en' ? 'Solution' : 'Шешуі'}
                  </button>
                </div>
              </div>

              {/* Interaction: Options or Text Input */}
              {q.options ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        handleInput(q.id, opt);
                        // Auto-check on choice
                        setTimeout(() => {
                          const isCorrect = opt === q.correctAnswer;
                          setEvalStatus((prev) => ({
                            ...prev,
                            [q.id]: isCorrect ? 'correct' : 'incorrect',
                          }));
                        }, 50);
                      }}
                      className={`text-xs p-2.5 rounded-xl border text-left transition-all ${
                        userAnswers[q.id] === opt
                          ? 'bg-indigo-600/40 border-indigo-500 text-white font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="my-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Type exact value (e.g. π/4, -π/6)...' : 'Мәнін жазыңыз (мысалы: π/4, -π/6)...'}
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleInput(q.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') checkSingleQuestion(q);
                      }}
                      className="flex-1 min-w-[200px] bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                    />

                    {/* Quick math symbol buttons */}
                    <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                      {['π', '√', '−', '/', '²'].map((sym) => (
                        <button
                          key={sym}
                          onClick={() => insertSymbol(q.id, sym)}
                          className="px-2 py-0.5 rounded hover:bg-slate-800 hover:text-white"
                        >
                          {sym}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => checkSingleQuestion(q)}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-all"
                    >
                      {language === 'en' ? 'Check' : 'Тексеру'}
                    </button>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-2 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    status === 'correct'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {status === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{language === 'en' ? 'Correct! Excellent work.' : 'Дұрыс! Өте жақсы.'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>
                        {language === 'en'
                          ? 'Not quite. Check the restricted range and negative sign rule.'
                          : 'Қате. Мәндер облысы мен таңба ережелерін қайта тексеріңіз.'}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Solution breakdown toggle */}
              {isSolOpen && (
                <div className="mt-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="font-semibold text-indigo-400 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Step-by-Step Solution:' : 'Толық шешу жолы:'}
                  </div>
                  <p className="font-sans leading-relaxed">
                    {language === 'en' ? q.explanationEn : q.explanationKk}
                  </p>
                  <div className="mt-1 font-mono text-[11px] text-emerald-400">
                    {language === 'en' ? 'Exact Answer:' : 'Дұрыс жауабы:'} {q.correctAnswer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
