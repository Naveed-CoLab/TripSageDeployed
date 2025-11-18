import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { buildRedirectQuery } from '@/lib/auth-redirect';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, CalendarDays, DollarSign, Plane, Hotel, Camera, Utensils, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

// Destination blog content data
const destinationContent: Record<string, any> = {
  rome: {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    tagline: 'The Eternal City',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    heroImages: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Rome, the Eternal City, is a living museum where ancient ruins stand beside Renaissance masterpieces and modern life flows through millennia-old streets. From the Colosseum to the Vatican, every corner tells a story.',
    bestTimeToVisit: 'April-June, September-October',
    priceRange: '$$-$$$',
    rating: 4.8,
    reviewCount: 156234,
    sections: [
      {
        title: 'Discover Ancient Wonders',
        content: 'Step back in time at the Colosseum, where gladiators once fought before roaring crowds. Explore the Roman Forum, the political heart of the ancient empire, and climb Palatine Hill for breathtaking views of the city. The Pantheon, with its perfect dome and oculus, continues to inspire architects 2,000 years after its construction.',
        icon: Camera
      },
      {
        title: 'Vatican City & Art',
        content: 'The Vatican Museums house one of the world\'s greatest art collections, culminating in Michelangelo\'s awe-inspiring Sistine Chapel ceiling. St. Peter\'s Basilica, the largest church in the world, features Bernini\'s magnificent bronze baldachin and Michelangelo\'s Pietà. Don\'t miss climbing to the dome for panoramic city views.',
        icon: Camera
      },
      {
        title: 'Roman Cuisine',
        content: 'Indulge in authentic Roman cuisine: carbonara, cacio e pepe, and amatriciana pasta. Enjoy fresh pizza al taglio, supplì (fried rice balls), and gelato from historic shops. Visit Campo de\' Fiori market for fresh produce, or dine in Trastevere\'s charming trattorias for a true local experience.',
        icon: Utensils
      },
      {
        title: 'Piazzas & Fountains',
        content: 'Toss a coin in the Trevi Fountain to ensure your return to Rome. Relax at Piazza Navona with its Bernini fountains, or climb the Spanish Steps for sunset views. Each piazza offers outdoor cafes perfect for people-watching and soaking in la dolce vita.',
        icon: MapPin
      }
    ],
    highlights: [
      'Colosseum & Roman Forum',
      'Vatican Museums & Sistine Chapel',
      'Trevi Fountain',
      'Pantheon',
      'Spanish Steps',
      'Trastevere neighborhood'
    ],
    tips: [
      'Book Colosseum and Vatican tickets online in advance',
      'Wear comfortable shoes - you\'ll walk a lot on cobblestones',
      'Dress modestly for churches (covered shoulders and knees)',
      'Try to visit popular sites early morning or late afternoon',
      'Get a Roma Pass for unlimited public transport and museum discounts'
    ]
  },
  paris: {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    tagline: 'The City of Light',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    heroImages: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Paris, the City of Light, captivates with its iconic landmarks, world-class art museums, exquisite cuisine, and timeless romance. From the Eiffel Tower to charming cafés, Paris offers an unforgettable blend of history, culture, and elegance.',
    bestTimeToVisit: 'April-June, September-November',
    priceRange: '$$$-$$$$',
    rating: 4.9,
    reviewCount: 203891,
    sections: [
      {
        title: 'Iconic Landmarks',
        content: 'The Eiffel Tower lights up Paris nights with its golden glow. Stroll down the Champs-Élysées to the Arc de Triomphe, explore Notre-Dame Cathedral, and visit Sacré-Cœur Basilica in Montmartre for stunning city views. Each landmark tells the story of French history and architectural genius.',
        icon: Camera
      },
      {
        title: 'World-Class Museums',
        content: 'The Louvre, home to the Mona Lisa and Venus de Milo, is the world\'s largest art museum. Musée d\'Orsay showcases Impressionist masterpieces in a stunning Beaux-Arts railway station. Modern art lovers will enjoy the Centre Pompidou, while Rodin Museum gardens offer sculpture in a serene setting.',
        icon: Camera
      },
      {
        title: 'French Gastronomy',
        content: 'Experience Parisian café culture with croissants and café au lait. Indulge in Michelin-starred dining or cozy bistros serving coq au vin, duck confit, and steak frites. Don\'t miss macarons from Ladurée, cheese from fromageries, and fresh bread from boulangeries. Food markets like Marché des Enfants Rouges offer authentic local flavors.',
        icon: Utensils
      },
      {
        title: 'Charming Neighborhoods',
        content: 'Wander through Le Marais\' medieval streets, browse vintage shops in Saint-Germain-des-Prés, or explore Latin Quarter\'s bookshops. Montmartre retains its artistic village atmosphere with Place du Tertre\'s street artists. Take a romantic stroll along the Seine or through Luxembourg Gardens.',
        icon: MapPin
      }
    ],
    highlights: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame Cathedral',
      'Arc de Triomphe',
      'Montmartre & Sacré-Cœur',
      'Seine River cruises'
    ],
    tips: [
      'Buy a Museum Pass for skip-the-line access to major attractions',
      'Learn basic French phrases - locals appreciate the effort',
      'Use the Metro for efficient, affordable transportation',
      'Visit the Eiffel Tower at night for the sparkling light show',
      'Book restaurants in advance, especially for dinner'
    ]
  },
  'las-vegas': {
    id: 'las-vegas',
    name: 'Las Vegas',
    country: 'Nevada, USA',
    tagline: 'The Entertainment Capital of the World',
    imageUrl: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    heroImages: [
      'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Las Vegas, the Entertainment Capital of the World, dazzles with its vibrant nightlife, world-class shows, luxury hotels, and endless entertainment. Beyond the casinos, discover gourmet dining, spectacular performances, and nearby natural wonders.',
    bestTimeToVisit: 'March-May, September-November',
    priceRange: '$$-$$$',
    rating: 4.7,
    reviewCount: 189234,
    sections: [
      {
        title: 'The Las Vegas Strip',
        content: 'The iconic 4-mile Strip features themed mega-resorts: the fountains of Bellagio, the Eiffel Tower at Paris, and the canals of Venetian. Each hotel offers unique attractions, from gondola rides to volcano shows. Walk the Strip at night to experience the dazzling lights and energy that never stops.',
        icon: TrendingUp
      },
      {
        title: 'World-Class Entertainment',
        content: 'See Cirque du Soleil\'s spectacular acrobatics, catch residency shows from top musicians, or enjoy comedy at legendary venues. Magic shows, Broadway productions, and celebrity chef restaurants offer entertainment beyond gaming. The nightlife scene features world-renowned DJs at mega-clubs.',
        icon: Camera
      },
      {
        title: 'Gourmet Dining',
        content: 'Celebrity chefs like Gordon Ramsay, Wolfgang Puck, and Joël Robuchon have restaurants here. From Michelin-starred fine dining to affordable all-you-can-eat buffets, Vegas caters to every palate and budget. Don\'t miss the legendary shrimp cocktails and 24-hour dining options.',
        icon: Utensils
      },
      {
        title: 'Beyond the Strip',
        content: 'Visit nearby Red Rock Canyon for hiking and scenic drives. Take a day trip to the Grand Canyon or Hoover Dam. Downtown\'s Fremont Street Experience offers vintage Vegas vibes with its LED canopy light shows. The Neon Museum preserves iconic vintage signs.',
        icon: MapPin
      }
    ],
    highlights: [
      'The Strip',
      'Bellagio Fountains',
      'Fremont Street Experience',
      'High Roller Observation Wheel',
      'Red Rock Canyon',
      'Grand Canyon day trips'
    ],
    tips: [
      'Hotels are cheaper midweek than on weekends',
      'Book show tickets in advance for better prices',
      'Sign up for players club cards for free drinks while gaming',
      'Use rideshare or monorail - walking the Strip takes longer than it looks',
      'Stay hydrated - the desert climate is very dry'
    ]
  },
  reykjavik: {
    id: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    tagline: 'Gateway to Arctic Wonders',
    imageUrl: 'https://silversea-discover.imgix.net/2021/06/REYKJAVIK-shutterstock_613997816.jpg?auto=compress%2Cformat&ixlib=php-3.3.1',
    heroImages: [
      'https://images.unsplash.com/photo-1504284769763-78de535471fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460502741032-bdbf29812ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Reykjavík, the world\'s northernmost capital, offers a unique blend of Norse heritage, modern Nordic culture, and access to Iceland\'s breathtaking natural wonders. From the Northern Lights to geothermal hot springs, it\'s a gateway to Arctic adventures.',
    bestTimeToVisit: 'June-August (midnight sun), September-March (Northern Lights)',
    priceRange: '$$$-$$$$',
    rating: 4.9,
    reviewCount: 78456,
    sections: [
      {
        title: 'Natural Wonders',
        content: 'Experience the Golden Circle: Þingvellir National Park where tectonic plates meet, Geysir\'s erupting hot springs, and the powerful Gullfoss waterfall. Visit the Blue Lagoon\'s milky-blue geothermal waters for a relaxing soak. In winter, chase the mesmerizing Northern Lights dancing across the Arctic sky.',
        icon: Camera
      },
      {
        title: 'City & Culture',
        content: 'Hallgrímskirkja Church offers panoramic views from its tower. Explore the colorful houses of downtown, visit Harpa Concert Hall\'s glass facade, and learn about Viking history at the National Museum. The street art scene and design shops showcase Iceland\'s creative spirit.',
        icon: MapPin
      },
      {
        title: 'Icelandic Cuisine',
        content: 'Try traditional Icelandic lamb, fresh seafood, and unique delicacies like fermented shark (if you dare!). The hot dog stands are legendary, while modern restaurants innovate with local ingredients. Don\'t miss Icelandic skyr yogurt, rye bread baked in geothermal heat, and craft beers.',
        icon: Utensils
      },
      {
        title: 'Adventure Activities',
        content: 'Glacier hiking, ice cave tours, whale watching, and snorkeling between continents in Silfra fissure offer thrilling experiences. Take a Super Jeep tour to remote highlands, ride Icelandic horses, or relax in natural hot springs scattered across the landscape.',
        icon: TrendingUp
      }
    ],
    highlights: [
      'Blue Lagoon',
      'Golden Circle',
      'Northern Lights (winter)',
      'Hallgrímskirkja Church',
      'Whale watching tours',
      'Glaciers & waterfalls'
    ],
    tips: [
      'Pack layers - weather changes quickly',
      'Rent a car to explore beyond Reykjavík',
      'Book Northern Lights tours with flexible cancellation',
      'Tap water is pure and free - bring a reusable bottle',
      'Iceland is expensive - budget accordingly'
    ]
  }
};

export default function DestinationBlogPage() {
  const { id } = useParams();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  // This page is for blog-style destination content (slug-based URLs)
  // For numeric IDs, use /destination/:id route instead
  const destination = destinationContent[id?.toLowerCase() || ''];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // If numeric ID not in our blog content, redirect to trip creation
  if (!destination) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Details</h1>
          <p className="text-gray-600 mb-8">
            This destination doesn't have a detailed guide yet, but you can still plan your trip!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/explore')}>
              Browse Destinations
            </Button>
            <Button onClick={() => navigate('/trips/create')} variant="outline">
              Plan a Trip
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleSave = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save destinations",
        variant: "destructive",
      });
      const redirectQuery = buildRedirectQuery(location || `/destinations/${id}`);
      navigate(`/login${redirectQuery}`);
      return;
    }
    
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from wishlist" : "Added to wishlist",
      description: isSaved 
        ? `${destination.name} has been removed from your wishlist` 
        : `${destination.name} has been added to your wishlist`,
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{destination.country}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-2xl text-white/90 italic">{destination.tagline}</p>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Best Time</p>
                  <p className="text-sm font-medium">{destination.bestTimeToVisit}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Price Range</p>
                  <p className="text-sm font-medium">{destination.priceRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-medium">{destination.rating}/5 ({destination.reviewCount.toLocaleString()} reviews)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="gap-2"
              >
                <Heart className={isSaved ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate(`/trips/create?destination=${encodeURIComponent(destination.name)}`)}
                className="gap-2"
              >
                <Plane className="h-4 w-4" />
                Plan Trip
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-16">
          <p className="text-xl text-gray-700 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {destination.heroImages.map((image: string, index: number) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <img 
                src={image} 
                alt={`${destination.name} ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12 mb-16">
          {destination.sections.map((section: any, index: number) => {
            const Icon = section.icon;
            return (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Highlights</h3>
            <ul className="space-y-3">
              {destination.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-800 text-lg">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Tips</h3>
            <ul className="space-y-3">
              {destination.tips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-800">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore {destination.name}?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let our AI create a personalized itinerary just for you
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate(`/trips/create?destination=${encodeURIComponent(destination.name)}`)}
              className="gap-2 bg-white text-blue-600 hover:bg-gray-100"
            >
              <Plane className="h-5 w-5" />
              Plan Your Trip
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/flights')}
              className="bg-white/10 border-white text-white hover:bg-white/20 gap-2"
            >
              <Plane className="h-5 w-5" />
              Find Flights
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/hotels')}
              className="bg-white/10 border-white text-white hover:bg-white/20 gap-2"
            >
              <Hotel className="h-5 w-5" />
              Book Hotels
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

