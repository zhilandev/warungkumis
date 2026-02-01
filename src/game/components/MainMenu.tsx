import React, { useState, useEffect } from 'react';

interface MainMenuProps {
  onStart: () => void;
  onGallery: () => void;
  onCredits: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStart, onGallery, onCredits }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const options = [
    { label: 'MULAI PETUALANGAN', action: onStart, icon: '▶' },
    { label: 'GALERI JAMUR', action: onGallery, icon: '📚' },
    { label: 'TENTANG GAME', action: onCredits, icon: 'ℹ' },
  ];

  // Detect touch device
  useEffect(() => {
    const detectTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    detectTouch();
  }, []);

  // Keyboard navigation (PC only)
  useEffect(() => {
    if (isTouch) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showInstructions) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          setShowInstructions(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          setSelectedOption(prev => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case 'ArrowDown':
          setSelectedOption(prev => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          options[selectedOption].action();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, options, showInstructions, isTouch]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-bg-zoom"
        style={{ 
          backgroundImage: 'url(/assets/images/title-bg.png)',
          imageRendering: 'pixelated',
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* CRT Effect */}
      <div className="absolute inset-0 crt-effect scanline pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 safe-area-top safe-area-bottom">
        {/* Logo/Title Area */}
        <div className="text-center mb-8 md:mb-12 animate-title-float">
          <div className="mb-2 md:mb-4">
            <span className="pixel-text text-[10px] md:text-xs text-amber-300/70 tracking-widest">
              GAME EDUKASI BIOLOGI
            </span>
          </div>
          
          <h1 className="pixel-title text-2xl md:text-4xl lg:text-6xl text-amber-400 mb-1 md:mb-2 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
            WARUNG
          </h1>
          <h1 className="pixel-title text-2xl md:text-4xl lg:text-6xl text-amber-200 mb-2 md:mb-4 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
            FERMENTASI
          </h1>
          
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4">
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="pixel-subtitle text-sm md:text-xl lg:text-2xl text-amber-100">
              WARISAN PAK KUMIS
            </h2>
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          <div className="pixel-panel inline-block px-3 py-1 md:px-4 md:py-2">
            <span className="pixel-text text-[10px] md:text-xs text-gray-400">
              Bandung, 1987
            </span>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-2 md:space-y-3 w-full max-w-xs md:max-w-md px-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              onMouseEnter={() => !isTouch && setSelectedOption(index)}
              onTouchStart={() => setSelectedOption(index)}
              className={`w-full relative group transition-all duration-200 ${
                selectedOption === index ? 'scale-105' : 'scale-100 opacity-90 hover:opacity-100'
              }`}
            >
              <div className={`pixel-btn flex items-center justify-between px-4 md:px-6 py-3 md:py-4 ${
                selectedOption === index 
                  ? 'bg-amber-500 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.4)]' 
                  : ''
              }`}>
                <span className="pixel-text text-[10px] md:text-sm">{option.label}</span>
                <span className="text-base md:text-lg">{option.icon}</span>
              </div>
              
              {/* Selection Indicator (PC only) */}
              {!isTouch && selectedOption === index && (
                <div className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2">
                  <span className="text-amber-400 animate-pulse text-sm md:text-base">▶</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Instructions Button */}
        <button
          onClick={() => setShowInstructions(true)}
          className="mt-6 md:mt-8 pixel-text text-[10px] md:text-xs text-gray-500 hover:text-amber-400 transition-colors px-4 py-2"
        >
          [?] CARA BERMAIN
        </button>

        {/* Footer Info */}
        <div className="absolute bottom-4 md:bottom-8 text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="pixel-text text-[10px] md:text-xs text-gray-400">
              Durasi: 10-15 menit
            </span>
          </div>
          <p className="pixel-text text-[8px] md:text-xs text-gray-600">
            {isTouch ? 'Sentuh untuk memilih' : 'Gunakan ↑↓ untuk navigasi, ENTER untuk memilih'}
          </p>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="pixel-panel max-w-lg w-full max-h-[85vh] overflow-y-auto scroll-smooth">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
              <h3 className="pixel-subtitle text-base md:text-lg text-amber-400">CARA BERMAIN</h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="pixel-btn text-xs px-3 py-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="border-l-4 border-amber-500 pl-3 md:pl-4">
                <h4 className="pixel-text text-xs md:text-sm text-amber-200 mb-1">📖 Cerita</h4>
                <p className="pixel-text text-[10px] md:text-xs text-gray-400">
                  Ikuti perjalanan Raka menyelamatkan warung fermentasi milik Kakek Pak Kumis. 
                  Baca dialog dengan teliti untuk memahami cerita.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-3 md:pl-4">
                <h4 className="pixel-text text-xs md:text-sm text-green-200 mb-1">🎮 Mini-Games</h4>
                <p className="pixel-text text-[10px] md:text-xs text-gray-400">
                  Setiap Act memiliki mini-game berbeda:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="pixel-text text-[9px] md:text-xs text-gray-500">• Act I: Pilihan Ganda (A-D)</li>
                  <li className="pixel-text text-[9px] md:text-xs text-gray-500">• Act II: Benar/Salah</li>
                  <li className="pixel-text text-[9px] md:text-xs text-gray-500">• Act III: Tebak Kata (Wordle)</li>
                  <li className="pixel-text text-[9px] md:text-xs text-gray-500">• Act IV: Pilih Kata</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-3 md:pl-4">
                <h4 className="pixel-text text-xs md:text-sm text-blue-200 mb-1">🏆 Ending</h4>
                <p className="pixel-text text-[10px] md:text-xs text-gray-400">
                  Skor akhir menentukan ending yang kamu dapatkan. Semakin banyak jawaban benar, 
                  semakin baik endingnya!
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-3 md:pl-4">
                <h4 className="pixel-text text-xs md:text-sm text-purple-200 mb-1">🎯 Tips</h4>
                <p className="pixel-text text-[10px] md:text-xs text-gray-400">
                  {isTouch 
                    ? 'Sentuh layar untuk berinteraksi. Pada Wordle, gunakan keyboard virtual.'
                    : 'Gunakan mouse/keyboard untuk berinteraksi. Pada Wordle, ketik dengan keyboard.'}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-6 text-center">
              <button
                onClick={() => setShowInstructions(false)}
                className="pixel-btn text-xs md:text-sm"
              >
                MENGERTI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
