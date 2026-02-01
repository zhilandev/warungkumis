import React, { useState } from 'react';
import { fungiDatabase } from '../data/fungi';
import type { FungiData } from '../types';

interface SortingGameProps {
  onComplete: (score: number) => void;
}

interface Question {
  description: string;
  correctFungi: FungiData;
  options: FungiData[];
}

export const SortingGame: React.FC<SortingGameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questions: Question[] = [
    {
      description: '"Bentuknya seperti kuping, tekstur kenyal, warna coklat tua"',
      correctFungi: fungiDatabase.find(f => f.id === 'auricularia')!,
      options: [
        fungiDatabase.find(f => f.id === 'auricularia')!,
        fungiDatabase.find(f => f.id === 'pleurotus')!,
        fungiDatabase.find(f => f.id === 'enoki')!,
      ],
    },
    {
      description: '"Bentuk tiram, tumbuh berlapis di batang, insang putih"',
      correctFungi: fungiDatabase.find(f => f.id === 'pleurotus')!,
      options: [
        fungiDatabase.find(f => f.id === 'enoki')!,
        fungiDatabase.find(f => f.id === 'pleurotus')!,
        fungiDatabase.find(f => f.id === 'auricularia')!,
      ],
    },
    {
      description: '"Batang panjang putih seperti jarum, tudung kecil"',
      correctFungi: fungiDatabase.find(f => f.id === 'enoki')!,
      options: [
        fungiDatabase.find(f => f.id === 'pleurotus')!,
        fungiDatabase.find(f => f.id === 'enoki')!,
        fungiDatabase.find(f => f.id === 'auricularia')!,
      ],
    },
  ];

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const isCorrect = questions[currentQuestion].options[index].id === questions[currentQuestion].correctFungi.id;

    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback('Benar! ✅');
    } else {
      setFeedback('Salah! ❌');
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setShowResult(false);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        onComplete(score + (isCorrect ? 10 : 0));
      }
    }, 2000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">IDENTIFIKASI JAMUR</span>
          </div>
          <div className="pixel-panel">
            <span className="pixel-text">{currentQuestion + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Question */}
        <div className="pixel-panel mb-6 text-center">
          <p className="pixel-text text-lg text-amber-200 mb-2">
            Pelanggan bertanya:
          </p>
          <p className="pixel-text text-xl text-white">
            {question.description}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-4">
          {question.options.map((fungi, index) => (
            <button
              key={fungi.id}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`pixel-panel p-4 transition-all ${
                showResult
                  ? fungi.id === question.correctFungi.id
                    ? 'border-green-500 bg-green-900/30'
                    : selectedAnswer === index
                      ? 'border-red-500 bg-red-900/30'
                      : 'opacity-50'
                  : 'hover:border-amber-400 cursor-pointer'
              }`}
            >
              <img
                src={fungi.image}
                alt={fungi.name}
                className="w-24 h-24 object-contain mx-auto mb-2"
                style={{ imageRendering: 'pixelated' }}
              />
              <p className="pixel-text text-xs text-center">{fungi.name}</p>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <span className={`pixel-text text-xl ${feedback.includes('Benar') ? 'text-green-400' : 'text-red-400'}`}>
              {feedback}
            </span>
          </div>
        )}

        {/* Score */}
        <div className="mt-4 text-center">
          <span className="pixel-text text-amber-400">Skor: {score}</span>
        </div>
      </div>
    </div>
  );
};
