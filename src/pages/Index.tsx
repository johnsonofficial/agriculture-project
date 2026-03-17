
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import DashboardPreviewSection from '@/components/home/DashboardPreviewSection';
import AdditionalFeaturesSection from '@/components/home/AdditionalFeaturesSection';
import CTASection from '@/components/home/CTASection';

// Mock data for components
const weatherData = {
  location: 'Agriville',
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  temperature: 24,
  weatherType: 'sunny' as const,
  humidity: 45,
  windSpeed: 8,
  precipitation: 0,
};

const mockSeedData = {
  id: 'seed-1',
  name: 'Premium Hybrid Corn',
  image: 'https://images.unsplash.com/photo-1551817958-c5b51e7b4a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  season: 'Summer',
  soilType: ['Loamy', 'Sandy Loam'],
  waterNeeds: 'Medium' as const,
  growthPeriod: '90-120 days',
  idealTemp: '20-30°C',
  yieldEstimate: '8-10 tons/hectare',
  description: 'A high-yielding corn hybrid suitable for various soil types with excellent drought resistance and disease tolerance.',
  matchScore: 92,
};

const sensorData = {
  id: 'sensor-1',
  name: 'Soil Moisture',
  location: 'Field A, North',
  type: 'moisture' as const,
  value: 37,
  unit: '%',
  timestamp: new Date().toISOString(),
  batteryLevel: 84,
  signalStrength: 92,
  status: 'normal' as const,
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Features section */}
      <FeaturesSection />
      
      {/* Dashboard preview section */}
      <DashboardPreviewSection 
        weatherData={weatherData} 
        sensorData={sensorData} 
        seedData={mockSeedData} 
      />
      
      {/* Additional features section */}
      <AdditionalFeaturesSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
