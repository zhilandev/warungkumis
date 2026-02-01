import React, { useEffect, useState } from 'react';

interface SceneTransitionProps {
  isActive: boolean;
  phaseName: string;
  onComplete: () => void;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  isActive,
  phaseName,
  onComplete,
}) => {
  const [stage, setStage] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    if (!isActive) return;

    // Stage transitions
    const inTimer = setTimeout(() => {
      setStage('hold');
      
      const holdTimer = setTimeout(() => {
        setStage('out');
        
        const outTimer = setTimeout(() => {
          onComplete();
        }, 500);
        
        return () => clearTimeout(outTimer);
      }, 1500);
      
      return () => clearTimeout(holdTimer);
    }, 500);

    return () => clearTimeout(inTimer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const getAnimationClass = () => {
    switch (stage) {
      case 'in':
        return 'transition-in';
      case 'hold':
        return 'transition-hold';
      case 'out':
        return 'transition-out';
    }
  };

  return (
    <div className={`scene-transition ${getAnimationClass()}`}>
      {/* Background Effect */}
      <div className="transition-bg" />
      
      {/* Particle Effects */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Phase Name */}
      <div className="phase-name-container">
        <div className="phase-name-border">
          <h2 className="phase-name">{phaseName}</h2>
        </div>
        <div className="phase-line" />
      </div>

      {/* Scanline Effect */}
      <div className="scanline-overlay" />
    </div>
  );
};
