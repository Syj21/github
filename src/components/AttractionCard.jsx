// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function AttractionCard({
  attraction,
  onClick
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = attraction.images || [attraction.image];
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" onClick={onClick}>
      {/* Image Carousel */}
      <div className="relative overflow-hidden">
        <img src={images[currentImageIndex]} alt={attraction.name} className="w-full h-[300px] object-cover transition-transform duration-500" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md z-10">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#E8A849] text-[#E8A849]" />
            <span className="text-sm font-semibold text-[#2C2C2C]">{attraction.rating}</span>
          </div>
        </div>

        {/* Carousel Controls */}
        {images.length > 1 && <>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 z-10 hover:scale-110">
              <ChevronLeft className="w-5 h-5 text-[#2C2C2C]" />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 z-10 hover:scale-110">
              <ChevronRight className="w-5 h-5 text-[#2C2C2C]" />
            </button>
          </>}

        {/* Image Indicators */}
        {images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`} />)}
          </div>}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          {attraction.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-[#D4A574] mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            {attraction.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#2C2C2C]/80 leading-relaxed text-justify" style={{
        fontFamily: 'Noto Sans SC, sans-serif',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
          {attraction.description}
        </p>
      </div>
    </div>;
}