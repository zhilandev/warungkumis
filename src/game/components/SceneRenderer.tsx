import React, { useState, useEffect } from 'react';
import type { GamePhase } from '../types';
import { DialogBox } from './DialogBox';
import { CharacterPortrait } from './CharacterPortrait';
import { SceneTransition } from './SceneTransition';
import { MultipleChoiceQuiz } from './MultipleChoiceQuiz';
import { TrueFalseQuiz } from './TrueFalseQuiz';
import { WordleGame } from './WordleGame';
import { PickWordGame } from './PickWordGame';
import { 
  prologDialog, 
  act1Dialog, 
  act2Dialog, 
  act3Dialog, 
  act4Dialog, 
  act4EndingDialog,
  epilogDialog,
  act1QuizQuestions,
  act2QuizQuestions,
  act3QuizQuestions,
  act4QuizQuestions,
} from '../data/fungi';

interface SceneRendererProps {
  phase: GamePhase;
  onPhaseComplete: () => void;
  onMiniGameComplete: (score: number, totalQuestions: number) => void;
}

const sceneBackgrounds: Record<string, string> = {
  prolog: '/assets/images/bedroom.png',
  act1: '/assets/images/bedroom.png',
  act2: '/assets/images/kitchen.png',
  act3: '/assets/images/courtyard.png',
  act4: '/assets/images/festival.png',
  epilog: '/assets/images/bedroom.png',
};

const sceneDialogs: Record<string, typeof prologDialog> = {
  prolog: prologDialog,
  act1: act1Dialog,
  act2: act2Dialog,
  act3: act3Dialog,
  act4: [...act4Dialog, ...act4EndingDialog],
  epilog: epilogDialog,
};

const phaseNames: Record<string, string> = {
  prolog: 'PROLOG',
  act1: 'ACT I: KHAMIR',
  act2: 'ACT II: KAPANG',
  act3: 'ACT III: TEMPE',
  act4: 'ACT IV: CENDAWAN',
  epilog: 'EPILOG',
};

// Mini-game trigger points for each act
const miniGameTriggerIndex: Record<string, number> = {
  act1: 5,
  act2: 5,
  act3: 5,
  act4: 5,
};

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  phase,
  onPhaseComplete,
  onMiniGameComplete,
}) => {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [miniGameCompleted, setMiniGameCompleted] = useState(false);
  const [showTransition, setShowTransition] = useState(true);

  const background = sceneBackgrounds[phase] || sceneBackgrounds.prolog;
  const dialogs = sceneDialogs[phase] || prologDialog;

  // Reset state when phase changes
  useEffect(() => {
    setDialogIndex(0);
    setShowMiniGame(false);
    setMiniGameCompleted(false);
    setShowTransition(true);
  }, [phase]);

  // Handle transition complete
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  const handleDialogNext = () => {
    if (dialogIndex < dialogs.length - 1) {
      const nextIndex = dialogIndex + 1;
      setDialogIndex(nextIndex);
      
      // Check if we should trigger mini-game
      const triggerIndex = miniGameTriggerIndex[phase];
      const isActWithMiniGame = ['act1', 'act2', 'act3', 'act4'].includes(phase);
      
      if (isActWithMiniGame && nextIndex === triggerIndex && !miniGameCompleted) {
        setShowMiniGame(true);
      }
    } else {
      // At the end of dialogs, move to next phase
      onPhaseComplete();
    }
  };

  const handleMiniGameComplete = (score: number) => {
    setShowMiniGame(false);
    setMiniGameCompleted(true);
    
    // Pass score to parent (use 5 as default total questions)
    onMiniGameComplete(score, 5);
    
    // Continue to next dialog after mini-game
    const nextIndex = dialogIndex + 1;
    if (nextIndex < dialogs.length) {
      setDialogIndex(nextIndex);
    } else {
      onPhaseComplete();
    }
  };

  const handleChoice = (choiceIndex: number) => {
    console.log('Choice selected:', choiceIndex);
  };

  const currentDialog = dialogs[dialogIndex];
  const currentSpeaker = currentDialog?.speaker || 'Narrator';

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Scene Transition */}
      {showTransition && (
        <SceneTransition
          isActive={showTransition}
          phaseName={phaseNames[phase] || phase.toUpperCase()}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Main Scene Content */}
      {!showTransition && (
        <>
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${background})`,
              imageRendering: 'pixelated',
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Characters */}
          {currentSpeaker !== 'Narrator' && !showMiniGame && (
            <CharacterPortrait
              character={currentSpeaker}
              emotion={currentDialog?.emotion}
              position="left"
              isActive={true}
            />
          )}

          {/* Dialog */}
          {!showMiniGame && (
            <DialogBox
              dialog={dialogs}
              currentIndex={dialogIndex}
              onNext={handleDialogNext}
              onChoice={handleChoice}
            />
          )}

          {/* Mini Games - 4 Types of Quiz */}
          {showMiniGame && phase === 'act1' && (
            <MultipleChoiceQuiz 
              questions={act1QuizQuestions} 
              onComplete={handleMiniGameComplete} 
            />
          )}
          {showMiniGame && phase === 'act2' && (
            <TrueFalseQuiz 
              questions={act2QuizQuestions} 
              onComplete={handleMiniGameComplete} 
            />
          )}
          {showMiniGame && phase === 'act3' && (
            <WordleGame 
              questions={act3QuizQuestions} 
              onComplete={handleMiniGameComplete} 
            />
          )}
          {showMiniGame && phase === 'act4' && (
            <PickWordGame 
              questions={act4QuizQuestions} 
              onComplete={handleMiniGameComplete} 
            />
          )}

          {/* Phase Indicator */}
          <div className="absolute top-4 left-4 z-30">
            <div className="pixel-panel">
              <span className="pixel-text text-xs text-amber-400">
                {phaseNames[phase] || phase.toUpperCase()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
