import React, { useState, useEffect } from 'react';

interface FindObjectGameProps {
  onComplete: (score: number) => void;
}

interface GameObject {
  id: string;
  name: string;
  image: string;
  isTarget: boolean;
}

const objects: GameObject[] = [
  { id: 'yeast', name: 'Khamir', image: '/assets/images/yeast.png', isTarget: true },
  { id: 'bacteria', name: 'Bakteri', image: '/assets/images/bacteria.png', isTarget: false },
  { id: 'aspergillus', name: 'Aspergillus', image: '/assets/images/aspergillus.png', isTarget: false },
  { id: 'neurospora', name: 'Neurospora', image: '/assets/images/neurospora.png', isTarget: false },
  { id: 'rhizopus', name: 'Rhizopus', image: '/assets/images/rhizopus.png', isTarget: false },
];

export const FindObjectGame: React.FC<FindObjectGameProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [gameObjects, setGameObjects] = useState<{ obj: GameObject; x: number; y: number; id: number }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Initialize game objects
  useEffect(() => {
    const newObjects: { obj: GameObject; x: number; y: number; id: number }[] = [];
    
    // Add target objects (yeast)
    for (let i = 0; i < 8; i++) {
      newObjects.push({
        obj: objects[0],
        x: 10 + Math.random() * 75,
        y: 15 + Math.random() * 65,
        id: i,
      });
    }
    
    // Add distractor objects
    for (let i = 8; i < 20; i++) {
      const randomObj = objects[1 + Math.floor(Math.random() * 4)];
      newObjects.push({
        obj: randomObj,
        x: 10 + Math.random() * 75,
        y: 15 + Math.random() * 65,
        id: i,
      });
    }
    
    setGameObjects(newObjects);
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

  const handleObjectClick = (item: { obj: GameObject; id: number }) => {
    if (gameOver) return;

    if (item.obj.isTarget) {
      setScore(s => s + 10);
      setFoundCount(f => f + 1);
      setFeedback('✅ Benar! +10 poin');
    } else {
      setScore(s => Math.max(0, s - 5));
      setFeedback(`❌ Salah! Itu ${item.obj.name}`);
    }

    // Remove clicked object
    setGameObjects(prev => prev.filter(o => o.id !== item.id));

    setTimeout(() => setFeedback(null), 1000);
  };

  const handleComplete = () => {
    onComplete(score);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">CARI KHAMIR!</span>
          </div>
          <div className="flex gap-4">
            <div className="pixel-panel">
              <span className="pixel-text">Waktu: {timeLeft}s</span>
            </div>
            <div className="pixel-panel">
              <span className="pixel-text">Skor: {score}</span>
            </div>
            <div className="pixel-panel">
              <span className="pixel-text">Ditemukan: {foundCount}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="pixel-panel mb-4 text-center">
          <p className="pixel-text text-sm text-amber-200">
            Klik pada <strong>KHAMIR (Yeast)</strong> - jamur oval berwarna krem!
          </p>
          <p className="pixel-text text-xs text-gray-400 mt-1">
            Hindari objek lain! Klik salah = -5 poin
          </p>
        </div>

        {/* Target Image Reference */}
        <div className="flex justify-center mb-4">
          <div className="pixel-panel p-2">
            <img
              src="/assets/images/yeast.png"
              alt="Target"
              className="w-12 h-12 object-contain inline-block"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="pixel-text text-xs text-amber-400 ml-2">← CARI INI</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-slate-800 aspect-video border-4 border-amber-600 overflow-hidden">
          {gameObjects.map((item) => (
            <button
              key={item.id}
              onClick={() => handleObjectClick(item)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              disabled={gameOver}
            >
              <img
                src={item.obj.image}
                alt={item.obj.name}
                className="w-14 h-14 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <span className={`pixel-text text-lg ${feedback.includes('Benar') ? 'text-green-400' : 'text-red-400'}`}>
              {feedback}
            </span>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="mt-4 text-center">
            <div className="pixel-panel mb-4">
              <p className="pixel-text text-xl text-amber-400 mb-2">WAKTU HABIS!</p>
              <p className="pixel-text">Khamir ditemukan: {foundCount}</p>
              <p className="pixel-text">Skor Akhir: {score}</p>
            </div>
            <button onClick={handleComplete} className="pixel-btn">
              LANJUTKAN
            </button>
          </div>
        )}

        {/* Early Complete Button */}
        {!gameOver && gameObjects.filter(o => o.obj.isTarget).length === 0 && (
          <div className="mt-4 text-center">
            <p className="pixel-text text-green-400 mb-2">Semua Khamir ditemukan! 🎉</p>
            <button onClick={handleComplete} className="pixel-btn">
              SELESAI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
