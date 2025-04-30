import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const PlantTreeButton = () => {
  const [isPlanting, setIsPlanting] = useState(false);
  const [treePlanted, setTreePlanted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Инициализация аудио элемента
  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/plant-sound.mp3');
      // Резервный URL для аудио, если файл отсутствует
      audioRef.current.src = 'https://freesound.org/data/previews/411/411089_5121236-lq.mp3';
    }
  };

  const plantTree = () => {
    if (isPlanting || treePlanted) return;
    
    initAudio();
    
    setIsPlanting(true);
    
    // Воспроизведение звука
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error('Ошибка воспроизведения звука:', error));
    }
    
    // Через 2 секунды показываем выросшее дерево
    setTimeout(() => {
      setIsPlanting(false);
      setTreePlanted(true);
      
      // Через 5 секунд сбрасываем состояние
      setTimeout(() => {
        setTreePlanted(false);
      }, 5000);
    }, 2000);
  };

  // Функция для воспроизведения звуков природы при наведении
  const playNatureSound = () => {
    initAudio();
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error('Ошибка воспроизведения звука:', error));
    }
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        onClick={plantTree}
        disabled={isPlanting || treePlanted}
        onMouseEnter={playNatureSound}
        className="organic-button bg-nature-leaf hover:bg-nature-forest text-white font-semibold py-3 px-6 shadow-lg transition-all duration-300 text-lg"
      >
        Посадить дерево
      </Button>
      
      {isPlanting && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="w-2 h-8 bg-nature-bark rounded-t-sm animate-grow-tree"></div>
        </div>
      )}
      
      {treePlanted && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-48 flex flex-col items-center">
          <div className="w-2 h-16 bg-nature-bark"></div>
          <div className="w-16 h-16 bg-nature-leaf rounded-full -mt-2 animate-leaves-wave"></div>
          <div className="mt-2 bg-white bg-opacity-70 p-1 rounded text-sm text-nature-forest">
            Спасибо за заботу о природе!
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantTreeButton;
