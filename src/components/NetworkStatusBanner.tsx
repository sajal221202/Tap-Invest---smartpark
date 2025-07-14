import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NetworkStatusBanner = () => {
  const { isOnline, downlink, effectiveType, isSlowConnection } = useNetworkStatus();

  if (isOnline && !isSlowConnection) {
    return null; // Don't show banner for good connections
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <Alert 
          variant={isOnline ? "default" : "destructive"} 
          className={`${
            isOnline 
              ? 'bg-amber-50 border-amber-200 text-amber-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {isOnline ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
          
          <AlertTitle>
            {isOnline ? 'Slow Connection Detected' : 'No Internet Connection'}
          </AlertTitle>
          
          <AlertDescription>
            {isOnline ? (
              <div className="space-y-1">
                <p>Your connection appears to be slow. Some features may be limited.</p>
                {effectiveType && (
                  <p className="text-xs">
                    Network type: {effectiveType}
                    {downlink && ` (${downlink.toFixed(1)} Mbps)`}
                  </p>
                )}
              </div>
            ) : (
              <p>Please check your internet connection and try again.</p>
            )}
          </AlertDescription>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
}; 