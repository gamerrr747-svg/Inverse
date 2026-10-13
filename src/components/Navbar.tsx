import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import {
  Compass,
  BookOpen,
  Award,
  KeyRound,
  Globe,
  Calculator,
  Menu,
  X,
  Layers,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'overview' | 'lesson' | 'sandbox' | 'assessment';
  currentLessonId: number;
  language: Language;
  onSelectView: (view: 'overview' | 'lesson' | 'sandbox' | 'assessment', lessonId?: number) => void;
  onToggleLanguage: () => void;
  onOpenAnswers: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  currentLessonId,
  language,
  onSelectView,
  onToggleLanguage,
  onOpenAnswers,
  onOpenCalculator,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLessonDropdownOpen, setIsLessonDropdownOpen] = useState(false);

  const lessons = [
    { id: 1, nameEn: 'L1: Arcsin & Arccos', nameKk: '1-сабақ: Арксинус & Арккосинус' },
    { id: 2, nameEn: 'L2: Arctan & Arcctg', nameKk: '2-сабақ: Арктангенс & Арккотангенс' },
    { id: 3, nameEn: 'L3: Properties & Graphs', nameKk: '3-сабақ: Қасиеттері & Графиктер' },
    { id: 4, nameEn: 'L4: Transforming Expressions', nameKk: '4-сабақ: Өрнектерді түрлендіру' },
    { id: 5, nameEn: 'L5: Simplest Equations', nameKk: '5-сабақ: Қарапайым теңдеулер' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => onSelectView('overview')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">
              Grade 10 Algebra • Unit 10.1C
            </div>
            <div className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
              {language === 'en' ? 'Inverse Trig Functions' : 'Кері тригонометрия'}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => onSelectView('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentView === 'overview'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {language === 'en' ? 'Unit Overview' : 'Бөлімге шолу'}
          </button>

          {/* Lessons Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLessonDropdownOpen(!isLessonDropdownOpen)}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all ${
                currentView === 'lesson'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>
                {currentView === 'lesson'
                  ? language === 'en'
                    ? `Lesson ${currentLessonId}`
                    : `${currentLessonId}-сабақ`
                  : language === 'en'
                  ? 'Lessons (1–5)'
                  : 'Сабақтар (1–5)'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isLessonDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1"
                onMouseLeave={() => setIsLessonDropdownOpen(false)}
              >
                {lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      onSelectView('lesson', l.id);
                      setIsLessonDropdownOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                      currentView === 'lesson' && currentLessonId === l.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{language === 'en' ? l.nameEn : l.nameKk}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sandbox Explorer */}
          <button
            onClick={() => onSelectView('sandbox')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              currentView === 'sandbox'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language === 'en' ? 'Visualizer Lab' : 'Зертхана'}</span>
          </button>

          {/* Summative Assessment (СОР) */}
          <button
            onClick={() => onSelectView('assessment')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              currentView === 'assessment'
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 border border-amber-500/20'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Summative Assessment (СОР)' : 'БЖБ / СОР'}</span>
          </button>
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Calculator */}
          <button
            onClick={onOpenCalculator}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all"
            title="Exact value calculator"
          >
            <Calculator className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Answer keys button */}
          <button
            onClick={onOpenAnswers}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Master Answer Keys"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Answers' : 'Жауаптар'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold font-mono transition-all"
            title="Toggle language: English / Қазақша"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'EN' : 'ҚАЗ'}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2 text-xs font-semibold">
          <button
            onClick={() => {
              onSelectView('overview');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            {language === 'en' ? 'Unit Overview' : 'Бөлімге шолу'}
          </button>

          <div className="pt-2 border-t border-slate-900 text-[11px] uppercase tracking-wider text-slate-500 px-3">
            {language === 'en' ? 'Lessons (40 min each):' : 'Сабақтар:'}
          </div>
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onSelectView('lesson', l.id);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-slate-900"
            >
              {language === 'en' ? l.nameEn : l.nameKk}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-900">
            <button
              onClick={() => {
                onSelectView('sandbox');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-indigo-400 hover:bg-slate-900"
            >
              {language === 'en' ? 'Visualizer Lab' : 'Зертхана'}
            </button>
            <button
              onClick={() => {
                onSelectView('assessment');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-amber-400 hover:bg-slate-900"
            >
              {language === 'en' ? 'Summative Assessment (СОР / БЖБ)' : 'БЖБ / СОР'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
