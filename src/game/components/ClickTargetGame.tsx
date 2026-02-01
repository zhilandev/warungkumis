import React, { useState, useEffect, useCallback } from 'react';

interface ClickTargetGameProps {
  onComplete: (score: number) => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  type: 'tiram' | 'kuping' | 'enoki' | 'wrong';
  requiredClicks: number;
  currentClicks: number;
}

const targetTypes = [
  { type: 'tiram' as const, name: 'Jamur Tiram', image: '/assets/images/pleurotus.png', required: 3 },
  { type: 'kuping' as const, name: 'Jamur Kuping', image: '/assets/images/auricularia.png', required: 3 },
  { type: 'enoki' as const, name: 'Jamur Enoki', image: '/assets/images/enoki.png', required: 3 },
];

const wrongTypes = [
  { type: 'wrong' as const, name: 'Yeast', image: '/assets/images/yeast.png' },
  { type: 'wrong' as const, name: 'Bakteri', image: '/assets/images/bacteria.png' },
];

export const ClickTargetGame: React.FC<ClickTargetGameProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completedTargets, setCompletedTargets] = useState(0);

  // Initialize targets
  useEffect(() => {
    const initialTargets: Target[] = [];
    
    // Add main targets (3 of each type)
    targetTypes.forEach((t, typeIndex) => {
      for (let i = 0; i < 3; i++) {
        initialTargets.push({
          id: typeIndex * 10 + i,
          x: 15 + (typeIndex * 25) + (Math.random() * 10 - 5),
          y: 20 + (i * 25) + (Math.random() * 10 - 5),
          type: t.type,
          requiredClicks: t.required,
          currentClicks: 0,
        });
      }
    });
    
    // Add distractors
    for (let i = 0; i < 6; i++) {
      initialTargets.push({
        id: 100 + i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        type: 'wrong',
        requiredClicks: 0,
        currentClicks: 0,
      });
    }
    
    setTargets(initialTargets);
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

  const getTargetImage = (type: string) => {
    switch (type) {
      case 'tiram': return '/assets/images/pleurotus.png';
      case 'kuping': return '/assets/images/auricularia.png';
      case 'enoki': return '/assets/images/enoki.png';
      case 'wrong': return wrongTypes[Math.floor(Math.random() * wrongTypes.length)].image;
      default: return '/assets/images/yeast.png';
    }
  };

  const getTargetName = (type: string) => {
    switch (type) {
      case 'tiram': return 'Jamur Tiram';
      case 'kuping': return 'Jamur Kuping';
      case 'enoki': return 'Jamur Enoki';
      case 'wrong': return 'Bukan Cendawan';
      default: return '???';
    }
  };

  const handleTargetClick = useCallback((target: Target) => {
    if (gameOver) return;

    if (target.type === 'wrong') {
      setScore(s => Math.max(0, s - 5));
      setFeedback('❌ Itu bukan Cendawan!');
      setTimeout(() => setFeedback(null), 800);
      return;
    }

    setTargets(prev => {
      const updated = prev.map(t => {
        if (t.id === target.id) {
          const newClicks = t.currentClicks + 1;
          
          if (newClicks >= t.requiredClicks) {
            // Target completed
            setScore(s => s + 25);
            setCompletedTargets(c => c + 1);
            setFeedback(`✅ ${getTargetName(t.type)} selesai! +25`);
            return null; // Will be filtered out
          } else {
            setFeedback(`${getTargetName(t.type)}: ${newClicks}/${t.requiredClicks}`);
          }
          
          return { ...t, currentClicks: newClicks };
        }
        return t;
      }).filter(Boolean) as Target[];
      
      return updated;
    });

    setTimeout(() => setFeedback(null), 800);
  }, [gameOver]);

  const handleComplete = () => {
    onComplete(score);
  };

  const totalMainTargets = 9; // 3 of each type
  const remainingMainTargets = targets.filter(t => t.type !== 'wrong').length;

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="pixel-panel">
            <span className="pixel-text text-amber-400">PILIH CENDAWAN!</span>
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

        {/* Progress */}
        <div className="pixel-panel mb-4 text-center">
          <p className="pixel-text text-sm text-amber-200">
            Target: Kumpulkan semua Cendawan!
          </p>
          <p className="pixel-text text-xs text-gray-400 mt-1">
            Sisa: {remainingMainTargets}/{totalMainTargets} | Klik 3x per Cendawan
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {targetTypes.map((t) => (
            <div key={t.type} className="pixel-panel p-2 flex items-center gap-2">
              <img
                src={t.image}
                alt={t.name}
                className="w-8 h-8 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="pixel-text text-xs">{t.name}</span>
            </div>
          ))}
        </div>

        {/* Game Area */}
        <div className="relative bg-slate-800 aspect-video border-4 border-amber-600 overflow-hidden">
          {targets.map((target) => (
            <button
              key={target.id}
              onClick={() => handleTargetClick(target)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              disabled={gameOver}
            >
              <div className="relative">
                <img
                  src={getTargetImage(target.type)}
                  alt={target.type}
                  className="w-14 h-14 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                {target.type !== 'wrong' && target.currentClicks > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="pixel-text text-xs text-white">{target.currentClicks}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <span className={`pixel-text text-lg ${feedback.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {feedback}
            </span>
          </div>
        )}

        {/* Game Over or Complete */}
        {(gameOver || remainingMainTargets === 0) && (
          <div className="mt-4 text-center">
            <div className="pixel-panel mb-4">
              {remainingMainTargets === 0 ? (
                <>
                  <p className="pixel-text text-xl text-green-400 mb-2">SELESAI! 🎉</p>
                  <p className="pixel-text">Semua Cendawan dikumpulkan!</p>
                </>
              ) : (
                <>
                  <p className="pixel-text text-xl text-amber-400 mb-2">WAKTU HABIS!</p>
                  <p className="pixel-text">Cendawan terkumpul: {completedTargets}/{totalMainTargets}</p>
                </>
              )}
              <p className="pixel-text mt-2">Skor Akhir: {score}</p>
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
