
import React from 'react';

interface IndustryHeaderProps {
  title: string;
  description?: string;
}

const IndustryHeader = ({ title, description }: IndustryHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default IndustryHeader;
