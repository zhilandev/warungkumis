import React, { useState } from 'react';

interface Question {
  sentence: string;
  blank: string;
  answer: string;
  alternatives?: string[];
  explanation: string;
  image?: string;
}

interface FillInBlankProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const FillInBlank: React.FC<FillInBlankProps> = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const question = questions[currentQ];

  const checkAnswer = (userAnswer: string): boolean => {
    const normalized = userAnswer.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    
    if (normalized === correctAnswer) return true;
    
    if (question.alternatives) {
      return question.alternatives.some(alt => alt.toLowerCase() === normalized);
    }
    
    return false;
  };

  const getFirstLetter = (): string => {
    return question.answer.charAt(0).toUpperCase();
  };

  const handleSubmit = () => {
    if (showResult) return;

    const correct = checkAnswer(input);
    setIsCorrect(correct);
    setAttempts(a => a + 1);
    
    if (correct) {
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

  // Render sentence with blank
  const renderSentence = () => {
    const parts = question.sentence.split('___');
    return (
      <span>
        {parts[0]}
        <span className="inline-block min-w-[120px] border-b-4 border-amber-400 mx-2 text-center text-amber-400">
          {showResult ? question.answer : '?'}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">LENGKAPI KALIMAT</span>
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

        {/* Sentence with Blank */}
        <div className="pixel-panel mb-6 text-center">
          <p className="pixel-text text-xs text-gray-400 mb-2">LENGKAPI KALIMAT INI:</p>
          <p className="pixel-text text-lg text-white leading-relaxed">
            {renderSentence()}
          </p>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="pixel-panel mb-4 border-blue-500">
            <p className="pixel-text text-sm text-blue-400">
              💡 Petunjuk: Jawaban dimulai dengan huruf "{getFirstLetter()}"
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
              placeholder={`Jawaban (${question.blank})...`}
              className="w-full bg-slate-800 border-4 border-slate-600 p-4 pixel-text text-lg text-white text-center placeholder-gray-500 focus:border-amber-400 focus:outline-none"
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
              {isCorrect ? 'Benar! ✅' : 'Jawaban yang benar: ' + question.answer}
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
