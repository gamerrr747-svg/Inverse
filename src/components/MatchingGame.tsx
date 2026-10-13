import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, MatchingCard } from '../types/curriculum';
import { MATCHING_GAME_CARDS } from '../data/curriculumData';
import { Sparkles, Trophy, RotateCcw, Clock, Target } from 'lucide-react';

interface MatchingGameProps {
  language: Language;
}

interface GameCard extends MatchingCard {
  isFlipped: boolean;
  isMatched: boolean;
  uniqueKey: string;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({ language }) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Initialize and shuffle
  const initializeGame = () => {
    const shuffled: GameCard[] = [...MATCHING_GAME_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
        uniqueKey: `${card.id}-${index}`,
      }));

    setCards(shuffled);
    setSelectedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setSeconds(0);
    setIsActive(true);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !gameWon) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, gameWon]);

  // Handle card click
  const handleCardClick = (clickedCard: GameCard) => {
    if (
      clickedCard.isMatched ||
      clickedCard.isFlipped ||
      selectedCards.length === 2 ||
      gameWon
    ) {
      return;
    }

    // Flip the clicked card
    const updatedCards = cards.map((c) =>
      c.uniqueKey === clickedCard.uniqueKey ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, { ...clickedCard, isFlipped: true }];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newSelected;

      // Check match:
      // Must have different types (one expression, one angle) AND the same matchId
      if (first.type !== second.type && first.matchId === second.matchId) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.matchId === first.matchId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setMatchedPairs((prev) => {
            const next = prev + 1;
            if (next === 8) {
              setGameWon(true);
              setIsActive(false);
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
              });
            }
            return next;
          });
        }, 350);
      } else {
        // NO MATCH: flip back after brief delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueKey === first.uniqueKey || c.uniqueKey === second.uniqueKey
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 850);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {language === 'en'
              ? 'Lesson 2 Matching Game (8 Pairs)'
              : '2-сабақ: Сәйкестендіру ойыны (8 жұп)'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'en'
              ? 'Match inverse trigonometric expressions with their exact principal angle values!'
              : 'Кері тригонометриялық өрнектерді тиісті нақты бұрыш мәндерімен сәйкестендіріңіз!'}
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {matchedPairs} / 8 {language === 'en' ? 'Matched' : 'Жұп'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            <span>{moves} {language === 'en' ? 'Moves' : 'Қадам'}</span>
          </div>

          <button
            onClick={initializeGame}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {language === 'en' ? 'Restart' : 'Қайта бастау'}
          </button>
        </div>
      </div>

      {/* Game Complete Modal Banner */}
      {gameWon && (
        <div className="mb-6 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-indigo-500/20 border border-emerald-500/50 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {language === 'en' ? 'Outstanding Mastery!' : 'Керемет нәтиже!'}
              </h4>
              <p className="text-xs text-slate-300">
                {language === 'en'
                  ? `Completed in ${moves} moves and ${formatTime(seconds)}. All 8 pairs accurately identified!`
                  : `${moves} қадамда және ${formatTime(seconds)} уақытта барлық 8 жұпты дұрыс сәйкестендірдіңіз!`}
              </p>
            </div>
          </div>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/30"
          >
            {language === 'en' ? 'Play Again' : 'Тағы ойнау'}
          </button>
        </div>
      )}

      {/* 4x4 Grid of 16 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isSelected = selectedCards.some(
            (c) => c.uniqueKey === card.uniqueKey
          );

          return (
            <button
              key={card.uniqueKey}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched}
              className={`h-24 rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-300 relative border select-none ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 opacity-60 scale-95 shadow-inner'
                  : isSelected || card.isFlipped
                  ? card.type === 'expression'
                    ? 'bg-indigo-900 border-indigo-400 text-white shadow-xl scale-102 ring-2 ring-indigo-400/50'
                    : 'bg-amber-900 border-amber-400 text-white shadow-xl scale-102 ring-2 ring-amber-400/50'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900 shadow-md cursor-pointer'
              }`}
            >
              {/* Type Badge */}
              <div className="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-bold">
                {card.type === 'expression' ? (
                  <span className="text-indigo-400">Expr / Өрнек</span>
                ) : (
                  <span className="text-amber-400">Angle / Бұрыш</span>
                )}
              </div>

              {/* Card Content */}
              <div className="text-base sm:text-lg font-mono font-bold mt-2">
                {card.content}
              </div>

              {card.isMatched && (
                <div className="absolute bottom-1 right-2 text-[10px] text-emerald-400 font-semibold">
                  ✓ {language === 'en' ? 'Matched' : 'Дұрыс'}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
