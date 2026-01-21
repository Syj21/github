// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { MapPin } from 'lucide-react';

export function AttractionNav({
  attractions,
  onNavigate
}) {
  return <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#D4A574]/10 p-2 rounded-full">
          <MapPin className="w-5 h-5 text-[#D4A574]" />
        </div>
        <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          景点导航
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {attractions.map(attraction => <button key={attraction.id} onClick={() => onNavigate(attraction.id)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4A574]/10 to-[#E8A849]/10 hover:from-[#D4A574] hover:to-[#E8A849] text-[#2C2C2C] hover:text-white rounded-full transition-all duration-300 border border-[#D4A574]/30 hover:border-transparent" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{attraction.name}</span>
        </button>)}
      </div>
    </div>;
}