
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ClassificationResultProps {
  result: {
    predictedClass: string;
    confidence: number;
    allPredictions: Array<{ class: string; confidence: number }>;
    clinicalInfo: string;
    normalRange: string;
  };
}

export const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (confidence >= 75) return <Info className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Classification Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Predicted Class</h3>
              <p className="text-2xl font-bold text-blue-600">{result.predictedClass}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {getConfidenceIcon(result.confidence)}
                <span className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence}%
                </span>
              </div>
              <p className="text-sm text-gray-500">Confidence</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">All Predictions</h4>
            {result.allPredictions.map((prediction, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {prediction.class}
                  </span>
                  <span className="text-sm text-gray-600">
                    {prediction.confidence}%
                  </span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2 text-green-600" />
              Clinical Information
            </h4>
            <p className="text-sm text-gray-700">{result.clinicalInfo}</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Normal Range</h4>
            <p className="text-sm text-gray-700">{result.normalRange}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">AI-Powered</Badge>
            <Badge variant="outline">97.3% Accuracy</Badge>
            <Badge variant="outline">MobileNetV2</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
