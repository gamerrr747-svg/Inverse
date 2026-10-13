import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import {
  LEARNING_OBJECTIVES,
  CORE_DEFINITIONS,
  MISCONCEPTIONS,
} from '../data/curriculumData';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface UnitOverviewProps {
  language: Language;
  onSelectLesson: (id: number) => void;
}

export const UnitOverview: React.FC<UnitOverviewProps> = ({
  language,
  onSelectLesson,
}) => {
  const [selectedMisc, setSelectedMisc] = useState<string>(MISCONCEPTIONS[0].id);

  const activeMisconception =
    MISCONCEPTIONS.find((m) => m.id === selectedMisc) || MISCONCEPTIONS[0];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Grade 10 Algebra • Unit 10.1C
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              5 Lessons • 40 min each • СОР
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {language === 'en'
              ? 'Inverse Trigonometric Functions'
              : 'Кері тригонометриялық функциялар'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {language === 'en'
              ? 'Comprehensive interactive teaching and learning platform. Explore restricted principal branches, reflections across y = x, right-triangle trigonometric transformations, equations, and authentic Section Summative Assessment (СОР).'
              : '10-сынып алгебра пәні бойынша интерактивті оқу-әдістемелік кешен. Басты мәндер облысы, y = x түзуі бойынша шағылу, Пифагор және тікбұрышты үшбұрыш тәсілі, қарапайым теңдеулер және БЖБ жиынтық бағалауы.'}
          </p>

          {/* Quick Lesson Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {[
              { id: 1, titleEn: 'Lesson 1', subEn: 'Arcsine & Arccosine', subKk: 'Арксинус & Арккосинус', lo: '10.2.3.3' },
              { id: 2, titleEn: 'Lesson 2', subEn: 'Arctangent & Arccotangent', subKk: 'Арктангенс & Арккотангенс', lo: '10.2.3.3' },
              { id: 3, titleEn: 'Lesson 3', subEn: 'Properties & Graphs', subKk: 'Қасиеттері & Графиктері', lo: '10.2.3.4, 5' },
              { id: 4, titleEn: 'Lesson 4', subEn: 'Transformations & Proofs', subKk: 'Өрнектерді түрлендіру', lo: '10.2.3.6' },
              { id: 5, titleEn: 'Lesson 5', subEn: 'Simplest Equations', subKk: 'Қарапайым теңдеулер', lo: '10.2.3.7' },
            ].map((les) => (
              <button
                key={les.id}
                onClick={() => onSelectLesson(les.id)}
                className="bg-slate-900/90 hover:bg-indigo-900/50 border border-slate-800 hover:border-indigo-500/80 p-3 rounded-2xl text-left transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>{les.titleEn}</span>
                  <span className="text-indigo-400 font-semibold">{les.lo}</span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                  {language === 'en' ? les.subEn : les.subKk}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Core Definitions Board */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              {language === 'en'
                ? 'Core Definitions (Keep on board all unit)'
                : 'Негізгі анықтамалар тақтасы (Бүкіл бөлім бойынша)'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Master reference for Domain, Range, Meaning, and Symmetries'
                : 'Анықталу облысы, мәндер жиыны және симметрия қасиеттері'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_DEFINITIONS.map((def, idx) => (
            <div
              key={idx}
              className="bg-slate-950 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? def.nameEn : def.nameKk}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: def.accentColor }}
                  ></span>
                </div>

                <div className="text-base font-mono font-bold text-white mb-3">
                  {def.func}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      {language === 'en' ? 'Domain (D)' : 'Анықталу облысы:'}
                    </span>
                    <span className="font-mono text-indigo-300 font-bold text-sm">
                      {def.domain}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      {language === 'en' ? 'Range (E)' : 'Мәндер жиыны:'}
                    </span>
                    <span className="font-mono text-emerald-300 font-bold text-sm">
                      {def.range}
                    </span>
                  </div>

                  <div className="text-slate-300 leading-snug pt-1">
                    {language === 'en' ? def.meaningEn : def.meaningKk}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 font-mono text-[11px] text-amber-300/90">
                {language === 'en' ? def.symmetryEn : def.symmetryKk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Common Misconceptions to Watch For */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              {language === 'en'
                ? 'Common Student Misconceptions (5 Critical Traps)'
                : 'Оқушылардың 5 негізгі қате түсініктері мен тұзақтары'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Click on each misconception to view why it fails and how to fix it'
                : 'Әр қатенің себебі мен оның математикалық түзетуін талдаңыз'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List of 5 misconceptions */}
          <div className="lg:col-span-5 space-y-2">
            {MISCONCEPTIONS.map((misc, idx) => (
              <button
                key={misc.id}
                onClick={() => setSelectedMisc(misc.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  selectedMisc === misc.id
                    ? 'bg-rose-950/40 border-rose-500/80 text-white font-bold shadow-md shadow-rose-950/50 ring-1 ring-rose-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    {idx + 1}
                  </span>
                  <span>{language === 'en' ? misc.titleEn : misc.titleKk}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>
            ))}
          </div>

          {/* Detailed analysis of selected misconception */}
          <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-white mb-3">
                {language === 'en'
                  ? activeMisconception.titleEn
                  : activeMisconception.titleKk}
              </h4>

              {/* Wrong vs Right comparison blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-rose-950/20 border border-rose-500/40 p-3 rounded-xl text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    ✗ {language === 'en' ? 'Common Error:' : 'Қате пікір:'}
                  </span>
                  <div className="font-mono text-rose-200 font-semibold">
                    {language === 'en' ? activeMisconception.wrongEn : activeMisconception.wrongKk}
                  </div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/40 p-3 rounded-xl text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    ✓ {language === 'en' ? 'Mathematical Truth:' : 'Дұрыс тұжырым:'}
                  </span>
                  <div className="font-mono text-emerald-200 font-semibold">
                    {language === 'en' ? activeMisconception.rightEn : activeMisconception.rightKk}
                  </div>
                </div>
              </div>

              {/* Explanatory text */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <strong className="text-indigo-400 block mb-1">
                  {language === 'en' ? 'Why this occurs:' : 'Себебі мен түсіндірмесі:'}
                </strong>
                {language === 'en'
                  ? activeMisconception.explanationEn
                  : activeMisconception.explanationKk}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
