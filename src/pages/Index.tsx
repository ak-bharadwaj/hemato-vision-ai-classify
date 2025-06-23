
import React, { useState } from 'react';
import { Upload, Brain, Microscope, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ImageUpload';
import ClassificationResult from '@/components/ClassificationResult';

interface ClassificationData {
  prediction: string;
  confidence: number;
  cellType: string;
  description: string;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<ClassificationData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setClassificationResult(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call to Flask backend with bloodcell.h5 model
    setTimeout(() => {
      const mockResults: ClassificationData[] = [
        {
          prediction: "Eosinophil",
          confidence: 0.92,
          cellType: "Eosinophil",
          description: "A type of white blood cell involved in allergic reactions and parasitic infections."
        },
        {
          prediction: "Lymphocyte",
          confidence: 0.88,
          cellType: "Lymphocyte", 
          description: "A type of white blood cell that plays a key role in adaptive immunity."
        },
        {
          prediction: "Neutrophil",
          confidence: 0.85,
          cellType: "Neutrophil",
          description: "The most abundant type of white blood cell, first responders to infection."
        },
        {
          prediction: "Monocyte",
          confidence: 0.79,
          cellType: "Monocyte",
          description: "Large white blood cells that differentiate into macrophages and dendritic cells."
        }
      ];
      
      setClassificationResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Microscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HematoVision</h1>
              <p className="text-sm text-gray-600">Advanced Blood Cell Classification</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span>Upload Blood Cell Image</span>
              </CardTitle>
              <CardDescription>
                Upload a microscopic image of blood cells for AI-powered classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {uploadedImage && (
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded blood cell" 
                      className="w-full h-64 object-contain rounded-lg border"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing with Transfer Learning Model...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Classify Blood Cells
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {classificationResult && (
              <ClassificationResult result={classificationResult} />
            )}
            
            {/* Educational Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileImage className="h-5 w-5 text-green-600" />
                  <span>About Blood Cell Classification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-800">Eosinophils</h4>
                    <p className="text-sm text-red-600">Allergic reactions & parasites</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Lymphocytes</h4>
                    <p className="text-sm text-blue-600">Adaptive immune response</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800">Neutrophils</h4>
                    <p className="text-sm text-green-600">First line of defense</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Monocytes</h4>
                    <p className="text-sm text-purple-600">Become macrophages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
