import React, { useState } from 'react';
import { LocationTracker } from './components/LocationTracker';
import { NetworkStatusBanner } from './components/NetworkStatusBanner';
import { ParkingList } from './components/ParkingList';
import { MapView } from './components/MapView';
import type { ParkingSpot } from './data/parkingData';
import { Car, MapPin, List, Info } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'list'>('list');

  const handleLocationUpdate = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
  };

  const handleSpotSelect = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setActiveView('map'); // Switch to map view when spot is selected
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Network Status Banner */}
      <NetworkStatusBanner />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SmartPark</h1>
                <p className="text-sm text-gray-600">Find nearby parking spots with ease</p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => setActiveView('map')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'map' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Location Tracker */}
          <LocationTracker onLocationUpdate={handleLocationUpdate} />

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map/List Content */}
            <div className="lg:col-span-2">
              {activeView === 'map' ? (
                <MapView 
                  userLocation={userLocation}
                  selectedSpot={selectedSpot}
                  onSpotSelect={setSelectedSpot}
                />
              ) : (
                <ParkingList 
                  userLocation={userLocation}
                />
              )}
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Spots</span>
                      <span className="font-medium">150+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available Now</span>
                      <span className="font-medium text-green-600">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Price</span>
                      <span className="font-medium">₹35/hr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Nearest Spot</span>
                      <span className="font-medium text-blue-600">250m</span>
                    </div>
                  </div>
                </div>

                {/* Selected Spot Details */}
                {selectedSpot && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-lg border border-blue-200 p-6"
                  >
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">
                      Selected Spot
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-700">{selectedSpot.name}</h4>
                        <p className="text-sm text-blue-600">{selectedSpot.distance} away</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-600">Price</span>
                          <div className="font-medium">{selectedSpot.price}</div>
                        </div>
                        <div>
                          <span className="text-blue-600">Available</span>
                          <div className="font-medium">{selectedSpot.available} spots</div>
                        </div>
                        <div>
                          <span className="text-blue-600">Rating</span>
                          <div className="font-medium">⭐ {selectedSpot.rating}</div>
                        </div>
                        <div>
                          <span className="text-blue-600">Features</span>
                          <div className="font-medium">{selectedSpot.features.length} amenities</div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => setActiveView('map')}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          View on Map
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tips */}
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">
                    💡 Pro Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Book spots in advance during peak hours</li>
                    <li>• Look for covered parking during monsoon</li>
                    <li>• Check for EV charging stations if needed</li>
                    <li>• Premium spots often include valet service</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Built with ❤️ using React, Vite, TailwindCSS, and Web APIs
            </p>
            <p className="text-xs mt-2">
              Geolocation • Intersection Observer • Network Information API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
