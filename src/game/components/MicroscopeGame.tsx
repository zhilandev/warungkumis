import React, { useState, useEffect, useCallback } from 'react';
import { fungiDatabase } from '../data/fungi';
import type { FungiData } from '../types';

interface MicroscopeGameProps {
  onComplete: (score: number) => void;
}

interface GameItem {
  fungi: FungiData;
  x: number;
  y: number;
  id: number;
}

export const MicroscopeGame: React.FC<MicroscopeGameProps> = ({ onComplete }) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Initialize game items
  useEffect(() => {
    const gameFungi = [
      fungiDatabase.find(f => f.id === 'saccharomyces'),
      fungiDatabase.find(f => f.id === 'neurospora'),
      fungiDatabase.find(f => f.id === 'rhizopus'),
      fungiDatabase.find(f => f.id === 'aspergillus'),
      fungiDatabase.find(f => f.id === 'bakteri'),
    ].filter(Boolean) as FungiData[];

    const newItems: GameItem[] = [];
    for (let i = 0; i < 12; i++) {
      const fungi = gameFungi[Math.floor(Math.random() * gameFungi.length)];
      newItems.push({
        fungi,
        x: 10 + Math.random() * 70,
        y: 10 + Math.random() * 60,
        id: i,
      });
    }
    setItems(newItems);
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleItemClick = useCallback((item: GameItem) => {
    if (gameOver) return;

    const isCorrect = item.fungi.id === 'saccharomyces';
    
    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback('Benar! Yeast (Khamir) ✅');
    } else {
      setFeedback(`Salah! Itu ${item.fungi.name} ❌`);
    }

    // Remove clicked item and add new one
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== item.id);
      const gameFungi = fungiDatabase.filter(f => 
        ['saccharomyces', 'neurospora', 'rhizopus', 'aspergillus', 'bakteri'].includes(f.id)
      );
      const fungi = gameFungi[Math.floor(Math.random() * gameFungi.length)];
      newItems.push({
        fungi,
        x: 10 + Math.random() * 70,
        y: 10 + Math.random() * 60,
        id: Date.now(),
      });
      return newItems;
    });

    setTimeout(() => setFeedback(null), 1500);
  }, [gameOver]);

  const handleComplete = () => {
    onComplete(score);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">MIKROSKOP VIEW</span>
          </div>
          <div className="flex gap-4">
            <div className="pixel-panel">
              <span className="pixel-text">Skor: {score}</span>
            </div>
            <div className="pixel-panel">
              <span className="pixel-text">Waktu: {timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="pixel-panel mb-4">
          <p className="pixel-text text-sm text-amber-200">
            Klik pada KHAMIR (Yeast) - jamur uniseluler berbentuk oval dengan tunas!
          </p>
        </div>

        {/* Microscope View */}
        <div className="microscope-view bg-slate-900 aspect-video relative overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(100,200,100,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,200,100,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Game Items */}
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <img
                src={item.fungi.image}
                alt={item.fungi.name}
                className="w-16 h-16 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </button>
          ))}

          {/* Vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <span className={`pixel-text text-lg ${feedback.includes('Benar') ? 'text-green-400' : 'text-red-400'}`}>
              {feedback}
            </span>
          </div>
        )}

        {/* Game Over / Controls */}
        {gameOver && (
          <div className="mt-4 text-center">
            <div className="pixel-panel mb-4">
              <p className="pixel-text text-xl text-amber-400 mb-2">WAKTU HABIS!</p>
              <p className="pixel-text">Skor Akhir: {score}</p>
            </div>
            <button onClick={handleComplete} className="pixel-btn mr-2">
              LANJUTKAN
            </button>
          </div>
        )}

        {!gameOver && (
          <div className="mt-4 flex justify-center">
            <button onClick={handleComplete} className="pixel-btn text-xs">
              SELESAI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
