
import React from 'react';
import { useLocale, Locale } from '@/contexts/LocaleContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const languages: { locale: Locale; label: string; flag: string }[] = [
    { locale: 'es-MX', label: 'Español', flag: '🇲🇽' },
    { locale: 'en-US', label: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.locale === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.locale}
            onClick={() => setLocale(language.locale)}
            className={`flex items-center gap-2 ${language.locale === locale ? 'font-bold' : ''}`}
          >
            <span>{language.flag}</span>
            <span>{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
