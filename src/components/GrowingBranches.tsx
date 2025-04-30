import { useEffect, useRef } from 'react';

interface Branch {
  id: number;
  element: HTMLDivElement;
  shown: boolean;
}

const GrowingBranches = () => {
  const branchesRef = useRef<Branch[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем ветки
    const createBranches = () => {
      if (!containerRef.current) return;
      
      // Очищаем предыдущие ветки
      branchesRef.current.forEach(branch => {
        branch.element.remove();
      });
      branchesRef.current = [];

      // Создаем новые ветки
      for (let i = 0; i < 8; i++) {
        const branch = document.createElement('div');
        branch.className = `branch absolute w-1 bg-nature-bark opacity-0 transition-all duration-1000`;
        
        // Случайные параметры для разных веток
        const height = 80 + Math.random() * 200; // высота от 80 до 280px
        const left = 10 + Math.random() * 80; // позиция слева от 10% до 90%
        const delay = Math.random() * 0.5; // задержка до 0.5 секунд
        const rotation = -20 + Math.random() * 40; // поворот от -20 до 20 градусов
        
        branch.style.height = `${height}px`;
        branch.style.left = `${left}%`;
        branch.style.transitionDelay = `${delay}s`;
        branch.style.transform = `rotate(${rotation}deg)`;
        branch.style.bottom = '0';
        
        containerRef.current.appendChild(branch);
        
        branchesRef.current.push({
          id: i,
          element: branch,
          shown: false
        });
      }
    };

    createBranches();

    // Функция для проверки видимости веток при скролле
    const handleScroll = () => {
      branchesRef.current.forEach(branch => {
        const rect = branch.element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight;
        
        if (isVisible && !branch.shown) {
          branch.element.classList.add('opacity-100');
          branch.shown = true;
        } else if (!isVisible && branch.shown) {
          branch.element.classList.remove('opacity-100');
          branch.shown = false;
        }
      });
    };

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    // Запускаем обработчик сразу для уже видимых элементов
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Ветки будут добавлены динамически */}
    </div>
  );
};

export default GrowingBranches;
