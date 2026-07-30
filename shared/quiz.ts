import type { Character } from './types';

export interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    text: string;
    characterId: string;
  }>;
}

export interface QuizResult {
  characterId: string;
  score: number;
}

// 7 題情境式心理測驗題目
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '當你經歷失敗或失落時，你最希望得到什麼樣的陪伴？',
    options: [
      { text: '有人靜靜地坐在我身邊，陪我哭', characterId: 'raindrop' },
      { text: '有人告訴我「慢慢來」，陪我走出迷茫', characterId: 'mist' },
      { text: '有人幫我設定界線，保護我的心', characterId: 'thunder' },
      { text: '有人提醒我，每個人都有自己的花期', characterId: 'soil' },
    ],
  },
  {
    id: 2,
    question: '面對人生的選擇時，你的困擾通常是什麼？',
    options: [
      { text: '害怕做錯決定，不知道該往哪走', characterId: 'mist' },
      { text: '被別人的期待壓得喘不過氣', characterId: 'thunder' },
      { text: '容易忽視自己的感受和需求', characterId: 'soil' },
      { text: '無法看見生活中的小幸福', characterId: 'star' },
    ],
  },
  {
    id: 3,
    question: '當你感到焦慮或失眠時，什麼能最有效地幫助你？',
    options: [
      { text: '有人能剪掉那些纏住我的念頭', characterId: 'moon' },
      { text: '有人用溫暖融化我的冰冷', characterId: 'sunshine' },
      { text: '有人陪我經歷這個過程', characterId: 'raindrop' },
      { text: '有人提醒我改變會帶來新的開始', characterId: 'breeze' },
    ],
  },
  {
    id: 4,
    question: '你最難接納自己的是什麼？',
    options: [
      { text: '自己的脆弱和眼淚', characterId: 'raindrop' },
      { text: '自己的不完美和缺點', characterId: 'soil' },
      { text: '自己的憤怒和界線', characterId: 'thunder' },
      { text: '自己的不自信', characterId: 'sunshine' },
    ],
  },
  {
    id: 5,
    question: '當朋友向你傾訴時，你通常會怎麼做？',
    options: [
      { text: '靜靜地聽，讓他知道有人懂他', characterId: 'raindrop' },
      { text: '陪他一起走，不急著給建議', characterId: 'mist' },
      { text: '幫他設定界線，保護他的心', characterId: 'thunder' },
      { text: '提醒他每個人都在自己的時間裡成長', characterId: 'soil' },
    ],
  },
  {
    id: 6,
    question: '生活中最讓你感到無力的時刻是？',
    options: [
      { text: '看不到希望，只想哭', characterId: 'raindrop' },
      { text: '不知道該怎麼辦，感到迷茫', characterId: 'mist' },
      { text: '無法拒絕別人，感到被侵犯', characterId: 'thunder' },
      { text: '懷疑自己，否定自己的價值', characterId: 'sunshine' },
    ],
  },
  {
    id: 7,
    question: '你認為最重要的陪伴是什麼？',
    options: [
      { text: '被看見、被理解、被接納', characterId: 'raindrop' },
      { text: '不被催促，有人陪著我慢慢走', characterId: 'mist' },
      { text: '被尊重，我的界線被保護', characterId: 'thunder' },
      { text: '被相信，我會在自己的時間裡綻放', characterId: 'soil' },
    ],
  },
];

// 計算測驗結果
export function calculateQuizResult(answers: Array<string>): QuizResult {
  const characterScores: Record<string, number> = {};

  // 統計每個角色被選中的次數
  answers.forEach((characterId) => {
    characterScores[characterId] = (characterScores[characterId] || 0) + 1;
  });

  // 找出得分最高的角色
  let topCharacterId = answers[0] || 'raindrop';
  let topScore = 0;

  Object.entries(characterScores).forEach(([characterId, score]) => {
    if (score > topScore) {
      topScore = score;
      topCharacterId = characterId;
    }
  });

  return {
    characterId: topCharacterId,
    score: topScore,
  };
}

// 為了避免循環依賴，這裡使用字符串鍵
const CHARACTERS = {
  raindrop: {},
  mist: {},
  thunder: {},
  soil: {},
  star: {},
  moon: {},
  sunshine: {},
  breeze: {},
  elder: {},
} as const;
