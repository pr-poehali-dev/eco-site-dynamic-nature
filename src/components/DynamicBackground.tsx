import { useEffect, useState } from 'react';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');

  useEffect(() => {
    // Определение времени суток на основе текущего часа
    const determineTimeOfDay = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 10) {
        return 'morning';
      } else if (hour >= 10 && hour < 17) {
        return 'day';
      } else if (hour >= 17 && hour < 21) {
        return 'evening';
      } else {
        return 'night';
      }
    };

    setTimeOfDay(determineTimeOfDay());
    
    // Обновляем время суток каждые 15 минут
    const intervalId = setInterval(() => {
      setTimeOfDay(determineTimeOfDay());
    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Определяем задний фон в зависимости от времени суток
  const getBackgroundImage = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920';
      case 'day':
        return 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920';
      case 'evening':
        return 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?q=80&w=1920';
      case 'night':
        return 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1920';
      default:
        return 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920';
    }
  };

  // Определяем место в зависимости от времени суток
  const getLocationName = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'Утренний лес';
      case 'day':
        return 'Дневной лес';
      case 'evening':
        return 'Вечерние горы';
      case 'night':
        return 'Ночной лес';
      default:
        return 'Природа';
    }
  };

  return (
    <div 
      className="fixed inset-0 -z-10 transition-opacity duration-1000"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-lg text-sm">
        {getLocationName()}
      </div>
    </div>
  );
};

export default DynamicBackground;
