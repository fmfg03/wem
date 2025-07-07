
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Store, Building, ShoppingBag, GraduationCap, FileText } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationMenu = () => {
  const { t } = useLocale();

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center font-medium hover:text-wem-blue transition-colors">
            {t('nav.buy')} <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white" align="start" sideOffset={8}>
          <DropdownMenuItem asChild>
            <Link
              to="/productos"
              className="font-medium hover:bg-wem-lightblue transition-colors w-full"
            >
              {t('nav.by_product')}
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link
              to="/soluciones"
              className="font-medium hover:bg-wem-lightblue transition-colors w-full"
            >
              {t('nav.by_industry')}
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link
              to="/mayoreo"
              className="font-medium hover:bg-wem-lightblue transition-colors w-full"
            >
              {t('nav.wholesale')}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link 
        to="/blog" 
        className="font-medium hover:text-wem-blue transition-colors flex items-center"
      >
        <FileText className="mr-1 h-4 w-4" />
        {t('nav.blog')}
      </Link>
      
      <Link 
        to="/sobre-nosotros" 
        className="font-medium hover:text-wem-blue transition-colors"
      >
        {t('nav.about')}
      </Link>
      
      <Link 
        to="/contacto" 
        className="font-medium hover:text-wem-blue transition-colors"
      >
        {t('nav.contact')}
      </Link>
    </nav>
  );
};

export default NavigationMenu;
