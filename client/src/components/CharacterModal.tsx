import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Character } from '@shared/types';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* 角色頭部 */}
          <div className="text-center space-y-3">
            <div className="text-6xl">{character.emoji}</div>
            <div>
              <h2 className="text-3xl font-bold">{character.name}</h2>
              <p className="text-lg text-muted-foreground">{character.title}</p>
              <p className="text-sm text-muted-foreground mt-1">棲息地：{character.location}</p>
            </div>
          </div>

          {/* 角色立繪預留 */}
          {character.portraitUrl ? (
            <div className="flex justify-center">
              <img
                src={character.portraitUrl}
                alt={character.name}
                className="max-h-64 rounded-lg shadow-soft"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-48 h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                [角色立繪預留]
              </div>
            </div>
          )}

          {/* 負責陪伴的情緒 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">負責陪伴</h3>
            <div className="flex flex-wrap gap-2">
              {character.emotionsFocused.map((emotion) => (
                <span
                  key={emotion}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {emotion}
                </span>
              ))}
            </div>
          </div>

          {/* 每天的小事 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">每天的小事</h3>
            <p className="text-foreground/80 leading-relaxed">{character.dailyTask}</p>
          </div>

          {/* 曾經的脆弱 */}
          <div className="space-y-2 bg-popover p-4 rounded-lg border-gentle">
            <h3 className="font-semibold text-foreground">曾經的脆弱</h3>
            <p className="text-foreground/80 leading-relaxed italic">{character.pastVulnerability}</p>
          </div>

          {/* 陪伴訊息 */}
          <div className="space-y-2 bg-accent/5 p-4 rounded-lg border border-accent/20">
            <h3 className="font-semibold text-foreground">陪伴訊息</h3>
            <p className="text-foreground/80 leading-relaxed">{character.companionMessage}</p>
          </div>

          {/* 關閉按鈕 */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            關閉
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
