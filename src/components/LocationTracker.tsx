import React from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationTrackerProps {
  onLocationUpdate?: (lat: number, lng: number) => void;
}

export const LocationTracker = ({ onLocationUpdate }: LocationTrackerProps) => {
  const { latitude, longitude, error, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000,
  });

  // Notify parent component of location updates
  React.useEffect(() => {
    if (latitude && longitude && onLocationUpdate) {
      onLocationUpdate(latitude, longitude);
    }
  }, [latitude, longitude, onLocationUpdate]);

  const refreshLocation = () => {
    window.location.reload(); // Simple refresh approach
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-blue-700">Detecting your location...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <MapPin className="h-5 w-5" />
              <span>Location Error</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={refreshLocation} 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Navigation className="h-5 w-5" />
            <span>Your Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-green-600">Latitude:</span>
              <span className="text-sm text-green-700">{latitude?.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-green-600">Longitude:</span>
              <span className="text-sm text-green-700">{longitude?.toFixed(6)}</span>
            </div>
            <div className="pt-2">
              <Button 
                onClick={refreshLocation} 
                variant="outline" 
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 