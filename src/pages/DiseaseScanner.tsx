
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import PlantDiseaseScanner from '@/components/PlantDiseaseScanner';

const DiseaseScanner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <PlantDiseaseScanner />
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseScanner;
