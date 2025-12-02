import React from 'react';

interface SidebarProps {
  activeView: string;
  visitedViews: Set<string>;
  onNavigate: (view: string) => void;
  isOpen: boolean;
}

const NAV_ITEMS = [
  { id: 'home', label: '🏠 Inicio / Dashboard' },
  { id: 'saludos', label: '👋 Saludos' },
  { id: 'presentacion', label: '🤝 Presentaciones' },
  { id: 'numeros', label: '🔢 Números (1-10)' },
  { id: 'colores', label: '🎨 Colores' },
  { id: 'animales', label: '🐶 Animales y Casa' },
  { id: 'viajes', label: '✈️ Viajes y Salud' },
  { id: 'clima', label: '☀️ Clima y Tiempo' },
  { id: 'quiz', label: '🧠 Test de Vocabulario' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, visitedViews, onNavigate, isOpen }) => {
  // Count only content modules (exclude home and quiz from progress count for specific denominator if desired, but let's follow 7 topics logic)
  // Topics: saludos, presentacion, numeros, colores, animales, viajes, clima (Total 7)
  const topicKeys = ['saludos', 'presentacion', 'numeros', 'colores', 'animales', 'viajes', 'clima'];
  const visitedCount = topicKeys.filter(k => visitedViews.has(k)).length;
  const progressPercent = Math.round((visitedCount / topicKeys.length) * 100);

  return (
    <nav className={`
      fixed md:relative z-30 w-64 h-full bg-[#009C3B] text-white flex flex-col shadow-xl transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6 border-b border-white/20 hidden md:block">
        <h1 className="text-2xl font-bold tracking-wide">🇧🇷 Portugués<br/><span className="text-sm font-normal text-gray-100">para o Dia a Dia</span></h1>
      </div>
      
      <div className="px-6 pt-6 pb-2">
        <button 
            onClick={() => onNavigate('saludos')}
            className="animate-heartbeat w-full bg-[#FFDF00] hover:bg-[#E5C800] text-[#002776] font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 border border-yellow-600"
        >
            <span>🚀</span> ¡Empecemos!
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button 
                  onClick={() => onNavigate(item.id)} 
                  className={`w-full text-left px-6 py-3 transition-colors border-l-4 font-semibold
                    ${isActive 
                        ? 'bg-[#00702A] border-[#FFDF00]' 
                        : 'hover:bg-[#00702A] border-transparent'
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-6 bg-[#005c23] mt-auto border-t border-white/10">
        <p className="text-xs text-gray-200 mb-2">Progreso de sesión</p>
        <div className="w-full bg-[#004219] rounded-full h-2.5 border border-white/10">
            <div 
                className="bg-[#FFDF00] h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
            ></div>
        </div>
        <p className="text-xs text-center mt-2 text-gray-200">{visitedCount}/7 Temas explorados</p>
      </div>
    </nav>
  );
};

export default Sidebar;
