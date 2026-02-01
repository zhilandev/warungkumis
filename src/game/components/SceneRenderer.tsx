import React, { useState, useEffect } from 'react';
import type { GamePhase } from '../types';
import { DialogBox } from './DialogBox';
import { CharacterPortrait } from './CharacterPortrait';
import { SceneTransition } from './SceneTransition';
import { StorySummary } from './StorySummary';
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

// Quiz components for each phase
const quizComponents: Record<string, React.FC<{ questions: any[]; onComplete: (score: number) => void }>> = {
  act1: MultipleChoiceQuiz,
  act2: TrueFalseQuiz,
  act3: WordleGame,
  act4: PickWordGame,
};

const quizQuestions: Record<string, any[]> = {
  act1: act1QuizQuestions,
  act2: act2QuizQuestions,
  act3: act3QuizQuestions,
  act4: act4QuizQuestions,
};

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  phase,
  onPhaseComplete,
  onMiniGameComplete,
}) => {
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showTransition, setShowTransition] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const background = sceneBackgrounds[phase] || sceneBackgrounds.prolog;
  const dialogs = sceneDialogs[phase] || prologDialog;

  // Check if this phase has a quiz
  const hasQuiz = ['act1', 'act2', 'act3', 'act4'].includes(phase);

  // Reset state when phase changes
  useEffect(() => {
    setDialogIndex(0);
    setShowMiniGame(false);
    setShowTransition(true);
    setShowSummary(false);
  }, [phase]);

  // Handle transition complete
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  const handleDialogNext = () => {
    if (dialogIndex < dialogs.length - 1) {
      setDialogIndex(prev => prev + 1);
    } else {
      // At the end of dialogs, show mini game if available
      if (hasQuiz) {
        setShowMiniGame(true);
      } else {
        // No quiz for this phase, just complete it
        onPhaseComplete();
      }
    }
  };

  const handleSkipAll = () => {
    // Show summary instead of going through all dialogs
    if (hasQuiz) {
      setShowSummary(true);
    } else {
      // No quiz, just skip to next phase
      onPhaseComplete();
    }
  };

  const handleSummaryContinue = () => {
    setShowSummary(false);
    setShowMiniGame(true);
  };

  const handleMiniGameComplete = (score: number) => {
    setShowMiniGame(false);
    
    // Pass score to parent
    onMiniGameComplete(score, 5);
    
    // Move to next phase
    onPhaseComplete();
  };

  const handleChoice = (choiceIndex: number) => {
    console.log('Choice selected:', choiceIndex);
  };

  const currentDialog = dialogs[dialogIndex];
  const currentSpeaker = currentDialog?.speaker || 'Narrator';

  // Render quiz based on phase
  const renderQuiz = () => {
    if (!hasQuiz) return null;

    const QuizComponent = quizComponents[phase];
    const questions = quizQuestions[phase];

    if (!QuizComponent || !questions) return null;

    return <QuizComponent questions={questions} onComplete={handleMiniGameComplete} />;
  };

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

      {/* Story Summary (after skip) */}
      {showSummary && hasQuiz && (
        <StorySummary onContinue={handleSummaryContinue} />
      )}

      {/* Mini Games */}
      {showMiniGame && hasQuiz && renderQuiz()}

      {/* Main Scene Content - Dialog */}
      {!showTransition && !showSummary && !showMiniGame && (
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
          {currentSpeaker !== 'Narrator' && (
            <CharacterPortrait
              character={currentSpeaker}
              emotion={currentDialog?.emotion}
              position="left"
              isActive={true}
            />
          )}

          {/* Dialog */}
          <DialogBox
            dialog={dialogs}
            currentIndex={dialogIndex}
            onNext={handleDialogNext}
            onChoice={handleChoice}
            onSkipAll={hasQuiz ? handleSkipAll : undefined}
          />

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
