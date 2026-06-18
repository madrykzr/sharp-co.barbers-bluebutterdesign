import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CUTS_DATA, BARBERS_DATA, TIMING_SLOTS } from "../data";
import { CutStyle, Barber, BookingState } from "../types";
import { playRetroScissorsClick, playDullClick } from "./AudioPlayer";
import ImageWithFallback from "./ImageWithFallback";
import { Scissors, User, Calendar, Clock, ArrowLeft, ArrowRight, Check, Send, Sparkles, MessageSquare, PhoneCall } from "lucide-react";

interface BookViewProps {
  initialPayload?: {
    selectedCut?: CutStyle;
    selectedBarber?: Barber;
  };
  onNavigateHome: () => void;
}

export default function BookView({ initialPayload, onNavigateHome }: BookViewProps) {
  // Initialize multi-step state model
  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    selectedCut: initialPayload?.selectedCut || null,
    selectedBarber: initialPayload?.selectedBarber || null,
    selectedDate: "2026-06-18", // June 18th, 2026 (day after 2026-06-17)
    selectedTimeSlot: "",
    customerName: "",
    customerPhone: "",
    customerNote: ""
  });

  const [bookingFinished, setBookingFinished] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 for Next, -1 for Prev

  // Sync state if payload arriving mid-mount or navigation
  useEffect(() => {
    if (initialPayload) {
      setBooking(prev => ({
        ...prev,
        selectedCut: initialPayload.selectedCut !== undefined ? initialPayload.selectedCut : prev.selectedCut,
        selectedBarber: initialPayload.selectedBarber !== undefined ? initialPayload.selectedBarber : prev.selectedBarber,
        step: initialPayload.selectedCut ? 2 : (initialPayload.selectedBarber ? 1 : 1) // Smart bypass
      }));
    }
  }, [initialPayload]);

  const handleSelectCut = (cut: CutStyle) => {
    playDullClick();
    setBooking(prev => ({ ...prev, selectedCut: cut }));
    // Move forward automatically to Step 2
    handleNextStep();
  };

  const handleSelectBarber = (barber: Barber) => {
    playDullClick();
    setBooking(prev => ({ ...prev, selectedBarber: barber }));
    // Move forward automatically to Step 3
    handleNextStep();
  };

  const handleSelectDate = (dateStr: string) => {
    playDullClick();
    setBooking(prev => ({ ...prev, selectedDate: dateStr }));
  };

  const handleSelectTime = (time: string) => {
    playDullClick();
    setBooking(prev => ({ ...prev, selectedTimeSlot: time }));
  };

  const handleNextStep = () => {
    if (booking.step < 4) {
      playRetroScissorsClick();
      setDirection(1);
      setBooking(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handlePrevStep = () => {
    if (booking.step > 1) {
      playDullClick();
      setDirection(-1);
      setBooking(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleFinishBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!booking.customerName || !booking.customerPhone) return;

    playRetroScissorsClick();
    setBookingFinished(true);
  };

  // June 2026 Calendar generator logic
  // June 1 2026 starts on a Monday
  const juneDaysCount = 30;
  const daysInJune = Array.from({ length: juneDaysCount }, (_, i) => i + 1);

  // slide animator rules
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  return (
    <div className="w-full bg-[#12110F] text-cream min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Progress header */}
        <div className="text-center space-y-3 pt-8">
          <span className="font-special text-xs text-bronze uppercase tracking-[0.2em] block">
            ★ AMPANG BOOKING OFFICE ★
          </span>
          <h1 className="font-anton text-4xl md:text-5xl uppercase tracking-wider text-cream">
            CHAIR SCHEDULER
          </h1>
          
          {/* Progress node bars */}
          {!bookingFinished && (
            <div className="flex justify-between items-center max-w-lg mx-auto pt-6 px-4">
              {[
                { number: 1, label: "GROOM", active: booking.step >= 1 },
                { number: 2, label: "BARBER", active: booking.step >= 2 },
                { number: 3, label: "TIMING", active: booking.step >= 3 },
                { number: 4, label: "CONFIRM", active: booking.step >= 4 }
              ].map((p, idx) => (
                <div key={p.number} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-anton text-sm transition-all duration-300 ${
                      booking.step === p.number 
                        ? "bg-electric-red border-electric-red text-cream shadow-[0_0_10px_#E63946]"
                        : p.active 
                          ? "bg-bronze border-bronze text-cream" 
                          : "bg-charcoal border-white/10 text-cream/30"
                    }`}>
                      {p.number < booking.step ? "✓" : p.number}
                    </div>
                    <span className={`font-mono text-[9px] tracking-widest uppercase hidden sm:block ${
                      booking.step === p.number ? "text-cream" : p.active ? "text-bronze" : "text-cream/20"
                    }`}>
                      {p.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`h-0.5 flex-grow mx-2 transition-all duration-500 ${
                      booking.step > p.number ? "bg-bronze" : "bg-neutral-800"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Wizard Steps wrapper */}
        <div className="bg-[#181614] border border-bronze/15 rounded-lg overflow-hidden shadow-2xl p-6 md:p-8 min-h-[480px] flex flex-col justify-between relative">
          
          {/* Subtle neon glowing frame accent */}
          {!bookingFinished && (
            <div className="absolute inset-0 border border-electric-red/5 rounded-lg pointer-events-none" />
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {bookingFinished ? (
              /* GRAND WHATSAPP SUCCESS CARD */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6 flex flex-col items-center justify-center h-full"
              >
                {/* Simulated mechanical scissors click ring */}
                <div className="relative">
                  <div className="absolute inset-0 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                    className="relative w-20 h-20 bg-green-500 rounded-full border border-green-400 flex items-center justify-center text-cream shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  >
                    <Check className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <span className="font-special text-xs text-green-400 uppercase tracking-widest block font-bold">
                    ★ BOOKING LOGGED SECURELY ★
                  </span>
                  <h3 className="font-anton text-3xl uppercase tracking-wider text-cream">
                    SEE YOU IN THE CHAIR, {booking.customerName.split(' ')[0]}!
                  </h3>
                  <div className="w-12 h-1 bg-green-500 mx-auto" />
                </div>

                {/* Simulated confirmation parameters listing */}
                <div className="bg-[#12110F] border border-green-500/10 p-5 rounded max-w-md w-full space-y-4 text-xs font-mono">
                  
                  <div className="grid grid-cols-2 gap-y-2 text-left border-b border-white/[0.04] pb-4">
                    <span className="text-cream/40">SELECTED STYLE</span>
                    <span className="text-cream font-bold text-right uppercase">{booking.selectedCut?.name}</span>

                    <span className="text-cream/40">MASTER CRAFTSMAN</span>
                    <span className="text-bronze font-bold text-right uppercase">{booking.selectedBarber?.name}</span>

                    <span className="text-cream/40">CALENDAR SLOT</span>
                    <span className="text-cream font-bold text-right">JUNE {booking.selectedDate.split("-")[2]}, 2026</span>

                    <span className="text-cream/40">REPORT TIMING</span>
                    <span className="text-electric-red font-bold text-right">{booking.selectedTimeSlot || "10:30 AM"}</span>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-cream/70 text-[11px] leading-relaxed flex items-center justify-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-green-400 shrink-0" />
                      We have generated a fake WhatsApp check-in token.
                    </p>
                    <span className="text-green-400 font-bold text-[10px] block animate-pulse uppercase">
                      "We'll WhatsApp you at {booking.customerPhone} shortly"
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateHome}
                  className="px-8 py-3.5 bg-neutral-800 text-cream font-anton text-xs uppercase tracking-widest rounded shadow hover:bg-cream hover:text-charcoal transition-all duration-300 cursor-pointer"
                >
                  Return to Salon Homepage
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={booking.step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex-grow"
              >
                {/* STEP 1: CHOOSE TARGET CUT */}
                {booking.step === 1 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                      <h3 className="font-anton text-xl tracking-wider uppercase text-cream flex items-center gap-2">
                        <Scissors className="w-5 h-5 text-electric-red" />
                        <span>Step 1: Choose Your Cut Style</span>
                      </h3>
                      <span className="font-mono text-xs text-cream/40">Choose 1 of 6</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
                      {CUTS_DATA.map(cut => {
                        const isChosen = booking.selectedCut?.id === cut.id;
                        return (
                          <div
                            key={cut.id}
                            onClick={() => handleSelectCut(cut)}
                            className={`p-4 rounded border-2 text-left cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden ${
                              isChosen 
                                ? "bg-charcoal border-electric-red shadow-[0_0_10px_rgba(230,57,70,0.15)]" 
                                : "bg-neutral-900 border-bronze/10 hover:border-bronze hover:bg-[#1f1d1b]"
                            }`}
                          >
                            <div className="space-y-1 z-10">
                              <h4 className="font-anton text-base uppercase text-cream group-hover:text-electric-red transition-colors flex items-center gap-1.5">
                                {cut.name}
                                {isChosen && <Check className="w-4 h-4 text-electric-red" />}
                              </h4>
                              <p className="font-mono text-[10px] text-cream/50 leading-relaxed">{cut.duration} • RM {cut.price}</p>
                              <p className="font-sans text-[11px] text-cream/35 line-clamp-1">{cut.tagline}</p>
                            </div>

                            <span className="font-anton text-lg text-bronze z-10 bg-[#12110F] px-2 py-0.5 rounded border border-bronze/25 font-bold shrink-0">
                              RM {cut.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: CHOOSE BARBER */}
                {booking.step === 2 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                      <h3 className="font-anton text-xl tracking-wider uppercase text-cream flex items-center gap-2">
                        <User className="w-5 h-5 text-electric-red" />
                        <span>Step 2: Pick Your Master Barber</span>
                      </h3>
                      <span className="font-mono text-xs text-cream/40">Choose 1 of 3</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {BARBERS_DATA.map(barber => {
                        const isChosen = booking.selectedBarber?.id === barber.id;
                        return (
                          <div
                            key={barber.id}
                            onClick={() => handleSelectBarber(barber)}
                            className={`rounded border overflow-hidden cursor-pointer transition-all text-center flex flex-col group ${
                              isChosen 
                                ? "bg-charcoal neon-border" 
                                : "bg-neutral-900 border-bronze/10 hover:border-bronze"
                            }`}
                          >
                            <div className="h-40 bg-neutral-950 overflow-hidden relative">
                              <ImageWithFallback
                                src={barber.avatar}
                                alt={barber.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute bottom-2 left-2">
                                <span className="bg-charcoal/95 border border-bronze/35 text-[9px] font-mono text-bronze px-2 py-0.5 rounded">
                                  {barber.experience} EXP
                                </span>
                              </div>
                            </div>
                            <div className="p-4 space-y-1">
                              <h4 className="font-anton text-base uppercase text-cream group-hover:text-electric-red transition-colors flex items-center justify-center gap-1">
                                {barber.name}
                                {isChosen && <Check className="w-4.5 h-4.5 text-electric-red shrink-0" />}
                              </h4>
                              <p className="font-mono text-[10px] text-bronze uppercase">{barber.role}</p>
                              <p className="font-mono text-[9px] text-cream/40 mt-1 line-clamp-2 italic">"{barber.specialty}"</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: SCHEDULE DATE / TIME */}
                {booking.step === 3 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                      <h3 className="font-anton text-xl tracking-wider uppercase text-cream flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-electric-red" />
                        <span>Step 3: Select Date & Timing</span>
                      </h3>
                      <span className="font-mono text-xs text-cream/40">June 2026</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                      
                      {/* Left Side: Days Calendar (June 2026 starts on Monday) */}
                      <div className="md:col-span-7 space-y-3 bg-[#12110F] p-4 rounded border border-bronze/10">
                        <span className="font-anton text-xs tracking-wider uppercase text-cream text-center block mb-2 border-b border-white/[0.04] pb-2">
                          JUNE 2026 SCHEDULE INDEX
                        </span>

                        {/* Calendar Day labels */}
                        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-bronze font-bold">
                          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                        </div>

                        {/* Month block dates */}
                        <div className="grid grid-cols-7 gap-1.5 text-center">
                          {daysInJune.map(dayNum => {
                            const dateCode = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                            const isSelected = booking.selectedDate === dateCode;
                            const isSunday = dayNum % 7 === 0; // Sundays are light hours, mondays closed
                            const isMonday = dayNum % 7 === 1;

                            const isDisabled = isMonday; // closed on mondays

                            return (
                              <button
                                key={dayNum}
                                disabled={isDisabled}
                                onClick={() => handleSelectDate(dateCode)}
                                className={`aspect-square p-1 rounded-sm text-[11px] font-mono transition-all flex flex-col justify-center items-center cursor-pointer ${
                                  isDisabled 
                                    ? "opacity-20 bg-transparent text-cream/20 cursor-not-allowed" 
                                    : isSelected 
                                      ? "bg-electric-red text-cream font-bold shadow-[0_0_8px_#E63946]" 
                                      : "bg-charcoal border border-bronze/10 text-cream/70 hover:border-bronze hover:text-cream"
                                }`}
                              >
                                <span>{dayNum}</span>
                                {isSunday && !isSelected && <span className="w-1 h-1 rounded-full bg-bronze" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Side: Clickable Time Slots list */}
                      <div className="md:col-span-5 space-y-3 flex flex-col">
                        <span className="font-anton text-xs tracking-wider uppercase text-cream text-center block border-b border-white/[0.04] pb-2">
                          AVAILABLE TIME HOURLIES
                        </span>

                        <div className="grid grid-cols-2 gap-2 h-[220px] overflow-y-auto pr-1">
                          {TIMING_SLOTS.map(slot => {
                            const isChosen = booking.selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => handleSelectTime(slot)}
                                className={`py-2 px-2 rounded-sm border font-mono text-[10px] text-center tracking-wider uppercase cursor-pointer transition-all ${
                                  isChosen 
                                    ? "bg-bronze border-bronze text-cream font-bold shadow-[0_0_8px_rgba(139,107,61,0.4)]" 
                                    : "bg-charcoal border-bronze/10 text-cream/65 hover:border-bronze hover:text-cream"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>

                        {/* Timing Alert info */}
                        <div className="p-2 bg-charcoal rounded border border-bronze/10 text-[9px] font-mono text-cream/40 uppercase">
                          Selected Check: <span className="text-electric-red font-bold">JUNE {booking.selectedDate.split("-")[2]}</span> at <span className="text-bronze font-bold">{booking.selectedTimeSlot || "NOT CHOSEN"}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 4: CUSTOMER FORM & SECURE CHECKOUT */}
                {booking.step === 4 && (
                  <form onSubmit={handleFinishBooking} className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-bronze/10 pb-3">
                      <h3 className="font-anton text-xl tracking-wider uppercase text-cream flex items-center gap-2">
                        <Clock className="w-5 h-5 text-electric-red" />
                        <span>Step 4: Contact & Secure Registration</span>
                      </h3>
                      <span className="font-mono text-xs text-cream/40">Review & Submit</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                      
                      {/* Left Fields inputs Column */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-bronze uppercase tracking-widest block font-bold">
                            YOUR FULL NAME *
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="e.g., Razif Azman"
                            value={booking.customerName}
                            onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-[#12110F] border border-bronze/15 focus:border-electric-red focus:outline-none rounded-sm font-mono text-xs text-cream placeholder-cream/25"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-bronze uppercase tracking-widest block font-bold">
                            WHATSAPP CONTACT NUMBER *
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="e.g., +60 12-345 6789"
                            value={booking.customerPhone}
                            onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-[#12110F] border border-bronze/15 focus:border-electric-red focus:outline-none rounded-sm font-mono text-xs text-cream placeholder-cream/25"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-cream/40 uppercase tracking-widest block font-bold">
                            SPECIAL STYLING NOTES (OPTIONAL)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Any scalp sensitivity, high crown crown-issues, hair-loss patches, or styling cream preferences..."
                            value={booking.customerNote}
                            onChange={(e) => setBooking(prev => ({ ...prev, customerNote: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-[#12110F] border border-bronze/15 focus:border-electric-red focus:outline-none rounded-sm font-mono text-xs text-cream placeholder-cream/25 resize-none"
                          />
                        </div>
                      </div>

                      {/* Right Review Column */}
                      <div className="md:col-span-5 bg-charcoal p-5 rounded border border-bronze/10 space-y-4">
                        <span className="font-anton text-xs tracking-wider uppercase text-cream border-b border-white/[0.04] pb-2 block text-center">
                          SUMMARY OF APPOINTMENT
                        </span>

                        <div className="space-y-2.5 font-mono text-[11px]">
                          <div className="flex justify-between border-b border-white/[0.02] pb-1">
                            <span className="text-cream/40">STYLE CUT:</span>
                            <span className="text-cream font-bold uppercase truncate max-w-[140px]">
                              {booking.selectedCut?.name || "NONE SELECTED"}
                            </span>
                          </div>

                          <div className="flex justify-between border-b border-white/[0.02] pb-1">
                            <span className="text-cream/40">BARBER:</span>
                            <span className="text-bronze font-bold uppercase">
                              {booking.selectedBarber?.name || "ANY BARBER"}
                            </span>
                          </div>

                          <div className="flex justify-between border-b border-white/[0.02] pb-1">
                            <span className="text-cream/40">DATE:</span>
                            <span className="text-cream font-bold">
                              JUNE {booking.selectedDate.split("-")[2]}, 2026
                            </span>
                          </div>

                          <div className="flex justify-between border-b border-white/[0.02] pb-1">
                            <span className="text-cream/40">TIMING:</span>
                            <span className="text-electric-red font-bold">
                              {booking.selectedTimeSlot || "01:00 PM"}
                            </span>
                          </div>

                          <div className="flex justify-between border-t border-white/[0.05] pt-2 text-xs font-bold">
                            <span className="text-cream uppercase">FEES TOTAL:</span>
                            <span className="text-cream font-anton text-base text-electric-red">
                              RM {booking.selectedCut?.price || 45}
                            </span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!booking.customerName || !booking.customerPhone}
                          className="w-full py-4.5 bg-electric-red text-cream disabled:bg-neutral-800 disabled:border-neutral-800 disabled:text-cream/20 font-anton text-sm uppercase tracking-wider rounded border border-electric-red shadow-[0_0_12px_rgba(230,57,70,0.3)] hover:bg-cream hover:text-charcoal hover:border-cream transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Book Appointment (RM {booking.selectedCut?.price || 45})</span>
                        </button>
                      </div>

                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Wizard Control buttons footer */}
          {!bookingFinished && (
            <div className="flex justify-between items-center border-t border-bronze/10 pt-6 mt-8">
              <button
                disabled={booking.step === 1}
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded border border-bronze/35 text-xs text-cream/70 hover:text-cream uppercase font-mono disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Step</span>
              </button>

              <span className="font-mono text-[10px] text-cream/30 uppercase font-bold">
                PAGE {booking.step} OF 4
              </span>

              {booking.step < 4 ? (
                <button
                  disabled={
                    (booking.step === 1 && !booking.selectedCut) ||
                    (booking.step === 2 && !booking.selectedBarber) ||
                    (booking.step === 3 && !booking.selectedTimeSlot)
                  }
                  onClick={handleNextStep}
                  className="px-4 py-2.5 rounded bg-bronze hover:bg-cream hover:text-charcoal text-cream font-anton text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="w-16 h-4" /> /* spacer */
              )}
            </div>
          )}

        </div>

        {/* Vintage note card bottom */}
        <div className="p-4 bg-charcoal text-center border border-bronze/10 rounded font-mono text-[10px] text-cream/45 uppercase tracking-wide">
          ★ DEMO SANDBOX PRE-REGISTRATION • NO ACTUAL BANK TRANSACTIONS OR APIS DEPLOYED ★
        </div>

      </div>
    </div>
  );
}
