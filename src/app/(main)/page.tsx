"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Mountain, Camera, Star } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  highlights: string[];
}

interface VisibilityState {
  [key: string]: boolean;
}

const GilgitBaltistanTourism: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Discover K2",
      subtitle: "The Savage Mountain",
      description: "Experience the world's second-highest peak and the ultimate mountaineering challenge"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Magical Hunza Valley",
      subtitle: "Land of Legends",
      description: "Journey through ancient villages, terraced fields, and towering peaks"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Skardu Adventures",
      subtitle: "Gateway to Giants",
      description: "Your portal to the mighty Karakoram Range and pristine lakes"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1660754664913-24a235451454?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Fairy Meadows",
      subtitle: "Heaven on Earth",
      description: "Witness Nanga Parbat's majestic beauty from this alpine paradise"
    }
  ];

  const featuredDestinations: Destination[] = [
    {
      id: "hunza-valley",
      name: "Hunza Valley",
      description: "Ancient culture meets breathtaking mountain vistas",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      highlights: ["Baltit Fort", "Attabad Lake", "Cherry Blossoms"]
    },
    {
      id: "k2-base-camp",
      name: "K2 Base Camp",
      description: "The ultimate trekking adventure to the world's most dangerous peak",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      highlights: ["Concordia", "Baltoro Glacier", "Gasherbrum"]
    },
    {
      id: "skardu",
      name: "Skardu",
      description: "Gateway to adventure and home to stunning alpine lakes",
      image: "https://images.unsplash.com/photo-1602147557719-1d65f9e58a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      highlights: ["Shangrila Resort", "Satpara Lake", "Deosai Plains", "Cold Desert"]
    },
    {
      id: "fairy-meadows",
      name: "Fairy Meadows",
      description: "A magical plateau with unparalleled views of Nanga Parbat",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      highlights: ["Nanga Parbat View", "Alpine Meadows", "Base Camp Trek"]
    },
    {
      id: "naltar-valley",
      name: "Naltar Valley",
      description: "Famous for colorful lakes and world-class skiing slopes",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      highlights: ["Naltar Lakes", "Ski Resort", "Pine Forests"]
    },
    {
      id: "deosai-plains",
      name: "Deosai Plains",
      description: "The Land of Giants - world's second-highest plateau",
      image: "https://images.unsplash.com/photo-1671568830195-ee7d3b133687?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      highlights: ["Sheosar Lake", "Brown Bears", "Wildflowers"]
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

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

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Slider Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div 
              key={currentSlide}
              className="animate-fade-in-up"
            >
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 font-serif leading-tight">
                <span className="block text-2xl md:text-4xl font-light mb-2 text-blue-200">
                  {heroSlides[currentSlide].subtitle}
                </span>
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform">
                  Explore Destinations
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm">
                  Plan Your Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div 
          id="destinations-title"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['destinations-title'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most breathtaking locations in Gilgit-Baltistan, where every view is a masterpiece painted by nature itself
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              id={`destination-${index}`}
              data-animate
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                isVisible[`destination-${index}`] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2 text-white">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Gilgit-Baltistan</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <Mountain className="w-5 h-5 text-gray-400" />
                    <Camera className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section 
        id="cta-section"
        data-animate
        className={`py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 transform ${
          isVisible['cta-section'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of travelers who have discovered the magic of Gilgit-Baltistan. 
            Your journey to the roof of the world starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
              Start Planning Now
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GilgitBaltistanTourism;