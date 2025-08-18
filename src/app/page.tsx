import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CommunitySection from '@/components/CommunitySection';
import EmailSignupSection from '@/components/EmailSignupSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CommunitySection />
      <EmailSignupSection />
      <Footer />
    </div>
  );
}
