import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-wem-darkblue text-white pt-8 md:pt-12 pb-4 md:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">WEM México</h3>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-wem-green transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" className="hover:text-wem-green transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" className="hover:text-wem-green transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/productos" className="text-gray-300 hover:text-white transition-colors">{t('nav.products')}</Link>
              </li>
              <li>
                <Link to="/mayoreo" className="text-gray-300 hover:text-white transition-colors">{t('nav.wholesale')}</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">{t('nav.blog')}</Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</Link>
              </li>
              <li>
                <Link to="/cotizar" className="text-gray-300 hover:text-white transition-colors">{t('nav.quote')}</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{t('footer.main_products')}</h3>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li>
                <Link to="/categoria/bolsas-para-basura" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.garbage_bags')}
                </Link>
              </li>
              <li>
                <Link to="/categoria/bolsas-de-plastico" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.plastic_bags')}
                </Link>
              </li>
              <li>
                <Link to="/categoria/polietileno-en-rollo" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.polyethylene')}
                </Link>
              </li>
              <li>
                <Link to="/categoria/playo-y-stretch" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.stretch_film')}
                </Link>
              </li>
              <li>
                <Link to="/categoria/material-de-empaque" className="text-gray-300 hover:text-white transition-colors">
                  {t('category.packaging')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 md:space-y-4 text-sm md:text-base">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-2 flex-shrink-0" size={16} />
                <span className="text-gray-300">
                  Calle Plásticos #123, Col. Industrial, Ciudad de México, CP 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={16} />
                <span className="text-gray-300">(55) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={16} />
                <a href="mailto:ventas@wem.mx" className="text-gray-300 hover:text-white transition-colors">
                  ventas@wem.mx
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-700 text-xs md:text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} WEM México. {t('footer.rights')}</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <Link to="/aviso-de-privacidad" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terminos-y-condiciones" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
