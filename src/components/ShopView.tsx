import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS_DATA } from "../data";
import { Product } from "../types";
import { playDullClick, playRetroScissorsClick } from "./AudioPlayer";
import ImageWithFallback from "./ImageWithFallback";
import { Search, ShoppingBag, Trash2, X, Plus, Minus, Star, Heart, CheckCircle2 } from "lucide-react";

export default function ShopView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  // Filter products by category and search query
  const filteredProducts = PRODUCTS_DATA.filter(prod => {
    const matchesCategory = activeCategory === "all" || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    playRetroScissorsClick();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer immediately so they see the effect
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    playDullClick();
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    playDullClick();
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleSimulateCheckout = () => {
    playRetroScissorsClick();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setIsCartOpen(false);
    }, 2500);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="w-full bg-charcoal text-cream min-h-screen py-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header content */}
        <div className="text-center space-y-4 pt-8 max-w-xl mx-auto">
          <span className="font-special text-xs text-electric-red tracking-widest block uppercase">★ PREMIUM VINTAGE FORMULATIONS ★</span>
          <h1 className="font-anton text-5xl md:text-6xl uppercase tracking-wider text-cream">
            THE GROOMING APOTHECARY
          </h1>
          <p className="font-sans text-xs md:text-sm text-cream/70 leading-relaxed">
            Take the Sharp & Co. confidence home. Explore our curated selection of pomades, organic beard elixirs, and bronze combs. Clean formulations designed for supreme hold and scent longevity.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#181614] p-4 rounded border border-bronze/10">
          
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/35" />
            <input
              type="text"
              placeholder="Search pomade, combs or colognes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-charcoal border border-bronze/15 focus:border-electric-red focus:outline-none rounded-sm font-mono text-xs text-cream placeholder-cream/35 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="md:col-span-6 flex flex-wrap gap-1.5 justify-start">
            {[
              { id: "all", label: "All Products" },
              { id: "pomade", label: "Pomade" },
              { id: "beard", label: "Beard Oil" },
              { id: "aftershave", label: "Aftershave" },
              { id: "grooming", label: "Tools" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => { playDullClick(); setActiveCategory(cat.id); }}
                className={`px-3.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider border cursor-pointer transition-all ${
                  activeCategory === cat.id 
                    ? "bg-electric-red border-electric-red text-cream font-bold shadow-[0_0_8px_rgba(230,57,70,0.3)]"
                    : "bg-charcoal border-bronze/10 text-cream/60 hover:border-bronze/35 hover:text-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cart trigger button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={() => { playDullClick(); setIsCartOpen(true); }}
              className="relative px-4 py-2 bg-transparent hover:bg-[#1C1A18] border border-bronze/40 rounded-sm font-anton text-xs uppercase tracking-widest text-cream flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
            >
              <ShoppingBag className="w-4 h-4 text-electric-red" />
              <span>Groom Bag</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-electric-red text-cream font-mono text-[10px] rounded-full flex items-center justify-center border border-charcoal font-bold shadow animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Product Catalog Grid Layout */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#161412] rounded border border-bronze/10">
            <span className="font-special text-lg text-cream/50 uppercase">No Apothecary Items Match</span>
            <p className="font-mono text-xs text-cream/35 mt-1">Try resetting your filters or search query terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#181614] border border-bronze/10 hover:border-electric-red/30 transition-all duration-300 rounded overflow-hidden flex flex-col justify-between shadow-xl group hover:translate-y-[-2px]"
              >
                {/* Photo Header */}
                <div className="relative aspect-square bg-charcoal overflow-hidden p-4 flex items-center justify-center">
                  <ImageWithFallback
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover rounded opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#0F0E0D]/10 group-hover:bg-transparent transition-colors" />

                  {/* Rating star overlay */}
                  <div className="absolute top-3 left-3 bg-[#0F0E0D]/90 border border-bronze/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 text-electric-red fill-electric-red" />
                    <span className="font-mono text-[10px] text-cream font-bold">{prod.rating}</span>
                  </div>

                  <span className="absolute bottom-3 right-3 bg-[#181614]/90 px-2 py-0.5 rounded font-mono text-[9px] text-bronze uppercase border border-bronze/35">
                    {prod.size}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {/* Category */}
                    <span className="text-[9px] tracking-widest text-bronze uppercase font-mono font-bold">
                      {prod.category}
                    </span>

                    <h3 className="font-anton text-lg uppercase text-cream tracking-wide group-hover:text-electric-red transition-colors">
                      {prod.name}
                    </h3>

                    <p className="font-sans text-xs text-cream/70 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04] space-y-3">
                    {/* Price and Add button */}
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-xs text-cream/40">PRICE:</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="font-mono text-[10px] text-bronze">RM</span>
                        <span className="font-anton text-2xl text-cream">{prod.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="w-full py-2.5 bg-transparent group-hover:bg-electric-red text-cream group-hover:border-electric-red font-anton text-xs uppercase tracking-wider rounded border border-bronze/50 group-hover:shadow-[0_0_12px_rgba(230,57,70,0.3)] duration-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-electric-red group-hover:text-cream transition-colors" />
                      <span>Add To Groom Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* REACTION SLIDE-IN BAG DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Cabinet body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-[#12110F] border-l border-bronze/20 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Header title */}
                <div className="flex justify-between items-center border-b border-bronze/20 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-electric-red" />
                    <h3 className="font-anton text-lg tracking-wider text-cream uppercase">YOUR GROOM BAG</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full text-cream/40 hover:text-cream hover:bg-neutral-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Line Items Container */}
                {cart.length === 0 ? (
                  <div className="text-center py-24 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-cream/15 mx-auto animate-pulse" />
                    <div>
                      <h4 className="font-anton text-base text-cream/50 uppercase">Bag is currently empty</h4>
                      <p className="font-mono text-[10px] text-cream/25 mt-1">Select from our premium clays & tonics to get sharp.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 bg-charcoal rounded border border-bronze/10 items-center justify-between"
                      >
                        <div className="flex gap-3 items-center">
                          {/* Image thumbnail */}
                          <div className="w-12 h-12 rounded bg-neutral-900 border border-bronze/10 overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h4 className="font-anton text-xs uppercase tracking-wide text-cream line-clamp-1">{item.product.name}</h4>
                            <span className="font-mono text-[9px] text-bronze uppercase">{item.product.size}</span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2.5 mt-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="p-0.5 rounded bg-neutral-800 border border-bronze/10 text-cream/60 hover:text-cream cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs text-cream font-bold">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="p-0.5 rounded bg-neutral-800 border border-bronze/10 text-cream/60 hover:text-cream cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price and trash column */}
                        <div className="text-right flex flex-col justify-between h-full items-end gap-2 shrink-0">
                          <span className="font-anton text-sm text-electric-red">RM {item.product.price * item.quantity}</span>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-cream/30 hover:text-electric-red transition p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Summary Footer */}
              {cart.length > 0 && (
                <div className="border-t border-bronze/20 pt-4 space-y-4 bg-[#12110F]">
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-cream/50">
                      <span>Subtotal Items</span>
                      <span>RM {totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-cream/50">
                      <span>Ampang Local Delivery</span>
                      <span className="text-electric-red">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-cream border-t border-white/[0.04] pt-2">
                      <span className="font-anton uppercase">TOTAL BAG VALUE</span>
                      <span className="font-anton text-electric-red text-lg">RM {totalPrice}</span>
                    </div>
                  </div>

                  {checkoutSuccess ? (
                    <div className="p-4 bg-green-500/15 border border-green-500/30 rounded text-center text-xs font-mono text-cream flex items-center justify-center gap-2 animate-bounce">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      <span>Order Sim completed! Fake receipt ready.</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleSimulateCheckout}
                      className="w-full py-4 bg-electric-red text-cream font-anton text-sm uppercase tracking-wider rounded border border-electric-red shadow-[0_0_15px_rgba(230,57,70,0.45)] hover:bg-cream hover:text-charcoal hover:border-cream transition-all duration-300 text-center cursor-pointer"
                    >
                      Process Simulated Checkout (RM {totalPrice})
                    </button>
                  )}
                  <p className="font-mono text-[9px] text-cream/35 text-center uppercase">
                    Demo Mode • No credit-card details requested
                  </p>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
