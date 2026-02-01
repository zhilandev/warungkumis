import React, { useState, useEffect, useCallback } from 'react';

interface TemperatureGameProps {
  targetTemp: number;
  duration: number;
  onComplete: (success: boolean) => void;
}

export const TemperatureGame: React.FC<TemperatureGameProps> = ({
  targetTemp,
  duration,
  onComplete,
}) => {
  const [temperature, setTemperature] = useState(20);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState(false);

  const tempRange = 5; // acceptable range from target
  const minTemp = targetTemp - tempRange;
  const maxTemp = targetTemp + tempRange;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      const inRange = temperature >= minTemp && temperature <= maxTemp;
      setSuccess(inRange);
      setIsRunning(false);
    }
  }, [isRunning, timeLeft, temperature, minTemp, maxTemp]);

  // Natural temperature drift
  useEffect(() => {
    if (!isRunning) return;
    
    const drift = setInterval(() => {
      setTemperature(prev => {
        const driftAmount = (Math.random() - 0.5) * 2;
        return Math.max(15, Math.min(45, prev + driftAmount));
      });
    }, 500);

    return () => clearInterval(drift);
  }, [isRunning]);

  const adjustTemp = useCallback((amount: number) => {
    setTemperature(prev => Math.max(15, Math.min(45, prev + amount)));
  }, []);

  const startGame = () => {
    setIsRunning(true);
  };

  const handleComplete = () => {
    onComplete(success);
  };

  const getTempColor = () => {
    if (temperature >= minTemp && temperature <= maxTemp) return 'text-green-400';
    if (temperature < minTemp) return 'text-blue-400';
    return 'text-red-400';
  };

  const getBarColor = () => {
    if (temperature >= minTemp && temperature <= maxTemp) return 'bg-green-500';
    if (temperature < minTemp) return 'bg-blue-500';
    return 'bg-red-500';
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="pixel-panel mb-4 text-center">
          <span className="pixel-text text-amber-400">KONTROL SUHU FERMENTASI</span>
        </div>

        {/* Target Info */}
        <div className="pixel-panel mb-4">
          <p className="pixel-text text-sm text-center">
            Target Suhu: <span className="text-green-400">{targetTemp}°C</span> (±{tempRange}°C)
          </p>
          <p className="pixel-text text-xs text-center text-gray-400 mt-1">
            Waktu: {timeLeft}s
          </p>
        </div>

        {/* Temperature Display */}
        <div className="pixel-panel mb-6">
          <div className="text-center mb-4">
            <span className={`pixel-title text-4xl ${getTempColor()}`}>
              {temperature.toFixed(1)}°C
            </span>
          </div>

          {/* Temperature Bar */}
          <div className="pixel-progress h-8">
            <div 
              className={`pixel-progress-fill ${getBarColor()}`}
              style={{ width: `${((temperature - 15) / 30) * 100}%` }}
            />
          </div>

          {/* Target Zone Indicator */}
          <div className="relative h-4 mt-1">
            <div 
              className="absolute h-full bg-green-500/30"
              style={{ 
                left: `${((minTemp - 15) / 30) * 100}%`,
                width: `${((maxTemp - minTemp) / 30) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Controls */}
        {!isRunning && timeLeft === duration ? (
          <div className="text-center">
            <button onClick={startGame} className="pixel-btn">
              MULAI
            </button>
          </div>
        ) : timeLeft > 0 ? (
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => adjustTemp(-2)}
              className="pixel-btn text-2xl px-6"
              disabled={!isRunning}
            >
              ❄️ DINGIN
            </button>
            <button 
              onClick={() => adjustTemp(2)}
              className="pixel-btn text-2xl px-6"
              disabled={!isRunning}
            >
              🔥 PANAS
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className={`pixel-panel mb-4 ${success ? 'border-green-500' : 'border-red-500'}`}>
              <p className={`pixel-text text-xl ${success ? 'text-green-400' : 'text-red-400'}`}>
                {success ? 'FERMENTASI BERHASIL! ✅' : 'FERMENTASI GAGAL! ❌'}
              </p>
            </div>
            <button onClick={handleComplete} className="pixel-btn">
              LANJUTKAN
            </button>
          </div>
        )}

        {/* Status */}
        <div className="mt-4 text-center">
          <span className={`pixel-text ${getTempColor()}`}>
            {temperature >= minTemp && temperature <= maxTemp 
              ? '✅ SUHU OPTIMAL' 
              : temperature < minTemp 
                ? '❄️ TERLALU DINGIN' 
                : '🔥 TERLALU PANAS'}
          </span>
        </div>
      </div>
    </div>
  );
};
