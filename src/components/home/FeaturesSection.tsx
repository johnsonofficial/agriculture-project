
import React from 'react';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  BarChart3, 
  Brain, 
  Wifi, 
  Cloud, 
  Microscope,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <section id="features-section" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
            Smart Features
          </div>
          <h2 className="text-3xl font-bold mb-4">Everything You Need For Smart Farming</h2>
          <p className="text-gray-600 dark:text-gray-300">
            AgriAssist combines cutting-edge technology with agricultural expertise to provide a comprehensive solution for modern farmers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/seed-guide">
            <FeatureCard 
              icon={Leaf}
              title="Seasonal Seed Guide"
              description="Get AI-powered recommendations for the best seeds based on your location, soil type, and current season."
              iconClassName="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            />
          </Link>
          
          <Link to="/expense-tracker">
            <FeatureCard 
              icon={BarChart3}
              title="Expense & Profit Tracker"
              description="Track all farm expenses and income, generate reports, and analyze profitability."
              iconClassName="bg-earth-100 text-earth-600 dark:bg-earth-900/30 dark:text-earth-400"
            />
          </Link>
          
          <FeatureCard 
            icon={Brain}
            title="AI Crop Suggestions"
            description="Leverage historical data and weather forecasts to determine optimal planting times and crop rotations."
            iconClassName="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          />
          
          <Link to="/iot-monitoring">
            <FeatureCard 
              icon={Wifi}
              title="IoT Farm Monitoring"
              description="Connect IoT sensors to monitor soil moisture, temperature, humidity, and more in real-time."
              iconClassName="bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
            />
          </Link>
          
          <Link to="/weather">
            <FeatureCard 
              icon={Cloud}
              title="Weather Forecasting"
              description="Access accurate weather data and forecasts specifically tailored for agricultural planning."
              iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            />
          </Link>
          
          <FeatureCard 
            icon={Microscope}
            title="Soil Health Analyzer"
            description="Input soil test results and receive AI-based recommendations for improving soil health."
            iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          />
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
