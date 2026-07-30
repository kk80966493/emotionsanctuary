import type { Landmark } from './types';

/**
 * 地標熱區座標
 * 基於 2048x1365 的地圖尺寸
 * 座標為百分比，便於響應式縮放
 */
export const LANDMARKS: Landmark[] = [
  // 觀心氣象站 (左上方)
  {
    id: 'weather-station',
    name: '觀心氣象站',
    type: 'station',
    x: 28,
    y: 8,
    width: 12,
    height: 12,
  },
  // 飛鴿驛站 (左中方)
  {
    id: 'dove-station',
    name: '飛鴿驛站',
    type: 'station',
    x: 20,
    y: 32,
    width: 10,
    height: 10,
  },
  // 雨之湖 (右上方)
  {
    id: 'rain-lake',
    name: '雨之湖',
    characterId: 'raindrop',
    type: 'character',
    x: 75,
    y: 28,
    width: 15,
    height: 18,
  },
  // 迷霧谷 (中上方)
  {
    id: 'mist-valley',
    name: '迷霧谷',
    characterId: 'mist',
    type: 'character',
    x: 50,
    y: 18,
    width: 18,
    height: 20,
  },
  // 月眠林 (中方)
  {
    id: 'moon-forest',
    name: '月眠林',
    characterId: 'moon',
    type: 'character',
    x: 45,
    y: 42,
    width: 18,
    height: 20,
  },
  // 星光丘 (右下方)
  {
    id: 'star-hill',
    name: '星光丘',
    characterId: 'star',
    type: 'character',
    x: 72,
    y: 52,
    width: 16,
    height: 18,
  },
  // 雷鳴山 (左上方高處)
  {
    id: 'thunder-mountain',
    name: '雷鳴山',
    characterId: 'thunder',
    type: 'character',
    x: 32,
    y: 2,
    width: 14,
    height: 16,
  },
  // 微風草原 (左下方)
  {
    id: 'breeze-prairie',
    name: '微風草原',
    characterId: 'breeze',
    type: 'character',
    x: 12,
    y: 68,
    width: 16,
    height: 18,
  },
  // 晨曦原 (中下方)
  {
    id: 'sunrise-plain',
    name: '晨曦原',
    characterId: 'sunshine',
    type: 'character',
    x: 40,
    y: 68,
    width: 16,
    height: 18,
  },
  // 大地嶺 (右下方)
  {
    id: 'earth-ridge',
    name: '大地嶺',
    characterId: 'soil',
    type: 'character',
    x: 65,
    y: 75,
    width: 16,
    height: 18,
  },
  // OK洞 (右下角)
  {
    id: 'ok-cave',
    name: 'OK洞',
    characterId: 'elder',
    type: 'character',
    x: 82,
    y: 82,
    width: 12,
    height: 14,
  },
];

export const getLandmarkById = (id: string): Landmark | undefined => {
  return LANDMARKS.find(landmark => landmark.id === id);
};

export const getLandmarksByType = (type: 'character' | 'station'): Landmark[] => {
  return LANDMARKS.filter(landmark => landmark.type === type);
};
