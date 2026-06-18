import { motion } from "motion/react";
import { VISIT_INFO } from "../data";
import { playRetroScissorsClick, playDullClick } from "./AudioPlayer";
import { MapPin, Phone, Mail, Instagram, Clock, Compass, HelpCircle, AlertTriangle } from "lucide-react";

export default function VisitView() {
  return (
    <div className="w-full bg-[#12110F] text-cream min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title details */}
        <div className="text-center space-y-4 max-w-xl mx-auto pt-8">
          <span className="font-special text-xs text-electric-red tracking-[0.2em] block uppercase">
            ★ LOCATE THE MASTER RECRUITERS ★
          </span>
          <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-wider text-cream">
            VISIT & CONTACT
          </h1>
          <p className="font-sans text-xs md:text-sm text-cream/70 leading-relaxed">
            We are nestled inside Ampang's classic commercial row, opposite the Sports Center. Walk-ins are handled when chairs clear out. Bookings receive strict scheduling priority.
          </p>
        </div>

        {/* Contact and Map panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Detailed listings sidebar Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-[#181614] border border-bronze/15 rounded space-y-6">
              <h3 className="font-anton text-2xl uppercase tracking-wide text-cream border-b border-bronze/15 pb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-electric-red shrink-0" />
                <span>SALON LOCATOR</span>
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-charcoal border border-bronze/10 text-electric-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-cream uppercase tracking-wide">Physicial Address</h4>
                    <p className="font-mono text-xs text-cream/70 mt-1 leading-relaxed">
                      {VISIT_INFO.address}
                    </p>
                    <p className="font-mono text-[10px] text-bronze mt-1 block">
                      ★ Row 2, Shop Corner, Ampang Jaya near Sports Complex
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-charcoal border border-bronze/10 text-bronze shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-cream uppercase tracking-wide">Secure Phone Line</h4>
                    <p className="font-mono text-xs text-cream/70 mt-1">
                      {VISIT_INFO.phone}
                    </p>
                    <p className="font-mono text-[9px] text-cream/40 mt-0.5">Dial to verify custom requests</p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-charcoal border border-bronze/10 text-cream/45 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-cream uppercase tracking-wide">Email Enquiries</h4>
                    <p className="font-mono text-xs text-cream/70 mt-1">
                      {VISIT_INFO.email}
                    </p>
                  </div>
                </div>

                {/* Instagram Handle */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded bg-charcoal border border-bronze/10 text-electric-red shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-cream uppercase tracking-wide">Instagram Feed</h4>
                    <p className="font-mono text-xs text-cream/70 mt-1">
                      {VISIT_INFO.instagram}
                    </p>
                    <p className="font-mono text-[9px] text-cream/40 mt-0.5">Daily lookbooks and style cues</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Parking Instructions board */}
            <div className="p-6 bg-[#181614]/40 border border-bronze/10 rounded space-y-3">
              <span className="font-special text-xs text-bronze uppercase block tracking-wider">★ Parking instructions ★</span>
              <div className="flex gap-3 text-xs text-cream/70 leading-relaxed font-sans">
                <AlertTriangle className="w-5 h-5 text-electric-red shrink-0 mt-0.5" />
                <p>
                  Ample municipal parking is available right inside the commercial square and behind the Sports Center. Parking coupons are accessible via smart apps (e.g., Smart Selangor App). Avoid double-parking near the corner row to keep traffic flowing!
                </p>
              </div>
            </div>

          </div>

          {/* SVG Tactical/Retro Stylized Map Column */}
          <div className="lg:col-span-7 bg-[#181614] border border-bronze/15 rounded-lg p-6 lg:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-1.5 pb-3 border-b border-bronze/15">
              <h3 className="font-anton text-2xl uppercase text-cream">TACTICAL ROAD MAP</h3>
              <p className="font-mono text-[10px] text-cream/45 uppercase">Visual Coordinate reference • opposite ampang sport complex</p>
            </div>

            {/* Custom SVG Barbershop Map Block */}
            <div className="relative bg-charcoal border border-bronze/10 rounded-lg h-80 overflow-hidden flex items-center justify-center p-4">
              
              {/* Map Blueprint Grid lines */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

              {/* Vector blueprint overlay */}
              <svg 
                viewBox="0 0 500 300" 
                className="w-full h-full text-cream/40 stroke-cream/25 fill-none stroke-[1.5]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid guidelines */}
                <line x1="0" y1="50" x2="500" y2="50" strokeDasharray="3,3" />
                <line x1="0" y1="150" x2="500" y2="150" strokeDasharray="3,3" />
                <line x1="0" y1="250" x2="500" y2="250" strokeDasharray="3,3" />
                <line x1="100" y1="0" x2="100" y2="300" strokeDasharray="3,3" />
                <line x1="250" y1="0" x2="250" y2="300" strokeDasharray="3,3" />
                <line x1="400" y1="0" x2="400" y2="300" strokeDasharray="3,3" />

                {/* Roads: Lorong Mamanda 2 (vertical) and main street (horizontal) */}
                {/* Horizontal main road */}
                <path d="M 0 110 L 500 110" stroke="rgba(244, 239, 220, 0.4)" strokeWidth="32" strokeLinecap="square" />
                <path d="M 0 110 L 500 110" stroke="#8B6B3D" strokeWidth="2" strokeDasharray="8,8" />
                
                {/* Lorong Mamanda 2 (Vertical road crossing) */}
                <path d="M 160 0 L 160 300" stroke="rgba(244, 239, 220, 0.4)" strokeWidth="28" strokeLinecap="square" />
                <path d="M 160 0 L 160 300" stroke="#8B6B3D" strokeWidth="2" strokeDasharray="8,8" />

                {/* Buildings / Layout Markers */}
                {/* Ampang Sports Complex Building */}
                <rect x="240" y="10" width="220" height="70" fill="rgba(24, 22, 20, 0.9)" stroke="rgba(244, 239, 220, 0.2)" rx="4" />
                <text x="350" y="48" fill="#F4EFDC" fontFamily="sans-serif" fontSize="10" textAnchor="middle" fontWeight="bold">
                  AMPANG SPORTS COMPLEX
                </text>

                {/* Row Shops - Sharp & Co Row */}
                <rect x="30" y="160" width="100" height="110" fill="rgba(24, 22, 20, 0.9)" stroke="rgba(244, 239, 220, 0.2)" rx="4" />
                <text x="80" y="220" fill="rgba(244, 239, 220, 0.4)" fontFamily="sans-serif" fontSize="9" textAnchor="middle">
                  COMMERCIAL ROW
                </text>

                {/* Sharp & Co Barbers building (Corner Slot) */}
                <rect x="230" y="160" width="180" height="110" fill="#181614;" stroke="#E63946" strokeWidth="2" rx="4" />
                <text x="320" y="215" fill="#F4EFDC" fontFamily="'Anton', sans-serif" fontSize="12" textAnchor="middle" letterSpacing="1">
                  SHARP & CO. BARBERS
                </text>
                <text x="320" y="235" fill="#8B6B3D" fontFamily="monospace" fontSize="8" textAnchor="middle">
                  ESTD. 2019 (CORNER UNIT)
                </text>

                {/* Street Names Labels */}
                <text x="20" y="115" fill="#F4EFDC" opacity="0.6" fontFamily="sans-serif" fontSize="8" fontWeight="bold">MAIN ROAD TO KLCC</text>
                
                {/* Rotated text for Vertical Road */}
                <g transform="rotate(90, 160, 20)">
                  <text x="160" y="20" fill="#F4EFDC" opacity="0.6" fontFamily="sans-serif" fontSize="8" fontWeight="bold">LORONG MAMANDA 2</text>
                </g>

                {/* Red Pin/Crosshair Highlight of Barbershop */}
                <g transform="translate(265, 175)">
                  {/* Pin Circle Ripple */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#E63946" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '0px 0px' }} />
                  {/* Center pin bubble */}
                  <circle cx="0" cy="0" r="5" fill="#E63946" stroke="#F4EFDC" strokeWidth="1.5" />
                  {/* Pin Stem */}
                  <path d="M 0 0 L 0 -12" stroke="#E63946" strokeWidth="2" />
                </g>
              </svg>

              {/* Floating Badge Tag */}
              <div className="absolute bottom-4 left-4 bg-charcoal/95 border border-electric-red/40 px-3 py-1.5 rounded text-[11px] font-mono text-cream flex items-center gap-1.5 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-electric-red animate-pulse" />
                <span>GPS: 3.1584° N, 101.7584° E</span>
              </div>
            </div>

            {/* Bottom guide details */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-bronze/10 pt-4 text-xs font-mono">
              <span className="text-cream/50 uppercase">HAVE PROBLEMS FINDING US?</span>
              <a
                href={`tel:${VISIT_INFO.phone}`}
                className="text-electric-red font-bold hover:underline"
              >
                CALL DESK: {VISIT_INFO.phone}
              </a>
            </div>

          </div>

        </div>

        {/* FAQ layout */}
        <div className="space-y-6">
          <h3 className="font-anton text-2xl uppercase text-cream text-center">FREQUENTLY ASKED</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-[#181614] p-5 rounded border border-bronze/15 space-y-1.5">
              <h4 className="font-bold text-cream font-sans text-sm">Do you accommodate walk-ins?</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Yes, we do. However, walk-in customers are served on a first-come, first-served basis strictly when our scheduled chairs clear. To avoid long waits, we highly recommend scheduling online.
              </p>
            </div>

            <div className="bg-[#181614] p-5 rounded border border-bronze/15 space-y-1.5">
              <h4 className="font-bold text-cream font-sans text-sm">Can I request a specific barber?</h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Absolutely! Our online booking wizard lets you choose precisely who handles your hair, whether that is Faiz, Daniel, or Pak Long.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
