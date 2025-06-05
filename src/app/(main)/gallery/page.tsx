'use client';

import { useState, useEffect } from 'react';
import { Play, X, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  description: string;
  duration?: string;
}

const categories = [
  'All',
  'Mountains',
  'Lakes',
  'Cultural',
  'Adventure',
  'Wildlife',
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'K2 Base Camp Trek',
    category: 'Mountains',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Journey to the majestic K2 Base Camp at Concordia - the throne room of the mountain gods',
    duration: '4:32',
  },
  {
    id: 2,
    title: 'Attabad Lake Serenity',
    category: 'Lakes',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop',
    description: 'The stunning turquoise waters of Attabad Lake reflecting the surrounding peaks',
  },
  {
    id: 3,
    title: 'Baltit Fort Heritage',
    category: 'Cultural',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    description: 'Ancient Baltit Fort overlooking the magnificent Hunza Valley',
  },
  {
    id: 4,
    title: 'Deosai Wildlife Documentary',
    category: 'Wildlife',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    description: 'The beautiful Deosai Plains - land of the giants and home to Himalayan brown bears',
    duration: '6:15',
  },
  {
    id: 5,
    title: 'Rakaposhi Sunrise',
    category: 'Mountains',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1464822759844-d150175152b7?w=800&h=600&fit=crop',
    description: 'Breathtaking sunrise view of Rakaposhi from the heart of Hunza Valley',
  },
  {
    id: 6,
    title: 'Satpara Lake Adventure',
    category: 'Lakes',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    description: 'Kayaking adventure on the serene waters of Satpara Lake in Skardu',
    duration: '3:47',
  },
  {
    id: 7,
    title: 'Shandur Polo Festival',
    category: 'Cultural',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    description: 'Traditional polo match at the highest polo ground in the world',
    duration: '8:22',
  },
  {
    id: 8,
    title: 'Fairy Meadows Trek',
    category: 'Adventure',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'The magical Fairy Meadows with Nanga Parbat towering in the background',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') navigateItem('next');
      if (e.key === 'ArrowLeft') navigateItem('prev');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedItem, currentIndex]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Discover Gilgit-Baltistan
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Journey through breathtaking landscapes, ancient cultures, and untamed wilderness. 
              Experience the crown jewel of Pakistan's northern territories.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          {/* Category Filters */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-md border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
              }`}
              onClick={() => openModal(item)}
            >
              <div className={`relative ${
                viewMode === 'grid' ? 'aspect-square' : viewMode === 'list' ? 'sm:w-80 aspect-video sm:aspect-square' : 'aspect-square'
              } overflow-hidden`}>
                <img
                  src={item.type === 'video' ? item.thumbnail : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Video Play Button */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-colors">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                    )}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''} relative z-10`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different category to explore more content.</p>
          </div>
        )}

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition backdrop-blur-sm"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition backdrop-blur-sm"
                    onClick={() => navigateItem('prev')}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition backdrop-blur-sm"
                    onClick={() => navigateItem('next')}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Media Content */}
              <div className="relative aspect-video bg-black">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    poster={selectedItem.thumbnail}
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Info Section */}
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-3 py-1 rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>
                  {selectedItem.duration && (
                    <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border">
                      {selectedItem.duration}
                    </div>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                
                {/* Progress Indicator */}
                {filteredItems.length > 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} of {filteredItems.length}
                    </span>
                    <div className="flex-1 bg-gray-200 h-1 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / filteredItems.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}