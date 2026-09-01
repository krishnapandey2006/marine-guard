import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TechnologySection } from '../components/landing/TechnologySection';
import { MissionBanner } from '../components/landing/MissionBanner';
import { Footer } from '../components/landing/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-marine-950 text-marine-100 selection:bg-teal-900 selection:text-teal-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TechnologySection />
        <MissionBanner />
      </main>
      <Footer />
    </div>
  );
};
