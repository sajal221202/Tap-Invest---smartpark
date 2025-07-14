import { useState, useEffect } from 'react';

interface NetworkConnection extends EventTarget {
  downlink?: number;
  effectiveType?: string;
  onchange?: () => void;
  rtt?: number;
  saveData?: boolean;
}

interface Navigator {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
}

interface NetworkStatus {
  isOnline: boolean;
  downlink: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean | null;
  isSlowConnection: boolean;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    downlink: null,
    effectiveType: null,
    rtt: null,
    saveData: null,
    isSlowConnection: false,
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const nav = navigator as Navigator;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
      
      const status: NetworkStatus = {
        isOnline: navigator.onLine,
        downlink: connection?.downlink || null,
        effectiveType: connection?.effectiveType || null,
        rtt: connection?.rtt || null,
        saveData: connection?.saveData || null,
        isSlowConnection: false,
      };

      // Determine if connection is slow
      if (connection) {
        const isSlowDownlink = connection.downlink !== undefined && connection.downlink < 1.5;
        const isSlowEffectiveType = connection.effectiveType?.includes('2g') || 
                                    connection.effectiveType === 'slow-2g';
        const isHighRtt = connection.rtt !== undefined && connection.rtt > 400;
        
        status.isSlowConnection = Boolean(isSlowDownlink || isSlowEffectiveType || isHighRtt);
      }

      setNetworkStatus(status);
    };

    const handleOnline = () => updateNetworkStatus();
    const handleOffline = () => updateNetworkStatus();

    // Initial update
    updateNetworkStatus();

    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for connection changes if supported
    const nav = navigator as Navigator;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (connection && 'addEventListener' in connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection && 'removeEventListener' in connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
}; 