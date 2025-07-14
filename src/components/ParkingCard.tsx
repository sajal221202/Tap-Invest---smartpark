
import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Car, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ParkingSpot } from '@/data/parkingData';

interface ParkingCardProps {
  spot: ParkingSpot;
  onNavigate?: (spot: ParkingSpot) => void;
  index: number;
}

// Loading skeleton component
const ParkingCardSkeleton = () => (
  <Card className="h-64">
    <CardContent className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </CardContent>
  </Card>
);

export const ParkingCard = ({ spot, onNavigate, index }: ParkingCardProps) => {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(spot);
    } else {
      // Default behavior - open in Google Maps
      const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.coordinates.lat},${spot.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const getAvailabilityColor = (available: number) => {
    if (available <= 3) return 'bg-red-500';
    if (available <= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getAvailabilityText = (available: number) => {
    if (available <= 3) return 'Low';
    if (available <= 10) return 'Medium';
    return 'High';
  };

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className="h-fit">
      {!hasBeenVisible ? (
        <ParkingCardSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                  {spot.name}
                </CardTitle>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{spot.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {/* Distance and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">{spot.distance}</span>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {spot.price}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {spot.available} spots available
                  </span>
                </div>
                <Badge 
                  className={`${getAvailabilityColor(spot.available)} text-white text-xs px-2 py-1`}
                >
                  {getAvailabilityText(spot.available)}
                </Badge>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {spot.features.slice(0, 3).map((feature, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="text-xs bg-gray-100 text-gray-700"
                  >
                    {feature}
                  </Badge>
                ))}
                {spot.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    +{spot.features.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Navigate Button */}
              <Button 
                onClick={handleNavigate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}; 