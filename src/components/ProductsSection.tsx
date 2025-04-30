import { useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Обновленный список современных эко-продуктов
const products = [
  {
    id: 1,
    name: 'Экосумка из конопли',
    description: 'Прочная сумка из органической конопли с нулевым углеродным следом',
    price: '1 290 ₽',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500'
  },
  {
    id: 2,
    name: 'Бамбуковый набор для ухода',
    description: 'Зубная щётка, расчёска и футляр из экологичного бамбука',
    price: '890 ₽',
    image: 'https://images.unsplash.com/photo-1584949511343-8795d8ec9d13?q=80&w=500'
  },
  {
    id: 3,
    name: 'Многоразовые бутылки',
    description: 'Стильная стеклянная бутылка с силиконовым покрытием',
    price: '1 490 ₽',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500'
  }
];

const ProductsSection = () => {
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Функция для наблюдения за появлением элементов в области видимости
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1, 
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Наблюдаем за каждой карточкой продукта
    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Воспроизведение звука при наведении на кнопку
  const playHoverSound = () => {
    const audio = new Audio('/leaf-rustle.mp3');
    audio.volume = 0.2;
    try {
      audio.play().catch(() => {
        console.log('Audio play prevented by browser');
      });
    } catch (e) {
      console.log('Audio error', e);
    }
  };

  return (
    <section className="py-24 relative">
      <div className="bg-black/40 backdrop-blur-sm rounded-xl max-w-4xl mx-auto mb-12 px-8 py-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-white font-playfair">Эко-товары</h2>
        <p className="text-center text-white/90 max-w-2xl mx-auto mb-4 text-lg">
          Каждый продукт создан с заботой о природе и вашем благополучии. 
          При покупке любого товара мы сажаем одно дерево.
        </p>
      </div>
      
      {/* Современный градиент внизу раздела */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f0fdf4] to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              className="product-card bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden group h-64">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#276749]">{product.name}</h3>
                <p className="text-gray-600 mb-6 text-sm">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#2f855a]">{product.price}</span>
                  <Button 
                    size="sm" 
                    onMouseEnter={playHoverSound}
                    className="text-sm gap-2 bg-[#38a169] hover:bg-[#2f855a] rounded-lg shadow-md"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>В корзину</span>
                  </Button>
                </div>
              </div>
              
              {/* Современные корни */}
              <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                <svg viewBox="0 0 100 20" className="w-full h-12 text-[#38a169]/10">
                  <path 
                    d="M0,0 Q50,40 100,0" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M30,0 Q40,20 50,15 Q60,10 70,0" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
