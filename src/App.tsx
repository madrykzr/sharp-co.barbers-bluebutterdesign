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
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'news', label: 'News' },
    { id: 'shop', label: 'Shop' }
  ];

  const handleNavClick = (id: string) => {
    playDullClick();
    if (id === 'home') {
      handleNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavigate('home');
      // short delay to let home active view mount in case we were in book mode
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1A18] text-[#F2EDE4] font-sans flex flex-col justify-between selection:bg-[#E8762C] selection:text-[#F2EDE4]">
      
      {/* 1. NAVIGATION BAR DESKTOP / MOBILE */}
      <header className="sticky top-0 z-40 bg-[#1C1A18]/95 backdrop-blur-md border-b border-[#F2EDE4]/10 py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo "SHARP & CO." */}
          <div onClick={() => handleNavClick('home')} className="z-50 cursor-pointer group">
            <span className="font-anton text-2xl tracking-[0.1em] text-[#F2EDE4] group-hover:text-[#E8762C] transition-colors duration-300">
              SHARP & CO.
            </span>
          </div>

          {/* Desktop Links (Pill-style nav links center) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#3A332C]/30 border border-[#F2EDE4]/10 px-2 py-1.5 rounded-full">
            {menuItems.map(item => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="font-mono text-xs tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[#F2EDE4]/80 hover:text-[#E8762C] hover:bg-[#3A332C]/50"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls Right Column (Contact Us button) */}
          <div className="flex items-center gap-4">
            
            {/* Audio scissor click toggle indicator */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded bg-[#3A332C]/20 border transition-all duration-300 cursor-pointer ${
                soundEnabled 
                  ? "border-[#E8762C] text-[#E8762C] shadow-[0_0_8px_rgba(232,118,44,0.3)]" 
                  : "border-[#F2EDE4]/10 text-[#F2EDE4]/40 hover:border-[#F2EDE4]/30 hover:text-[#F2EDE4]"
              }`}
              title={soundEnabled ? "Disable Scissor Sounds" : "Enable Scissor Clicking Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick action button desktop */}
            <button
              onClick={() => { playRetroScissorsClick(); handleNavigate('book'); }}
              className="hidden sm:flex px-5 py-2.5 bg-[#E8762C] text-[#F2EDE4] font-anton text-xs tracking-wider uppercase border border-[#E8762C] shadow-[0_0_12px_rgba(232,118,44,0.3)] hover:bg-[#F2EDE4] hover:text-[#1C1A18] hover:border-[#F2EDE4] transition duration-300 cursor-pointer"
            >
              Contact Us
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => { playDullClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="lg:hidden p-2 rounded bg-[#3A332C]/25 border border-[#F2EDE4]/10 text-[#F2EDE4] hover:text-[#E8762C] transition-all cursor-pointer"
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
            className="fixed inset-x-0 top-[74px] z-30 bg-[#1C1A18] border-b border-[#F2EDE4]/10 shadow-2xl lg:hidden flex flex-col p-6 space-y-4"
          >
            {menuItems.map(item => {
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.id);
                  }}
                  className="text-left font-anton text-lg tracking-wider uppercase transition-colors py-2 border-b border-[#F2EDE4]/5 text-[#F2EDE4]/80 hover:text-[#E8762C]"
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
              className="w-full py-3 bg-[#E8762C] text-[#F2EDE4] font-anton text-sm uppercase tracking-wider rounded border border-[#E8762C] text-center"
            >
              Contact Us
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
