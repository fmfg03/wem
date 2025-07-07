
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, Phone, ArrowRight, BookOpen } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

const CallToAction = () => {
  const { t } = useLocale();
  
  return (
    <section className="py-16 bg-gradient-to-r from-wem-blue to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          {t('cta.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow-lg hover:bg-white/20 transition-all">
            <div className="mb-4">
              <FileText className="w-12 h-12 text-wem-green mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('cta.quote')}</h3>
            <p className="mb-6 text-white/80">
              {t('cta.quote.description')}
            </p>
            <Link to="/cotizar">
              <Button size="lg" className="bg-wem-green hover:bg-wem-darkgreen w-full">
                {t('cta.quote.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow-lg hover:bg-white/20 transition-all">
            <div className="mb-4">
              <Phone className="w-12 h-12 text-wem-green mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('cta.call')}</h3>
            <p className="mb-6 text-white/80">
              {t('cta.call.description')}
            </p>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-wem-blue w-full">
                {t('cta.call.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 shadow-lg hover:bg-white/20 transition-all">
            <div className="mb-4">
              <BookOpen className="w-12 h-12 text-wem-green mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('cta.blog')}</h3>
            <p className="mb-6 text-white/80">
              {t('cta.blog.description')}
            </p>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-wem-blue w-full">
                {t('cta.blog.button')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-lg font-medium">{t('cta.cart.prompt')}</p>
          <Link to="/carrito" className="inline-block mt-2">
            <Button className="bg-white text-wem-blue hover:bg-white/90">
              {t('cta.cart.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
