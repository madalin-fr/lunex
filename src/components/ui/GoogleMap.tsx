'use client';

import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    description?: string;
  }>;
  height?: string;
  width?: string;
  className?: string;
}

// Declare global google types to avoid TypeScript errors
declare global {
  interface Window {
    google: {
      maps: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Map: new (element: HTMLElement, options: any) => any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Marker: new (options?: any) => any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        InfoWindow: new (options?: any) => any;
        Animation: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          DROP: any;
        };
      };
    };
    initGoogleMap?: () => void;
  }
}

export default function GoogleMap({
  center = { lat: 41.8902, lng: 12.4922 },
  zoom = 15,
  markers = [],
  height = '400px',
  width = '100%',
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = () => {
      if (!isMounted || !mapRef.current) return;

      try {
        if (!window.google || !window.google.maps) {
          throw new Error('Google Maps not loaded');
        }

        // Create map instance
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#c8e6f5' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#e0e0e0' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#e8f5e9' }],
            },
          ],
        });

        // Add markers
        const infoWindow = new window.google.maps.InfoWindow();
        
        markers.forEach((markerData) => {
          const marker = new window.google.maps.Marker({
            position: markerData.position,
            map: mapInstanceRef.current,
            title: markerData.title,
            animation: window.google.maps.Animation.DROP,
          });

          if (markerData.description || markerData.title) {
            marker.addListener('click', () => {
              const content = `
                <div style="padding: 12px; max-width: 250px;">
                  ${markerData.title ? `<h3 style="font-weight: 600; margin: 0 0 8px 0; font-size: 16px;">${markerData.title}</h3>` : ''}
                  ${markerData.description ? `<p style="margin: 0; color: #666; font-size: 14px;">${markerData.description}</p>` : ''}
                </div>
              `;
              infoWindow.setContent(content);
              infoWindow.open(mapInstanceRef.current, marker);
            });
          }
        });

        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    const loadGoogleMaps = () => {
      // Check if API key is configured
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        setError('Google Maps API key not configured');
        setIsLoading(false);
        return;
      }

      // Check if already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Set up callback
      window.initGoogleMap = () => {
        if (isMounted) {
          initMap();
        }
      };

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        // Wait for existing script to load
        if (window.google && window.google.maps) {
          initMap();
        }
        return;
      }

      // Load script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        if (isMounted) {
          setError('Failed to load Google Maps');
          setIsLoading(false);
        }
      };

      document.head.appendChild(script);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadGoogleMaps, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (window.initGoogleMap) {
        delete window.initGoogleMap;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [center, zoom]);

  if (error) {
    return (
      <div 
        className={`relative rounded-xl overflow-hidden shadow-lg bg-gray-100 ${className}`} 
        style={{ height, width }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600 mb-2">{error}</p>
            {error.includes('API key') && (
              <p className="text-sm text-gray-500">
                Please add your Google Maps API key to env
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-lg bg-gray-50 ${className}`} 
      style={{ height, width }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}