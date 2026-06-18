import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActiveView, CutStyle, Barber } from "./types";
import { toggleClickSound, playRetroScissorsClick, playDullClick } from "./components/AudioPlayer";
import LogoGlitch from "./components/LogoGlitch";

// Import Views
import HomeView from "./components/HomeView";
import CutsView from "./components/CutsView";
import BookView from "./components/BookView";
import ShopView from "./components/ShopView";
import AboutView from "./components/AboutView";
import VisitView from "./components/VisitView";

// Lucide Icons
import { Volume2, VolumeX, Menu, X, Scissors, MapPin, AppWindow, ShoppingCart } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [navPayload, setNavPayload] = useState<{ selectedCut?: CutStyle; selectedBarber?: Barber } | null>(null);
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sync hash routing on mount and change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#cuts") setActiveView('cuts');
      else if (hash === "#book") setActiveView('book');
      else if (hash === "#shop") setActiveView('shop');
      else if (hash === "#about") setActiveView('about');
      else if (hash === "#visit") setActiveView('visit');
      else {
        setActiveView('home');
        // Clear navigation payload if returning home unless preselected
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Trigger once on mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (view: ActiveView, payload?: any) => {
    if (payload) {
      setNavPayload(payload);
    } else {
      setNavPayload(null);
    }
    
    // Set matching location hash to trigger sync
    const hash = view === 'home' ? "" : `#${view}`;
    window.location.hash = hash;
  };

  const handleSoundToggle = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    toggleClickSound(nextVal); // update AudioContext system
  };

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'cuts', label: 'SERVICES' },
    { id: 'book', label: 'BOOK CHAIR' },
    { id: 'shop', label: 'APOTHECARY' },
    { id: 'about', label: 'OUR STORY' },
    { id: 'visit', label: 'VISIT' }
  ];

  return (
    <div className="min-h-screen bg-charcoal text-cream font-sans flex flex-col justify-between selection:bg-electric-red selection:text-cream">
      
      {/* 1. NAVIGATION BAR DESKTOP / MOBILE */}
      <header className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-md border-b border-bronze/15 py-3 px-4 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Glitch on Hover */}
          <div onClick={() => handleNavigate('home')} className="z-50">
            <LogoGlitch />
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {menuItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { playDullClick(); handleNavigate(item.id as ActiveView); }}
                  className={`font-anton text-[11px] tracking-[0.25em] uppercase transition-all duration-300 relative py-1 cursor-pointer hover:text-electric-red ${
                    isActive ? "text-electric-red filter drop-shadow-[0_0_8px_rgba(230,57,70,0.5)] font-bold" : "text-cream/70"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-electric-red shadow-[0_0_8px_#E63946]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls Right Column (Sound Toggle + Mobile Burger) */}
          <div className="flex items-center gap-4">
            
            {/* Audio scissor click toggle indicator */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded bg-neutral-900 border transition-all duration-300 cursor-pointer ${
                soundEnabled 
                  ? "border-electric-red text-electric-red shadow-[0_0_5px_rgba(230,57,75,0.4)]" 
                  : "border-bronze/20 text-cream/35 hover:border-bronze/45 hover:text-cream"
              }`}
              title={soundEnabled ? "Disable Scissor Sounds" : "Enable Scissor Clicking Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick action button desktop */}
            <button
              onClick={() => { playRetroScissorsClick(); handleNavigate('book'); }}
              className="hidden sm:flex px-4 py-2 bg-electric-red text-cream font-anton text-xs tracking-wider uppercase rounded-sm border border-electric-red shadow-[0_0_8px_rgba(230,57,70,0.35)] hover:bg-cream hover:text-charcoal hover:border-cream transition duration-300 cursor-pointer"
            >
              Book Cut
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => { playDullClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="lg:hidden p-2 rounded bg-[#181614] border border-bronze/20 text-cream hover:text-electric-red transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* 2. MOBILE MENU DRAWER SLIDE-DOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[68px] z-30 bg-[#12110F] border-b border-bronze/20 shadow-2xl lg:hidden flex flex-col p-6 space-y-4"
          >
            {menuItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playDullClick();
                    setMobileMenuOpen(false);
                    handleNavigate(item.id as ActiveView);
                  }}
                  className={`text-left font-anton text-lg tracking-widest uppercase transition-colors py-2 border-b border-white/[0.03] ${
                    isActive ? "text-electric-red" : "text-cream/70"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => {
                playRetroScissorsClick();
                setMobileMenuOpen(false);
                handleNavigate('book');
              }}
              className="w-full py-3 bg-electric-red text-cream font-anton text-sm uppercase tracking-wider rounded border border-electric-red text-center"
            >
              Reserve A Chair
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE ROUTE VIEWS SHELL */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeView === 'home' && (
              <HomeView onNavigate={handleNavigate} />
            )}
            
            {activeView === 'cuts' && (
              <CutsView onNavigate={handleNavigate} />
            )}
            
            {activeView === 'book' && (
              <BookView 
                initialPayload={navPayload || undefined} 
                onNavigateHome={() => handleNavigate('home')} 
              />
            )}
            
            {activeView === 'shop' && (
              <ShopView />
            )}

            {activeView === 'about' && (
              <AboutView onNavigate={handleNavigate} />
            )}

            {activeView === 'visit' && (
              <VisitView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. CHRONO BACKEND CREDIT FOOTER */}
      <footer className="bg-[#0A0909] text-cream/55 py-12 px-4 border-t border-bronze/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Shop branding block */}
          <div className="space-y-3">
            <h4 className="font-anton text-lg tracking-wider text-cream uppercase">SHARP & CO.</h4>
            <div className="w-10 h-0.5 bg-electric-red" />
            <p className="text-xs font-sans text-cream/40 leading-relaxed">
              Established 2019 in Ampang, KL. Handcrafted grooming trims, straight razors, and premium aesthetic pomades. Where the cut still matters.
            </p>
          </div>

          {/* Quick sitemap references */}
          <div className="space-y-3">
            <h4 className="font-anton text-xs tracking-widest text-cream uppercase">SALON SECTIONS</h4>
            <ul className="text-xs font-mono space-y-1.5">
              <li>
                <button onClick={() => handleNavigate('home')} className="hover:text-electric-red cursor-pointer">
                  → Entrance Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('cuts')} className="hover:text-electric-red cursor-pointer">
                  → Service Curation
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('book')} className="hover:text-electric-red cursor-pointer">
                  → Chair Scheduler
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-anton text-xs tracking-widest text-cream uppercase">APOTHECARY</h4>
            <ul className="text-xs font-mono space-y-1.5">
              <li>
                <button onClick={() => handleNavigate('shop')} className="hover:text-electric-red cursor-pointer">
                  → Premium Pomades
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-electric-red cursor-pointer">
                  → Our Master Barbers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('visit')} className="hover:text-electric-red cursor-pointer">
                  → Route & directions
                </button>
              </li>
            </ul>
          </div>

          {/* Required Credit Badge block */}
          <div className="space-y-3 md:text-right">
            <h4 className="font-anton text-xs tracking-widest text-cream uppercase md:text-right">OFFICIAL ACCREDITATION</h4>
            <span className="font-special text-xs text-bronze block">
              ★ DEMO PORTFOLIO DESIGN ★
            </span>
            <p className="text-xs font-mono text-cream/40 leading-relaxed">
              Crafted with absolute attention to layout, typography & custom-tailored user mechanics.
            </p>

            <div className="pt-2">
              <span className="inline-block bg-[#12110F] border border-bronze/35 px-4 py-2.5 rounded text-xs font-bold font-mono text-electric-red">
                Demo · bluebutterstudio.my
              </span>
            </div>
          </div>

        </div>

        {/* Intellectual property declaration */}
        <div className="max-w-7xl mx-auto border-t border-white/[0.04] pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-cream/25 uppercase gap-2">
          <span>© 2026 SHARP & CO. BARBERS. ALL RIGHTS RESERVED.</span>
          <span>APPROVED IN REPLICA AT AMPANG ROW</span>
        </div>
      </footer>

    </div>
  );
}
