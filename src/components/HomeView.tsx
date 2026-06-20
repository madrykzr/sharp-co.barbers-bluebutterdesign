import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  playRetroScissorsClick, 
  playDullClick 
} from "./AudioPlayer";
import { 
  Scissors, 
  MapPin, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Instagram, 
  Facebook, 
  Twitter, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Sparkles,
  ShoppingBag
} from "lucide-react";

// Mock work carousel items for Discover Our Works
const WORKS_GALLERY = [
  {
    id: "g1",
    title: "Low Taper Fade",
    category: "Precision Craft",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80",
    description: "Crisp gradient starting sharp from the neck, blended neatly into custom volume."
  },
  {
    id: "g2",
    title: "The Classic Pompadour",
    category: "Traditional Scissor",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    description: "Slick back style featuring custom root volume set with Sandalwood beeswax pomade."
  },
  {
    id: "g3",
    title: "Executive Razor Part",
    category: "Signature Cut",
    image: "https://images.unsplash.com/photo-1605497746444-ac9dbd505108?auto=format&fit=crop&w=600&q=80",
    description: "Symmetrical side comb with dynamic hairline shaver detail and hot oil razor line."
  },
  {
    id: "g4",
    title: "Sculpted Beard Crop",
    category: "Grooming Tailor",
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80",
    description: "Tamed beard sculpture finished with cold-pressed Sandalwood oil and blade neck lining."
  },
  {
    id: "g5",
    title: "Traditional Buzz Contour",
    category: "Contemporary Barber",
    image: "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?auto=format&fit=crop&w=600&q=80",
    description: "Symmetrical crew trim with razor hairline detailing and brisk cooling menthol splash."
  }
];

// Product specs for the turntable showcase
const TURNTABLE_PRODUCTS = [
  {
    id: "pomade",
    name: "Activated Charcoal Pomade",
    tagline: "Ultra Matt. All-Day Structure.",
    price: "RM 28",
    benefits: [
      "Purifying charcoal protects root integrity",
      "Robust high-hold structure that re-works on demand",
      "Completely water soluble for single-wash removal"
    ],
    color: "from-amber-600/30 to-transparent"
  },
  {
    id: "beard-oil",
    name: "Sandalwood Beard Elixir",
    tagline: "Luxurious Oil. Radiant Conditioning.",
    price: "RM 32",
    benefits: [
      "Cold-pressed organic Sandalwood and Argan oils",
      "Calms skin under whisker roots to eradicate redness",
      "Instant absorption with dynamic premium timber notes"
    ],
    color: "from-amber-500/20 to-transparent"
  },
  {
    id: "clay",
    name: "Silk Clay Styling Paste",
    tagline: "Natural Volume. Zero Weight Residue.",
    price: "RM 26",
    benefits: [
      "Kaolin and active bentonite clay elements",
      "Creates dynamic messy textures with clean separation",
      "Sulphate and paraben-free natural organic formula"
    ],
    color: "from-amber-700/25 to-transparent"
  },
  {
    id: "razor",
    name: "Signature Folded Razor",
    tagline: "Honed Carbon Steel. Ergonomic Timber.",
    price: "RM 65",
    benefits: [
      "Forged Swedish carbon steel edge with balanced spine",
      "Crafted vintage dark timber ergonomic handle",
      "Delivered pre-stropped for absolute precision blade shaves"
    ],
    color: "from-zinc-600/35 to-transparent"
  }
];

