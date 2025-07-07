import React, { useState, useEffect } from 'react';
import { Store, Building, ShoppingBag, GraduationCap } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { useSearch } from '@/contexts/SearchContext';
import { SearchCommand } from './SearchCommand';
import TopBar from './header/TopBar';
import Logo from './header/Logo';
import NavigationMenu from './header/NavigationMenu';
import MobileMenu from './header/MobileMenu';
import ActionButtons from './header/ActionButtons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useLocale();
  const { openSearch } = useSearch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    if (isMounted) {
      openSearch();
    }
  };

  const categories = [
    { name: t('category.garbage_bags'), path: "/categoria/bolsas-para-basura" },
    { name: t('category.plastic_bags'), path: "/categoria/bolsas-de-plastico" },
    { name: t('category.polyethylene'), path: "/categoria/polietileno-en-rollo" },
    { name: t('category.stretch_film'), path: "/categoria/playo-y-stretch" },
    { name: t('category.packaging'), path: "/categoria/material-de-empaque" }
  ];
  
  const industries = [
    { 
      name: "Restaurantes & Food Service", 
      path: "/industria/restaurantes", 
      icon: <Store className="w-4 h-4 mr-2" /> 
    },
    { 
      name: "Construcción & Manufactura", 
      path: "/industria/construccion", 
      icon: <Building className="w-4 h-4 mr-2" /> 
    },
    { 
      name: "Retail & Comercio", 
      path: "/industria/retail", 
      icon: <ShoppingBag className="w-4 h-4 mr-2" /> 
    },
    { 
      name: "Gobierno & Salud", 
      path: "/industria/gobierno", 
      icon: <GraduationCap className="w-4 h-4 mr-2" /> 
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      <TopBar />
      <div className="container mx-auto py-3 px-4">
        <nav className="flex items-center justify-between">
          <Logo />
          <NavigationMenu />
          <ActionButtons 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
            toggleSearch={toggleSearch} 
          />
        </nav>
      </div>
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        industries={industries} 
        categories={categories} 
      />
      {isMounted && <SearchCommand />}
    </header>
  );
};

export default Header;
