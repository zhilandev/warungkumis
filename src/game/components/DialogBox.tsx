import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { DialogLine } from '../types';

interface DialogBoxProps {
  dialog: DialogLine[];
  currentIndex: number;
  onNext: () => void;
  onChoice?: (choiceIndex: number) => void;
  onSkipAll?: () => void;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  dialog,
  currentIndex,
  onNext,
  onChoice,
  onSkipAll,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  
  // Refs untuk mengontrol typing
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const isProcessingRef = useRef(false);

  const currentLine = dialog[currentIndex];
  const typingSpeed = 25; // ms per character

  // Detect touch device
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Update ref when index changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Typing effect
  useEffect(() => {
    if (!currentLine) return;
    
    // Clear any existing interval
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    setDisplayedText('');
    setIsTyping(true);
    setShowChoices(false);
    isProcessingRef.current = false;

    let index = 0;
    const text = currentLine.text;
    
    typingIntervalRef.current = setInterval(() => {
      // Check if we're still on the same dialog
      if (currentIndexRef.current !== currentIndex) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        return;
      }
      
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        if (currentLine.choices) {
          setShowChoices(true);
        }
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }
    }, typingSpeed);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [currentLine, currentIndex]);

  const handleAdvance = useCallback(() => {
    // TIDAK BISA LANJUT JIKA MASIH TYPING
    if (isTyping) {
      return; // Abaikan klik saat masih typing
    }
    
    // Prevent double processing
    if (isProcessingRef.current) return;
    
    if (!currentLine.choices) {
      isProcessingRef.current = true;
      onNext();
    }
  }, [isTyping, currentLine, onNext]);

  const handleSkipAll = useCallback(() => {
    setShowSkipConfirm(true);
  }, []);

  const confirmSkip = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setShowSkipConfirm(false);
    if (onSkipAll) {
      onSkipAll();
    }
  }, [onSkipAll]);

  const cancelSkip = useCallback(() => {
    setShowSkipConfirm(false);
  }, []);

  const handleChoice = useCallback((choiceIndex: number) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    
    if (onChoice) {
      onChoice(choiceIndex);
    }
    setShowChoices(false);
    onNext();
  }, [onChoice, onNext]);

  // Keyboard support for PC
  useEffect(() => {
    if (isTouch) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAdvance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance, isTouch]);

  // Handle touch/click with proper event management
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAdvance();
  }, [handleAdvance]);

  if (!currentLine) return null;

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'Raka':
        return 'text-amber-400';
      case 'Pak Kumis':
        return 'text-emerald-400';
      case 'Bu Siti':
        return 'text-rose-400';
      case 'Investor':
        return 'text-blue-400';
      case 'Profesor':
        return 'text-purple-400';
      case 'Narrator':
        return 'text-gray-400';
      default:
        return 'text-amber-200';
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 px-2 md:px-4 pb-2 md:pb-4">
      {/* Skip Button */}
      {onSkipAll && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleSkipAll}
            className="pixel-btn text-[8px] md:text-xs py-1 px-2 md:px-3 opacity-70 hover:opacity-100"
            style={{ touchAction: 'manipulation' }}
          >
            ⏭ SKIP SEMUA
          </button>
        </div>
      )}

      {/* Skip Confirmation Modal */}
      {showSkipConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="pixel-panel max-w-sm w-full text-center">
            <p className="pixel-text text-sm md:text-base text-amber-400 mb-4">
              Lewati semua percakapan?
            </p>
            <p className="pixel-text text-[10px] md:text-xs text-gray-400 mb-6">
              Kamu akan melihat rangkuman cerita dan langsung menuju ke kuis.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={confirmSkip}
                className="pixel-btn text-xs py-2 px-4"
              >
                YA, LEWATI
              </button>
              <button
                onClick={cancelSkip}
                className="pixel-btn text-xs py-2 px-4 bg-slate-600"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Box */}
      <div 
        className={`pixel-dialog mx-0 md:mx-4 mb-2 md:mb-4 select-none ${
          isTyping ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
        }`}
        style={{ 
          touchAction: 'manipulation', 
          WebkitTapHighlightColor: 'transparent',
          pointerEvents: isTyping ? 'none' : 'auto'
        }}
        onPointerDown={!isTyping ? handlePointerDown : undefined}
      >
        {/* Speaker Name */}
        <div className={`pixel-text text-[10px] md:text-xs mb-2 md:mb-3 ${getSpeakerColor(currentLine.speaker)}`}>
          {currentLine.speaker}
        </div>
        
        {/* Dialog Text */}
        <div 
          className="pixel-text text-amber-100 leading-relaxed min-h-[60px] md:min-h-[80px] text-[11px] md:text-sm"
          style={{ wordBreak: 'break-word' }}
        >
          {displayedText}
          {isTyping && <span className="cursor-blink" />}
        </div>

        {/* Continue Indicator */}
        {!isTyping && !showChoices && (
          <div className="flex justify-end mt-2">
            <span className="pixel-text text-[10px] md:text-xs text-amber-400 animate-pulse">
              {isTouch ? '▶ KETUK LANJUTKAN' : '▶ KLIK/ENTER LANJUTKAN'}
            </span>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-end mt-2">
            <span className="pixel-text text-[10px] md:text-xs text-gray-500">
              ⏳ MENGETIK...
            </span>
          </div>
        )}
      </div>

      {/* Choice Buttons */}
      {showChoices && currentLine.choices && (
        <div className="mx-0 md:mx-4 mb-2 md:mb-4 space-y-2">
          {currentLine.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="pixel-btn w-full text-left text-[10px] md:text-xs py-3 md:py-4"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
