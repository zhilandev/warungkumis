import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { DialogLine } from '../types';

interface DialogBoxProps {
  dialog: DialogLine[];
  currentIndex: number;
  onNext: () => void;
  onChoice?: (choiceIndex: number) => void;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  dialog,
  currentIndex,
  onNext,
  onChoice,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  // Refs untuk mengontrol typing
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const isProcessingRef = useRef(false);

  const currentLine = dialog[currentIndex];
  const typingSpeed = 20; // ms per character

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
    // Prevent double processing
    if (isProcessingRef.current) return;
    
    if (isTyping) {
      isProcessingRef.current = true;
      
      // Clear typing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      
      // Show full text immediately
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      
      if (currentLine.choices) {
        setShowChoices(true);
      }
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 100);
    } else if (!currentLine.choices) {
      isProcessingRef.current = true;
      onNext();
      // Reset will happen on next dialog mount
    }
  }, [isTyping, currentLine, onNext]);

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
  const handlePointerDown = useCallback((e: React.PointerEvent | React.TouchEvent | React.MouseEvent) => {
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
      {/* Dialog Box */}
      <div 
        className="pixel-dialog mx-0 md:mx-4 mb-2 md:mb-4 cursor-pointer select-none"
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        onPointerDown={handlePointerDown}
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
