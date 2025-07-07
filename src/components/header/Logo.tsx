
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="text-xl md:text-2xl font-bold text-wem-blue hover:text-wem-darkblue transition-colors flex items-center z-20 relative" 
      aria-label="WEM México - Ir a la página principal"
    >
      <span>WEM</span>
      <span className="text-wem-green ml-1">México</span>
    </Link>
  );
};

export default Logo;
