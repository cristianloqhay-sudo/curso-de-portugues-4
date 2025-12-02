import React from 'react';
import { DATA } from '../constants';
import CardFlip from './CardFlip';

interface CardsViewProps {
  categoryKey: string;
}

const CardsView: React.FC<CardsViewProps> = ({ categoryKey }) => {
  const category = DATA[categoryKey];

  if (!category) return <div>Categoría no encontrada.</div>;

  return (
    <section className="max-w-5xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h2 className="text-3xl font-bold text-[#009C3B]">{category.title}</h2>
        <p className="text-gray-600 mt-2">{category.desc}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item, index) => (
          <CardFlip key={`${categoryKey}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CardsView;
