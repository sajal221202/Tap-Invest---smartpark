import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, MapPin, Navigation, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockParkingData } from '@/data/parkingData';
import type { ParkingSpot } from '@/data/parkingData';

interface MapViewProps {
  userLocation?: { lat: number; lng: number } | null;
  selectedSpot?: ParkingSpot | null;
  onSpotSelect?: (spot: ParkingSpot) => void;
}

export const MapView = ({ userLocation, selectedSpot, onSpotSelect }: MapViewProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSpotClick = (spot: ParkingSpot) => {
    if (onSpotSelect) {
      onSpotSelect(spot);
    }
  };

  const openInGoogleMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/@${userLocation.lat},${userLocation.lng},15z`;
      window.open(url, '_blank');
    }
  };

  const getSpotMarkerColor = (spot: ParkingSpot) => {
    if (selectedSpot?.id === spot.id) return 'bg-blue-600';
    if (spot.available <= 3) return 'bg-red-500';
    if (spot.available <= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Map className="h-5 w-5" />
              <span>Parking Map</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={openInGoogleMaps}
              className="flex items-center space-x-1"
            >
              <Maximize2 className="h-4 w-4" />
              <span>Open in Maps</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
            {!mapLoaded ? (
              // Loading state
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                <div className="flex flex-col items-center space-y-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                  <span className="text-gray-700 font-medium">Loading parking map...</span>
                  <span className="text-gray-500 text-sm">Finding nearby parking spots</span>
                </div>
              </div>
            ) : (
              // Mock map content  
              <div className="relative w-full h-full p-4 min-h-[350px] lg:min-h-[450px]">
                {/* Map title overlay */}
                <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-md shadow-sm border z-30">
                  <span className="text-xs font-medium text-gray-700">Interactive Parking Map</span>
                </div>
                
                {/* Grid pattern to simulate map */}
                <div className="absolute inset-4 opacity-20">
                  <div className="grid grid-cols-12 grid-rows-8 h-full gap-1">
                    {Array.from({ length: 96 }).map((_, i) => (
                      <div key={i} className="border border-gray-400 bg-gray-100"></div>
                    ))}
                  </div>
                </div>

                {/* Mock roads */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/3 left-0 right-0 h-3 bg-gray-500 shadow-md"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-3 bg-gray-500 shadow-md"></div>
                  <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-gray-500 shadow-md"></div>
                  <div className="absolute left-3/4 top-0 bottom-0 w-3 bg-gray-500 shadow-md"></div>
                </div>

                {/* User location marker */}
                {userLocation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600 rounded-full opacity-30 animate-ping"></div>
                      <span className="absolute -bottom-6 -left-8 text-xs font-medium text-blue-700 bg-white px-2 py-1 rounded shadow">
                        You are here
                      </span>
                    </div>
                  </div>
                )}

                {/* Parking spot markers */}
                {mockParkingData.slice(0, 6).map((spot, index) => {
                  const positions = [
                    { top: '20%', left: '30%' },
                    { top: '40%', left: '60%' },
                    { top: '60%', left: '20%' },
                    { top: '30%', left: '80%' },
                    { top: '70%', left: '70%' },
                    { top: '80%', left: '40%' },
                  ];

                  const position = positions[index] || { top: '50%', left: '50%' };

                  return (
                    <div
                      key={spot.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ top: position.top, left: position.left }}
                      onClick={() => handleSpotClick(spot)}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.2 }}
                        className="relative"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getSpotMarkerColor(spot)} z-10`}
                        ></div>
                        <div className="absolute -top-8 -left-12 opacity-0 hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          {spot.name}
                          <br />
                          {spot.available} spots • {spot.price}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-20">
                  <h4 className="text-sm font-semibold mb-3 text-gray-800">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700">Your location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700">Available (10+ spots)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700">Limited (4-10 spots)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                      <span className="text-gray-700">Few (1-3 spots)</span>
                    </div>
                  </div>
                </div>

                {/* Selected spot info */}
                {selectedSpot && (
                  <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 border-l-4 border-l-blue-500 z-20 min-w-[200px]">
                    <h4 className="font-semibold text-sm text-gray-800">{selectedSpot.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedSpot.distance} • {selectedSpot.price}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedSpot.available} spots available
                    </p>
                    <Button
                      size="sm"
                      className="mt-3 w-full text-xs"
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.coordinates.lat},${selectedSpot.coordinates.lng}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Navigate
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 