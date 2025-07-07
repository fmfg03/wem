
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WholesaleHero from '@/components/wholesale/WholesaleHero';
import WholesaleAdvantages from '@/components/wholesale/WholesaleAdvantages';
import WholesaleCategories from '@/components/wholesale/WholesaleCategories';
import WholesaleCalculator from '@/components/wholesale/WholesaleCalculator';
import WholesaleCTA from '@/components/wholesale/WholesaleCTA';
import WholesaleFAQ from '@/components/wholesale/WholesaleFAQ';

const Wholesale = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WholesaleHero />
        <WholesaleAdvantages />
        <WholesaleCategories />
        <WholesaleCalculator />
        <WholesaleFAQ />
        <WholesaleCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Wholesale;
