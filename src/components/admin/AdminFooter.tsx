
import React from 'react';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} WEM México. Panel de Administración.
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-xs text-gray-500">
              Versión 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
