// Game State Types
export type GamePhase = 'menu' | 'playerForm' | 'prolog' | 'act1' | 'act2' | 'act3' | 'act4' | 'epilog' | 'ending' | 'gallery' | 'credits';

export type FungiType = 'khamir' | 'kapang' | 'cendawan' | 'bakteri' | 'kontaminan';

export interface FungiData {
  id: string;
  name: string;
  scientificName: string;
  type: FungiType;
  description: string;
  features: string[];
  image: string;
}

export interface DialogLine {
  speaker: string;
  text: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'surprised' | 'worried';
  choices?: DialogChoice[];
}

export interface DialogChoice {
  text: string;
  nextDialog?: number;
  consequence?: () => void;
  requiredKnowledge?: string;
}

export interface MiniGameState {
  isActive: boolean;
  type: 'microscope' | 'temperature' | 'hyphae' | 'sorting' | 'cooking' | 'quiz';
  score: number;
  timeLeft: number;
}

export interface GameProgress {
  currentAct: number;
  contaminationCount: number;
  identifiedFungi: string[];
  completedMiniGames: string[];
  playerChoices: Record<string, boolean>;
  endingType?: 'perfect' | 'good' | 'bad' | 'failure';
  playerName?: string;
  playerClass?: string;
  totalQuizScore: number;
  totalQuizQuestions: number;
}

export interface FermentationState {
  day: number;
  temperature: number;
  humidity: number;
  progress: number;
  isContaminated: boolean;
  targetTemp: number;
  targetHumidity: number;
}
