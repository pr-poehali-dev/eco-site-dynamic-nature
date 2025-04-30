import { useEffect, useRef } from 'react';

// Список эко-продуктов
const products = [
  {
    id: 1,
    name: 'Эко-сумка',
    description: 'Многоразовая сумка из органического хлопка',
    price: '590 ₽',
    image: 'https://images.unsplash.com/photo-1597520691332-d3f71bf20946?q=80&w=400'
  },
  {
    id: 2,
    name: 'Бамбуковая зубная щетка',
    description: 'Биоразлагаемая щетка из бамбука',
    price: '250 ₽',
    image: 'https://images.unsplash.com/photo-1559674824-10f17b11a2a5?q=80&w=400'
  },
  {
    id: 3,
    name: 'Моющее средство',
    description: 'Натуральное средство без химикатов',
    price: '450 ₽',
    image: 'https://images.unsplash.com/photo-1585441695325-21557c7c3e4e?q=80&w=400'
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
        threshold: 0.1, // Показывать, когда хотя бы 10% элемента видно
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

  return (
    <section className="py-16 relative">
      <h2 className="text-4xl font-bold text-center mb-12 text-nature-forest">Наши продукты</h2>
      
      {/* Декоративная земля внизу раздела */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-nature-soil rounded-t-[50%] z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              className="product-card bg-white rounded-lg overflow-hidden shadow-lg transform transition-all"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                {/* Декоративные листья */}
                <div className="absolute -bottom-2 left-0 w-full">
                  <div className="flex justify-center">
                    <div className="w-8 h-6 bg-nature-leaf rotate-45 rounded-tl-full"></div>
                    <div className="w-8 h-6 bg-nature-moss -rotate-45 rounded-tr-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-nature-forest mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-nature-earth">{product.price}</span>
                  <button className="organic-button bg-nature-leaf text-white py-1 px-4 hover:bg-nature-forest transition-colors duration-300">
                    Купить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
