
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileMenuItemProps {
  to: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MobileMenuItem = ({ to, icon: Icon, children, className, onClick }: MobileMenuItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-2 hover:text-wem-blue transition-colors",
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <span>{children}</span>
    </Link>
  );
};

export default MobileMenuItem;