interface HomeViewProps {
  onNavigate: (view: any, payload?: any) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  // Booking Card state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "10:30 AM"
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Turntable animation state via custom scroll triggers
  const turntableRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gallery slider state
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // Testimonial slider state
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      quote: "The attention to craft here is outstanding. Faiz takes his time, analyzes your head contour and delivers something genuinely tailored. The retro vibe is authentic, not a gimmick.",
      name: "Marcus Holloway",
      location: "Kuala Lumpur"
    },
    {
      quote: "Absolute gold standard. The straight razor shave is an immersive therapeutic experience with Eucalyptus steam towels. Best grooming studio in Southeast Asia, easily.",
      name: "Darius Sterling",
      location: "Singapore"
    },
    {
      quote: "Clean fades, crisp outlines, and amazing products. The charcoal clay keeps its texture even in KL humidity. Pak Long's scissors skills are absolutely unmatched.",
      name: "Tariq Azimi",
      location: "Ampang Row"
    }
  ];

  // Custom high-performance intersection scroll-watcher for turntable
  useEffect(() => {
    const handleScroll = () => {
      if (!turntableRef.current) return;
      const element = turntableRef.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element has scrolled relative to the viewport
      const totalScrollableHeight = rect.height - viewportHeight;
      const scrolledPastTop = -rect.top;
      
      let progress = scrolledPastTop / totalScrollableHeight;
      progress = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial calculation
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map scroll progress to active SKU index
  // 4 items: Pomade (0-0.25), Beard Oil (0.25-0.5), Clay Base (0.5-0.75), Razor (0.75-1.0)
  const activeProductIndex = Math.min(Math.floor(scrollProgress * 4), 3);
  const activeProduct = TURNTABLE_PRODUCTS[activeProductIndex];
  
  // Calculate continuous rotation degrees (e.g. 3 complete cycles = 1080 deg)
  const rotationDegrees = scrollProgress * 1080;

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert("Please enter at least a name and phone number so we can register your chair lock.");
      return;
    }
    playRetroScissorsClick();
    setBookingSuccess(true);
  };

  const nextGallery = () => {
    playDullClick();
    if (galleryIndex < WORKS_GALLERY.length - 2) {
      setGalleryIndex(prev => prev + 1);
    } else {
      setGalleryIndex(0);
    }
  };

  const prevGallery = () => {
    playDullClick();
    if (galleryIndex > 0) {
      setGalleryIndex(prev => prev - 1);
    } else {
      setGalleryIndex(WORKS_GALLERY.length - 2);
    }
  };

  const nextTestimonial = () => {
    playDullClick();
    setTestimonialIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    playDullClick();
    setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full bg-[#1C1A18] text-[#F2EDE4] overflow-hidden">
      
      {/* SECTION 1 — HERO SECTION (Split layout) */}
      <section id="home" className="relative min-h-[92vh] w-full flex flex-col md:grid md:grid-cols-12 overflow-hidden border-b border-[#F2EDE4]/10 bg-[#1C1A18]">
        
        {/* Left Side: Dramatic Headline Text Column (Col Span: 5) */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between p-6 md:p-12 lg:p-16 z-10 bg-[#1C1A18] relative">
          
          {/* Subtle Vintage Aesthetic Lines */}
          <div className="absolute top-0 left-0 w-0.5 h-full bg-[#E8762C]/20" />
          <div className="absolute top-1/4 right-0 w-[100px] h-0.5 bg-gradient-to-r from-transparent via-[#E8762C]/30 to-transparent" />
          
          {/* Accent Neon line glow at the bottom header boundary */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#E8762C] via-transparent to-transparent opacity-60" />

          {/* Top segment for stamp */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A332C]/40 border border-[#E8762C]/30 text-[#E8762C] rounded-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8762C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8762C]"></span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-semibold">TRADITIONAL CUTS • ESTD 2019</span>
            </div>
          </div>

          {/* Center Title statement */}
          <div className="my-10 md:my-0 space-y-6">
            <p className="font-mono text-xs tracking-[0.4em] text-[#E8762C] uppercase">PREMIUM EDITORIAL GROOMING</p>
            <h1 className="font-anton text-[11vw] md:text-[5vw] uppercase leading-[0.85] tracking-tighter text-[#F2EDE4] transform scale-y-110 origin-left">
              WHERE <br/>TRADITION<br/>MEETS<br/>
              <span className="text-[#E8762C] transition-all relative block drop-shadow-[0_0_15px_rgba(232,118,44,0.35)]">
                MODERN STYLE
              </span>
            </h1>
            <p className="font-sans text-sm md:text-base text-[#F2EDE4]/70 max-w-sm leading-relaxed font-light">
              We engineer hair with architectural exactness. No fluff, no shortcuts. Just precision scissor mastery and sharp contours under warm tungsten rays.
            </p>
          </div>

          {/* Bottom segment: short quote / mission statement */}
          <div className="border-t border-[#F2EDE4]/10 pt-4">
            <span className="font-special text-xs text-[#E8762C]">★ "An uncompromising standard for real gentlemen." ★</span>
          </div>
        </div>

        {/* Right Side: Photo with overlapping Glass Appointment Card (Col Span: 7) */}
        <div className="col-span-12 md:col-span-7 relative min-h-[50vh] md:min-h-full bg-neutral-900 overflow-hidden">
          
          {/* Full-bleed Photo of Barber */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80" 
              alt="Artisanal Barber Precision Care" 
              className="w-full h-full object-cover filter brightness-[45%] contrast-110 active:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay gradient from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A18] via-transparent to-[#1C1A18]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-transparent" />
          </div>

          {/* Floating glass booking card container (Overlap left top) */}
          <div className="absolute top-6 left-6 right-6 md:top-12 md:left-12 lg:left-16 max-w-sm z-10">
            <AnimatePresence mode="wait">
              {!bookingSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#3A332C]/40 backdrop-blur-xl border border-[#F2EDE4]/10 p-6 shadow-2xl relative group rounded-sm"
                  style={{ boxShadow: "0 0 25px rgba(232, 118, 44, 0.05)" }}
                >
                  {/* Subtle orange neon glow at the header indicator */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8762C] to-transparent shadow-[0_0_8px_#E8762C]" />

                  <div className="flex gap-2 items-center mb-4">
                    <Scissors className="w-4 h-4 text-[#E8762C] animate-pulse" />
                    <span className="font-anton text-sm uppercase tracking-[0.2em] text-[#F2EDE4]">Lock A Chair Slot</span>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                    
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-3.5 h-3.5 text-[#F2EDE4]/40" />
                      <input 
                        type="text" 
                        placeholder="Your full name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full bg-[#1C1A18]/80 text-xs text-[#F2EDE4] pl-9 pr-3 py-2.5 rounded-sm border border-[#F2EDE4]/10 focus:border-[#E8762C] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-3.5 h-3.5 text-[#F2EDE4]/40" />
                      <input 
                        type="email" 
                        placeholder="Your email address"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        className="w-full bg-[#1C1A18]/80 text-xs text-[#F2EDE4] pl-9 pr-3 py-2.5 rounded-sm border border-[#F2EDE4]/10 focus:border-[#E8762C] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-3.5 h-3.5 text-[#F2EDE4]/40" />
                      <input 
                        type="tel" 
                        placeholder="Primary phone number"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full bg-[#1C1A18]/80 text-xs text-[#F2EDE4] pl-9 pr-3 py-2.5 rounded-sm border border-[#F2EDE4]/10 focus:border-[#E8762C] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-3 w-3.5 h-3.5 text-[#F2EDE4]/40" />
                        <input 
                          type="date" 
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full bg-[#1C1A18]/80 text-xs text-[#F2EDE4] pl-8 pr-2 py-2.5 rounded-sm border border-[#F2EDE4]/10 focus:border-[#E8762C] focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Clock className="absolute left-2.5 top-3 w-3.5 h-3.5 text-[#F2EDE4]/40" />
                        <select
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                          className="w-full bg-[#1C1A18]/80 text-xs text-[#F2EDE4] pl-8 pr-2 py-2.5 rounded-sm border border-[#F2EDE4]/10 focus:border-[#E8762C] focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="10:30 AM">10:30 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="12:30 PM">12:30 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:30 PM">03:30 PM</option>
                          <option value="04:30 PM">04:30 PM</option>
                          <option value="05:30 PM">05:30 PM</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#E8762C] text-[#F2EDE4] uppercase font-anton text-xs tracking-widest transition-all duration-300 hover:bg-[#F2EDE4] hover:text-[#1C1A18] rounded-sm cursor-pointer border border-[#E8762C] shadow-lg shadow-[#E8762C]/20"
                    >
                      Submit Request
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#3A332C]/80 backdrop-blur-xl border border-[#E8762C]/40 p-8 text-center shadow-2xl relative rounded-sm"
                >
                  <div className="w-12 h-12 bg-[#E8762C]/10 border border-[#E8762C] text-[#E8762C] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-anton text-xl text-[#F2EDE4] tracking-wider mb-2 uppercase">CHAIR RECLAIMED</h3>
                  <p className="font-sans text-xs text-[#F2EDE4]/70 leading-relaxed max-w-[240px] mx-auto">
                    Excellent choice, <strong className="text-[#F2EDE4] font-bold">{bookingForm.name}</strong>! We've locked your slot for <span className="text-[#E8762C] font-semibold">{bookingForm.time}</span>. A master barber will text verification.
                  </p>
                  <button 
                    onClick={() => { playDullClick(); setBookingSuccess(false); setBookingForm({name:"", email:"", phone:"", date:"", time:"10:30 AM"}); }}
                    className="mt-6 px-4 py-2 bg-transparent border border-[#F2EDE4]/20 text-[#F2EDE4]/60 hover:text-[#F2EDE4] text-xs font-mono uppercase tracking-wider rounded transition-colors"
                  >
                    Reset Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>

      </section>

      {/* SECTION 2 — STICKY 3D PRODUCT SHOWCASE (Product Turntable Pin section) */}
      <section id="shop" ref={turntableRef} className="relative h-[250vh] bg-[#1C1A18] overflow-visible">
        
        {/* Sticky Container representing the entire visual frame (pinned while scroll progresses) */}
        <div className="sticky top-0 h-[100vh] w-full flex flex-col justify-between overflow-hidden py-10 px-4 md:px-12 lg:px-20 relative">
          
          {/* Ambient decorative glowing backlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#E8762C]/5 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute top-20 left-10 w-[200px] h-[1px] bg-[#E8762C]/20 pointer-events-none" />

          {/* Section micro markers */}
          <div className="z-10 flex justify-between items-center w-full">
            <span className="font-mono text-[9px] text-[#E8762C] tracking-[0.3em] uppercase font-bold">
              ★ SHARP & CO. LABS APOTHECARY ★
            </span>
            <span className="font-mono text-[10px] text-[#F2EDE4]/40 font-semibold uppercase tracking-wider">
              Scrolled: {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Main Showcase Layout Grid */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
            
            {/* Turntable Pedestal Panel Column (Col Span: 7) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center h-full relative">
              
              {/* Product Visual wrapper */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                
                {/* 1. Thin Circular Progress Ring around product pedestal */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke="#F2EDE4" 
                    strokeWidth="0.5" 
                    className="opacity-10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke="#E8762C" 
                    strokeWidth="1.5" 
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * scrollProgress)}
                    strokeLinecap="round"
                    className="transition-all duration-75 shadow-lg"
                    style={{ filter: "drop-shadow(0 0 4px #E8762C)" }}
                  />
                </svg>

                {/* 2. Slowly auto-rotating turntable pedestal background disc */}
                <div 
                  className="absolute bottom-12 w-56 h-8 bg-gradient-to-t from-[#3A332C]/80 to-[#1C1A18] border border-[#F2EDE4]/10 rounded-full flex items-center justify-center"
                  style={{ transform: "rotateX(70deg)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)" }}
                >
                  <div className="w-48 h-48 bg-transparent border-[0.5px] border-dashed border-[#E8762C]/40 rounded-full animate-spin" style={{ animationDuration: "15s" }} />
                </div>

                {/* Pedestal central glowing stem */}
                <div className="absolute bottom-0 w-12 h-14 bg-gradient-to-b from-[#3A332C]/30 to-black/80 border-x border-[#F2EDE4]/5 z-0" />

                {/* 3. 3D-Feel rotating visual product card */}
                <div 
                  className="absolute w-44 h-56 flex items-center justify-center transition-all duration-300"
                  style={{ 
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* CSS 3D Double-Sided Cylinder container synced with Scroll wheel rotation */}
                  <div 
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                    style={{ 
                      transform: `rotateY(${rotationDegrees}deg)`, 
                      transformStyle: "preserve-3d" 
                    }}
                  >
                    {/* Front Face: High Fidelity detailed render representing current product */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-[#3A332C] to-[#1C1A18] border-2 border-[#E8762C] shadow-2xl p-4 flex flex-col justify-between rounded-md"
                      style={{ 
                        backfaceVisibility: "hidden", 
                        transform: "translateZ(30px)" 
                      }}
                    >
                      <div className="flex justify-between items-center text-[#E8762C]">
                        <span className="font-mono text-[8px] tracking-widest font-bold uppercase">S&C LTD</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="text-center py-4">
                        {/* Interactive dynamic SVGs simulating luxury product shapes */}
                        {activeProduct.id === "pomade" && (
                          <div className="w-16 h-16 bg-[#F2EDE4] rounded-full mx-auto shadow-inner flex items-center justify-center border-2 border-black">
                            <span className="font-anton text-xs text-black uppercase tracking-wider">POMADE</span>
                          </div>
                        )}
                        {activeProduct.id === "beard-oil" && (
                          <div className="w-12 h-20 bg-amber-800 rounded-lg mx-auto shadow-inner flex flex-col justify-between p-1 border-2 border-[#E8762C]">
                            <div className="w-full h-4 bg-black rounded-sm" />
                            <span className="font-anton text-[9px] text-[#F2EDE4] uppercase tracking-wider block text-center">ELIXIR</span>
                            <div className="h-1" />
                          </div>
                        )}
                        {activeProduct.id === "clay" && (
                          <div className="w-16 h-16 bg-neutral-900 rounded-full mx-auto shadow-inner flex items-center justify-center border-2 border-[#E8762C]">
                            <span className="font-anton text-xs text-white uppercase tracking-widest">CLAY</span>
                          </div>
                        )}
                        {activeProduct.id === "razor" && (
                          <div className="w-16 h-16 bg-gradient-to-tr from-zinc-700 to-zinc-200 border border-t-zinc-400 rounded-sm mx-auto flex items-center justify-center">
                            <Scissors className="w-8 h-8 text-[#1C1A18]" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="font-anton text-xs uppercase text-center text-[#F2EDE4] tracking-wider">{activeProduct.name.split(" ")[0]}</p>
                        <p className="font-mono text-[8px] uppercase text-center text-[#E8762C]">{activeProduct.price}</p>
                      </div>
                    </div>

                    {/* Back Face: Heritage seal design that shows during rotation cycle */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-[#1C1A18] to-neutral-900 border-2 border-[#F2EDE4]/20 shadow-2xl p-4 flex flex-col justify-between rounded-md"
                      style={{ 
                        backfaceVisibility: "hidden", 
                        transform: "rotateY(180deg) translateZ(30px)" 
                      }}
                    >
                      <div className="flex justify-between items-center text-[#F2EDE4]/30">
                        <span className="font-mono text-[8px] font-bold">HERITAGE SEAL</span>
                        <span className="text-[8px] font-mono">19</span>
                      </div>
                      <div className="text-center">
                        <p className="font-special text-2xl text-[#E8762C] leading-none select-none">S&C</p>
                        <p className="font-mono text-[7px] text-[#F2EDE4]/40 mt-1 uppercase">AUTHENTIC ORIGINAL Formula</p>
                      </div>
                      <div className="text-center font-mono text-[6px] text-[#F2EDE4]/30">
                        RM SHARP CO. APOTHECARY INC.
                      </div>
                    </div>

                    {/* Side strip right */}
                    <div 
                      className="absolute top-0 bottom-0 w-[60px] bg-[#322c26] border-y-2 border-[#E8762C] flex items-center justify-center"
                      style={{ 
                        transform: "rotateY(90deg) translateZ(88px)", 
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" 
                      }}
                    >
                      <div className="rotate-90 font-mono text-[7px] text-[#E8762C] tracking-[0.4em] whitespace-nowrap uppercase font-bold">
                        PREMIUM QUALITY
                      </div>
                    </div>

                    {/* Side strip left */}
                    <div 
                      className="absolute top-0 bottom-0 w-[60px] bg-[#2d2722] border-y-2 border-[#E8762C] flex items-center justify-center"
                      style={{ 
                        transform: "rotateY(-90deg) translateZ(88px)", 
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" 
                      }}
                    >
                      <div className="rotate-90 font-mono text-[7px] text-[#E8762C] tracking-[0.4em] whitespace-nowrap uppercase font-bold">
                        100% ORGANIC
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* Sticky glass info card pinned to the right side (Col Span: 5) */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#3A332C]/40 backdrop-blur-md border border-[#F2EDE4]/10 p-8 rounded-sm shadow-xl relative"
                >
                  {/* Subtle neon glowing accent bracket line */}
                  <div className="absolute top-6 bottom-6 -left-[1px] w-[2px] bg-[#E8762C] shadow-[0_0_8px_#E8762C]" />

                  <span className="font-mono text-[9px] text-[#E8762C] tracking-[0.2em] uppercase font-bold">
                    ACTIVE SELECTION 0{activeProductIndex + 1} //
                  </span>
                  
                  <h3 className="font-anton text-2.5xl md:text-3xl text-[#F2EDE4] uppercase tracking-wider mt-2 scale-y-105 origin-left">
                    {activeProduct.name}
                  </h3>
                  
                  <p className="font-mono text-xs text-[#E8762C] mt-1 italic font-semibold">
                    {activeProduct.tagline}
                  </p>

                  <div className="my-6 space-y-3 border-t border-[#F2EDE4]/10 pt-4">
                    {activeProduct.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex gap-2.5 items-start">
                        <Check className="w-4 h-4 text-[#E8762C] flex-none mt-0.5" />
                        <p className="font-sans text-xs text-[#F2EDE4]/75 leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-[#F2EDE4]/10 pt-4 mt-4">
                    <div>
                      <p className="font-mono text-[9px] text-[#F2EDE4]/40 uppercase tracking-widest">Apothecary price</p>
                      <p className="font-anton text-2xl text-[#E8762C] mt-0.5">{activeProduct.price}</p>
                    </div>

                    <button 
                      onClick={() => {
                        playRetroScissorsClick();
                        alert(`Added ${activeProduct.name} to apothecary checkout cart.`);
                      }}
                      className="px-6 py-3 bg-[#E8762C] text-[#F2EDE4] font-anton text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#F2EDE4] hover:text-[#1C1A18] rounded-sm cursor-pointer border border-[#E8762C] flex gap-2 items-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* Horizontal Filmstrip of product thumbnail chips sitting along the bottom edge */}
          <div className="z-10 w-full flex justify-center gap-3 border-t border-[#F2EDE4]/10 pt-4 mt-4">
            {TURNTABLE_PRODUCTS.map((prod, idx) => {
              const isActive = idx === activeProductIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => {
                    playDullClick();
                    // Scroll container to trigger computed progress set
                    if (turntableRef.current) {
                      const rect = turntableRef.current.getBoundingClientRect();
                      const elementAbsoluteTop = window.scrollY + rect.top;
                      const segmentHeight = (rect.height - window.innerHeight) / 4;
                      window.scrollTo({
                        top: elementAbsoluteTop + (idx * segmentHeight) + 10,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all border rounded-full cursor-pointer ${
                    isActive 
                      ? "border-[#E8762C] bg-[#3A332C] text-[#E8762C] scale-105 shadow-[0_0_8px_rgba(232,118,44,0.3)] font-bold" 
                      : "border-[#F2EDE4]/10 text-[#F2EDE4]/60 hover:text-[#F2EDE4]"
                  }`}
                >
                  {prod.id}
                </button>
              );
            })}
          </div>

        </div>

      </section>

      {/* SECTION 3 — SERVICE BEYOND EXPECTATION (Split info + Map) */}
      <section id="about" className="relative w-full bg-[#3A332C] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#F2EDE4]/10">
        
        {/* Subtle glowing overlay behind text */}
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#E8762C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Headline & Action button (Col Span: 4) */}
          <div className="lg:col-span-4 space-y-6">
            <p className="font-mono text-xs tracking-[0.3em] text-[#E8762C] uppercase font-bold">★ THE CRUST AND STEEL ★</p>
            <h2 className="font-anton text-4xl lg:text-5xl uppercase tracking-tighter text-[#F2EDE4] scale-y-105 origin-left leading-none">
              SERVICE BEYOND <br/>EXPECTATION
            </h2>
            <div className="w-12 h-0.5 bg-[#E8762C]" />
            <p className="font-sans text-xs md:text-sm text-[#F2EDE4]/80 leading-relaxed font-light">
              We started Sharp & Co. on a clean promise: to revive the humble discipline of old school grooming. No screens, no rush, no gimmicks. Let us clean your edge and set you right with customized beard sculpting, high precision blades, and meticulous shears styling.
            </p>
            <button 
              onClick={() => {
                playRetroScissorsClick();
                const formSec = document.getElementById("home");
                if (formSec) formSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-[#E8762C] text-[#F2EDE4] font-anton text-xs tracking-wider uppercase border border-[#E8762C] transition-all duration-300 hover:bg-[#F2EDE4] hover:text-[#1C1A18] hover:border-[#F2EDE4] shadow-md shadow-[#E8762C]/10 cursor-pointer"
            >
              Submit Request
            </button>
          </div>

          {/* Center Block: Stylized Neon Location Map Card (Col Span: 5) */}
          <div className="lg:col-span-5 h-[280px] bg-[#1C1A18] border border-[#F2EDE4]/10 relative p-4 flex flex-col justify-between rounded-sm shadow-xl overflow-hidden group">
            
            {/* Interactive vector-style SVG map card */}
            <div className="absolute inset-0 opacity-40 select-none">
              <svg className="w-full h-full text-[#F2EDE4]" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                {/* Custom roads */}
                <path d="M 0 30 Q 80 50 200 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-10" />
                <path d="M 50 0 L 70 120" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-10" />
                <path d="M 140 0 C 130 50 170 80 160 120" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-10" />
                <path d="M 0 90 L 200 80" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-10" />
                {/* Secondary pathways */}
                <line x1="10" y1="10" x2="190" y2="110" stroke="currentColor" strokeWidth="0.5" className="opacity-5" strokeDasharray="2,2" />
                {/* Anchor street text annotation */}
                <text x="15" y="22" className="font-mono text-[5px] fill-current opacity-30 select-none uppercase">AMPANG ROADWAYS</text>
                <text x="145" y="112" className="font-mono text-[5px] fill-current opacity-30 select-none uppercase">LORONG MAMANDA 2</text>
              </svg>
            </div>

            {/* Subtle Neon Glow line underlines */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#00F3FF]" style={{ boxShadow: "0 0 8px #00F3FF" }} />

            <div className="flex justify-between items-center z-10 relative">
              <span className="font-mono text-[8px] text-[#00F3FF] tracking-widest font-bold">LIVE LOCATION RADAR</span>
              <div className="w-2 h-2 rounded-full bg-[#00F3FF] animate-ping" />
            </div>

            {/* Glowing Map Hub and coordinates */}
            <div className="flex flex-col items-center justify-center space-y-2 z-10 relative">
              <div className="relative">
                <div className="absolute inset-0 w-8 h-8 -left-1 -top-1 bg-[#E8762C]/25 rounded-full filter blur-sm animate-pulse" />
                <MapPin className="w-6 h-6 text-[#E8762C] filter drop-shadow-[0_0_8px_#E8762C] animate-bounce" />
              </div>
              <span className="font-anton text-sm uppercase tracking-wide text-[#F2EDE4]">SHARP & CO. HQ</span>
              <span className="font-mono text-[8px] text-[#F2EDE4]/30">GPS: 3.1512° N, 101.7583° E</span>
            </div>

            <div className="flex justify-between items-center z-10 relative font-mono text-[8px] text-[#F2EDE4]/40">
              <span>AMPANG ROW ZONE</span>
              <span>100% SECURE REGION</span>
            </div>
          </div>

          {/* Right Block: Direct Contact Info cards (Col Span: 3) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Contact block 1: Location */}
            <div className="p-5 bg-[#1C1A18]/50 border border-[#F2EDE4]/10 rounded-sm relative">
              <div className="flex gap-2.5 items-center text-[#E8762C] mb-2.5">
                <MapPin className="w-4 h-4" />
                <h4 className="font-anton text-xs uppercase tracking-wider">OUR STATION</h4>
              </div>
              <p className="font-sans text-xs text-[#F2EDE4]/75 leading-relaxed font-light">
                Lorong Mamanda 2,<br/>
                Ampang Row, KL,<br/>
                Malaysia
              </p>
            </div>

            {/* Contact block 2: Phone & Hours */}
            <div className="p-5 bg-[#1C1A18]/50 border border-[#F2EDE4]/10 rounded-sm relative">
              <div className="flex gap-2.5 items-center text-[#E8762C] mb-2.5">
                <Phone className="w-4 h-4" />
                <h4 className="font-anton text-xs uppercase tracking-wider">SADLE CHORES</h4>
              </div>
              <p className="font-sans text-xs text-[#F2EDE4]/75 leading-tight font-light mb-1">
                <strong className="text-[#F2EDE4] font-medium">+60 3-4251 0989</strong>
              </p>
              <p className="font-mono text-[9px] text-[#F2EDE4]/40 uppercase tracking-wide leading-relaxed">
                Tue - Sat: 10AM - 9PM<br/>
                Sun: 11AM - 7PM<br/>
                Mon: Closed
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — DISCOVER OUR WORKS (Horizontal scroll gallery + prices) */}
      <section id="services" className="relative w-full bg-[#F2EDE4] text-[#1C1A18] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#F2EDE4]/5">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Row: Text Left, Controls Right */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#1C1A18]/10">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-[#E8762C] tracking-[0.3em] uppercase font-bold">
                ★ CHAIR PATTERNS GALLERY ★
              </span>
              <h2 className="font-anton text-4xl lg:text-5xl uppercase tracking-tighter text-[#1C1A18] scale-y-105 origin-left leading-none">
                DISCOVER OUR WORKS
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#1C1A18]/70 max-w-md font-light leading-relaxed">
                A dynamic showcase of clean cuts directly from our master active barber chairs. Click navigation controls to toggle styles.
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-start border-t md:border-t-0 border-[#1C1A18]/5 pt-4 md:pt-0">
              <div className="font-mono text-xs font-semibold tracking-wider">
                STYLE <span className="text-[#E8762C] font-bold">0{galleryIndex + 1}</span> / 0{WORKS_GALLERY.length - 1}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevGallery}
                  className="p-3 bg-[#1C1A18] text-[#F2EDE4] hover:bg-[#E8762C] transition-all duration-300 rounded-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextGallery}
                  className="p-3 bg-[#1C1A18] text-[#F2EDE4] hover:bg-[#E8762C] transition-all duration-300 rounded-sm cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontally Slider row of cards */}
          <div className="relative overflow-hidden w-full" ref={galleryContainerRef}>
            <motion.div 
              className="flex gap-6 w-full"
              animate={{ x: `-${galleryIndex * 33.3}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {WORKS_GALLERY.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full md:w-[48%] lg:w-[31%] flex-none bg-[#1C1A18] text-[#F2EDE4] p-4 flex flex-col justify-between rounded-sm shadow-lg border border-[#F2EDE4]/10 group"
                >
                  <div className="overflow-hidden relative h-56 w-full rounded-sm mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#E8762C] text-[#F2EDE4] font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                      {item.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-anton text-lg tracking-wider text-[#F2EDE4] uppercase scale-y-105 origin-left">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-[#F2EDE4]/70 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Matrix Below: Testimonial beside OUR PRICES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Left Col: Testimonial Card in solid orange block (Col Span: 6) */}
            <div className="lg:col-span-6 bg-[#E8762C] text-[#F2EDE4] p-8 relative flex flex-col justify-between rounded-sm shadow-xl overflow-hidden min-h-[300px]">
              
              {/* Giant quote background symbol */}
              <span className="absolute -right-4 -bottom-10 font-anton text-[15rem] leading-none text-white/5 select-none pointer-events-none">
                “
              </span>

              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-white">GENTLEMAN VOICES //</span>
                <span className="font-mono text-[8px] bg-black/20 px-2 py-0.5 rounded text-white font-bold">APPROVED testimonial</span>
              </div>

              <div className="my-6">
                <p className="font-sans text-sm md:text-base leading-relaxed italic text-[#F2EDE4] font-light">
                  "{testimonials[testimonialIndex].quote}"
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-auto">
                <div>
                  <h5 className="font-anton text-sm uppercase tracking-wider text-white">
                    {testimonials[testimonialIndex].name}
                  </h5>
                  <p className="font-mono text-[9px] text-white/70 uppercase">
                    {testimonials[testimonialIndex].location}
                  </p>
                </div>

                {/* Slider dot controllers */}
                <div className="flex gap-2 items-center">
                  <button 
                    onClick={prevTestimonial}
                    className="p-1.5 bg-black/10 hover:bg-black/30 rounded text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-[10px] text-white font-medium">
                    {testimonialIndex + 1}/{testimonials.length}
                  </span>
                  <button 
                    onClick={nextTestimonial}
                    className="p-1.5 bg-black/10 hover:bg-black/30 rounded text-white cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Col: OUR PRICES matrix list (Col Span: 6) */}
            <div className="lg:col-span-6 bg-[#1C1A18] text-[#F2EDE4] p-8 rounded-sm shadow-xl relative flex flex-col justify-between">
              
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F44] to-transparent shadow-[0_0_8px_#FF1F44]" />

              <div className="flex justify-between items-baseline mb-4">
                <span className="font-anton text-xl tracking-wider uppercase text-[#F2EDE4] scale-y-105 origin-left">
                  OUR SERVICES RATE
                </span>
                <span className="font-mono text-[8px] text-[#E8762C] font-bold">★ PRICING MATRIX ★</span>
              </div>

              <div className="space-y-4 division-y division-white/10 flex-grow">
                
                <div className="flex justify-between items-center py-2.5 border-b border-[#F2EDE4]/10">
                  <div>
                    <h5 className="font-anton text-sm uppercase tracking-wide text-[#F2EDE4]">Signature Shear Haircut</h5>
                    <p className="font-sans text-[10px] text-[#F2EDE4]/40 font-light mt-0.5">Classic scissor trims custom to contour with splash splash</p>
                  </div>
                  <span className="font-anton text-lg text-[#E8762C]">RM 40</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-[#F2EDE4]/10">
                  <div>
                    <h5 className="font-anton text-sm uppercase tracking-wide text-[#F2EDE4]">Steaming Eucalyptus Shave</h5>
                    <p className="font-sans text-[10px] text-[#F2EDE4]/40 font-light mt-0.5">Three hot towels cycles with straight razor finish</p>
                  </div>
                  <span className="font-anton text-lg text-[#E8762C]">RM 35</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-[#F2EDE4]/10">
                  <div>
                    <h5 className="font-anton text-sm uppercase tracking-wide text-[#F2EDE4]">Haircut + Razor Shave Bundle</h5>
                    <p className="font-sans text-[10px] text-[#F2EDE4]/40 font-light mt-0.5">Our extreme package featuring full maintenance</p>
                  </div>
                  <span className="font-anton text-lg text-[#E8762C]">RM 70</span>
                </div>

                <div className="flex justify-between items-center py-2.5">
                  <div>
                    <h5 className="font-anton text-sm uppercase tracking-wide text-[#F2EDE4]">Beard Outline Sculpting</h5>
                    <p className="font-sans text-[10px] text-[#F2EDE4]/40 font-light mt-0.5">Hydrating sandalwood oil application and details</p>
                  </div>
                  <span className="font-anton text-lg text-[#E8762C]">RM 15</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 5 — MEET OUR EXPERTS (Barber grid) */}
      <section id="news" className="relative w-full bg-white text-[#1C1A18] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#F2EDE4]/10">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Centered Segment Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="font-mono text-[9px] text-[#E8762C] tracking-[0.3em] uppercase font-bold">
              ★ SHARP & CO. STAFF LIST ★
            </span>
            <h2 className="font-anton text-4xl lg:text-5xl uppercase tracking-tighter text-[#1C1A18] scale-y-110 leading-none">
              MEET OUR EXPERTS
            </h2>
            <div className="w-16 h-0.5 bg-[#E8762C] mx-auto" />
            <p className="font-sans text-xs md:text-sm text-[#1C1A18]/60 leading-relaxed font-light">
              Our master barbers operate with unparalleled precision. Handpicked artisans keeping traditional soul alive in Ampang daily.
            </p>
          </div>

          {/* Grid Layout of Barber profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Barber 1: Faiz (Col Span: 3) */}
            <div className="lg:col-span-3 bg-[#F2EDE4] border border-[#1C1A18]/10 p-5 flex flex-col justify-between rounded-sm shadow-md transition-all duration-300 hover:shadow-xl group">
              <div className="space-y-4">
                <div className="overflow-hidden h-64 w-full rounded-sm relative">
                  <img 
                    src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80" 
                    alt="Faiz - Senior Master Stylist" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-[#E8762C] text-white font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                    Lead Barber
                  </div>
                </div>
                <div>
                  <h4 className="font-anton text-xl tracking-wider uppercase text-[#1C1A18]">FAIZ RAHMAN</h4>
                  <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">12 Yrs / Slick Backs & Tapers</p>
                </div>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light">
                  Co-founder learned his trade across vintage salons in Chicago before returning back home. Blends authentic American shear styles with custom contour.
                </p>
              </div>

              <div className="flex gap-2.5 mt-6 border-t border-neutral-200 pt-3.5 text-neutral-400">
                <Instagram className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
                <Facebook className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
                <Twitter className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
              </div>
            </div>

            {/* Barber 2: Daniel (Col Span: 3) */}
            <div className="lg:col-span-3 bg-[#F2EDE4] border border-[#1C1A18]/10 p-5 flex flex-col justify-between rounded-sm shadow-md transition-all duration-300 hover:shadow-xl group">
              <div className="space-y-4">
                <div className="overflow-hidden h-64 w-full rounded-sm relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80" 
                    alt="Daniel - Skin Fade Master" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-[#E8762C] text-white font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                    Mid Contour
                  </div>
                </div>
                <div>
                  <h4 className="font-anton text-xl tracking-wider uppercase text-[#1C1A18]">DANIEL CHEN</h4>
                  <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">6 Yrs / Razor Fades & Burst Crop</p>
                </div>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light">
                  Daniel is the ultimate champion of modern gradients and razor lines. If you desire burst crops or tight skin fading, Daniel's chair is your location.
                </p>
              </div>

              <div className="flex gap-2.5 mt-6 border-t border-neutral-200 pt-3.5 text-neutral-400">
                <Instagram className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
                <Facebook className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
                <Twitter className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
              </div>
            </div>

            {/* Barber 3: Master Scene & Floating Resume Card (Col Span: 6) */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative bg-[#1C1A18] text-[#F2EDE4] p-5 rounded-sm shadow-lg overflow-hidden group">
              
              {/* Overlapping background abstract lines */}
              <div className="absolute top-0 right-0 w-20 h-full bg-[#E8762C]/5 select-none pointer-events-none" />

              <div className="flex flex-col justify-between h-full z-15 relative">
                <div>
                  <span className="font-mono text-[8.5px] text-[#E8762C] tracking-widest font-bold">★ MASTER COMB LINE ★</span>
                  <h4 className="font-anton text-2xl text-[#F2EDE4] tracking-wide uppercase mt-1 leading-none scale-y-105 origin-left">
                    PAK LONG AT WORK
                  </h4>
                  <p className="font-mono text-[8.5px] text-[#F2EDE4]/40 uppercase mt-0.5">30+ Yrs veteran straight razor comb</p>
                  <p className="font-sans text-xs text-[#F2EDE4]/70 leading-relaxed font-light mt-4">
                    Pak Long is the undisputed pillar of local shave therapy. Honed carbon blocks, traditional soap conditioning and classic posture accrued down three decades.
                  </p>
                </div>

                {/* Overlapping Floating Recruiting micro-CTA banner */}
                <div 
                  className="bg-[#3A332C] border border-[#E8762C]/40 p-4 rounded shadow-xl relative z-20 mt-6 md:mt-0"
                  style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
                >
                  <p className="font-mono text-[8px] text-[#E8762C] tracking-wider uppercase font-bold">CAREERS // JOIN CHAIR ROW</p>
                  <p className="font-anton text-xs text-[#F2EDE4] mt-1.5 uppercase tracking-wide">WANT TO JOIN OUR TEAM?</p>
                  <p className="font-sans text-[10px] text-[#F2EDE4]/60 font-light mt-0.5">We are recruiting senior clippery shears. Send absolute resumes.</p>
                  <button 
                    onClick={() => { playRetroScissorsClick(); alert("Resume submission routed. Send direct portfolio references to careers@sharpco.my."); }}
                    className="mt-3 text-[9px] font-mono text-[#E8762C] font-semibold flex items-center gap-1 hover:text-white"
                  >
                    Send Resume
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Work Mid-cut Photo */}
              <div className="relative h-64 md:h-full w-full overflow-hidden rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" 
                  alt="Traditional shave at work" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-90 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-anton text-[11px] text-white opacity-60 tracking-wider">PAK LONG CHAIR</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#1C1A18] text-[#F2EDE4]/70 py-16 px-6 md:px-12 lg:px-20 border-t border-[#F2EDE4]/10 relative">
        
        {/* Glowing thin accent boundary line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-[#E8762C]" style={{ boxShadow: "0 0 10px #E8762C" }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Col 1: Logo & Address */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-anton text-3xl tracking-wide text-white uppercase block">SHARP & CO.</span>
            <div className="w-10 h-0.5 bg-[#E8762C]" />
            <p className="font-sans text-xs text-[#F2EDE4]/60 max-w-sm leading-relaxed font-light">
              Premium retro-neon editorial grooming station based in KL. Blending classical scissors therapy with razor-edge skin outlines. Where the cut still matters.
            </p>
            <p className="font-mono text-[10px] text-[#F2EDE4]/40 uppercase tracking-widest leading-relaxed">
              HQ: Lorong Mamanda 2, Ampang Row, KL,<br/>
              Phone: +60 3-4251 0989
            </p>
          </div>

          {/* Col 2: Menu */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-anton text-xs text-white uppercase tracking-widest">MENU</h4>
            <ul className="font-mono text-xs space-y-2 text-[#F2EDE4]/40 uppercase font-semibold">
              <li>
                <button 
                  onClick={() => { playDullClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-[#E8762C]"
                >
                  Home Lobby
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playDullClick(); const s = document.getElementById("services"); if (s) s.scrollIntoView({behavior: "smooth"}); }}
                  className="hover:text-[#E8762C]"
                >
                  Cuts Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playDullClick(); const s = document.getElementById("about"); if (s) s.scrollIntoView({behavior: "smooth"}); }}
                  className="hover:text-[#E8762C]"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playDullClick(); const s = document.getElementById("shop"); if (s) s.scrollIntoView({behavior: "smooth"}); }}
                  className="hover:text-[#E8762C]"
                >
                  Apothecary
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-anton text-xs text-white uppercase tracking-widest">QUICK CHANNELS</h4>
            <ul className="font-mono text-xs space-y-2 text-[#F2EDE4]/40 uppercase font-semibold">
              <li>
                <button 
                  onClick={() => { playRetroScissorsClick(); onNavigate("book"); }}
                  className="hover:text-[#E8762C]"
                >
                  Book Seat
                </button>
              </li>
              <li>
                <span className="opacity-40 hover:text-[#E8762C] cursor-pointer">Live Pulse</span>
              </li>
              <li>
                <span className="opacity-40 hover:text-[#E8762C] cursor-pointer">Sandalwood Wax</span>
              </li>
              <li>
                <span className="opacity-40 hover:text-[#E8762C] cursor-pointer">Support</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Chores & Button */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h4 className="font-anton text-xs text-white uppercase tracking-widest">SADLE CHORES</h4>
              <p className="font-mono text-[9px] text-[#F2EDE4]/40 uppercase tracking-widest leading-relaxed">
                Tue - Sat: 10AM - 9PM<br/>
                Sun: 11AM - 7PM<br/>
                Mon: Rest Day
              </p>
            </div>

            <button 
              onClick={() => { playRetroScissorsClick(); onNavigate("book"); }}
              className="w-full py-3 bg-[#E8762C] text-[#F2EDE4] uppercase font-anton text-xs tracking-widest rounded-sm border border-[#E8762C] transition-all duration-300 hover:bg-[#F2EDE4] hover:text-[#1C1A18] hover:border-[#F2EDE4] cursor-pointer"
            >
              Reserve Now
            </button>
          </div>

        </div>

        {/* Bottom Social Icons and copyright bar */}
        <div className="max-w-7xl mx-auto border-t border-[#F2EDE4]/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[#F2EDE4]/30 uppercase gap-4">
          <span>© 2026 SHARP & CO. BARBERS. PRECISION STEEL CRAFT.</span>
          
          <div className="flex gap-4 items-center">
            <Instagram className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
            <Facebook className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-[#E8762C] cursor-pointer" />
          </div>
        </div>

      </footer>

    </div>
  );
}
