
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import CallToAction from '@/components/CallToAction';
import Testimonials from '@/components/Testimonials';
import IndustrySection from '@/components/IndustrySection';
import QuickShopSection from '@/components/QuickShopSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <QuickShopSection />
        <IndustrySection />
        <FeaturedProducts />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
