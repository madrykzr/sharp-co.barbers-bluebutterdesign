import { CutStyle, Barber, Product } from "./types";

export const CUTS_DATA: CutStyle[] = [
  {
    id: "classic-cut",
    name: "Classic Cut",
    price: 45,
    duration: "45 Mins",
    description: "Our signature vintage-shear cut. Perfect pompadours, clean side parts, slick backs, or traditional tapers customized to your head shape. Includes premium splash cologne.",
    image: "/barber-1.jpg",
    tagline: "The essence of retro-Americana styling."
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    price: 60,
    duration: "60 Mins",
    description: "An ultra-precision modern fade starting entirely down to the skin. Seamless gradient styling (high, mid, or low) finished with a close foil shaver and edge lining.",
    image: "/barber-2.jpg",
    tagline: "Razor sharp contours and perfect transitions."
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    price: 30,
    duration: "30 Mins",
    description: "Detailed grooming, sculpting, and conditioning of your beard. Styled with hot oil, straight razor neck lining, and a massage with cold-pressed Sandalwood oil.",
    image: "/products.jpg",
    tagline: "Ultimate sculpture for the modern gentleman."
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    price: 80,
    duration: "60 Mins",
    description: "Premium straight-razor experience. Three cycles of steaming towels infused with Eucalyptus, facial pre-massage, and a luxurious cold shave finished with an ice compress.",
    image: "/hero-bg.jpg",
    tagline: "Old-school gentleman luxury service."
  },
  {
    id: "father-son-combo",
    name: "Father-Son Combo",
    price: 100,
    duration: "90 Mins",
    description: "A wonderful bonding experience in parallel chairs. Traditional haircuts for father and son with a glass of sarsaparilla, classic hair wax styling, and a special coin gift.",
    image: "/barber-3.jpg",
    tagline: "Passing down the tradition of quality grooming."
  },
  {
    id: "walk-in-cut",
    name: "Walk-In Cut",
    price: 40,
    duration: "30 Mins",
    description: "No frills, high-efficiency traditional trim. Perfect for monthly maintenance or a quick tidy-up before an important presentation.",
    image: "/barber-1.jpg",
    tagline: "Keep it simple, keep it sharp."
  }
];

export const BARBERS_DATA: Barber[] = [
  {
    id: "faiz",
    name: "Faiz",
    role: "Lead Barber",
    experience: "12 Years",
    specialty: "Slick Backs & Traditional Shaves",
    avatar: "/barber-1.jpg",
    bio: "Co-founder of Sharp & Co. Faiz learned his trade in vintage salons across Chicago before returning home to Ampang. He blends traditional American barber techniques with absolute modern precision."
  },
  {
    id: "daniel",
    name: "Daniel",
    role: "Senior Barber",
    experience: "6 Years",
    specialty: "High Skin Fades & Beard Styling",
    avatar: "/barber-2.jpg",
    bio: "Daniel is a master of modern aesthetics. If you're looking for razor-sharp skin fades, burst gradients, or complex textured crops, Daniel's chair is your ultimate destination."
  },
  {
    id: "pak-long",
    name: "Pak Long",
    role: "Master Barber",
    experience: "30 Years",
    specialty: "Straight Razor & Scissor Sculpting",
    avatar: "/barber-3.jpg",
    bio: "A true legend in the local grooming scene. Pak Long operates with old-school composure, utilizing hand-honed steel, master scissor combs, and unmatched hand precision accrued across three decades."
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "charcoal-pomade",
    name: "Charcoal Pomade",
    category: "pomade",
    price: 55,
    description: "Extreme high-hold, matte-finish cream pomade. Infused with active charcoal to purify hair and offer a completely natural look with zero greasy residue.",
    image: "/products.jpg",
    rating: 4.9,
    size: "100g / 3.5oz"
  },
  {
    id: "sandalwood-beard-oil",
    name: "Sandalwood Beard Oil",
    category: "beard",
    price: 48,
    description: "A premium organic scent formulation designed to soften coarse whiskers. Deeply hydrates underlying dry skin to eradicate beard-itch and redness.",
    image: "/products.jpg",
    rating: 4.8,
    size: "50ml / 1.7fl oz"
  },
  {
    id: "vintage-aftershave",
    name: "Vintage Aftershave Splash",
    category: "aftershave",
    price: 65,
    description: "Classic barbershop splash formulated with menthol, sea minerals, and witch hazel. Tones open pores and leaves a brisk tingling sensation that lasts all morning.",
    image: "/products.jpg",
    rating: 4.7,
    size: "150ml / 5.1fl oz"
  },
  {
    id: "sandalwood-beard-balm",
    name: "Beard Taming Balm",
    category: "beard",
    price: 42,
    description: "A pliable shaping wax composed of organic beeswax and shea butter. Offers medium hold to control unruly long beards while offering deep conditioning elements.",
    image: "/products.jpg",
    rating: 5.0,
    size: "60g / 2.1oz"
  },
  {
    id: "bronze-beard-comb",
    name: "Bronze Pocket Comb",
    category: "grooming",
    price: 35,
    description: "Indestructible hand-milled bronze pocket hair comb. Delivers anti-static tines and polished beveled teeth to smoothly align hair roots without scratching.",
    image: "/products.jpg",
    rating: 4.9,
    size: "pocket-sized"
  },
  {
    id: "imperial-styling-paste",
    name: "Imperial Clay Paste",
    category: "pomade",
    price: 50,
    description: "Medium hold clay-paste with an ultra-matte texture. Perfect for beach-mode messy crops, giving natural volume and shape that can be reworked through the day.",
    image: "/products.jpg",
    rating: 4.6,
    size: "80g / 2.8oz"
  },
  {
    id: "professional-hair-grease",
    name: "Classic High Shine grease",
    category: "pomade",
    price: 75,
    description: "Traditional petroleum-base hair wax for greasy slickbacks and heavy pompadours. Provides unbeatable classic shine and waterproof extreme stability.",
    image: "/products.jpg",
    rating: 4.5,
    size: "120g / 4.2oz"
  },
  {
    id: "bourbon-cologne",
    name: "Whiskey Bourbon Cologne",
    category: "aftershave",
    price: 85,
    description: "A sophisticated warm scent offering rich accents of charred oak, amber whiskey, and fine leather. Leaves an evocative trail of traditional luxury.",
    image: "/products.jpg",
    rating: 4.9,
    size: "100ml / 3.4fl oz"
  }
];

export const TIMING_SLOTS = [
  "10:00 AM",
  "10:45 AM",
  "11:30 AM",
  "12:15 PM",
  "01:00 PM",
  "02:30 PM",
  "03:15 PM",
  "04:00 PM",
  "04:45 PM",
  "05:30 PM",
  "06:15 PM",
  "07:00 PM",
  "07:45 PM"
];

export const VISIT_INFO = {
  address: "Lorong Mamanda 2, Ampang, KL, Malaysia",
  hours: [
    { day: "Tuesday - Saturday", time: "10:00 AM - 9:00 PM" },
    { day: "Sunday", time: "11:00 AM - 7:00 PM" },
    { day: "Monday & Public Holidays", time: "Closed (Guns & Razors Resting)" }
  ],
  phone: "+60 3-4251 0989",
  email: "sharpmaster@bluebutterstudio.my",
  instagram: "@sharpandco.ampang"
};
