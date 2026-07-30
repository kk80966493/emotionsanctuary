export type CharacterRole = 
  | 'raindrop' 
  | 'mist' 
  | 'thunder' 
  | 'soil' 
  | 'star' 
  | 'moon' 
  | 'sunshine' 
  | 'breeze' 
  | 'elder';

export interface Character {
  id: CharacterRole;
  name: string;
  emoji: string;
  title: string;
  location: string;
  emotionsFocused: string[];
  dailyTask: string;
  pastVulnerability: string;
  portraitUrl?: string;
  companionMessage: string;
}

export interface Landmark {
  id: string;
  name: string;
  characterId?: CharacterRole;
  type: 'character' | 'station';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: {
    text: string;
    characterScores: Partial<Record<CharacterRole, number>>;
  }[];
}

export interface QuizResult {
  characterId: CharacterRole;
  score: number;
  message: string;
}

export interface Message {
  id: string;
  recipientCharacterId: CharacterRole;
  content: string;
  createdAt: Date;
  userEmail?: string;
}

export interface CharacterStats {
  characterId: CharacterRole;
  selectionCount: number;
}
