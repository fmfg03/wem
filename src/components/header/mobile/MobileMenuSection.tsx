
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileMenuSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const MobileMenuSection = ({ title, children, className }: MobileMenuSectionProps) => {
  return (
    <div className={cn("py-2", className)}>
      {title && (
        <div className="font-semibold py-2 border-b border-gray-100 text-wem-blue">
          {title}
        </div>
      )}
      <div className="pl-4 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default MobileMenuSection;
