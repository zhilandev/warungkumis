import React, { useState } from 'react';

interface Question {
  statement: string;
  isTrue: boolean;
  explanation: string;
  image?: string;
}

interface TrueFalseQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [, setSelectedAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentQ];

  const handleAnswer = (answer: boolean) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === question.isTrue;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      const finalScore = score + (isCorrect ? 10 : 0);
      onComplete(finalScore);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">BENAR / SALAH</span>
          </div>
          <div className="pixel-panel">
            <span className="pixel-text">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <span className="pixel-text text-amber-400">Skor: {score}</span>
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

        {/* Statement */}
        <div className="pixel-panel mb-6">
          <p className="pixel-text text-xs text-gray-400 mb-2">PERNYATAAN:</p>
          <p className="pixel-text text-lg text-white leading-relaxed">
            "{question.statement}"
          </p>
        </div>

        {/* True/False Buttons */}
        {!showResult && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 pixel-panel p-4 hover:border-green-500 hover:bg-green-900/20 transition-all cursor-pointer"
            >
              <span className="pixel-text text-xl text-green-400">✓ BENAR</span>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 pixel-panel p-4 hover:border-red-500 hover:bg-red-900/20 transition-all cursor-pointer"
            >
              <span className="pixel-text text-xl text-red-400">✗ SALAH</span>
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`pixel-panel mb-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className={`pixel-text text-xl mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Benar! ✅' : 'Salah! ❌'}
            </p>
            <p className="pixel-text text-sm text-gray-300 mb-4">
              Jawaban: <span className={question.isTrue ? 'text-green-400' : 'text-red-400'}>
                {question.isTrue ? 'BENAR' : 'SALAH'}
              </span>
            </p>
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
