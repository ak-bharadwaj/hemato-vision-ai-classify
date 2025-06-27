
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { classifyBloodCell } from '../utils/bloodCellModel';
import { ClassificationResult } from './ClassificationResult';

export const BloodCellClassifier = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResult(null);

    try {
      // Simulate realistic analysis progress
      const progressSteps = [
        { progress: 15, message: "Preprocessing image..." },
        { progress: 35, message: "Loading MobileNetV2 model..." },
        { progress: 55, message: "Extracting features..." },
        { progress: 75, message: "Running classification..." },
        { progress: 90, message: "Calculating confidence scores..." },
        { progress: 100, message: "Analysis complete!" }
      ];

      for (const step of progressSteps) {
        setAnalysisProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      const classification = await classifyBloodCell(selectedImage);
      setResult(classification);

      toast({
        title: "Analysis Complete",
        description: `Classified as ${classification.predictedClass} with ${classification.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Upload Blood Cell Image
        </h2>
        
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected blood cell" 
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600">Image uploaded successfully</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Click to upload microscopic blood cell image
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, TIFF formats (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="flex gap-3">
            <Button
              onClick={analyzeImage}
              disabled={!selectedImage || isAnalyzing}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Blood Cell'}
            </Button>
            
            <Button
              onClick={resetAnalysis}
              variant="outline"
              disabled={isAnalyzing}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-sm text-gray-600 text-center">
                Processing image with AI model...
              </p>
            </div>
          )}
        </div>
      </Card>

      {result && <ClassificationResult result={result} />}
    </div>
  );
};
