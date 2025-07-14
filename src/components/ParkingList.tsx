import React, { useState, useMemo } from 'react';
import { ParkingCard } from './ParkingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockParkingData } from '@/data/parkingData';
import type { ParkingSpot } from '@/data/parkingData';
import { Search, Filter, SortAsc } from 'lucide-react';
import { motion } from 'framer-motion';

interface ParkingListProps {
  userLocation?: { lat: number; lng: number } | null;
}

type SortOption = 'distance' | 'price' | 'availability' | 'rating';

export const ParkingList = ({ userLocation }: ParkingListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const filteredAndSortedSpots = useMemo(() => {
    let spots = [...mockParkingData];

    // Filter by search term
    if (searchTerm) {
      spots = spots.filter(spot =>
        spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spot.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by availability
    if (showOnlyAvailable) {
      spots = spots.filter(spot => spot.available > 0);
    }

    // Sort spots
    spots.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'price':
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        case 'availability':
          return b.available - a.available;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return spots;
  }, [searchTerm, sortBy, showOnlyAvailable]);

  const handleNavigateToSpot = (spot: ParkingSpot) => {
    // Open in Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.coordinates.lat},${spot.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'distance': return 'Distance';
      case 'price': return 'Price';
      case 'availability': return 'Availability';
      case 'rating': return 'Rating';
      default: return 'Distance';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Find Parking Spots</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Only available spots</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="distance">Distance</option>
                  <option value="price">Price</option>
                  <option value="availability">Availability</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedSpots.length} parking spot{filteredAndSortedSpots.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
              {showOnlyAvailable && ' (available only)'}
              {' sorted by ' + getSortLabel(sortBy).toLowerCase()}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parking Grid */}
      {filteredAndSortedSpots.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No parking spots found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedSpots.map((spot, index) => (
            <ParkingCard
              key={spot.id}
              spot={spot}
              index={index}
              onNavigate={handleNavigateToSpot}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}; 