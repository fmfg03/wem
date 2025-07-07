
import React from 'react';

interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
};

export default FormSection;
