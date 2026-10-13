import React, { useState, useEffect } from 'react';
import { Language, AssessmentVariant, RubricDescriptor } from '../types/curriculum';
import { SUMMATIVE_ASSESSMENT, RUBRIC_DESCRIPTORS } from '../data/curriculumData';
import {
  FileText,
  Clock,
  Award,
  CheckSquare,
  Square,
  Eye,
  Printer,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentModuleProps {
  language: Language;
}

export const AssessmentModule: React.FC<AssessmentModuleProps> = ({ language }) => {
  const [selectedVariant, setSelectedVariant] = useState<1 | 2>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60); // 25 min
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'rubric' | 'solutions'>('tasks');

  // Teacher / Student descriptor checkmarks: descriptor index -> boolean
  const [awardedMarks, setAwardedMarks] = useState<Record<number, boolean>>({});

  const currentVariantData = SUMMATIVE_ASSESSMENT[selectedVariant];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleDescriptorMark = (index: number) => {
    setAwardedMarks((prev) => {
      const updated = { ...prev, [index]: !prev[index] };
      const total = Object.values(updated).filter(Boolean).length;
      if (total === 18) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  const totalScore = Object.values(awardedMarks).filter(Boolean).length;

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetAssessment = () => {
    setAwardedMarks({});
    setTimerSeconds(25 * 60);
    setIsTimerRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Assessment Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {language === 'en' ? 'Section Summative Assessment (СОР / БЖБ)' : 'Бөлім бойынша жиынтық бағалау (БЖБ)'}
            </span>
            <span className="text-xs text-slate-400">
              Unit 10.1C • 18 {language === 'en' ? 'Marks' : 'Балл'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {language === 'en'
              ? 'Summative Assessment for Unit 10.1C: Inverse Trigonometric Functions'
              : '10.1C Кері тригонометриялық функциялар бөлімі бойынша жиынтық бағалау'}
          </h3>
        </div>

        {/* Timer & Variant Toggle & Print */}
        <div className="flex items-center gap-3">
          {/* Variant Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSelectedVariant(1)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedVariant === 1
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Variant 1' : '1-Нұсқа'}
            </button>
            <button
              onClick={() => setSelectedVariant(2)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedVariant === 2
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Variant 2' : '2-Нұсқа'}
            </button>
          </div>

          {/* 25 Min Countdown Timer */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-white font-bold">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300 ml-1"
            >
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
          </div>

          {/* Mark Counter */}
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-emerald-400 font-bold text-sm">{totalScore}</span> / 18
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs border border-slate-700 transition-all"
            title="Print test sheet"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'tasks'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {language === 'en' ? 'Assessment Tasks' : 'Тапсырмалар'}
        </button>
        <button
          onClick={() => setActiveTab('rubric')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'rubric'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {language === 'en' ? 'Descriptor & Grading Rubric (18 Marks)' : 'Бағалау критерийлері мен дескрипторлар'}
        </button>
        <button
          onClick={() => setActiveTab('solutions')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'solutions'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {language === 'en' ? 'Full Master Solutions' : 'Толық шешімдер мен жауаптар'}
        </button>
      </div>

      {/* CONTENT TABS */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <strong>{language === 'en' ? 'Assessment Guidelines:' : 'Нұсқаулық:'}</strong>{' '}
              {language === 'en'
                ? 'Time: 25 minutes. Total: 18 marks. Show all working out clearly, justifying ranges and steps.'
                : 'Орындалу уақыты: 25 минут. Жалпы балл: 18. Әр қадамды және мәндер жиынын негіздеп жазыңыз.'}
            </div>
            <span className="font-mono text-indigo-400 font-bold">
              {language === 'en' ? `Variant ${selectedVariant}` : `${selectedVariant}-нұсқа`}
            </span>
          </div>

          <div className="space-y-4">
            {currentVariantData.tasks.map((task) => (
              <div
                key={task.number}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 font-bold flex items-center justify-center font-mono text-sm border border-indigo-800">
                      №{task.number}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {language === 'en' ? task.promptEn : task.promptKk}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400 font-bold shrink-0">
                    [{task.marks} {language === 'en' ? 'marks' : 'балл'}]
                  </span>
                </div>

                {/* Subtask working spaces */}
                {task.subtasks && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {task.subtasks.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs"
                      >
                        <div className="font-mono font-bold text-slate-300 mb-2 flex items-center justify-between">
                          <span>{sub.label}</span>
                          <span className="text-[11px] text-slate-500 font-normal">
                            {language === 'en' ? 'Answer format' : 'Жауап пішімі'}
                          </span>
                        </div>
                        <p className="text-slate-400 mb-3">{language === 'en' ? sub.promptEn : sub.promptKk}</p>

                        <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                          <span className="text-slate-500 text-[11px]">{language === 'en' ? 'Target Value:' : 'Күтілетін мән:'}</span>
                          <span className="text-emerald-400 font-bold">{sub.answer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rubric' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>
              {language === 'en'
                ? 'Official 18-Mark Descriptor Scheme. Click checkboxes to score the student response:'
                : '18 балдық ресми дескрипторлар кестесі. Оқушы жұмысын бағалау үшін сәйкес құсбелгіні басыңыз:'}
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              {totalScore} / 18 {language === 'en' ? 'Awarded' : 'Қойылған'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-3 border-b border-slate-800 w-12 text-center">Score</th>
                  <th className="p-3 border-b border-slate-800 w-16">Task</th>
                  <th className="p-3 border-b border-slate-800">
                    {language === 'en' ? 'Assessment Criterion' : 'Бағалау критерийі'}
                  </th>
                  <th className="p-3 border-b border-slate-800">
                    {language === 'en' ? 'Descriptor: The learner' : 'Дескриптор: Білім алушы'}
                  </th>
                  <th className="p-3 border-b border-slate-800 w-16 text-center">Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900">
                {RUBRIC_DESCRIPTORS.map((desc, idx) => {
                  const isChecked = !!awardedMarks[idx];
                  return (
                    <tr
                      key={idx}
                      onClick={() => toggleDescriptorMark(idx)}
                      className={`cursor-pointer transition-colors ${
                        isChecked ? 'bg-emerald-950/20' : 'hover:bg-slate-850'
                      }`}
                    >
                      <td className="p-3 text-center">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-400">{desc.task}</td>
                      <td className="p-3 text-slate-300 font-medium">
                        {language === 'en' ? desc.criterionEn : desc.criterionKk}
                      </td>
                      <td className="p-3 text-slate-200">
                        {language === 'en' ? desc.descriptorEn : desc.descriptorKk}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-amber-400">
                        {desc.mark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'solutions' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>
              {language === 'en'
                ? `Master Solutions & Marking Scheme for Variant ${selectedVariant}:`
                : `${selectedVariant}-нұсқа бойынша толық шешімдер мен бағалау сызбасы:`}
            </span>
          </div>

          <div className="space-y-4">
            {currentVariantData.tasks.map((task) => (
              <div key={task.number} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div className="font-bold text-sm text-indigo-300">
                    №{task.number} — {language === 'en' ? task.promptEn : task.promptKk}
                  </div>
                  <span className="text-xs text-amber-400 font-mono font-bold">[{task.marks} marks]</span>
                </div>
                <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800/80">
                  {language === 'en' ? task.solutionEn : task.solutionKk}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
