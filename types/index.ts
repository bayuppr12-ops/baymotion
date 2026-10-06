// ============================================================
// SPORT EDUCATION - Type Definitions
// ============================================================

export interface Team {
  id: string;
  name: string;
  color: string;
  emoji: string;
  points: number;
  sportsmanship: number;
  cooperation: number;
  discipline: number;
  badges: string[];
  gamesPlayed: number;
  correctAnswers: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  material: string;
  subMaterial: string;
  reflectionPrompt: string;
  imageUrl?: string;
}

export interface SubMaterial {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
  practice: string;
  emoji: string;
  category?: 'teknik' | 'lapangan' | 'teori';
  imageUrl?: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  isPriority: boolean;
  subMaterials: SubMaterial[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  condition: string;
  pointsRequired?: number;
}

export interface GameQuestion {
  id: string;
  text: string;
  options?: string[];
  correctIndex?: number;
  imageEmoji?: string;
  category: 'quiz' | 'gesture' | 'detective' | 'charades';
  /** ID materi (sesuai data/materials.ts), mis. 'bulutangkis' */
  material?: string;
  /** Sub-topik singkat, mis. 'Servis', 'Footwork' */
  subTopic?: string;
  explanation?: string;
  mistake?: string;
  techniqueName?: string;
}

export interface BoardCell {
  id: number;
  type: 'start' | 'points' | 'bonus' | 'challenge' | 'quiz' | 'move' | 'penalty' | 'superchallenge' | 'finish';
  label: string;
  value?: number;
  description?: string;
  emoji: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  points: number;
  emoji: string;
  category?: string;
}

export interface PointLog {
  id: string;
  teamId: string;
  teamName: string;
  amount: number;
  reason: string;
  timestamp: number;
  category: 'quiz' | 'game' | 'challenge' | 'sportsmanship' | 'cooperation' | 'discipline' | 'manual' | 'bonus';
}

export interface ClassSession {
  id: string;
  date: string;
  topic: string;
  teams: Team[];
  pointLogs: PointLog[];
  isActive: boolean;
}

export interface TimerConfig {
  label: string;
  seconds: number;
}

export interface ReflectionQuestion {
  id: string;
  text: string;
  emoji: string;
}
