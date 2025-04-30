import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const TreeCounter = () => {
  const [treesCount, setTreesCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Получаем сохраненное значение из localStorage
    const savedCount = localStorage.getItem('savedTrees');
    if (savedCount) {
      setTreesCount(parseInt(savedCount, 10));
    } else {
      // Начальное значение
      const initialCount = 245;
      setTreesCount(initialCount);
      localStorage.setItem('savedTrees', initialCount.toString());
    }
  }, []);

  useEffect(() => {
    // Сохраняем значение при изменении
    localStorage.setItem('savedTrees', treesCount.toString());
  }, [treesCount]);

  const incrementTree = () => {
    setIsAnimating(true);
    setTreesCount(prev => prev + 1);
    
    // Убираем класс анимации через секунду
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div 
      className="fixed bottom-4 left-4 bg-nature-leaf bg-opacity-90 text-white p-3 rounded-2xl shadow-lg flex items-center space-x-2 organic-shape cursor-pointer"
      onClick={incrementTree}
    >
      <Leaf className="h-5 w-5 text-white animate-leaves-wave" />
      <div className="overflow-hidden h-6">
        <div className={`${isAnimating ? 'animate-counter-change' : ''}`}>
          <span className="text-lg font-bold">{treesCount}</span>
        </div>
      </div>
      <span className="text-sm">деревьев спасено</span>
    </div>
  );
};

export default TreeCounter;
