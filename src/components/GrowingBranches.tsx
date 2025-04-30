import { useEffect, useState } from 'react';

const GrowingBranches = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Добавляем слушатель события прокрутки
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Вычисляем процент прокрутки для анимации веток
  const calcGrowthPercent = () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    return Math.min((scrollY / maxScroll) * 100, 100);
  };

  const growthPercent = calcGrowthPercent();

  return (
    <>
      {/* Левая ветка */}
      <div 
        className="fixed left-0 bottom-0 z-10 w-48 h-screen pointer-events-none"
        style={{ opacity: Math.min(0.2 + (growthPercent / 100), 0.8) }}
      >
        <svg 
          viewBox="0 0 100 500" 
          className="h-full w-full"
          style={{ 
            filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))',
          }}
        >
          <path 
            d={`M 0,500 Q 40,${500 - growthPercent * 2} 30,${500 - growthPercent * 4}`} 
            stroke="#4B9F6C" 
            strokeWidth="2" 
            fill="none"
            style={{ 
              strokeDasharray: 1000, 
              strokeDashoffset: 1000 - growthPercent * 10,
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
          />
          {/* Листья */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle 
              key={i}
              cx={25 + (i % 2) * 10} 
              cy={500 - growthPercent * 4 + 80 - i * 20} 
              r={Math.max(0, growthPercent / 20 - i / 2)}
              fill="#6BC589"
              opacity={Math.max(0, (growthPercent - i * 10) / 100)}
              style={{ transition: 'all 0.3s ease-out' }}
            />
          ))}
        </svg>
      </div>

      {/* Правая ветка */}
      <div 
        className="fixed right-0 bottom-0 z-10 w-48 h-screen pointer-events-none"
        style={{ opacity: Math.min(0.2 + (growthPercent / 100), 0.8) }}
      >
        <svg 
          viewBox="0 0 100 500" 
          className="h-full w-full"
          style={{ 
            filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))',
          }}
        >
          <path 
            d={`M 100,500 Q 60,${500 - growthPercent * 2.2} 70,${500 - growthPercent * 4.2}`} 
            stroke="#4B9F6C" 
            strokeWidth="2" 
            fill="none"
            style={{ 
              strokeDasharray: 1000, 
              strokeDashoffset: 1000 - growthPercent * 10,
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
          />
          {/* Листья */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle 
              key={i}
              cx={75 - (i % 2) * 10} 
              cy={500 - growthPercent * 4.2 + 80 - i * 20} 
              r={Math.max(0, growthPercent / 20 - i / 2)}
              fill="#6BC589"
              opacity={Math.max(0, (growthPercent - i * 10) / 100)}
              style={{ transition: 'all 0.3s ease-out' }}
            />
          ))}
        </svg>
      </div>
    </>
  );
};

export default GrowingBranches;
