import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, TreePine } from 'lucide-react';

const PlantTreeButton = () => {
  const [isPlanting, setIsPlanting] = useState(false);
  const [seedlingPosition, setSeedlingPosition] = useState({ x: 0, y: 0 });
  const [animations, setAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [nextId, setNextId] = useState(0);
  
  // Обработчик клика по кнопке
  const handlePlant = (e: React.MouseEvent) => {
    if (isPlanting) return;
    
    // Получаем координаты клика
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSeedlingPosition({ x, y });
    setIsPlanting(true);
    
    // Воспроизводим звук посадки
    const audio = new Audio('/planting-sound.mp3');
    audio.volume = 0.4;
    try {
      audio.play().catch(() => {
        console.log('Audio play prevented by browser');
      });
    } catch (e) {
      console.log('Audio error', e);
    }
    
    // Добавляем новую анимацию
    const id = nextId;
    setAnimations(prev => [...prev, { id, x, y }]);
    setNextId(id + 1);
    
    // Создаем событие посадки дерева для счетчика
    const event = new CustomEvent('treePlanted');
    window.dispatchEvent(event);
    
    // Сбрасываем состояние через 2 секунды
    setTimeout(() => {
      setIsPlanting(false);
      // Удаляем анимацию через 3 секунды
      setTimeout(() => {
        setAnimations(prev => prev.filter(a => a.id !== id));
      }, 1000);
    }, 2000);
  };
  
  return (
    <div className="relative">
      <Button
        onClick={handlePlant}
        disabled={isPlanting}
        className="bg-[#38a169] hover:bg-[#2f855a] text-white py-6 px-8 rounded-xl text-lg font-medium relative overflow-hidden transition-all duration-300 group shadow-lg"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          <span>Посадить дерево</span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#38a169] to-[#276749] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>
      
      {/* Анимации саженцев */}
      {animations.map(animation => (
        <div 
          key={animation.id}
          className="absolute z-20 pointer-events-none"
          style={{ 
            left: `${animation.x}px`, 
            top: `${animation.y}px`, 
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative animate-grow">
            <TreePine 
              className="h-8 w-8 text-green-600 animate-fade-in"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />
            <div className="absolute -bottom-1 -left-2 -right-2 h-1 bg-green-900/30 rounded-full blur-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantTreeButton;
