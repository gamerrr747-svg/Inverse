import React, { useState, useEffect } from 'react';
import { Language, LessonStage } from '../types/curriculum';
import { LESSON_PLANS } from '../data/curriculumData';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Presentation,
  CheckCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';

interface TeacherToolbarProps {
  lessonId: number;
  language: Language;
  onPresentationToggle?: (val: boolean) => void;
  isPresentationMode?: boolean;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  lessonId,
  language,
  onPresentationToggle,
  isPresentationMode,
}) => {
  const stages: LessonStage[] = LESSON_PLANS[lessonId] || LESSON_PLANS[1];
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const currentStage = stages[currentStageIndex] || stages[0];

  const [timeLeft, setTimeLeft] = useState<number>(currentStage.timeMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // When stage changes, update timeLeft
  useEffect(() => {
    setTimeLeft(currentStage.timeMinutes * 60);
    setIsRunning(false);
  }, [currentStageIndex, lessonId]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const nextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex((prev) => prev + 1);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex((prev) => prev - 1);
    }
  };

  const resetTimer = () => {
    setTimeLeft(currentStage.timeMinutes * 60);
    setIsRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(
    ((currentStage.timeMinutes * 60 - timeLeft) / (currentStage.timeMinutes * 60)) * 100
  );

  return (
    <div className="bg-slate-900 border border-indigo-900/40 rounded-2xl p-4 shadow-xl mb-6 backdrop-blur-md">
      {/* Top row: Stage Selector and Timer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            {language === 'en' ? `Lesson ${lessonId} Flow (40 Min Plan)` : `№${lessonId} Сабақ жоспары (40 мин)`}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300 font-semibold">
            {language === 'en' ? `Stage ${currentStageIndex + 1} of ${stages.length}:` : `${currentStageIndex + 1}/${stages.length} кезең:`}{' '}
            <strong className="text-white">
              {language === 'en' ? currentStage.nameEn : currentStage.nameKk}
            </strong>
          </span>
        </div>

        {/* Stage Timer Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span
              className={`font-bold ${
                timeLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-slate-500 text-[10px]">/ {currentStage.timeMinutes}m</span>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
            title={isRunning ? 'Pause' : 'Play'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={resetTimer}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Reset stage timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={prevStage}
            disabled={currentStageIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
            title="Previous stage"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={nextStage}
            disabled={currentStageIndex === stages.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
            title="Next stage"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {onPresentationToggle && (
            <button
              onClick={() => onPresentationToggle(!isPresentationMode)}
              className={`p-1.5 rounded-lg border transition-all text-xs flex items-center gap-1 ${
                isPresentationMode
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Toggle Projector Mode"
            >
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Projector' : 'Экран'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Stage Progress Bar */}
      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-3 border border-slate-800">
        <div
          className="bg-indigo-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Stage Details (Teacher Activity, Learner Activity, Assessment) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Teacher Activity' : 'Мұғалім іс-әрекеті'}
          </div>
          <p className="text-slate-300 leading-relaxed">
            {language === 'en' ? currentStage.teacherActivityEn : currentStage.teacherActivityKk}
          </p>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            {language === 'en' ? 'Learner Activity' : 'Оқушы іс-әрекеті'}
          </div>
          <p className="text-slate-300 leading-relaxed">
            {language === 'en' ? currentStage.learnerActivityEn : currentStage.learnerActivityKk}
          </p>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            {language === 'en' ? 'Formative Assessment' : 'Қалыптастырушы бағалау'}
          </div>
          <p className="text-slate-300 leading-relaxed font-semibold">
            {language === 'en' ? currentStage.assessmentEn : currentStage.assessmentKk}
          </p>
        </div>
      </div>
    </div>
  );
};
