"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Thermometer, 
  Mountain, 
  Camera, 
  Clock, 
  Users, 
  Route,
  ChevronRight,
  Filter,
  Search,
  Heart,
  Share2
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  rating: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  duration: string;
  bestTime: string;
  altitude: string;
  category: 'Valley' | 'Peak' | 'City' | 'Lake' | 'Desert';
  price: string;
  groupSize: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

const DestinationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [likedDestinations, setLikedDestinations] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const destinations: Destination[] = [
    {
      id: 'hunza-valley',
      name: 'Hunza Valley',
      description: 'Known for its stunning landscapes, ancient forts, and hospitable people. The valley offers breathtaking views of Rakaposhi and other peaks with rich cultural heritage.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Baltit Fort', 'Altit Fort', 'Attabad Lake', 'Passu Cones'],
      rating: 4.9,
      difficulty: 'Easy',
      duration: '5-7 days',
      bestTime: 'Apr-Oct',
      altitude: '2,438m',
      category: 'Valley',
      price: '$299',
      groupSize: '2-15 people'
    },
    {
      id: 'k2-base-camp',
      name: 'K2 Base Camp',
      description: 'The world\'s second-highest peak and a mountaineering paradise. The trek to base camp offers spectacular views of the Karakoram Range and glacial landscapes.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Concordia', 'Broad Peak', 'Gasherbrum Range', 'Baltoro Glacier'],
      rating: 4.8,
      difficulty: 'Expert',
      duration: '18-21 days',
      bestTime: 'Jun-Sep',
      altitude: '5,150m',
      category: 'Peak',
      price: '$2,499',
      groupSize: '4-12 people'
    },
    {
      id: 'skardu',
      name: 'Skardu',
      description: 'Gateway to the mighty Karakoram Range and home to the famous Shangrila Resort. The city offers a perfect blend of natural beauty and cultural heritage.',
      image: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Shangrila Resort', 'Kharpocho Fort', 'Satpara Lake', 'Deosai Plains'],
      rating: 4.7,
      difficulty: 'Easy',
      duration: '3-5 days',
      bestTime: 'Mar-Nov',
      altitude: '2,228m',
      category: 'City',
      price: '$199',
      groupSize: '2-20 people'
    },
    {
      id: 'gilgit',
      name: 'Gilgit City',
      description: 'The capital city of Gilgit-Baltistan, known for its rich history, vibrant bazaars, and as a hub for adventure tourism with stunning mountain views.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Gilgit Fort', 'Kargah Buddha', 'Naltar Valley', 'Danyor Bridge'],
      rating: 4.5,
      difficulty: 'Easy',
      duration: '2-4 days',
      bestTime: 'Year-round',
      altitude: '1,500m',
      category: 'City',
      price: '$149',
      groupSize: '1-25 people'
    },
    {
      id: 'fairy-meadows',
      name: 'Fairy Meadows',
      description: 'A magical plateau offering unparalleled views of Nanga Parbat, the world\'s ninth-highest mountain. Perfect for trekking and camping under the stars.',
      image: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Nanga Parbat View', 'Alpine Meadows', 'Base Camp Trek', 'Night Sky'],
      rating: 4.9,
      difficulty: 'Moderate',
      duration: '4-6 days',
      bestTime: 'May-Oct',
      altitude: '3,306m',
      category: 'Valley',
      price: '$399',
      groupSize: '2-10 people'
    },
    {
      id: 'deosai-plains',
      name: 'Deosai Plains',
      description: 'The Land of Giants - world\'s second-highest plateau. Home to brown bears, colorful wildflowers, and breathtaking landscapes that stretch to the horizon.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      highlights: ['Sheosar Lake', 'Brown Bears', 'Wildflowers', 'Bara Pani'],
      rating: 4.8,
      difficulty: 'Moderate',
      duration: '2-3 days',
      bestTime: 'Jul-Sep',
      altitude: '4,114m',
      category: 'Desert',
      price: '$249',
      groupSize: '2-15 people'
    }
  ];

  const categories = ['All', 'Valley', 'Peak', 'City', 'Lake', 'Desert'];

  // Filter destinations based on category and search
  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev: VisibilityState) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el: Element) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const toggleLike = (destinationId: string): void => {
    setLikedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId);
      } else {
        newSet.add(destinationId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 font-serif">
            Explore Destinations
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl leading-relaxed opacity-90">
            Discover the breathtaking landscapes and rich culture of Gilgit-Baltistan
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-8 bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500 w-5 h-5" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                id={`destination-card-${index}`}
                data-animate
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-700 transform hover:-translate-y-2 ${
                  isVisible[`destination-card-${index}`] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Image Overlay Content */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(destination.difficulty)}`}>
                      {destination.difficulty}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLike(destination.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          likedDestinations.has(destination.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={likedDestinations.has(destination.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{destination.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{destination.altitude}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {destination.description}
                  </p>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{destination.bestTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{destination.groupSize}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Mountain className="w-4 h-4" />
                      <span>{destination.category}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-800">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="text-blue-600 text-sm font-medium">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Book Now
                    </button>
                    <button className="flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                      <span>Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        id="why-choose-us"
        data-animate
        className={`py-20 px-4 md:px-8 bg-white transition-all duration-1000 transform ${
          isVisible['why-choose-us'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Our Tours?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the best of Gilgit-Baltistan with our expert-guided adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Route className="w-8 h-8" />,
                title: "Expert Local Guides",
                description: "Our experienced guides know every trail, story, and hidden gem in the region."
              },
              {
                icon: <Mountain className="w-8 h-8" />,
                title: "Safety First",
                description: "All our tours follow strict safety protocols with proper equipment and emergency plans."
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Unforgettable Memories",
                description: "Capture stunning photographs and create memories that will last a lifetime."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        id="cta-destinations"
        data-animate
        className={`py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 transform ${
          isVisible['cta-destinations'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Contact our travel experts to customize your perfect Gilgit-Baltistan experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
              Contact Us Today
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              View All Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;