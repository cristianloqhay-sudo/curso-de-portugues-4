import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import CardsView from './components/CardsView';
import QuizView from './components/QuizView';

// Simple hook to sync state with URL hash
export const useHashRouter = () => {
  const [route, setRoute] = useState('home');

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setRoute(hash || 'home');
    };
    
    // Set initial
    onHashChange();

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (newRoute: string) => {
    window.location.hash = newRoute;
  };

  return { route, navigate };
};

const App: React.FC = () => {
  const { route, navigate } = useHashRouter();
  const [visitedViews, setVisitedViews] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (route !== 'home' && route !== 'quiz') {
      setVisitedViews(prev => new Set(prev).add(route));
    }
  }, [route]);

  const handleNavigate = (target: string) => {
    navigate(target);
    setIsSidebarOpen(false); // Close sidebar on mobile nav
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Render content based on route
  const renderContent = () => {
    if (route === 'home') return <HomeView onStart={() => handleNavigate('saludos')} />;
    if (route === 'quiz') return (
      <section className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg border-t-4 border-[#009C3B]">
        <h2 className="text-3xl font-bold text-[#009C3B] mb-4 text-center">🧠 Test de Vocabulario</h2>
        <QuizView onRestart={() => handleNavigate('quiz')} />
      </section>
    );
    // Default to cards view for other routes if valid, else home
    if (['saludos', 'presentacion', 'numeros', 'colores', 'animales', 'viajes', 'clima'].includes(route)) {
      return <CardsView categoryKey={route} />;
    }
    return <HomeView onStart={() => handleNavigate('saludos')} />;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#F9FAFB]">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-[#009C3B] text-white p-4 flex justify-between items-center z-20 shadow-md">
        <h1 className="text-xl font-bold">🇧🇷 Léxico Portugués</h1>
        <button 
            onClick={toggleSidebar}
            className="animate-heartbeat bg-[#FFDF00] hover:bg-[#E5C800] text-[#002776] px-4 py-2 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 border border-yellow-600"
        >
            MENU
        </button>
      </header>

      {/* Sidebar & Overlay */}
      <Sidebar 
        activeView={route} 
        visitedViews={visitedViews} 
        onNavigate={handleNavigate} 
        isOpen={isSidebarOpen}
      />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8 scroll-smooth" id="main-content">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;
