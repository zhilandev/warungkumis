import React, { useState } from 'react';

interface Question {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string;
}

interface PickWordGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const PickWordGame: React.FC<PickWordGameProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentQ];

  // Render sentence with blank
  const renderSentence = () => {
    const parts = question.sentence.split('___');
    return (
      <span>
        {parts[0]}
        <span className="inline-block min-w-[60px] md:min-w-[100px] border-b-2 md:border-b-4 border-amber-400 mx-1 px-1 md:px-2 text-amber-400 text-sm md:text-base">
          {showResult ? question.options[question.correct] : '???'}
        </span>
        {parts[1]}
      </span>
    );
  };

  const handleSelect = (index: number) => {
    if (showResult) return;

    setSelectedOption(index);
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
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      const finalScore = score + (isCorrect ? 10 : 0);
      onComplete(finalScore);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-3 md:p-4 overflow-y-auto">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <div className="pixel-panel py-1 px-2 md:px-3">
            <span className="pixel-text text-[10px] md:text-xs text-amber-400">PILIH KATA</span>
          </div>
          <div className="pixel-panel py-1 px-2 md:px-3">
            <span className="pixel-text text-[10px] md:text-xs">{currentQ + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-2 md:mb-4">
          <span className="pixel-text text-[10px] md:text-sm text-amber-400">Skor: {score}</span>
        </div>

        {/* Question Image */}
        {question.image && (
          <div className="flex justify-center mb-2 md:mb-4">
            <img
              src={question.image}
              alt="Question"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}

        {/* Sentence with Blank */}
        <div className="pixel-panel mb-4 md:mb-6 text-center py-3 md:py-4 px-3 md:px-4">
          <p className="pixel-text text-[9px] md:text-xs text-gray-400 mb-1 md:mb-2">LENGKAPI KALIMAT INI:</p>
          <p className="pixel-text text-sm md:text-lg text-white leading-relaxed">
            {renderSentence()}
          </p>
        </div>

        {/* Word Options */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              onTouchStart={() => handleSelect(index)}
              disabled={showResult}
              className={`pixel-panel p-3 md:p-4 text-center transition-all touch-manipulation ${
                showResult
                  ? index === question.correct
                    ? 'border-green-500 bg-green-900/30'
                    : selectedOption === index
                      ? 'border-red-500 bg-red-900/30'
                      : 'opacity-50'
                  : 'hover:border-amber-400 cursor-pointer hover:bg-amber-900/20 active:scale-95'
              }`}
            >
              <span className="pixel-text text-xs md:text-sm">{option}</span>
            </button>
          ))}
        </div>

        {/* Result */}
        {showResult && (
          <div className={`pixel-panel mb-3 md:mb-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className={`pixel-text text-lg md:text-xl mb-1 md:mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Benar! ✅' : 'Salah! ❌'}
            </p>
            <p className="pixel-text text-[10px] md:text-sm text-gray-300">
              {question.explanation}
            </p>
            <button onClick={handleNext} className="pixel-btn mt-3 md:mt-4 w-full text-[10px] md:text-xs py-2 md:py-3">
              {currentQ < questions.length - 1 ? 'SOAL BERIKUTNYA' : 'SELESAI'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
