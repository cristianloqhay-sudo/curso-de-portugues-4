import React, { useState } from 'react';
import { VocabItem } from '../types';

interface CardFlipProps {
  item: VocabItem;
}

const CardFlip: React.FC<CardFlipProps> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const hasCustomColor = !!item.color;
  const textColorClass = item.text === 'white' ? 'text-white' : 'text-gray-900';
  const borderColorClass = item.border ? 'border-gray-300' : 'border-gray-200';
  
  // Dynamic styles for the front of the card
  const frontStyle = hasCustomColor ? { backgroundColor: item.color } : {};

  return (
    <div 
      className="group h-48 w-full cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div className={`relative h-full w-full text-center transition-transform duration-500 transform-style-3d shadow-lg rounded-xl border ${borderColorClass} ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center backface-hidden rounded-xl ${!hasCustomColor ? 'bg-white' : ''}`}
          style={frontStyle}
        >
          {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
          <h3 className={`text-2xl font-bold ${hasCustomColor ? textColorClass : 'text-[#009C3B]'}`}>
            {item.pt}
          </h3>
          <p className={`text-sm font-semibold mt-1 ${item.color && item.text === 'white' ? 'text-white/80' : 'text-gray-600'}`}>
            {item.es}
          </p>
          <p className="font-mono text-xs mt-1 text-[#002776] uppercase tracking-wide">
            [{item.pron}]
          </p>
          
          <div className="absolute bottom-3">
            <span className="bg-[#009C3B] text-white text-xs px-3 py-1 rounded-full shadow-md">
              Ver Frase
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden rotate-y-180 bg-[#009C3B] text-white rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-green-100 mb-1">Frase de Exemplo</p>
          <p className="text-base italic mb-2 font-light text-center leading-tight">
            "{item.frasePt || item.context}"
          </p>
          
          <p className="font-mono text-xs mt-1 text-[#002776] bg-white px-2 py-0.5 rounded uppercase font-bold">
            [{item.frasePron || '...'}]
          </p>
          
          <p className="text-xs uppercase tracking-widest text-green-100 mt-2 mb-1">(Espanhol)</p>
          <p className="text-sm font-semibold text-white text-center leading-tight">
            "{item.fraseEs || item.context}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
