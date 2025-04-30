import { useEffect, useRef } from 'react';

// Типы звуков природы
const natureAudioTypes = {
  hover: 'https://freesound.org/data/previews/362/362420_6742917-lq.mp3', // Щебетание птиц
  click: 'https://freesound.org/data/previews/170/170583_3027498-lq.mp3'  // Звук ветра
};

interface NatureAudioProps {
  children: React.ReactNode;
}

const NatureAudio: React.FC<NatureAudioProps> = ({ children }) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    hover: null,
    click: null
  });

  useEffect(() => {
    // Инициализация аудио элементов
    Object.entries(natureAudioTypes).forEach(([type, src]) => {
      const audio = new Audio();
      audio.src = src;
      audio.volume = 0.2;
      audio.preload = 'auto';
      audioRefs.current[type] = audio;
    });

    return () => {
      // Очистка аудио элементов
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  // Функция для обработки hover элементов
  const handleHoverElements = () => {
    const hoverableElements = document.querySelectorAll('button, a, .hoverable');
    
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        playSound('hover');
      });
      
      element.addEventListener('click', () => {
        playSound('click');
      });
    });

    return () => {
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', () => playSound('hover'));
        element.removeEventListener('click', () => playSound('click'));
      });
    };
  };

  useEffect(() => {
    const cleanup = handleHoverElements();
    return cleanup;
  }, []);

  // Воспроизведение звука
  const playSound = (type: string) => {
    const audio = audioRefs.current[type];
    if (audio) {
      // Сбрасываем текущее воспроизведение
      audio.currentTime = 0;
      // Воспроизводим звук
      audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
      });
    }
  };

  return <>{children}</>;
};

export default NatureAudio;
