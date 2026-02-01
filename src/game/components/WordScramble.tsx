import React, { useState } from 'react';

interface Question {
  scrambled: string;
  answer: string;
  hint: string;
  explanation: string;
  image?: string;
}

interface WordScrambleProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const WordScramble: React.FC<WordScrambleProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const question = questions[currentQ];

  const handleSubmit = () => {
    if (showResult) return;

    const normalizedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    const normalizedAnswer = question.answer.toLowerCase().replace(/\s+/g, '');
    
    const correct = normalizedInput === normalizedAnswer;
    setIsCorrect(correct);
    setAttempts(a => a + 1);
    
    if (correct) {
      // Score based on attempts: 15 for first try, 10 for second, 5 for third+
      const points = attempts === 0 ? 15 : attempts === 1 ? 10 : 5;
      setScore(s => s + points);
      setShowResult(true);
    } else {
      if (attempts >= 2) {
        setShowResult(true);
      }
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setInput('');
      setShowResult(false);
      setIsCorrect(null);
      setAttempts(0);
      setShowHint(false);
    } else {
      onComplete(score);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">SUSUN KATA</span>
          </div>
          <div className="pixel-panel">
            <span className="pixel-text">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Score & Attempts */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">Skor: {score}</span>
          </div>
          <div className="pixel-panel">
            <span className="pixel-text">Percobaan: {attempts + 1}/3</span>
          </div>
        </div>

        {/* Question Image */}
        {question.image && (
          <div className="flex justify-center mb-4">
            <img
              src={question.image}
              alt="Question"
              className="w-24 h-24 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}

        {/* Scrambled Word */}
        <div className="pixel-panel mb-4 text-center">
          <p className="pixel-text text-xs text-gray-400 mb-2">SUSUN HURUF-HURUF INI:</p>
          <p className="pixel-title text-3xl text-amber-400 tracking-widest">
            {question.scrambled.split('').join(' ')}
          </p>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="pixel-panel mb-4 border-blue-500">
            <p className="pixel-text text-sm text-blue-400">
              💡 Petunjuk: {question.hint}
            </p>
          </div>
        )}

        {/* Input */}
        {!showResult && (
          <div className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik jawabanmu..."
              className="w-full bg-slate-800 border-4 border-slate-600 p-4 pixel-text text-lg text-white text-center placeholder-gray-500 focus:border-amber-400 focus:outline-none uppercase"
              style={{ fontFamily: 'Press Start 2P, cursive', fontSize: '0.8rem' }}
              autoFocus
            />
            
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 pixel-btn"
              >
                JAWAB
              </button>
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="pixel-btn text-xs"
                >
                  💡 PETUNJUK
                </button>
              )}
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`pixel-panel mb-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className={`pixel-text text-xl mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Benar! ✅' : 'Jawaban: ' + question.answer}
            </p>
            {!isCorrect && (
              <p className="pixel-text text-sm text-gray-400 mb-2">
                Kamu menjawab: "{input || '(kosong)'}")
              </p>
            )}
            <p className="pixel-text text-sm text-gray-300">
              {question.explanation}
            </p>
            <button onClick={handleNext} className="pixel-btn mt-4 w-full">
              {currentQ < questions.length - 1 ? 'SOAL BERIKUTNYA' : 'SELESAI'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
