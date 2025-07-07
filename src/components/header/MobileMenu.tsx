
import React from 'react';
import { FileText } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import MobileMenuItem from './mobile/MobileMenuItem';
import MobileMenuSection from './mobile/MobileMenuSection';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  industries: Array<{
    name: string;
    path: string;
    icon: JSX.Element;
  }>;
  categories: Array<{
    name: string;
    path: string;
  }>;
}

const MobileMenu = ({ isMenuOpen, toggleMenu, industries, categories }: MobileMenuProps) => {
  const { t } = useLocale();

  if (!isMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 bg-white z-20 pt-16 overflow-y-auto animate-fade-in">
      <nav className="container mx-auto py-4 px-4 flex flex-col">
        <MobileMenuSection title={t('nav.buy')}>
          <MobileMenuItem 
            to="/productos" 
            onClick={toggleMenu}
          >
            {t('nav.by_product')}
          </MobileMenuItem>
          
          <div className="pl-4">
            {categories.map((category) => (
              <MobileMenuItem
                key={category.path}
                to={category.path}
                onClick={toggleMenu}
                className="text-sm"
              >
                {category.name}
              </MobileMenuItem>
            ))}
          </div>

          <MobileMenuItem 
            to="/soluciones" 
            onClick={toggleMenu}
          >
            {t('nav.by_industry')}
          </MobileMenuItem>

          <div className="pl-4">
            {industries.map((industry) => (
              <MobileMenuItem
                key={industry.path}
                to={industry.path}
                onClick={toggleMenu}
                className="text-sm"
              >
                {industry.icon}
                {industry.name}
              </MobileMenuItem>
            ))}
          </div>

          <MobileMenuItem 
            to="/mayoreo" 
            onClick={toggleMenu}
          >
            {t('nav.wholesale')}
          </MobileMenuItem>
        </MobileMenuSection>

        <MobileMenuSection>
          <MobileMenuItem 
            to="/blog" 
            onClick={toggleMenu}
            icon={FileText}
            className="font-semibold border-b border-gray-100"
          >
            {t('nav.blog')}
          </MobileMenuItem>
          
          <MobileMenuItem 
            to="/sobre-nosotros" 
            onClick={toggleMenu}
            className="font-semibold border-b border-gray-100"
          >
            {t('nav.about')}
          </MobileMenuItem>
          
          <MobileMenuItem 
            to="/contacto" 
            onClick={toggleMenu}
            className="font-semibold border-b border-gray-100"
          >
            {t('nav.contact')}
          </MobileMenuItem>
          
          <MobileMenuItem 
            to="/cotizar" 
            onClick={toggleMenu}
            className="font-semibold border-b border-gray-100"
          >
            {t('nav.quote')}
          </MobileMenuItem>
        </MobileMenuSection>
      </nav>
    </div>
  );
};

export default MobileMenu;
