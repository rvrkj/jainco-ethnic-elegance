import bd385 from "@/assets/bd_1_35_09_PM.jpeg.asset.json";
import bd391 from "@/assets/bd_1_35_10_PM.jpeg.asset.json";
import bd389 from "@/assets/bd_1_35_11_PM.jpeg.asset.json";
import bd398 from "@/assets/bd_1_35_11_PM_1.jpeg.asset.json";
import bd383 from "@/assets/bd_1_35_12_PM.jpeg.asset.json";
import bd388 from "@/assets/bd_1_35_12_PM_1.jpeg.asset.json";
import hero from "@/assets/hero-sherwani.jpg";

export const heroImage = hero;

export type Product = {
  id: string;
  art: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: "bandi" | "sherwani" | "kurta";
  occasion: string[];
  origin: string;
  fabric: string;
  fit: string;
  care: string;
  colour: string;
  sizes: number[];
  rating: number;
  reviewCount: number;
  description: string;
  reviews: { name: string; stars: number; body: string; size: string }[];
};

const sizes = [36, 38, 40, 42, 44];

export const products: Product[] = [
  {
    id: "bd-389",
    art: "BD-389",
    name: "Wine Diamond-Jacquard Bandi",
    price: 1499,
    mrp: 1899,
    image: bd389.url,
    category: "bandi",
    occasion: ["Wedding", "Festive"],
    origin: "Banarasi-inspired weave, crafted in Surat",
    fabric: "Polyester-viscose jacquard with self diamond motif",
    fit: "Tailored, slim through the chest",
    care: "Dry clean only",
    colour: "Wine",
    sizes,
    rating: 4.7,
    reviewCount: 128,
    description:
      "A deep wine bandi woven with a fine diamond lattice that catches light without shouting. Mandarin collar, five horn-finish buttons and a matching pocket square, cut to layer over a plain kurta.",
    reviews: [
      { name: "Aniket S.", stars: 5, body: "Wore it to a sangeet — the weave photographs beautifully.", size: "40" },
      { name: "Rahul M.", stars: 4, body: "Excellent fabric for the price. Shoulders run slightly slim.", size: "42" },
    ],
  },
  {
    id: "bd-388",
    art: "BD-388",
    name: "Mulberry Brocade Square Bandi",
    price: 1499,
    mrp: 1899,
    image: bd388.url,
    category: "bandi",
    occasion: ["Wedding", "Reception"],
    origin: "Brocade tradition of Varanasi, tailored in Surat",
    fabric: "Tonal brocade with square medallion motif",
    fit: "Regular, straight hem",
    care: "Dry clean only",
    colour: "Mulberry",
    sizes,
    rating: 4.6,
    reviewCount: 94,
    description:
      "Tonal square medallions across a mulberry ground give this bandi its quiet depth. Welt pockets, mandarin collar and a contrast pocket square finish.",
    reviews: [
      { name: "Devang P.", stars: 5, body: "Looks far more expensive than it is.", size: "38" },
      { name: "Karan T.", stars: 4, body: "True to size, good lining.", size: "44" },
    ],
  },
  {
    id: "bd-383",
    art: "BD-383",
    name: "Powder Blue Linen-Look Bandi",
    price: 1199,
    mrp: 1599,
    image: bd383.url,
    category: "bandi",
    occasion: ["Day Wedding", "Office Festive"],
    origin: "Handloom-inspired linen weave, Bhagalpur yarn",
    fabric: "Linen-blend textured weave",
    fit: "Regular, breathable",
    care: "Dry clean recommended",
    colour: "Powder Blue",
    sizes,
    rating: 4.8,
    reviewCount: 201,
    description:
      "The daytime bandi. A slubby linen-look weave in powder blue that stays cool through long mandap hours, with a bright blue pocket square for contrast.",
    reviews: [
      { name: "Vikram J.", stars: 5, body: "Perfect for an outdoor haldi. Light and airy.", size: "40" },
      { name: "Sameer A.", stars: 5, body: "Colour is exactly as shown.", size: "42" },
    ],
  },
  {
    id: "bd-385",
    art: "BD-385",
    name: "Midnight Black Formal Bandi",
    price: 1249,
    mrp: 1699,
    image: bd385.url,
    category: "bandi",
    occasion: ["Reception", "Formal"],
    origin: "Tailored in Surat",
    fabric: "Matte suiting twill",
    fit: "Slim, structured shoulder",
    care: "Dry clean only",
    colour: "Black",
    sizes,
    rating: 4.5,
    reviewCount: 156,
    description:
      "The one that works with everything. Matte black suiting twill, structured shoulder, tonal pocket square — over a white kurta or a shirt and trousers.",
    reviews: [
      { name: "Nikhil R.", stars: 4, body: "Great staple. Pairs with both kurta and shirt.", size: "38" },
      { name: "Arjun K.", stars: 5, body: "Sharp cut, no fuss.", size: "40" },
    ],
  },
  {
    id: "bd-391",
    art: "BD-391",
    name: "Rose Gingham Check Bandi",
    price: 1449,
    mrp: 1899,
    image: bd391.url,
    category: "bandi",
    occasion: ["Mehendi", "Day Wedding"],
    origin: "Tailored in Surat",
    fabric: "Cotton-blend micro-check",
    fit: "Regular, patch pockets",
    care: "Dry clean recommended",
    colour: "Rose Multi",
    sizes,
    rating: 4.4,
    reviewCount: 62,
    description:
      "A micro-check in rose, ochre and sage — made for mehendi mornings. Patch pockets and mother-of-pearl finish buttons keep it relaxed.",
    reviews: [
      { name: "Harsh V.", stars: 5, body: "Got compliments all morning.", size: "40" },
      { name: "Imran S.", stars: 4, body: "Playful without being loud.", size: "42" },
    ],
  },
  {
    id: "bd-398",
    art: "BD-398",
    name: "Ivory Windowpane Bandi",
    price: 1349,
    mrp: 1799,
    image: bd398.url,
    category: "bandi",
    occasion: ["Day Wedding", "Festive"],
    origin: "Tailored in Surat",
    fabric: "Textured ivory weave with tonal windowpane",
    fit: "Regular",
    care: "Dry clean only",
    colour: "Ivory",
    sizes,
    rating: 4.6,
    reviewCount: 88,
    description:
      "Ivory on ivory — a tonal windowpane grid that reads plain from afar and detailed up close. The cleanest layer over a coloured kurta.",
    reviews: [
      { name: "Manav D.", stars: 5, body: "Wore it over a deep green kurta. Stunning.", size: "44" },
      { name: "Yash B.", stars: 4, body: "Keep it away from chai.", size: "38" },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const occasions = ["Wedding", "Reception", "Mehendi", "Festive", "Day Wedding", "Office Festive", "Formal"];

export const sizeChart = [
  { size: 36, chest: "36 in", shoulder: "16.5 in", length: "29 in" },
  { size: 38, chest: "38 in", shoulder: "17 in", length: "29.5 in" },
  { size: 40, chest: "40 in", shoulder: "17.5 in", length: "30 in" },
  { size: 42, chest: "42 in", shoulder: "18 in", length: "30.5 in" },
  { size: 44, chest: "44 in", shoulder: "18.5 in", length: "31 in" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
