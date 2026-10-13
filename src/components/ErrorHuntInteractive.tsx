import React, { useState } from 'react';
import { Language } from '../types/curriculum';
import { AlertCircle, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface ErrorHuntInteractiveProps {
  language: Language;
}

export const ErrorHuntInteractive: React.FC<ErrorHuntInteractiveProps> = ({ language }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const options = [
    {
      id: 1,
      textEn: 'The student calculated sin(2π/3) wrong; it should be −√3/2.',
      textKk: 'Оқушы sin(2π/3) мәнін қате тапты; ол −√3/2 болуы керек еді.',
      isCorrect: false,
      feedbackEn: 'Incorrect! sin(2π/3) is indeed √3/2, but that is NOT the error here.',
      feedbackKk: 'Қате! sin(2π/3) шынымен де √3/2, бірақ мәселе онда емес.',
    },
    {
      id: 2,
      textEn: '2π/3 is outside the range [−π/2; π/2] of arcsin, so there is NO SOLUTION!',
      textKk: '2π/3 мәні арксинустың мәндер жиынына [−π/2; π/2] кірмейді (2π/3 > π/2), сондықтан ТЕҢДЕУДІҢ ШЕШІМІ ЖОҚ!',
      isCorrect: true,
      feedbackEn: 'Correct! By definition, arcsin x only outputs values in [−π/2; π/2]. Since 2π/3 ≈ 2.09 > π/2 ≈ 1.57, arcsin x can never equal 2π/3.',
      feedbackKk: 'Дұрыс! Анықтама бойынша arcsin x мәндері тек [−π/2; π/2] аралығында ғана болады. 2π/3 > π/2 болғандықтан, arcsin x = 2π/3 теңдеуінің нақты шешімі болмайды.',
    },
    {
      id: 3,
      textEn: 'The formula should be x = cos(2π/3), not sin(2π/3).',
      textKk: 'Бұл жерде sin(2π/3) емес, x = cos(2π/3) болуы керек.',
      isCorrect: false,
      feedbackEn: 'Incorrect! The inverse of sine is sine, not cosine.',
      feedbackKk: 'Қате! Арксинустың кері амалы косинус емес, синус.',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            {language === 'en'
              ? 'Lesson 5 Warm-Up: Error Hunt ("Қатені тап")'
              : '5-сабақ: Қатені тап (Сергіту тапсырмасы)'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Diagnose what went wrong in this common student misconception'
              : 'Оқушының жиі жіберетін өрескел қатесін талдап, анықтаңыз'}
          </p>
        </div>
      </div>

      {/* The Student's Flawed Solution Display */}
      <div className="bg-rose-950/20 border border-rose-500/40 rounded-xl p-4 mb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400 block mb-1">
          {language === 'en' ? 'Student Work on Board:' : 'Тақтадағы оқушы жауабы:'}
        </span>
        <div className="text-base font-mono font-bold text-white flex items-center gap-3">
          <span>arcsin x = 2π/3</span>
          <ArrowRight className="w-4 h-4 text-rose-400" />
          <span className="line-through decoration-rose-500 decoration-2">
            x = sin(2π/3) = √3/2
          </span>
          <span className="text-rose-400 text-xs font-sans font-normal">(WRONG!)</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setSelectedOption(opt.id);
              setHasChecked(true);
            }}
            className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
              selectedOption === opt.id
                ? opt.isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500 text-white'
                  : 'bg-rose-950/60 border-rose-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
              {opt.id}
            </div>
            <div>
              <p className="font-medium">{language === 'en' ? opt.textEn : opt.textKk}</p>
              {hasChecked && selectedOption === opt.id && (
                <p className={`mt-2 text-[11px] ${opt.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {language === 'en' ? opt.feedbackEn : opt.feedbackKk}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Summary Algorithm Card */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-indigo-300">
            {language === 'en' ? 'Core Rule for arcsin x = a:' : 'arcsin x = a үшін негізгі ереже:'}
          </strong>{' '}
          {language === 'en'
            ? 'A solution exists ONLY IF −π/2 ≤ a ≤ π/2. If a is outside this interval, write "No solutions" immediately!'
            : 'Шешімі ТЕК −π/2 ≤ a ≤ π/2 болғанда ғана бар (x = sin a). Егер a бұл аралықтан тыс болса, бірден "Шешімі жоқ" деп жазамыз!'}
        </div>
      </div>
    </div>
  );
};
