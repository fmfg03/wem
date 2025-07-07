
import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { PhoneCall, Mail } from 'lucide-react';

const TopBar = () => {
  const { t } = useLocale();
  
  return (
    <div className="bg-wem-blue text-white py-1">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <p className="hidden md:block text-sm font-medium">
          {t('header.service_years')}
        </p>
        <div className="flex items-center gap-4 w-full md:w-auto justify-end text-sm">
          <a href="tel:+525512345678" className="flex items-center gap-1 hover:text-white/90">
            <PhoneCall className="h-4 w-4" />
            <span>(55) 1234-5678</span>
          </a>
          <span className="hidden md:inline">|</span>
          <a href="mailto:ventas@wem.mx" className="hidden md:flex items-center gap-1 hover:text-white/90">
            <Mail className="h-4 w-4" />
            <span>ventas@wem.mx</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
