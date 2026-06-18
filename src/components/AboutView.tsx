import { motion } from "motion/react";
import { BARBERS_DATA } from "../data";
import { Barber } from "../types";
import { playRetroScissorsClick, playDullClick } from "./AudioPlayer";
import ImageWithFallback from "./ImageWithFallback";
import { Calendar, UserCheck, Shield, ChevronRight, Award, Trophy, Sparkles } from "lucide-react";

interface AboutViewProps {
  onNavigate: (view: 'home' | 'cuts' | 'book' | 'shop' | 'about' | 'visit', payload?: any) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const handleBookBarber = (barber: Barber) => {
    playRetroScissorsClick();
    onNavigate('book', { selectedBarber: barber });
  };

  return (
    <div className="w-full bg-charcoal text-cream min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Story Section */}
        <div className="relative pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Text Left */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-special text-xs text-electric-red uppercase tracking-widest block">
              ★ SHARP & CO. TRADITIONS ★
            </span>
            <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-tight text-cream">
              OUR STORY: WHERE THE <br/>
              <span className="text-bronze">CUT STILL MATTERS</span>
            </h1>
            <div className="w-16 h-1 bg-electric-red" />

            <div className="space-y-4 text-cream/85 font-sans text-sm md:text-base leading-relaxed">
              <p>
                Established in 2019, Sharp & Co. Barbers was born out of a desire to resurrect the authentic, unhurried heritage of the American neighborhood barbershop. Founders Faiz and team believed that grooming is not a transaction, but an intentional ceremony.
              </p>
              <p>
                Located in the heart of traditional Ampang, KL, our space blends vintage Americana styling (dark charcoal tones, bronze fittings, and deep leather seating) with the electric glow of modern neon accents.
              </p>
              <p>
                Whether you walk in for a high-precision skin fade or a classical straight razor wet shave with hot steamed towels, we treat every head as our canvas. We don't rush. We don't cut corners. Here, our blade speaks for our honor.
              </p>
            </div>

            {/* Vintage stats badge */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-bronze/10">
              <div className="text-center md:text-left bg-[#181614] p-3 rounded border border-bronze/10">
                <span className="font-anton text-2xl text-electric-red block">2019</span>
                <span className="font-mono text-[9px] text-cream/40 uppercase tracking-wider block mt-1">Established</span>
              </div>
              <div className="text-center md:text-left bg-[#181614] p-3 rounded border border-bronze/10">
                <span className="font-anton text-2xl text-bronze block">10k+</span>
                <span className="font-mono text-[9px] text-cream/40 uppercase tracking-wider block mt-1">Grooms Finished</span>
              </div>
              <div className="text-center md:text-left bg-[#181614] p-3 rounded border border-bronze/10">
                <span className="font-anton text-2xl text-cream block">48 Years</span>
                <span className="font-mono text-[9px] text-cream/40 uppercase tracking-wider block mt-1">Combined Exp.</span>
              </div>
            </div>
          </div>

          {/* Story Image Right */}
          <div className="lg:col-span-5 relative">
            {/* Bronze frame accent */}
            <div className="absolute top-4 left-4 inset-0 border border-bronze rounded z-0" />
            <div className="relative z-10 bg-[#181614] p-2 border border-bronze/20 rounded">
              <ImageWithFallback
                src="/hero-bg.jpg"
                alt="Vintage leather chairs and mirrors"
                className="w-full h-[380px] object-cover rounded-sm filter brightness-90 contrast-110"
              />
              <div className="mt-3 p-3 bg-charcoal border border-bronze/10 rounded-sm flex items-center justify-between text-xs font-mono">
                <span className="text-bronze">Ampang Lorong Mamanda 2</span>
                <span className="text-electric-red">● EST 2019</span>
              </div>
            </div>
          </div>

        </div>

        {/* Meet the Barbers Grid Block */}
        <div className="space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-special text-xs text-bronze uppercase tracking-widest block">★ SELECT YOUR CRAFTSMAN ★</span>
            <h2 className="font-anton text-3.5xl md:text-5xl uppercase tracking-tight text-cream">
              MEET THE MASTERS
            </h2>
            <p className="font-mono text-xs text-cream/40 max-w-lg mx-auto">
              Our barbers do more than trim. They hold master portfolios, fine mechanics, and specialize in unique hair architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {BARBERS_DATA.map((barber, index) => {
              return (
                <motion.div
                  key={barber.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#181614] border border-bronze/10 rounded-lg overflow-hidden hover:neon-border hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-2xl relative group"
                >
                  <div className="p-1">
                    {/* Portrait Frame */}
                    <div className="relative h-72 overflow-hidden bg-charcoal rounded-t">
                      <ImageWithFallback
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark overlay with soft red rim light shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/20" />
                      
                      {/* Barber badge role */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="bg-electric-red font-anton text-xs text-cream uppercase px-3 py-1 rounded shadow-lg border border-electric-red/45">
                          {barber.role}
                        </span>
                        <div className="bg-charcoal/90 border border-bronze/30 px-2 py-0.5 rounded text-[10px] text-bronze font-mono">
                          {barber.experience} EXP
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Description details */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-anton text-2xl tracking-wide uppercase text-cream group-hover:text-electric-red transition-colors">
                        {barber.name}
                      </h3>
                      
                      {/* Specialty Badge */}
                      <p className="text-[10px] font-mono text-bronze uppercase bg-charcoal p-1.5 rounded border border-bronze/15 inline-block w-full text-center">
                        ★ Specialty: {barber.specialty}
                      </p>

                      <p className="font-sans text-xs text-cream/70 leading-relaxed mt-2">
                        {barber.bio}
                      </p>
                    </div>

                    {/* Booking Hook Action */}
                    <div className="pt-4 border-t border-white/[0.04]">
                      <button
                        onClick={() => handleBookBarber(barber)}
                        className="w-full py-3 bg-charcoal hover:bg-electric-red border border-bronze/40 hover:border-electric-red hover:shadow-[0_0_12px_rgba(230,57,70,0.3)] text-cream font-anton text-xs uppercase tracking-wide rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book {barber.name}'s Chair</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Vintage values panel */}
        <section className="bg-[#12110F] border border-bronze/15 p-8 md:p-12 rounded flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-electric-red" />
              <h4 className="font-anton text-xl tracking-wide uppercase text-cream">UNCOMPROMISING STANDARDS</h4>
            </div>
            <p className="font-sans text-xs text-cream/65 leading-relaxed">
              We sanitize all handles, razors, shears, and guards of our barbers after each service with industrial grade sanitizer. Safety and comfort is our topmost standard.
            </p>
          </div>
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-bronze" />
              <h4 className="font-anton text-xl tracking-wide uppercase text-cream">PREMIUM IMPORTS</h4>
            </div>
            <p className="font-sans text-xs text-cream/65 leading-relaxed">
              We import our clay hair waxes from the USA and organic beard conditioning oils from Sweden to groom with supreme premium ingredients.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
