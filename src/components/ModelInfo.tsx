
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Target, Clock } from 'lucide-react';

export const ModelInfo = () => {
  return (
    <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">MobileNetV2</p>
            <p className="text-sm text-gray-600">Transfer Learning</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8 text-green-600" />
          <div>
            <p className="font-semibold text-gray-900">12,000 Images</p>
            <p className="text-sm text-gray-600">Training Dataset</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Target className="h-8 w-8 text-purple-600" />
          <div>
            <p className="font-semibold text-gray-900">97.3% Accuracy</p>
            <p className="text-sm text-gray-600">Validation Set</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Clock className="h-8 w-8 text-orange-600" />
          <div>
            <p className="font-semibold text-gray-900">< 2s</p>
            <p className="text-sm text-gray-600">Inference Time</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="secondary">Neutrophil</Badge>
        <Badge variant="secondary">Lymphocyte</Badge>
        <Badge variant="secondary">Monocyte</Badge>
        <Badge variant="secondary">Eosinophil</Badge>
        <Badge variant="secondary">Basophil</Badge>
        <Badge variant="secondary">RBC</Badge>
        <Badge variant="secondary">Platelet</Badge>
      </div>
    </Card>
  );
};
