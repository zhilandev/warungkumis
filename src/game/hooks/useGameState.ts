import { useState, useCallback } from 'react';
import type { GamePhase, GameProgress, MiniGameState, FermentationState } from '../types';

interface GameState {
  phase: GamePhase;
  progress: GameProgress;
  miniGame: MiniGameState | null;
  fermentation: FermentationState | null;
}

const initialProgress: GameProgress = {
  currentAct: 0,
  contaminationCount: 0,
  identifiedFungi: [],
  completedMiniGames: [],
  playerChoices: {},
  totalQuizScore: 0,
  totalQuizQuestions: 0,
};

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: 'menu',
    progress: initialProgress,
    miniGame: null,
    fermentation: null,
  });

  const setPhase = useCallback((phase: GamePhase) => {
    setState(prev => ({ ...prev, phase }));
  }, []);

  const updateProgress = useCallback((updates: Partial<GameProgress>) => {
    setState(prev => ({
      ...prev,
      progress: { ...prev.progress, ...updates },
    }));
  }, []);

  const startMiniGame = useCallback((type: MiniGameState['type']) => {
    setState(prev => ({
      ...prev,
      miniGame: {
        isActive: true,
        type,
        score: 0,
        timeLeft: type === 'microscope' ? 60 : type === 'temperature' ? 45 : 30,
      },
    }));
  }, []);

  const endMiniGame = useCallback((score: number, totalQuestions: number) => {
    setState(prev => {
      const miniGameType = prev.miniGame?.type;
      const newCompleted = miniGameType 
        ? [...prev.progress.completedMiniGames, miniGameType]
        : prev.progress.completedMiniGames;
      
      return {
        ...prev,
        miniGame: null,
        progress: {
          ...prev.progress,
          completedMiniGames: newCompleted,
          totalQuizScore: prev.progress.totalQuizScore + score,
          totalQuizQuestions: prev.progress.totalQuizQuestions + totalQuestions,
        },
      };
    });
  }, []);

  const initFermentation = useCallback((targetTemp: number, targetHumidity: number) => {
    setState(prev => ({
      ...prev,
      fermentation: {
        day: 1,
        temperature: 25,
        humidity: 60,
        progress: 0,
        isContaminated: false,
        targetTemp,
        targetHumidity,
      },
    }));
  }, []);

  const updateFermentation = useCallback((updates: Partial<FermentationState>) => {
    setState(prev => ({
      ...prev,
      fermentation: prev.fermentation 
        ? { ...prev.fermentation, ...updates }
        : null,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: 'menu',
      progress: initialProgress,
      miniGame: null,
      fermentation: null,
    });
  }, []);

  const setPlayerInfo = useCallback((name: string, className: string) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        playerName: name,
        playerClass: className,
      },
    }));
  }, []);

  const makeChoice = useCallback((choiceId: string, value: boolean) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        playerChoices: { ...prev.progress.playerChoices, [choiceId]: value },
      },
    }));
  }, []);

  return {
    state,
    setPhase,
    updateProgress,
    startMiniGame,
    endMiniGame,
    initFermentation,
    updateFermentation,
    resetGame,
    makeChoice,
    setPlayerInfo,
  };
}
