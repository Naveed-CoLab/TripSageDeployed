export type SampleDestination = {
  id: number;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: string;
  reviewCount: number;
  priceEstimate: string;
  bestTimeToVisit: string;
  region?: string;
  slug?: string;
};

export const sampleDestinations: SampleDestination[] = [
  {
    id: 1,
    name: "Rome",
    country: "Italy",
    description:
      "Explore the Eternal City where ancient history meets modern life. Wander through the Colosseum, Roman Forum, and Vatican while indulging in world-class cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    reviewCount: 2450,
    priceEstimate: "From $1,200",
    bestTimeToVisit: "April - June, September - October",
    region: "europe",
    slug: "rome",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    description:
      "Experience the romance, art, and cuisine of the City of Light. Iconic landmarks, charming cafés, and world-class museums await at every turn.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: "4.9",
    reviewCount: 3210,
    priceEstimate: "From $950",
    bestTimeToVisit: "April - June, September - November",
    region: "europe",
    slug: "paris",
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    description:
      "Discover breathtaking caldera views, whitewashed villages, and unforgettable sunsets on this idyllic Aegean island.",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    reviewCount: 1890,
    priceEstimate: "From $850",
    bestTimeToVisit: "May - October",
    region: "europe",
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    description:
      "Immerse yourself in lush jungles, terraced rice fields, and serene beaches while experiencing Balinese culture and wellness retreats.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    reviewCount: 2100,
    priceEstimate: "From $800",
    bestTimeToVisit: "April - October",
    region: "asia",
  },
  {
    id: 5,
    name: "New York City",
    country: "USA",
    description:
      "Explore the energy of the Big Apple, from Broadway shows and world-class museums to iconic skyline views and diverse neighborhoods.",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    reviewCount: 4200,
    priceEstimate: "From $1,100",
    bestTimeToVisit: "April - June, September - November",
    region: "north america",
  },
  {
    id: 6,
    name: "Cape Town",
    country: "South Africa",
    description:
      "Experience dramatic coastlines, Table Mountain views, vineyards, and rich cultural heritage in this vibrant coastal city.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    reviewCount: 1580,
    priceEstimate: "From $950",
    bestTimeToVisit: "October - April",
    region: "africa",
  },
];

