import React from 'react';

interface CharacterPortraitProps {
  character: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'surprised' | 'worried';
  position: 'left' | 'right';
  isActive?: boolean;
}

const characterImages: Record<string, string> = {
  'Raka': '/assets/images/character-raka.png',
  'Pak Kumis': '/assets/images/character-pakkumis.png',
  'Bu Siti': '/assets/images/character-busiti.png',
  'Investor': '/assets/images/character-investor.png',
  'Profesor': '/assets/images/character-professor.png',
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  emotion = 'normal',
  position,
  isActive = true,
}) => {
  const imageUrl = characterImages[character];
  
  if (!imageUrl) return null;

  const positionClass = position === 'left' 
    ? 'left-4' 
    : 'right-4';

  const emotionFilter = {
    normal: 'brightness-100',
    happy: 'brightness-110 saturate-110',
    sad: 'brightness-80 saturate-80',
    surprised: 'brightness-115 contrast-110',
    worried: 'brightness-85 sepia-20',
  }[emotion];

  return (
    <div 
      className={`absolute bottom-32 ${positionClass} z-40 transition-all duration-300 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
      }`}
    >
      <div className="relative">
        {/* Character Image */}
        <img
          src={imageUrl}
          alt={character}
          className={`w-48 h-48 object-contain ${emotionFilter}`}
          style={{ 
            imageRendering: 'pixelated',
            filter: position === 'left' ? 'none' : 'none'
          }}
        />
        
        {/* Name Tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <div className="pixel-panel px-3 py-1">
            <span className="pixel-text text-xs text-amber-200">{character}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
