import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string;
}

interface MultipleChoiceQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const correct = index === question.correct;
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
            <span className="pixel-text text-amber-400">PILIHAN GANDA (A-D)</span>
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

        {/* Question */}
        <div className="pixel-panel mb-4">
          <p className="pixel-text text-lg text-white mb-4">
            {question.question}
          </p>

          {/* Options A-D */}
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full pixel-panel text-left p-3 transition-all ${
                  showResult
                    ? index === question.correct
                      ? 'border-green-500 bg-green-900/30'
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-900/30'
                        : 'opacity-50'
                    : 'hover:border-amber-400 cursor-pointer'
                }`}
              >
                <span className="pixel-text text-sm">
                  <span className="text-amber-400 font-bold">{String.fromCharCode(65 + index)}.</span> {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`pixel-panel mb-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className={`pixel-text mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Benar! ✅' : 'Salah! ❌'}
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
