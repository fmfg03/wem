
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IndustrySection from '@/components/IndustrySection';
import { useLocale } from '@/contexts/LocaleContext';

const Solutions = () => {
  const { t } = useLocale();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-wem-darkblue to-wem-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('solutions.title')}</h1>
              <p className="text-lg opacity-90 mb-8">
                {t('solutions.subtitle')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Industry Section Component */}
        <IndustrySection />
        
        {/* Additional Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">{t('solutions.benefits_title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-wem-lightblue rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wem-blue text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('solutions.efficiency')}</h3>
                <p className="text-gray-600">
                  {t('solutions.efficiency_desc')}
                </p>
              </div>
              
              <div className="text-center p-6 bg-wem-lightblue rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wem-blue text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('solutions.compliance')}</h3>
                <p className="text-gray-600">
                  {t('solutions.compliance_desc')}
                </p>
              </div>
              
              <div className="text-center p-6 bg-wem-lightblue rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wem-blue text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('solutions.cost_savings')}</h3>
                <p className="text-gray-600">
                  {t('solutions.cost_savings_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Solutions;
