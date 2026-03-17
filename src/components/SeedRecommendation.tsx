
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SeedInfo {
  id: string;
  name: string;
  image: string;
  season: string;
  soilType: string[];
  waterNeeds: 'Low' | 'Medium' | 'High';
  growthPeriod: string;
  idealTemp: string;
  yieldEstimate: string;
  description: string;
  matchScore: number;
}

interface SeedRecommendationProps {
  seed: SeedInfo;
}

const SeedRecommendation: React.FC<SeedRecommendationProps> = ({ seed }) => {
  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative">
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 rounded-full px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
          {seed.matchScore}% Match
        </div>
        <img 
          src={seed.image} 
          alt={seed.name} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary hover:bg-primary">{seed.season}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{seed.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{seed.description}</p>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Soil Type:</span>
            <div className="font-medium">{seed.soilType.join(', ')}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Water Needs:</span>
            <div className="font-medium">{seed.waterNeeds}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Growth Period:</span>
            <div className="font-medium">{seed.growthPeriod}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Ideal Temp:</span>
            <div className="font-medium">{seed.idealTemp}</div>
          </div>
        </div>
        
        <div className="text-center pt-2">
          <button className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border border-primary hover:border-transparent">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedRecommendation;
