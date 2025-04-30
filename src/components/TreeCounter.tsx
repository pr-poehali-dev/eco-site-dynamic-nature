import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const TreeCounter = () => {
  const [treeCount, setTreeCount] = useState(() => {
    const savedCount = localStorage.getItem('savedTrees');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Сохраняем количество деревьев в localStorage
    localStorage.setItem('savedTrees', treeCount.toString());
    
    // Инициализация счетчика с небольшим случайным приростом при загрузке страницы 
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // Случайное увеличение с вероятностью 30%
        setTreeCount(prev => prev + 1);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 30000); // Каждые 30 секунд
    
    return () => clearInterval(interval);
  }, [treeCount]);
  
  // Обработчик события увеличения счетчика при посадке дерева
  useEffect(() => {
    const handleTreePlanted = () => {
      setTreeCount(prev => prev + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    };
    
    window.addEventListener('treePlanted', handleTreePlanted);
    return () => window.removeEventListener('treePlanted', handleTreePlanted);
  }, []);

  return (
    <div className="leaf-counter group fixed top-6 right-6 z-50 flex items-center bg-[#38a169]/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
      <div className={`flex items-center transition-transform duration-500 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
        <Leaf className={`h-5 w-5 transition-all duration-500 ${isAnimating ? 'text-white' : 'text-white/80'}`} />
        <span className="ml-2 font-medium text-white">
          {treeCount.toLocaleString('ru-RU')}
        </span>
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
        Спасено деревьев
      </div>
    </div>
  );
};

export default TreeCounter;
