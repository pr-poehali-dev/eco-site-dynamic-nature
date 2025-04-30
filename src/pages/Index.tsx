import { useEffect } from 'react';
import DynamicBackground from '@/components/DynamicBackground';
import GrowingBranches from '@/components/GrowingBranches';
import TreeCounter from '@/components/TreeCounter';
import PlantTreeButton from '@/components/PlantTreeButton';
import ProductsSection from '@/components/ProductsSection';
import NatureAudio from '@/components/NatureAudio';
import { ArrowDown, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    document.title = 'ЭкоЖизнь - забота о природе';
  }, []);

  return (
    <NatureAudio>
      <div className="min-h-screen relative overflow-x-hidden">
        <DynamicBackground />
        <GrowingBranches />
        <TreeCounter />
        
        {/* Главный раздел */}
        <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              ЭкоЖизнь
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Живи в гармонии с природой. Каждый наш продукт сохраняет жизнь на планете.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <PlantTreeButton />
              <Button variant="outline" className="bg-white bg-opacity-20 text-white border-white hover:bg-white hover:bg-opacity-30 organic-button">
                Наша миссия
              </Button>
            </div>
            
            <div className="animate-bounce mt-16">
              <ArrowDown className="mx-auto h-8 w-8 text-white" />
              <span className="text-sm uppercase tracking-wider">Листайте вниз</span>
            </div>
          </div>
        </section>
        
        {/* О нас */}
        <section className="bg-white py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-nature-forest flex items-center">
                  <Leaf className="mr-2 h-6 w-6 text-nature-leaf" />
                  О нашем бренде
                </h2>
                <p className="mb-4 text-gray-700">
                  ЭкоЖизнь создает продукты, которые не только полезны для вас, но и безопасны для окружающей среды. 
                  Мы стремимся к тому, чтобы каждое наше изделие помогало сохранять природные ресурсы и уменьшать 
                  загрязнение планеты.
                </p>
                <p className="mb-4 text-gray-700">
                  С каждой покупкой вы помогаете нам сажать новые деревья и восстанавливать леса. Присоединяйтесь к 
                  движению за чистую планету вместе с нами!
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="organic-shape overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=600" 
                    alt="Природа" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Продукты */}
        <section className="bg-nature-moss bg-opacity-10 relative z-10">
          <ProductsSection />
        </section>
        
        {/* Футер */}
        <footer className="bg-[#38a169] text-white py-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">ЭкоЖизнь</h2>
                <p>© 2025 Все права защищены</p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white/80 transition-colors">О нас</a>
                <a href="#" className="hover:text-white/80 transition-colors">Продукты</a>
                <a href="#" className="hover:text-white/80 transition-colors">Миссия</a>
                <a href="#" className="hover:text-white/80 transition-colors">Контакты</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </NatureAudio>
  );
};

export default Index;
