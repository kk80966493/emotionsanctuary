import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QUIZ_QUESTIONS, calculateQuizResult } from '@shared/quiz';
import { CHARACTERS } from '@shared/characters';
import type { Character } from '@shared/types';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (characterId: string) => {
    const newAnswers = [...answers, characterId];
    setAnswers(newAnswers);

    if (newAnswers.length < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = calculateQuizResult(answers as Array<keyof typeof CHARACTERS>);
    const character = CHARACTERS[result.characterId as keyof typeof CHARACTERS] as Character;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 animate-fade-in">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{character.emoji}</div>
            <h1 className="text-4xl font-serif mb-2">{character.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{character.title}</p>
          </div>

          <Card className="p-8 mb-8 shadow-soft border-gentle">
            <h2 className="text-2xl font-serif mb-4">你的陪伴者</h2>
            <p className="text-lg leading-relaxed mb-6">{character.companionMessage}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">陪伴的情緒</h3>
                <p className="text-gray-700">{character.emotionsFocused.join('、')}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">每天的小事</h3>
                <p className="text-gray-700">{character.dailyTask}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">曾經的脆弱</h3>
                <p className="text-gray-700">{character.pastVulnerability}</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRestart}
              className="px-8 py-3 bg-purple-400 hover:bg-purple-500 text-white rounded-lg transition-all"
            >
              重新測驗
            </Button>
            <Button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all"
            >
              返回地圖
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 animate-fade-in">
      <div className="max-w-2xl w-full">
        {/* 進度條 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              第 {currentQuestion + 1} / {QUIZ_QUESTIONS.length} 題
            </span>
            <span className="text-sm font-semibold text-purple-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 題目 */}
        <Card className="p-8 mb-8 shadow-soft border-gentle animate-scale-in">
          <h2 className="text-2xl font-serif mb-6 leading-relaxed">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.characterId)}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:border-purple-600"
              >
                <span className="text-lg">{option.text}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* 返回按鈕 */}
        <div className="text-center">
          <Button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all"
          >
            返回地圖
          </Button>
        </div>
      </div>
    </div>
  );
}
