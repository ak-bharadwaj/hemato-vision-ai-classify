
import React from 'react';
import { CheckCircle, Brain, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ClassificationData {
  prediction: string;
  confidence: number;
  cellType: string;
  description: string;
}

interface ClassificationResultProps {
  result: ClassificationData;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBackground = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100';
    if (confidence >= 0.6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Classification Results</span>
        </CardTitle>
        <CardDescription>
          AI-powered analysis using transfer learning model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className={`p-4 rounded-lg ${getConfidenceBackground(result.confidence)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {result.cellType}
            </h3>
            <span className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
              {(result.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            {result.description}
          </p>
          
          {/* Confidence Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Confidence Level</span>
              <span className={getConfidenceColor(result.confidence)}>
                {result.confidence >= 0.8 ? 'High' : result.confidence >= 0.6 ? 'Medium' : 'Low'}
              </span>
            </div>
            <Progress 
              value={result.confidence * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Model</span>
            </div>
            <p className="text-xs text-blue-600">Transfer Learning CNN</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">Accuracy</span>
            </div>
            <p className="text-xs text-purple-600">Trained on 12,000+ images</p>
          </div>
        </div>

        {/* Clinical Significance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Clinical Significance</h4>
          <p className="text-sm text-gray-700">
            This classification can assist healthcare professionals in identifying blood cell types 
            for diagnostic purposes. Always consult with a qualified pathologist for medical decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassificationResult;
