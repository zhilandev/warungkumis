import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  image?: string;
}

interface QuizGameProps {
  onComplete: (score: number) => void;
}

const questions: Question[] = [
  {
    question: 'Apa ciri khas Neurospora crassa (Oncom Merah)?',
    options: [
      'Hifa tidak bersekat, warna putih',
      'Hifa bersekat, warna oranye-merah',
      'Uniseluler, bentuk oval',
      'Memiliki tubuh buah seperti payung'
    ],
    correct: 1,
    explanation: 'Neurospora crassa memiliki hifa bersekat (septate) dan berwarna oranye-merah khas.',
    image: '/assets/images/neurospora.png'
  },
  {
    question: 'Suhu optimal untuk pertumbuhan Neurospora adalah?',
    options: [
      '15-20°C',
      '25-28°C',
      '28-30°C',
      '35-40°C'
    ],
    correct: 2,
    explanation: 'Suhu optimal untuk pertumbuhan Neurospora crassa adalah 28-30°C.',
  },
  {
    question: 'Mengapa Aspergillus flavus harus dihindari?',
    options: [
      'Warnanya tidak menarik',
      'Menghasilkan aflatoksin yang beracun',
      'Pertumbuhannya terlalu cepat',
      'Bau tidak sedap'
    ],
    correct: 1,
    explanation: 'Aspergillus flavus menghasilkan aflatoksin, senyawa karsinogenik yang berbahaya.',
    image: '/assets/images/aspergillus.png'
  },
  {
    question: 'Apa yang terjadi jika suhu terlalu panas saat fermentasi?',
    options: [
      'Jamur tumbuh lebih cepat',
      'Jamur mati',
      'Rasa menjadi lebih manis',
      'Tekstur menjadi lebih lembut'
    ],
    correct: 1,
    explanation: 'Suhu terlalu panas dapat membunuh jamur (thermal death).',
  },
  {
    question: 'Oncom terbuat dari bahan dasar apa?',
    options: [
      'Kedelai',
      'Bungkil kacang tanah',
      'Beras ketan',
      'Singkong'
    ],
    correct: 1,
    explanation: 'Oncom terbuat dari bungkil kacang tanah (ampas minyak) yang difermentasi.',
  }
];

export const QuizGame: React.FC<QuizGameProps> = ({ onComplete }) => {
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
      setScore(s => s + 20);
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
      const finalScore = score + (isCorrect ? 20 : 0);
      onComplete(finalScore);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">KUIS KAPANG</span>
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

          {/* Options */}
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
                  {String.fromCharCode(65 + index)}. {option}
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
