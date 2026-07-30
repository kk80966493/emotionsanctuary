import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CHARACTERS } from '@shared/characters';
import type { Character } from '@shared/types';

export default function Messages() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('raindrop');
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const character = CHARACTERS[selectedCharacter as keyof typeof CHARACTERS] as Character;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('請寫下你的心聲');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: 調用 API 儲存留言
      console.log('提交留言:', {
        characterId: selectedCharacter,
        playerName: playerName || '匿名訪客',
        message,
      });

      // 模擬提交成功
      setShowSuccess(true);
      setMessage('');
      setPlayerName('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('提交失敗:', error);
      alert('提交失敗，請稍後重試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-2">飛鴿驛站</h1>
          <p className="text-lg text-gray-600">寫下你的心聲，讓陪伴者聽見</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 左側：角色選擇 */}
          <div className="animate-scale-in">
            <h2 className="text-2xl font-serif mb-4">選擇你的陪伴者</h2>
            <div className="space-y-2">
              {Object.entries(CHARACTERS).map(([id, char]) => (
                <button
                  key={id}
                  onClick={() => setSelectedCharacter(id)}
                  className={`w-full p-3 text-left rounded-lg transition-all ${
                    selectedCharacter === id
                      ? 'bg-purple-400 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <span className="text-xl mr-2">{char.emoji}</span>
                  <span className="font-semibold">{char.name}</span>
                  <span className="text-sm ml-2 opacity-75">({char.title})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 右側：留言表單 */}
          <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <Card className="p-6 shadow-soft border-gentle h-full">
              <div className="mb-6">
                <div className="text-5xl mb-2">{character.emoji}</div>
                <h3 className="text-2xl font-serif mb-1">{character.name}</h3>
                <p className="text-gray-600">{character.companionMessage}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    你的名字（選填）
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="匿名訪客"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-400 focus:outline-none"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    你的心聲
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="寫下你想對陪伴者說的話..."
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
                    rows={6}
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {message.length}/500
                  </div>
                </div>

                {showSuccess && (
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                    ✨ 感謝你的信任。陪伴者已收到你的心聲。
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-purple-400 hover:bg-purple-500 text-white rounded-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? '提交中...' : '送出信件'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-all"
                  >
                    返回
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
