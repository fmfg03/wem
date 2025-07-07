
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '../LanguageSwitcher';
import AuthButtons from '../AuthButtons';

interface ActionButtonsProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleSearch: () => void;
}

const ActionButtons = ({ isMenuOpen, toggleMenu, toggleSearch }: ActionButtonsProps) => {
  const { itemCount } = useCart();
  const { t } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-wem-lightblue transition-colors flex items-center gap-1"
        aria-label={t('nav.search')}
      >
        <Search className="h-5 w-5" />
        <span className="hidden md:inline text-sm">{t('nav.search')}</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-1">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <LanguageSwitcher />
      <AuthButtons />
      
      <Link to="/cotizar" className="hidden md:inline-block">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-wem-blue hover:bg-wem-darkblue text-white"
        >
          {t('nav.quote')}
        </Button>
      </Link>
      
      <Link 
        to="/carrito" 
        className="p-2 rounded-full hover:bg-wem-lightblue transition-colors relative"
        aria-label={t('nav.cart')}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-wem-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>
      
      <button 
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-full hover:bg-wem-lightblue transition-colors z-30"
        aria-label={isMenuOpen ? t('nav.close') : t('nav.menu')}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ActionButtons;
