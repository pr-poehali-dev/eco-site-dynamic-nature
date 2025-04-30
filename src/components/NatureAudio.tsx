import { ReactNode, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface NatureAudioProps {
  children: ReactNode;
}

const NatureAudio = ({ children }: NatureAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3'));

  useEffect(() => {
    // Настраиваем аудио
    audio.loop = true;
    audio.volume = 0.2;
    
    // При уходе со страницы останавливаем звук
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  // Обработчик переключения звука
  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        audio.play().catch(() => {
          console.log('Audio play prevented by browser');
        });
      } catch (e) {
        console.log('Audio error', e);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Настройка звуков при наведении на интерактивные элементы
  useEffect(() => {
    // Функция для создания и воспроизведения звука при наведении
    const playHoverSound = (e: MouseEvent) => {
      // Проверяем, что элемент интерактивный (кнопка, ссылка)
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') || 
        target.closest('a');
      
      if (isInteractive && isPlaying) {
        const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-grass-movement-590.mp3');
        hoverSound.volume = 0.1;
        try {
          hoverSound.play().catch(() => {});
        } catch (e) {}
      }
    };
    
    // Добавляем слушатель события наведения
    document.addEventListener('mouseover', playHoverSound);
    
    return () => {
      document.removeEventListener('mouseover', playHoverSound);
    };
  }, [isPlaying]);

  return (
    <>
      {children}
      
      {/* Кнопка управления звуком */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 left-6 z-50 p-3 glass-card rounded-full transition-all duration-300 hover:scale-110 text-white"
        aria-label={isPlaying ? 'Выключить звуки природы' : 'Включить звуки природы'}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
        
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {isPlaying ? 'Выключить звуки природы' : 'Включить звуки природы'}
        </div>
        
        {/* Анимация звуковых волн */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/20"></span>
          </div>
        )}
      </button>
    </>
  );
};

export default NatureAudio;
