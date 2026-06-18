import { useEffect, useRef, useState } from "react";

export default function BarberPole() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile to swap out canvas rendering for low-battery CSS
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const draw = () => {
      if (!canvas || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Diagonal Stripes (Red, White, Blue, White)
      // We clip this to the inner cylinder boundaries
      ctx.save();
      
      // Rounded cylinder path
      const padding = 2;
      ctx.beginPath();
      ctx.roundRect(padding, padding, w - padding * 2, h - padding * 2, 8);
      ctx.clip();

      const stripeWidth = 22;
      const angleRad = Math.PI / 4; // 45 degrees
      const stripeHeightMultiplier = Math.tan(angleRad);

      const colors = ["#E63946", "#F4EFDC", "#1d3557", "#F4EFDC"];
      const stripeCycleHeight = stripeWidth * colors.length;

      // Draw repeating stripes moving vertically
      const totalYIterations = Math.ceil(h / stripeWidth) + 12;
      const totalXIterations = Math.ceil(w / stripeWidth) + 4;

      ctx.translate(0, offset % stripeCycleHeight);

      // Render diagonal stripes
      for (let y = -stripeCycleHeight * 2; y < h + stripeCycleHeight; y += stripeWidth) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + w * stripeHeightMultiplier);
        ctx.lineTo(w, y + w * stripeHeightMultiplier + stripeWidth);
        ctx.lineTo(0, y + stripeWidth);
        ctx.closePath();

        const colorIndex = Math.floor(Math.abs((y + stripeCycleHeight * 100) / stripeWidth)) % colors.length;
        ctx.fillStyle = colors[colorIndex];
        ctx.fill();
      }

      ctx.restore();

      // 2. Draw 3D Cylindrical Light & Shade Overlay (Refraction & Glass Reflection)
      ctx.save();
      // Shading gradient from left to right to create cylindrical depth
      const shadeGrad = ctx.createLinearGradient(0, 0, w, 0);
      shadeGrad.addColorStop(0.0, "rgba(15, 14, 13, 0.95)");  // Deep shadow left
      shadeGrad.addColorStop(0.12, "rgba(15, 14, 13, 0.55)"); // Taper light
      shadeGrad.addColorStop(0.35, "rgba(15, 14, 13, 0.0)");  // Clean center-left
      shadeGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.15)"); // Center specular bloom
      shadeGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.4)");  // Glass highlight peak
      shadeGrad.addColorStop(0.78, "rgba(255, 255, 255, 0.15)");
      shadeGrad.addColorStop(0.9, "rgba(15, 14, 13, 0.55)");   // Taper right
      shadeGrad.addColorStop(1.0, "rgba(15, 14, 13, 0.95)");   // Deep shadow right

      ctx.fillStyle = shadeGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Inside soft inner shadow glow
      ctx.strokeStyle = "rgba(244, 239, 220, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(1, 1, w - 2, h - 2);

      // Update position (downward motion represents clockwise rotation)
      offset += 1.25;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 w-20 md:w-28 filter drop-shadow-[0_0_15px_rgba(230,57,70,0.25)] select-none">
      {/* 1. Bronze Top Cap Dome */}
      <div className="relative w-12 md:w-16 h-8 bg-gradient-to-r from-bronze/60 via-bronze to-bronze/50 rounded-t-full border border-bronze/40 shadow-inner flex items-center justify-center">
        {/* Brass Knob point */}
        <div className="absolute top-[-6px] w-3 h-3 bg-bronze rounded-full shadow border-b border-bronze/40" />
        <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-bronze/80 to-bronze/60 border-t border-cream/20" />
      </div>

      {/* Decorative neon band connector */}
      <div className="w-14 md:w-18 h-2 bg-charcoal border-x border-bronze/50 flex justify-between px-1">
        <div className="w-1 h-full bg-electric-red animate-pulse" />
        <div className="w-1.5 h-1.5 mt-[1px] bg-electric-red rounded-full shadow-[0_0_8px_#E63946]" />
        <div className="w-1 h-full bg-electric-red animate-pulse" />
      </div>

      {/* 2. Main Glass Cylinder */}
      <div className="relative w-12 md:w-16 h-48 md:h-64 bg-charcoal/40 border border-bronze/40 rounded-sm overflow-hidden flex items-center justify-center shadow-lg">
        {/* Lens glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-10" />

        {isMobile ? (
          /* Mobile simplified 2D animated element */
          <div className="w-full h-full barber-pole-pattern opacity-85" />
        ) : (
          /* High performance canvas */
          <canvas
            ref={canvasRef}
            width={120}
            height={280}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Decorative neon band connector bottom */}
      <div className="w-14 md:w-18 h-2 bg-charcoal border-x border-bronze/50 flex justify-between px-1">
        <div className="w-1 h-full bg-electric-red animate-pulse" />
        <div className="w-1.5 h-1.5 mt-[1px] bg-electric-red rounded-full shadow-[0_0_8px_#E63946]" />
        <div className="w-1 h-full bg-electric-red animate-pulse" />
      </div>

      {/* 3. Bronze Bottom Cup & Bracket */}
      <div className="relative w-12 md:w-16 h-8 bg-gradient-to-r from-bronze/50 via-bronze to-bronze/60 rounded-b-lg border border-bronze/40 shadow-inner">
        <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-bronze/60 to-bronze/80 border-b border-cream/10" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-bronze/75 rounded-b-full border-x border-bronze/30" />
      </div>

      {/* Retro Wall Mount Bracket */}
      <div className="absolute left-[calc(100%-8px)] md:left-[-14px] top-1/4 h-1/2 w-3 md:w-4 bg-gradient-to-b from-bronze/40 via-bronze to-bronze/60 border border-bronze/50 rounded z-[-1] hidden md:block">
        <div className="absolute top-2 left-1 xl:left-3 w-6 h-1 bg-bronze/80 rounded" />
        <div className="absolute bottom-2 left-1 xl:left-3 w-6 h-1 bg-bronze/80 rounded" />
      </div>
    </div>
  );
}
