import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { CUTS_DATA, VISIT_INFO } from "../data";
import { CutStyle } from "../types";
import { playDullClick, playRetroScissorsClick } from "./AudioPlayer";
import BarberPole from "./BarberPole";
import ImageWithFallback from "./ImageWithFallback";
import { Scissors, Clock, MapPin, Calendar, Compass, Sparkles, Phone, ShieldCheck } from "lucide-react";

interface HomeViewProps {
  onNavigate: (view: 'home' | 'cuts' | 'book' | 'shop' | 'about' | 'visit', payload?: any) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [selectedCutId, setSelectedCutId] = useState<string>("classic-cut");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const currentCut = CUTS_DATA.find(c => c.id === selectedCutId) || CUTS_DATA[0];

  const handleCutSelect = (id: string) => {
    setSelectedCutId(id);
    playDullClick();
  };

  const handleBookSelected = (cut: CutStyle) => {
    playRetroScissorsClick();
    onNavigate('book', { selectedCut: cut });
  };

  return (
    <div className="w-full text-cream bg-charcoal min-h-screen">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden px-4 py-16">
        {/* Background Image with Dark Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%] select-none pointer-events-none">
            <ImageWithFallback
              src="/hero-bg.jpg"
              alt="Sharp & Co. Barbershop"
              className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0E0D]/90 via-[#0F0E0D]/60 to-[#0F0E0D] z-1" />
          {/* Subtle neon-red radial glow in background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electric-red/15 rounded-full blur-[110px] z-1" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Headline Col */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Special Elite typewriter subtitle */}
              <span className="font-special text-xs md:text-sm tracking-[0.25em] text-bronze uppercase bg-charcoal/80 border border-bronze/35 px-3 py-1.5 rounded-sm inline-block self-center lg:self-start w-fit mx-auto lg:mx-0">
                ★ sharp & co. barbers • est. 2019 ★
              </span>

              {/* Massive Condensed Type */}
              <h1 className="font-anton text-[11vw] md:text-[8vw] lg:text-[7.5vw] uppercase leading-[0.85] tracking-tight text-cream mt-2">
                WHERE THE <br/>
                <span className="text-electric-red filter drop-shadow-[0_0_12px_rgba(230,57,70,0.45)]">CUT</span> STILL <br/>
                <span className="text-bronze">MATTERS</span>
              </h1>

              <p className="font-sans text-sm md:text-base lg:text-lg text-cream/75 max-w-lg mt-4 mx-auto lg:mx-0">
                Premium retro-Americana styling fused with modern electric neon. 
                Ampang's leading destination for precision fades, classical scissor trims, and hot towel blade shaves.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6">
                <button
                  onClick={() => { playRetroScissorsClick(); onNavigate('book'); }}
                  className="w-full sm:w-64 p-6 bg-cream text-charcoal diagonal-cut hover:bg-electric-red hover:text-cream transition-all duration-300 text-left cursor-pointer group shadow-[0_0_15px_rgba(244,239,220,0.2)]"
                >
                  <p className="font-anton text-3xl leading-none">BOOK NOW</p>
                  <p className="font-mono text-[10px] opacity-70 tracking-widest mt-1">SECURE YOUR SLOT</p>
                </button>
                <button
                  onClick={() => { playDullClick(); onNavigate('cuts'); }}
                  className="w-full sm:w-64 p-6 bg-transparent text-cream border border-cream/20 hover:border-cream/60 transition-all duration-300 text-left cursor-pointer"
                >
                  <p className="font-anton text-3xl leading-none">VIEW SERVICES</p>
                  <p className="font-mono text-[10px] opacity-50 tracking-widest uppercase mt-1">6 Premium Services</p>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Barber Pole Col */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="p-8 bg-[#181614]/80 rounded-xl border border-bronze/20 shadow-2xl relative flex flex-col items-center"
            >
              {/* Outer neon border highlight */}
              <div className="absolute inset-0 border border-electric-red/10 rounded-xl pointer-events-none" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-electric-red font-mono text-[9px] tracking-widest text-[#F4EFDC] uppercase rounded border border-electric-red/50 animate-pulse">
                ON AIR
              </div>
              <BarberPole />
              <span className="text-center font-mono text-[10px] tracking-widest uppercase text-cream/40 mt-4">
                Traditional Spinning Pole
              </span>
            </motion.div>
          </div>

        </div>

        {/* Scroll indicator with custom style */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="font-mono text-[9px] tracking-[0.2em] text-bronze uppercase">SCROLL FOR MENU</span>
          <div className="w-1.5 h-6 bg-cream/10 rounded-full flex justify-center items-start p-[2px]">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-electric-red rounded-full"
            />
          </div>
        </div>
      </section>

      {/* DIAGONAL TRANSITION DIVIDER */}
      <div 
        className="h-16 bg-[#12110F] relative z-20"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0 100%)" }}
      />

      {/* THREE-STEP PROCESS BANNER */}
      <section className="bg-[#12110F] py-12 px-4 relative z-10 border-y border-bronze/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <div className="flex items-start gap-4 p-4 border-l-2 border-electric-red">
            <span className="font-anton text-4xl text-electric-red/40">01</span>
            <div>
              <h3 className="font-anton text-lg tracking-wide text-cream uppercase">CHOOSE YOUR CUT</h3>
              <p className="font-sans text-xs text-cream/65 mt-1">Select from classic pompadours to textured modern fades customized to you.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border-l-2 border-bronze">
            <span className="font-anton text-4xl text-bronze/40">02</span>
            <div>
              <h3 className="font-anton text-lg tracking-wide text-cream uppercase">PICK YOUR MASTER</h3>
              <p className="font-sans text-xs text-cream/65 mt-1">Select Lead Faiz, skin-expert Daniel, or legendary 30-year pro Pak Long.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border-l-2 border-cream/20">
            <span className="font-anton text-4xl text-cream/25">03</span>
            <div>
              <h3 className="font-anton text-lg tracking-wide text-cream uppercase">CONFIRM VIA WHATSAPP</h3>
              <p className="font-sans text-xs text-cream/65 mt-1">Book instantly visual-only. We send a verified SMS or WhatsApp check-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGONAL CLIP SECTION IN */}
      <div 
        className="h-16 bg-charcoal relative z-20"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
      />

      {/* CHOOSE YOUR CUT - INTERACTIVE PICKER */}
      <section className="py-20 px-4 relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="font-special text-xs tracking-widest text-electric-red uppercase">★ EXPERIENCE INTERACTIVE CURATION ★</span>
          <h2 className="font-anton text-4xl md:text-6xl tracking-tight uppercase text-cream">
            CHOOSE YOUR CUT
          </h2>
          <p className="font-mono text-xs text-bronze uppercase max-w-lg mx-auto">
            Click any barbershop cut design below to expand its history, styling duration, pricing, and book instantly.
          </p>
        </div>

        {/* The Live Interactive Curation Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left Cards Tab-Selector Column */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {CUTS_DATA.slice(0, 5).map((cut) => {
              const isActive = cut.id === selectedCutId;
              return (
                <button
                  key={cut.id}
                  onClick={() => handleCutSelect(cut.id)}
                  className={`w-full text-left p-4 rounded-sm border transition-all duration-300 relative overflow-hidden flex items-center justify-between cursor-pointer group ${
                    isActive 
                      ? "bg-[#1C1A18] border-electric-red/70 shadow-[0_0_15px_rgba(230,57,70,0.15)]" 
                      : "bg-[#12110F]/60 border-bronze/10 hover:border-bronze/40"
                  }`}
                >
                  {/* Left Red Marker for Active */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-electric-red" />
                  )}

                  <div className="flex items-center gap-4">
                    <span className={`font-special text-xs px-2 py-0.5 rounded ${
                      isActive ? "bg-electric-red/20 text-electric-red" : "bg-neutral-800 text-cream/40"
                    }`}>
                      RM {cut.price}
                    </span>
                    <div>
                      <h4 className={`font-anton text-base tracking-wider uppercase transition-colors ${
                        isActive ? "text-cream" : "text-cream/70 group-hover:text-cream"
                      }`}>
                        {cut.name}
                      </h4>
                      <p className="font-mono text-[10px] text-cream/40">{cut.duration}</p>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-full transition-transform ${
                    isActive ? "bg-electric-red text-cream scale-110" : "bg-neutral-800 text-cream/30 group-hover:text-cream/70"
                  }`}>
                    <Scissors className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Preview Panel Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCutId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full p-6 md:p-8 bg-[#181614] rounded border border-bronze/20 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background watermarked shear */}
                <div className="absolute right-[-30px] bottom-[-30px] opacity-[0.02] text-cream pointer-events-none">
                  <Scissors className="w-80 h-80" />
                </div>

                <div>
                  {/* Category, Duration */}
                  <div className="flex justify-between items-center border-b border-bronze/20 pb-4 mb-6">
                    <span className="font-special text-xs text-bronze uppercase tracking-widest">
                      {currentCut.tagline}
                    </span>
                    <div className="flex items-center gap-1.5 text-cream/50 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {currentCut.duration}
                    </div>
                  </div>

                  {/* Title and Price */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <h3 className="font-anton text-3xl md:text-4xl text-cream uppercase tracking-wide">
                      {currentCut.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-bronze font-mono text-sm">RM</span>
                      <span className="font-anton text-4xl text-electric-red filter drop-shadow-[0_0_8px_rgba(230,57,70,0.3)]">
                        {currentCut.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
                    {currentCut.description}
                  </p>

                  {/* Included Badges */}
                  <div className="space-y-2 mt-4 inline-block">
                    <span className="text-xs font-mono text-cream/50 uppercase block">INCLUDED SERVICE HIGHLIGHTS:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] bg-charcoal px-2.5 py-1 rounded border border-bronze/20 text-cream/80 font-mono">
                        ✓ Straight-Razor Neck Cleanup
                      </span>
                      <span className="text-[10px] bg-charcoal px-2.5 py-1 rounded border border-bronze/20 text-cream/80 font-mono">
                        ✓ Hot Towel Wrap
                      </span>
                      <span className="text-[10px] bg-charcoal px-2.5 py-1 rounded border border-bronze/20 text-cream/80 font-mono">
                        ✓ Pomade Post-styling
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleBookSelected(currentCut)}
                    className="w-full py-4 bg-electric-red text-cream font-anton text-base uppercase tracking-wider rounded-sm border border-electric-red shadow-[0_0_12px_rgba(230,57,70,0.3)] hover:bg-cream hover:text-charcoal hover:border-cream transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book This Cut Now
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* DIAGONAL SECTION TRANSITION OUT */}
      <div 
        className="h-16 bg-[#161412] relative z-20"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0, 0 0)" }}
      />

      {/* MID SECTION - MOCK GALLERY / FEED */}
      <section className="bg-[#161412] py-20 px-4 relative z-10 border-b border-bronze/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-special text-xs text-bronze uppercase tracking-widest block">INSTAGRAM LIVE LOOKBOOK</span>
              <h2 className="font-anton text-3xl md:text-5xl uppercase text-cream tracking-tight mt-1">
                #SHARPMATERIALS
              </h2>
            </div>
            <p className="font-mono text-xs text-cream/50 max-w-sm">
              Explore dynamic fresh grooms from real sessions. Follow our tag for Ampang classical grooming lifestyle.
            </p>
          </div>

          {/* Instagram Mock Feed Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Pic 1 */}
            <div className="relative aspect-square group overflow-hidden border border-bronze/10 rounded-sm">
              <ImageWithFallback
                src="/barber-1.jpg"
                alt="Sharp Fade Look"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-electric-red uppercase font-bold">@faiz_cutz</span>
                <p className="text-xs font-anton tracking-wide text-cream uppercase mt-0.5">Classic Crop</p>
              </div>
            </div>

            {/* Pic 2 */}
            <div className="relative aspect-square group overflow-hidden border border-bronze/10 rounded-sm">
              <ImageWithFallback
                src="/barber-2.jpg"
                alt="Skin expert session"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-electric-red uppercase font-bold">@danny_fade</span>
                <p className="text-xs font-anton tracking-wide text-cream uppercase mt-0.5">Mid Razor Drop</p>
              </div>
            </div>

            {/* Pic 3 */}
            <div className="relative aspect-square group overflow-hidden border border-bronze/10 rounded-sm">
              <ImageWithFallback
                src="/products.jpg"
                alt="Grooming details"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-bronze uppercase font-bold">@sharpandco.ampang</span>
                <p className="text-xs font-anton tracking-wide text-cream uppercase mt-0.5">Custom Groom Kit</p>
              </div>
            </div>

            {/* Pic 4 */}
            <div className="relative aspect-square group overflow-hidden border border-bronze/10 rounded-sm">
              <ImageWithFallback
                src="/hero-bg.jpg"
                alt="Empty shop details"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-bronze uppercase font-bold">@sharpandco.ap</span>
                <p className="text-xs font-anton tracking-wide text-cream uppercase mt-0.5">Americana Vibes</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VISIT & HOURS SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="p-8 md:p-12 bg-[#12110F] border border-bronze/20 rounded relative overflow-hidden">
          {/* Accent vertical lighting beam */}
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-electric-red shadow-[0_0_15px_#E63946]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Map Placeholder or hours */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-special text-xs text-electric-red uppercase tracking-widest block">VISIT THE SHOP</span>
              <h2 className="font-anton text-3xl md:text-5xl uppercase text-cream tracking-tight">
                AMPANG SALON
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 text-cream/80">
                  <MapPin className="w-5 h-5 text-electric-red shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-cream font-sans">Our Address</h4>
                    <p className="font-mono text-xs text-cream/60 mt-0.5">{VISIT_INFO.address}</p>
                    <p className="font-mono text-xs text-bronze mt-1">Lorong Mamanda 2, Opposite Sport Center</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-cream/80">
                  <Phone className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-cream font-sans">Contact & Bookings</h4>
                    <p className="font-mono text-xs text-cream/60 mt-0.5">{VISIT_INFO.phone}</p>
                    <p className="font-mono text-xs text-bronze mt-1">{VISIT_INFO.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => { playRetroScissorsClick(); onNavigate('visit'); }}
                  className="px-6 py-3 bg-transparent text-cream font-anton text-sm uppercase tracking-wider rounded border border-bronze/50 hover:bg-bronze hover:text-cream transition-all duration-300 cursor-pointer"
                >
                  Get Route Directions
                </button>
              </div>
            </div>

            {/* Hours right panel */}
            <div className="lg:col-span-5 bg-charcoal p-6 border border-bronze/10 rounded space-y-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-bronze/20 pb-3 mb-2">
                <Clock className="w-4 h-4 text-electric-red" />
                <h4 className="font-anton text-base tracking-widest uppercase text-cream">TRADING HOURS</h4>
              </div>

              <div className="space-y-3">
                {VISIT_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-white/[0.03]">
                    <span className="text-cream/80 font-bold">{h.day}</span>
                    <span className="text-bronze font-bold">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#e63946]/5 rounded-sm border border-electric-red/15 text-[10px] font-mono text-cream/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-electric-red shrink-0" />
                <span>Appointments takes slot precedence over random Walk-ins.</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
