import React, { useState, useEffect, useCallback } from 'react';

interface SpeedClickGameProps {
  onComplete: (score: number) => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  type: 'good' | 'bad';
}

export const SpeedClickGame: React.FC<SpeedClickGameProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [spawnRate, setSpawnRate] = useState(1500);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  // Spawn targets
  useEffect(() => {
    if (gameOver) return;

    const spawnInterval = setInterval(() => {
      setTargets(prev => {
        // Remove old targets if too many
        const filtered = prev.length > 8 ? prev.slice(-7) : prev;
        
        const isGood = Math.random() > 0.3; // 70% chance for good target
        const newTarget: Target = {
          id: Date.now(),
          x: 15 + Math.random() * 70,
          y: 15 + Math.random() * 70,
          type: isGood ? 'good' : 'bad',
        };
        
        return [...filtered, newTarget];
      });
      
      // Increase difficulty - faster spawn over time
      setSpawnRate(prev => Math.max(800, prev - 50));
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [gameOver, spawnRate]);

  const handleTargetClick = useCallback((target: Target) => {
    if (gameOver) return;

    if (target.type === 'good') {
      setScore(s => s + 15);
      setFeedback('✅ +15!');
    } else {
      setScore(s => Math.max(0, s - 10));
      setFeedback('❌ -10! Kontaminan!');
    }

    setTargets(prev => prev.filter(t => t.id !== target.id));

    setTimeout(() => setFeedback(null), 500);
  }, [gameOver]);

  const handleComplete = () => {
    onComplete(score);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">ADU CEPAT!</span>
          </div>
          <div className="flex gap-4">
            <div className="pixel-panel">
              <span className="pixel-text">Waktu: {timeLeft}s</span>
            </div>
            <div className="pixel-panel">
              <span className="pixel-text">Skor: {score}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="pixel-panel mb-4 text-center">
          <p className="pixel-text text-sm text-amber-200">
            Klik <span className="text-green-400">RAGI TEMPE (Putih)</span> secepat mungkin!
          </p>
          <p className="pixel-text text-xs text-red-400 mt-1">
            Hindari <span className="text-red-400">KONTAMINAN (Hijam/Hitam)</span>!
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-4">
          <div className="pixel-panel p-2 flex items-center gap-2">
            <img
              src="/assets/images/rhizopus.png"
              alt="Good"
              className="w-10 h-10 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="pixel-text text-xs text-green-400">+15 poin</span>
          </div>
          <div className="pixel-panel p-2 flex items-center gap-2">
            <img
              src="/assets/images/aspergillus.png"
              alt="Bad"
              className="w-10 h-10 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="pixel-text text-xs text-red-400">-10 poin</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-slate-800 aspect-video border-4 border-amber-600 overflow-hidden">
          {targets.map((target) => (
            <button
              key={target.id}
              onClick={() => handleTargetClick(target)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform animate-pulse"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              disabled={gameOver}
            >
              <img
                src={target.type === 'good' ? '/assets/images/rhizopus.png' : '/assets/images/aspergillus.png'}
                alt={target.type}
                className="w-16 h-16 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <span className={`pixel-text text-xl ${feedback.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
              {feedback}
            </span>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="mt-4 text-center">
            <div className="pixel-panel mb-4">
              <p className="pixel-text text-xl text-amber-400 mb-2">WAKTU HABIS!</p>
              <p className="pixel-text">Skor Akhir: {score}</p>
            </div>
            <button onClick={handleComplete} className="pixel-btn">
              LANJUTKAN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
