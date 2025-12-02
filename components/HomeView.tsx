import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DATA } from '../constants';
import { useHashRouter } from '../App'; 

// Prepare chart data
const chartData = Object.keys(DATA).map(key => ({
  name: DATA[key].title.split(' ')[0],
  value: DATA[key].items.length
}));

const COLORS = ['#009C3B', '#00702A', '#005c23', '#FFDF00', '#E5C800', '#FFED4D', '#002776'];

const SocialButton: React.FC<{ href: string; colorClass: string; icon: string; label: string }> = ({ href, colorClass, icon, label }) => (
  <div className="flex flex-col items-center">
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center justify-center p-3 rounded-lg text-white transition-all duration-200 hover:scale-[1.05] shadow-md w-12 h-12 flex-none ${colorClass}`}
    >
      <span className="text-2xl">{icon}</span>
    </a>
    <span className="text-xs mt-1 font-semibold text-gray-700">{label}</span>
  </div>
);

interface HomeViewProps {
  onStart: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <section className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#009C3B] mb-2">Bem-vindo! Bienvenido.</h2>
        <p className="text-gray-600">Esta aplicación interactiva está diseñada para ayudarte a dominar el vocabulario portugués esencial. ¡Vamos a falar português!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#FFDF00]">
          <h3 className="font-bold text-xl mb-4 text-[#009C3B]">Cómo usar esta app</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start"><span className="mr-2 text-[#002776]">➤</span> <strong>Paso 1:</strong> Presiona el botón <strong className="text-[#002776]">"¡Empecemos!"</strong> para iniciar tu primera lección.</li>
            <li className="flex items-start"><span className="mr-2 text-[#002776]">➤</span> Navega por los temas libremente usando el menú.</li>
            <li className="flex items-start"><span class="mr-2 text-[#002776]">➤</span> <strong>Haz clic en las tarjetas</strong> para revelar la frase de ejemplo.</li>
            <li className="flex items-start"><span class="mr-2 text-[#002776]">➤</span> Practica los sonidos nasales (ão, õe) con la guía fonética.</li>
            <li className="flex items-start font-bold text-[#002776]"><span className="mr-2 text-[#002776]">➤</span> ¡Haz el **Test de Vocabulario** para medir tu progreso!</li>
          </ul>
        </div>

        {/* Visualization */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center border-t-4 border-[#009C3B] h-80">
          <h3 className="font-bold text-lg mb-2 text-[#009C3B]">Composición del Vocabulario</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200">
        <h3 className="text-[#009C3B] font-bold text-lg mb-2">¡Únete a la Comunidad y Sigue Aprendiendo!</h3>
        <p className="text-sm text-gray-600 mb-6">Síguenos en redes para más tips y contenido gratuito, o empieza tu curso digital ahora.</p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <SocialButton 
            href="https://www.instagram.com/lexigo2.0/" 
            colorClass="bg-pink-600" 
            icon="📷" 
            label="Instagram" 
          />
          <SocialButton 
            href="https://www.facebook.com/profile.php?id=61583705050960" 
            colorClass="bg-blue-600" 
            icon="👍" 
            label="Facebook" 
          />
          <SocialButton 
            href="https://www.tiktok.com/@lexigo2.0" 
            colorClass="bg-gray-800" 
            icon="🎵" 
            label="TikTok" 
          />
        </div>

        {/* Digital Course Button */}
        <a 
          href="https://go.hotmart.com/R103170159Q" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#FFDF00] text-[#002776] w-full text-lg font-bold hover:bg-[#E5C800] mt-4 border border-yellow-500 p-3 rounded-lg transition-colors"
        >
          <span className="text-xl mr-2">📚</span>
          Iniciar Curso Digital
        </a>
      </div>
    </section>
  );
};

export default HomeView;
