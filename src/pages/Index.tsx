
import React from 'react';
import { BloodCellClassifier } from '../components/BloodCellClassifier';
import { ModelInfo } from '../components/ModelInfo';
import { Header } from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              HematoVision AI
            </h1>
            <p className="text-lg text-gray-600">
              Advanced Blood Cell Classification Using Transfer Learning
            </p>
          </div>
          
          <ModelInfo />
          <BloodCellClassifier />
        </div>
      </main>
    </div>
  );
};

export default Index;
