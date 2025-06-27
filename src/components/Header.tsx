
import React from 'react';
import { Microscope, GitBranch } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Microscope className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">HematoVision</h1>
              <p className="text-sm text-gray-500">AI Blood Cell Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <GitBranch className="h-4 w-4" />
            <span>v2.1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};
