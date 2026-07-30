import { useState } from 'react';
import { useLocation } from 'wouter';
import InteractiveMap from '@/components/InteractiveMap';
import CharacterModal from '@/components/CharacterModal';
import { CHARACTERS } from '@shared/characters';
import { LANDMARKS } from '@shared/landmarks';
import type { Landmark, Character, CharacterRole } from '@shared/types';

const MAP_IMAGE_URL = '/manus-storage/IMG_2751_1b8271a9.jpg';

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  const handleLandmarkClick = (landmark: Landmark) => {
    // 如果是角色地點，打開角色介紹
    if (landmark.type === 'character' && landmark.characterId) {
      const character = CHARACTERS[landmark.characterId as CharacterRole];
      if (character) {
        setSelectedCharacter(character);
        setIsCharacterModalOpen(true);
      }
    }
    // 如果是功能站點，導向對應功能
    else if (landmark.type === 'station') {
      if (landmark.id === 'weather-station') {
        setLocation('/quiz');
      } else if (landmark.id === 'dove-station') {
        setLocation('/messages');
      }
    }
  };

  return (
    <div className="w-full h-screen bg-background">
      <InteractiveMap
        onLandmarkClick={handleLandmarkClick}
        mapImageUrl={MAP_IMAGE_URL}
      />
      
      <CharacterModal
        character={selectedCharacter}
        isOpen={isCharacterModalOpen}
        onClose={() => {
          setIsCharacterModalOpen(false);
          setSelectedCharacter(null);
        }}
      />
    </div>
  );
}
