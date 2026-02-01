import { useGameState } from './game/hooks/useGameState';
import type { GamePhase } from './game/types';
import { 
  MainMenu, 
  PlayerForm,
  SceneRenderer, 
  EndingCredits,
  Gallery, 
  Credits 
} from './game/components';
import './App.css';

function App() {
  const { state, setPhase, updateProgress, endMiniGame, setPlayerInfo, resetGame } = useGameState();

  const handleMenuStart = () => {
    setPhase('playerForm');
  };

  const handlePlayerFormSubmit = (name: string, className: string) => {
    setPlayerInfo(name, className);
    setPhase('prolog');
  };

  const handlePhaseComplete = () => {
    const phaseOrder: GamePhase[] = ['prolog', 'act1', 'act2', 'act3', 'act4', 'epilog'];
    const currentIndex = phaseOrder.indexOf(state.phase);
    
    if (currentIndex < phaseOrder.length - 1) {
      setPhase(phaseOrder[currentIndex + 1]);
      updateProgress({ currentAct: currentIndex + 1 });
    } else {
      // Game completed, show ending credits
      setPhase('ending');
    }
  };

  const handleMiniGameComplete = (score: number, totalQuestions: number) => {
    endMiniGame(score, totalQuestions);
  };

  const handleGallery = () => {
    setPhase('gallery');
  };

  const handleCredits = () => {
    setPhase('credits');
  };

  const handleBackToMenu = () => {
    setPhase('menu');
  };

  const handleEndingComplete = () => {
    resetGame();
    setPhase('menu');
  };

  return (
    <div className="game-container">
      {state.phase === 'menu' && (
        <MainMenu 
          onStart={handleMenuStart}
          onGallery={handleGallery}
          onCredits={handleCredits}
        />
      )}

      {state.phase === 'playerForm' && (
        <PlayerForm onSubmit={handlePlayerFormSubmit} />
      )}

      {(state.phase === 'prolog' || 
        state.phase === 'act1' || 
        state.phase === 'act2' || 
        state.phase === 'act3' || 
        state.phase === 'act4' || 
        state.phase === 'epilog') && (
        <SceneRenderer
          phase={state.phase}
          onPhaseComplete={handlePhaseComplete}
          onMiniGameComplete={handleMiniGameComplete}
        />
      )}

      {state.phase === 'ending' && (
        <EndingCredits
          playerName={state.progress.playerName || 'Pemain'}
          playerClass={state.progress.playerClass || '-'}
          totalScore={state.progress.totalQuizScore}
          totalQuestions={state.progress.totalQuizQuestions}
          onReturnToMenu={handleEndingComplete}
        />
      )}

      {state.phase === 'gallery' && (
        <Gallery onBack={handleBackToMenu} />
      )}

      {state.phase === 'credits' && (
        <Credits onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
