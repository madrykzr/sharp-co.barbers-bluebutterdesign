import { useState, useEffect } from "react";
import { playRetroScissorsClick } from "./AudioPlayer";

export default function LogoGlitch() {
  const [glitching, setGlitching] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setGlitching(true);
    playRetroScissorsClick();
    // Glitch runs for 400ms, then resets
    const timer = setTimeout(() => {
      setGlitching(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="relative cursor-pointer select-none py-1 group focus:outline-none"
      role="banner"
      aria-label="Sharp & Co. Barbers"
    >
      {/* Tiny Vintage Badge */}
      <span className="block text-[9px] font-mono tracking-[0.3em] text-bronze uppercase text-center font-bold mb-[-1px]">
        EST. 2019
      </span>

      {/* Main Glitch Text */}
      <h1
        className={`relative font-anton text-2xl md:text-3xl tracking-tight text-cream uppercase transition-colors duration-300 group-hover:text-electric-red flex items-center justify-center gap-1.5 ${
          glitching ? "glitch-text" : ""
        }`}
        data-text="SHARP & CO."
      >
        <span className="text-electric-red group-hover:text-cream transition-colors duration-300">SHARP</span>
        <span className="text-bronze font-special text-xl lowercase inline-block rotate-[-12deg] mx-1">&</span>
        <span className="text-cream group-hover:text-electric-red transition-colors duration-300">CO.</span>
      </h1>

      {/* Vintage subtext */}
      <span className="block text-[8px] font-mono tracking-[0.4em] text-cream/40 group-hover:text-cream/75 transition-colors duration-300 uppercase text-center mt-[-3px]">
        BARBERSHOP
      </span>

      {/* Behind-the-scenes Glitch Overlays */}
      {glitching && (
        <>
          <div className="absolute inset-0 text-2xl md:text-3xl font-anton text-cyan-400 opacity-70 -translate-x-1 translate-y-[2px] z-[-1] select-none pointer-events-none uppercase text-center mt-3">
            SHARP & CO.
          </div>
          <div className="absolute inset-0 text-2xl md:text-3xl font-anton text-fuchsia-500 opacity-70 translate-x-1 -translate-y-[1px] z-[-2] select-none pointer-events-none uppercase text-center mt-3">
            SHARP & CO.
          </div>
        </>
      )}
    </div>
  );
}
