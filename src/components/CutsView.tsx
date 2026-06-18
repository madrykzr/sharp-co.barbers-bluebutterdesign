import { motion } from "motion/react";
import { CUTS_DATA } from "../data";
import { CutStyle } from "../types";
import { playRetroScissorsClick, playDullClick } from "./AudioPlayer";
import ImageWithFallback from "./ImageWithFallback";
import { Scissors, Clock, ArrowRight, Sparkles, Coffee, RefreshCw } from "lucide-react";

interface CutsViewProps {
  onNavigate: (view: 'home' | 'cuts' | 'book' | 'shop' | 'about' | 'visit', payload?: any) => void;
}

export default function CutsView({ onNavigate }: CutsViewProps) {
  const handleBookCut = (cut: CutStyle) => {
    playRetroScissorsClick();
    onNavigate('book', { selectedCut: cut });
  };

  return (
    <div className="w-full bg-[#12110F] text-cream min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
          <span className="font-special text-xs tracking-[0.2em] text-electric-red uppercase bg-electric-red/10 border border-electric-red/30 px-3 py-1 rounded-sm inline-block">
            ★ the grooming registry ★
          </span>
          <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-wider text-cream">
            SERVICES & MENU
          </h1>
          <div className="w-24 h-1 bg-bronze mx-auto" />
          <p className="font-sans text-sm md:text-base text-cream/70 leading-relaxed">
            Every grooming service at Sharp & Co. is a dedicated ceremony. We utilize premier imported clays, hot steam, and precision blades to deliver absolute structural perfection.
          </p>
        </div>

        {/* Diagonal Ribbon Divider */}
        <div className="bg-[#181614] border-y border-bronze/10 py-4 px-6 rounded flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-mono text-bronze uppercase">
            <Coffee className="w-4 h-4 text-electric-red animate-bounce" />
            <span>Complimentary premium local black coffee or cold sarsaparilla with every cut</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cream/45 uppercase">
            <RefreshCw className="w-4 h-4 text-bronze animate-spin" style={{ animationDuration: '6s' }} />
            <span>Full satisfaction touch-up guaranteed up to 3 days</span>
          </div>
        </div>

        {/* Services Multi-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
          {CUTS_DATA.map((cut, idx) => {
            return (
              <motion.div
                key={cut.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#181614] rounded overflow-hidden border border-bronze/15 hover:border-electric-red/40 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_20px_rgba(230,57,70,0.08)] relative"
              >
                {/* Image header container */}
                <div className="relative h-48 md:h-52 overflow-hidden bg-charcoal">
                  <ImageWithFallback
                    src={cut.image}
                    alt={cut.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/35" />
                  
                  {/* Top corner price ribbon */}
                  <div className="absolute top-3 right-3 bg-charcoal/95 border border-bronze/30 px-3 py-1 rounded font-anton text-lg text-electric-red flex items-baseline gap-0.5 shadow-md">
                    <span className="text-[10px] font-mono font-normal text-cream/50">RM</span>
                    {cut.price}
                  </div>

                  {/* Tagline overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono tracking-widest text-bronze bg-charcoal/90 px-2 py-1 rounded border border-bronze/20 uppercase font-semibold">
                      {cut.tagline}
                    </span>
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-anton text-2xl tracking-wide uppercase text-cream group-hover:text-electric-red transition-colors">
                        {cut.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-cream/40 font-mono">
                        <Clock className="w-3 h-3 text-bronze" />
                        {cut.duration}
                      </div>
                    </div>
                    <p className="font-sans text-xs text-cream/75 leading-relaxed">
                      {cut.description}
                    </p>
                  </div>

                  {/* Standard inclusions list */}
                  <div className="border-t border-bronze/10 pt-4 space-y-2">
                    <span className="text-[10px] font-mono text-bronze uppercase tracking-widest block font-bold">
                      INCLUDED WITH Groom:
                    </span>
                    <ul className="text-[10px] font-mono text-cream/50 space-y-1">
                      <li className="flex items-center gap-1.5">
                        <span className="text-electric-red text-xs">✓</span> Straight razor outline & singe
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-electric-red text-xs">✓</span> Menthol eucalyptus splash rub
                      </li>
                    </ul>
                  </div>

                  {/* Book CTA bottom */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleBookCut(cut)}
                      className="w-full py-3.5 bg-transparent border border-bronze/45 font-anton text-xs uppercase tracking-wider text-cream rounded hover:bg-electric-red hover:border-electric-red hover:shadow-[0_0_12px_rgba(230,57,70,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Service Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vintage Typewriter Custom Block */}
        <div className="bg-[#181614]/40 border border-bronze/10 p-8 rounded text-center relative overflow-hidden">
          <div className="absolute left-[-20px] top-[-20px] opacity-[0.02] text-cream pointer-events-none select-none">
            <Scissors className="w-48 h-48" />
          </div>
          <span className="font-special text-xs text-bronze uppercase block tracking-widest mb-2">★ THE RULES OF THE HOUSE ★</span>
          <p className="font-special text-xs tracking-wider md:text-sm text-cream/65 max-w-2xl mx-auto leading-relaxed">
            "A gentleman is patient. If you are walk-in, please sit back, help yourself to newspapers, and wait for your master. No phones or loud chatter in the chairs. Let our blade handle the rest in comfortable quiet."
          </p>
          <span className="font-special text-[10px] text-electric-red/70 uppercase block mt-3">
            - Established 2019, Ampang KL
          </span>
        </div>

      </div>
    </div>
  );
}
