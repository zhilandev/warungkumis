import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Question {
  answer: string;
  hint: string;
  explanation: string;
  image?: string;
}

interface WordleGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const WordleGame: React.FC<WordleGameProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'present' | 'absent' | null>>({});
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  
  const question = questions[currentQ];
  const maxGuesses = 6;
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus hidden input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getLetterStatus = (letter: string, index: number): 'correct' | 'present' | 'absent' => {
    const answer = question.answer.toUpperCase();
    const upperLetter = letter.toUpperCase();
    
    if (answer[index] === upperLetter) {
      return 'correct';
    }
    if (answer.includes(upperLetter)) {
      return 'present';
    }
    return 'absent';
  };

  const handleKeyInput = useCallback((key: string) => {
    if (gameOver) return;
    
    const upperKey = key.toUpperCase();
    
    if (upperKey === 'ENTER') {
      if (currentGuess.length === question.answer.length) {
        submitGuess();
      }
      return;
    }
    
    if (upperKey === 'BACKSPACE' || upperKey === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    
    // Only accept letters A-Z
    if (/^[A-Z]$/.test(upperKey) && currentGuess.length < question.answer.length) {
      setCurrentGuess(prev => prev + upperKey);
    }
  }, [gameOver, currentGuess, question.answer.length]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== question.answer.length) return;

    const upperGuess = currentGuess.toUpperCase();
    const newGuesses = [...guesses, upperGuess];
    setGuesses(newGuesses);

    // Update used letters
    const newUsedLetters = { ...usedLetters };
    upperGuess.split('').forEach((letter, index) => {
      const status = getLetterStatus(letter, index);
      const currentStatus = newUsedLetters[letter];
      
      if (status === 'correct' || currentStatus !== 'correct') {
        if (status === 'present' && currentStatus === 'correct') {
          // Keep correct
        } else {
          newUsedLetters[letter] = status;
        }
      }
    });
    setUsedLetters(newUsedLetters);

    // Check win
    if (upperGuess === question.answer.toUpperCase()) {
      const points = Math.max(5, 25 - (newGuesses.length - 1) * 3);
      setScore(s => s + points);
      setGameOver(true);
    } else if (newGuesses.length >= maxGuesses) {
      setGameOver(true);
    }

    setCurrentGuess('');
  }, [currentGuess, guesses, question.answer, usedLetters]);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setGuesses([]);
      setCurrentGuess('');
      setGameOver(false);
      setUsedLetters({});
      setLastPressedKey(null);
      // Refocus input
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      onComplete(score);
    }
  };

  // Handle physical keyboard (PC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      handleKeyInput(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyInput]);

  // Handle virtual keyboard click
  const handleVirtualKey = (key: string) => {
    setLastPressedKey(key);
    handleKeyInput(key);
    // Refocus hidden input
    inputRef.current?.focus();
    // Clear pressed state after animation
    setTimeout(() => setLastPressedKey(null), 150);
  };

  const getCellClass = (letter: string, rowIndex: number, colIndex: number): string => {
    const guess = guesses[rowIndex];
    if (!guess) return 'bg-slate-800 border-slate-600';
    
    const status = getLetterStatus(letter, colIndex);
    switch (status) {
      case 'correct':
        return 'bg-green-600 border-green-500 text-white';
      case 'present':
        return 'bg-yellow-600 border-yellow-500 text-white';
      case 'absent':
        return 'bg-slate-700 border-slate-600 text-gray-400';
    }
  };

  const getKeyClass = (key: string): string => {
    const isPressed = lastPressedKey === key;
    const status = usedLetters[key];
    
    let baseClass = 'transition-all duration-100 ';
    
    if (isPressed) {
      baseClass += 'scale-95 ';
    }
    
    switch (status) {
      case 'correct':
        return baseClass + 'bg-green-600 text-white border-green-500';
      case 'present':
        return baseClass + 'bg-yellow-600 text-white border-yellow-500';
      case 'absent':
        return baseClass + 'bg-slate-700 text-gray-500 border-slate-600';
      default:
        return baseClass + 'bg-slate-600 text-white border-slate-500 active:bg-slate-500';
    }
  };

  return (
    <div 
      className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden input for physical keyboard */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        onBlur={() => inputRef.current?.focus()}
      />

      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <div className="pixel-panel py-1 px-2 md:px-3">
            <span className="pixel-text text-[10px] md:text-xs text-amber-400">TEBAK KATA</span>
          </div>
          <div className="pixel-panel py-1 px-2 md:px-3">
            <span className="pixel-text text-[10px] md:text-xs">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-2 md:mb-4">
          <span className="pixel-text text-[10px] md:text-sm text-amber-400">Skor: {score}</span>
        </div>

        {/* Hint */}
        <div className="pixel-panel mb-2 md:mb-4 text-center py-2 px-3">
          <p className="pixel-text text-[9px] md:text-xs text-gray-400 mb-1">PETUNJUK:</p>
          <p className="pixel-text text-[10px] md:text-sm text-amber-200">{question.hint}</p>
        </div>

        {/* Question Image */}
        {question.image && (
          <div className="flex justify-center mb-2 md:mb-4">
            <img
              src={question.image}
              alt="Question"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}

        {/* Wordle Grid */}
        <div className="flex flex-col items-center gap-1 md:gap-2 mb-4 md:mb-6">
          {[...Array(maxGuesses)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 md:gap-2">
              {[...Array(question.answer.length)].map((_, colIndex) => {
                let letter = '';
                if (rowIndex < guesses.length) {
                  letter = guesses[rowIndex][colIndex] || '';
                } else if (rowIndex === guesses.length) {
                  letter = currentGuess[colIndex] || '';
                }
                
                return (
                  <div
                    key={colIndex}
                    className={`w-10 h-10 md:w-12 md:h-12 border-2 md:border-4 flex items-center justify-center pixel-text text-lg md:text-xl font-bold transition-all ${
                      letter ? getCellClass(letter, rowIndex, colIndex) : 'bg-slate-800 border-slate-600'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-2 md:gap-4 mb-3 md:mb-4 flex-wrap">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-600 border border-green-500" />
            <span className="pixel-text text-[8px] md:text-xs text-gray-400">Benar</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-600 border border-yellow-500" />
            <span className="pixel-text text-[8px] md:text-xs text-gray-400">Ada</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-slate-700 border border-slate-600" />
            <span className="pixel-text text-[8px] md:text-xs text-gray-400">Tidak</span>
          </div>
        </div>

        {/* Virtual Keyboard */}
        {!gameOver && (
          <div className="space-y-1 md:space-y-2 select-none">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-0.5 md:gap-1">
                {row.map(key => (
                  <button
                    key={key}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleVirtualKey(key);
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleVirtualKey(key);
                    }}
                    className={`w-7 h-9 md:w-8 md:h-10 border-2 pixel-text text-xs md:text-sm ${getKeyClass(key)}`}
                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex justify-center gap-1 md:gap-2 mt-1 md:mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVirtualKey('BACKSPACE');
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVirtualKey('BACKSPACE');
                }}
                className="px-3 md:px-4 h-9 md:h-10 bg-slate-600 border-2 border-slate-500 pixel-text text-[10px] md:text-xs text-white active:bg-slate-500"
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              >
                ⌫
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVirtualKey('ENTER');
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVirtualKey('ENTER');
                }}
                className={`px-4 md:px-6 h-9 md:h-10 border-2 pixel-text text-[10px] md:text-xs ${
                  currentGuess.length === question.answer.length 
                    ? 'bg-amber-600 border-amber-500 text-white active:bg-amber-500' 
                    : 'bg-slate-700 border-slate-600 text-gray-400'
                }`}
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                disabled={currentGuess.length !== question.answer.length}
              >
                ENTER
              </button>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className={`pixel-panel mt-3 md:mt-4 ${guesses[guesses.length - 1] === question.answer.toUpperCase() ? 'border-green-500' : 'border-red-500'}`}>
            {guesses[guesses.length - 1] === question.answer.toUpperCase() ? (
              <>
                <p className="pixel-text text-green-400 mb-1 md:mb-2 text-sm md:text-base">Benar! ✅</p>
                <p className="pixel-text text-[9px] md:text-xs text-gray-400">Percobaan: {guesses.length}/{maxGuesses}</p>
              </>
            ) : (
              <>
                <p className="pixel-text text-red-400 mb-1 md:mb-2 text-sm md:text-base">Jawaban: {question.answer}</p>
                <p className="pixel-text text-[9px] md:text-xs text-gray-400">Percobaan habis!</p>
              </>
            )}
            <p className="pixel-text text-[10px] md:text-xs text-gray-300 mt-2">{question.explanation}</p>
            <button 
              onClick={handleNext} 
              className="pixel-btn mt-3 md:mt-4 w-full text-[10px] md:text-xs py-2 md:py-3"
            >
              {currentQ < questions.length - 1 ? 'SOAL BERIKUTNYA' : 'SELESAI'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
