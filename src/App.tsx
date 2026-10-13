import React, { useState } from 'react';
import { Language } from './types/curriculum';
import { Navbar } from './components/Navbar';
import { UnitOverview } from './components/UnitOverview';
import { LessonView } from './components/LessonView';
import { AssessmentModule } from './components/AssessmentModule';
import { AnswerKeysModal } from './components/AnswerKeysModal';
import { QuickCalculator } from './components/QuickCalculator';
import { UnitCircleVisualizer } from './components/UnitCircleVisualizer';
import { GraphExplorer } from './components/GraphExplorer';
import { TriangleVisualizer } from './components/TriangleVisualizer';
import { PrincipalReducer } from './components/PrincipalReducer';
import { MatchingGame } from './components/MatchingGame';
import { Compass, BookOpen, Layers, Award, KeyRound, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'overview' | 'lesson' | 'sandbox' | 'assessment'>('overview');
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('en');
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  const handleSelectView = (
    view: 'overview' | 'lesson' | 'sandbox' | 'assessment',
    lessonId?: number
  ) => {
    setCurrentView(view);
    if (lessonId !== undefined) {
      setCurrentLessonId(lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'kk' : 'en'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Navbar
        currentView={currentView}
        currentLessonId={currentLessonId}
        language={language}
        onSelectView={handleSelectView}
        onToggleLanguage={toggleLanguage}
        onOpenAnswers={() => setIsAnswerModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentView === 'overview' && (
          <UnitOverview
            language={language}
            onSelectLesson={(id) => handleSelectView('lesson', id)}
          />
        )}

        {currentView === 'lesson' && (
          <LessonView
            lessonId={currentLessonId}
            language={language}
            onSelectLesson={(id) => setCurrentLessonId(id)}
          />
        )}

        {currentView === 'sandbox' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-indigo-400" />
                  {language === 'en' ? 'Interactive Visualizer Sandbox' : 'Интерактивті зертхана'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'en'
                    ? 'Explore unit circle projections, graphs, reflections over y = x, reference triangles, and expression reductions'
                    : 'Бірлік шеңбер, графиктер мен асимптоталар, тікбұрышты үшбұрыш және басты аралыққа келтіру тәсілдерін еркін зерттеңіз'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsCalculatorModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
                >
                  {language === 'en' ? 'Quick Calculator' : 'Жылдам калькулятор'}
                </button>
              </div>
            </div>

            <UnitCircleVisualizer language={language} initialFunction="arcsin" />
            <GraphExplorer language={language} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TriangleVisualizer language={language} />
              <PrincipalReducer language={language} />
            </div>

            <MatchingGame language={language} />
          </div>
        )}

        {currentView === 'assessment' && (
          <AssessmentModule language={language} />
        )}
      </main>

      {/* Answer Keys Modal */}
      {isAnswerModalOpen && (
        <AnswerKeysModal
          language={language}
          onClose={() => setIsAnswerModalOpen(false)}
        />
      )}

      {/* Floating Calculator Modal */}
      {isCalculatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl">
            <button
              onClick={() => setIsCalculatorModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <QuickCalculator language={language} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-bold text-slate-400 block">
              Grade 10 Algebra — Unit 10.1C Inverse Trigonometric Functions
            </span>
            <span className="text-[11px] text-slate-500">
              Learning Objectives: 10.2.3.3, 10.2.3.4, 10.2.3.5, 10.2.3.6, 10.2.3.7 • 5 Lessons &amp; СОР/БЖБ
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => handleSelectView('overview')}
              className="hover:text-slate-300 transition-colors"
            >
              {language === 'en' ? 'Overview' : 'Шолу'}
            </button>
            <button
              onClick={() => handleSelectView('assessment')}
              className="hover:text-amber-400 transition-colors"
            >
              {language === 'en' ? 'Assessment (СОР)' : 'БЖБ / СОР'}
            </button>
            <button
              onClick={() => setIsAnswerModalOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              {language === 'en' ? 'Answer Keys' : 'Жауаптар кілті'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
