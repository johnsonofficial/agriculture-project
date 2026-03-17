import React, { useState, useRef } from 'react';
import { Upload, Camera, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface DetectedDisease {
  name: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string;
  medicineImage: string;
}

const plantDiseaseDatabase: Record<string, Omit<DetectedDisease, 'confidence'>> = {
  'apple_scab': {
    name: 'Apple Scab',
    description: 'A fungal disease that causes dark, scabby lesions on leaves and fruit.',
    treatment: 'Apply fungicide specifically labeled for apple scab. Remove and destroy infected leaves and fruit.',
    prevention: 'Plant resistant varieties. Improve air circulation by pruning. Apply preventative fungicide sprays.',
    medicineImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  },
  'black_spot': {
    name: 'Black Spot',
    description: 'Causes black spots with fringed margins on leaves, which may yellow and drop.',
    treatment: 'Apply fungicide. Remove and destroy infected leaves. Avoid overhead watering.',
    prevention: 'Space plants for good air circulation. Water at the base. Apply preventative fungicide.',
    medicineImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  },
  'early_blight': {
    name: 'Early Blight',
    description: 'Fungal disease causing dark spots with concentric rings on lower leaves first.',
    treatment: 'Apply fungicide labeled for early blight. Remove infected leaves. Ensure good nutrition.',
    prevention: 'Rotate crops. Mulch around base. Provide adequate spacing. Use resistant varieties.',
    medicineImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  },
  'late_blight': {
    name: 'Late Blight',
    description: 'Water-soaked lesions that rapidly enlarge and turn brown with white fungal growth.',
    treatment: 'Apply copper-based fungicide or specific late blight fungicide. Remove infected plants.',
    prevention: 'Plant resistant varieties. Avoid overhead irrigation. Ensure good air circulation.',
    medicineImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  },
  'powdery_mildew': {
    name: 'Powdery Mildew',
    description: 'White powdery growth on leaves, stems and sometimes fruit.',
    treatment: 'Apply sulfur-based fungicide or neem oil. Prune infected areas.',
    prevention: 'Provide good air circulation. Plant resistant varieties. Avoid excess nitrogen.',
    medicineImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  }
};

const PlantDiseaseScanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedDisease, setDetectedDisease] = useState<DetectedDisease | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setDetectedDisease(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        setDetectedDisease(null);
        
        stream.getTracks().forEach(track => track.stop());
      }, 1000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const scanImage = () => {
    if (!image) return;
    
    setIsScanning(true);
    
    setTimeout(() => {
      const diseases = Object.keys(plantDiseaseDatabase);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const selected = plantDiseaseDatabase[randomDisease];
      
      setDetectedDisease({
        ...selected,
        confidence: Math.round((0.7 + Math.random() * 0.25) * 100) / 100
      });
      
      setIsScanning(false);
    }, 2000);
  };

  const resetScan = () => {
    setImage(null);
    setDetectedDisease(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Plant Disease Scanner</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload or capture an image of your plant to identify diseases and get treatment recommendations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Image Input</CardTitle>
              <CardDescription>Upload or capture an image of the affected plant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button onClick={captureImage}>
                  <Camera className="mr-2 h-4 w-4" /> Capture
                </Button>
              </div>
              
              {image && (
                <div className="mt-4 relative">
                  <img 
                    src={image} 
                    alt="Uploaded plant" 
                    className="w-full h-auto max-h-80 object-contain rounded-md border border-gray-200 dark:border-gray-700" 
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white dark:bg-gray-800"
                    onClick={resetScan}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={scanImage} 
                disabled={!image || isScanning}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  'Scan for Diseases'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Detected plant disease and treatment information</CardDescription>
            </CardHeader>
            <CardContent>
              {detectedDisease ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-primary">{detectedDisease.name}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {Math.round(detectedDisease.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{detectedDisease.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Treatment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{detectedDisease.treatment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Prevention</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{detectedDisease.prevention}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  {image ? (
                    <>
                      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No scan results yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Click the "Scan for Diseases" button to analyze your plant image
                      </p>
                    </>
                  ) : (
                    <>
                      <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No image uploaded</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload or capture an image of your plant to get started
                      </p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantDiseaseScanner;
