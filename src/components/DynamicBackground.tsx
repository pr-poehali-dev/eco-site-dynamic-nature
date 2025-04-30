import { useEffect, useState } from 'react';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [coordinates, setCoordinates] = useState<{lat: number; lon: number} | null>(null);

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

    // Получаем геолокацию, если доступна
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          console.log('Geolocation permissions denied');
        }
      );
    }

    return () => clearInterval(intervalId);
  }, []);

  // Определяем задний фон в зависимости от времени суток - более современные изображения
  const getBackgroundImage = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2000';
      case 'day':
        return 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000';
      case 'evening':
        return 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2000';
      case 'night':
        return 'https://images.unsplash.com/photo-1532978379173-523e16f371f4?q=80&w=2000';
      default:
        return 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000';
    }
  };

  // Определяем место в зависимости от времени суток
  const getLocationName = () => {
    let baseName = '';
    
    switch (timeOfDay) {
      case 'morning':
        baseName = 'Утренний лес';
        break;
      case 'day':
        baseName = 'Дневной лес';
        break;
      case 'evening':
        baseName = 'Вечерние горы';
        break;
      case 'night':
        baseName = 'Ночной лес';
        break;
      default:
        baseName = 'Природа';
    }
    
    // Добавляем координаты если они есть
    if (coordinates) {
      return `${baseName} • ${coordinates.lat.toFixed(2)}°, ${coordinates.lon.toFixed(2)}°`;
    }
    
    return baseName;
  };

  return (
    <div 
      className="fixed inset-0 -z-10 transition-all duration-2000"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      <div className="absolute bottom-6 right-6 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg">
        <div className="w-2 h-2 rounded-full bg-[#38a169] animate-pulse"></div>
        {getLocationName()}
      </div>
    </div>
  );
};

export default DynamicBackground;
