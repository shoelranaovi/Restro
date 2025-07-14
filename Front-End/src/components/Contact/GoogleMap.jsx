import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Layers, Navigation, Search, Menu, X } from 'lucide-react';

// Note: In a real application, you would need to:
// 1. Install the @react-google-maps/api package: npm install @react-google-maps/api
// 2. Get a Google Maps API key from the Google Cloud Console
// 3. Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapType, setMapType] = useState('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  
  // Initialize Google Maps API
  useEffect(() => {
    // Create a script element to load Google Maps API
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    // Define callback for when the API is loaded
    window.initMap = () => {
      if (mapRef.current && !map) {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
          mapTypeId: mapType,
          disableDefaultUI: true, // Hide default UI controls
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy', // Allow one-finger pan on mobile
        });
        
        setMap(newMap);
        setMapLoaded(true);
      }
    };
    
    googleMapScript.addEventListener('load', window.initMap);
    document.body.appendChild(googleMapScript);
    
    return () => {
      // Clean up
      document.body.removeChild(googleMapScript);
      window.initMap = null;
    };
  }, []);
  
  // Focus search input when search is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);
  
  // Update map type when it changes
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType);
    }
  }, [map, mapType]);
  
  // Handle zoom in
  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom + 1);
    }
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom();
      map.setZoom(currentZoom - 1);
    }
  };
  
  // Handle search
  const handleSearch = () => {
    if (map && searchQuery.trim() !== '') {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results[0]) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(10);
          
          // Add a marker
          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            animation: window.google.maps.Animation.DROP
          });
        }
      });
      
      setShowSearch(false);
    }
  };
  
  // Handle key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Handle map type change
  const changeMapType = (type) => {
    setMapType(type);
    setShowLayers(false);
  };
  
  // Handle view larger map
  const handleViewLargerMap = () => {
    if (map) {
      const center = map.getCenter();
      const zoom = map.getZoom();
      window.open(`https://www.google.com/maps/@${center.lat()},${center.lng()},${zoom}z`, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden relative">
      {/* Main Map Container */}
      <div ref={mapRef} className="w-full h-full bg-cyan-100"></div>
      
      {/* Map UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Controls */}
        <div className="absolute top-2 left-2 pointer-events-auto">
          <button 
            onClick={handleViewLargerMap}
            className="bg-white text-gray-700 text-xs px-2 py-1 rounded shadow-sm hover:bg-gray-100 transition"
          >
            View larger map
          </button>
        </div>
        
        {/* Search Box */}
        {showSearch && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 pointer-events-auto w-full max-w-md px-2">
            <div className="w-full flex">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search places..."
                className="w-full py-2 px-3 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex">
                <button 
                  onClick={handleSearch}
                  className="bg-white py-2 px-3 border border-l-0 border-gray-300"
                >
                  <Search size={16} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowSearch(false)}
                  className="bg-white py-2 px-3 border border-l-0 border-gray-300 rounded-r"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Layers Menu */}
        {showLayers && (
          <div className="absolute top-12 right-12 bg-white rounded shadow-lg pointer-events-auto">
            <div className="p-2 font-medium text-sm border-b border-gray-200">Map Type</div>
            <div className="flex flex-col">
              <button 
                onClick={() => changeMapType('roadmap')} 
                className={`text-left px-4 py-2 hover:bg-gray-100 ${mapType === 'roadmap' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Road Map
              </button>
              <button 
                onClick={() => changeMapType('satellite')} 
                className={`text-left px-4 py-2 hover:bg-gray-100 ${mapType === 'satellite' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Satellite
              </button>
              <button 
                onClick={() => changeMapType('hybrid')} 
                className={`text-left px-4 py-2 hover:bg-gray-100 ${mapType === 'hybrid' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Hybrid
              </button>
              <button 
                onClick={() => changeMapType('terrain')} 
                className={`text-left px-4 py-2 hover:bg-gray-100 ${mapType === 'terrain' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                Terrain
              </button>
            </div>
          </div>
        )}
        
        {/* Bottom Left Location Preview */}
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-white rounded shadow-md overflow-hidden pointer-events-auto cursor-pointer">
          <div className="w-full h-full bg-cyan-200 flex items-center justify-center">
            <Navigation size={20} className="text-blue-600" />
          </div>
        </div>
        
        {/* Bottom Center Google Attribution */}
        {mapLoaded && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 text-xs p-1 rounded-t pointer-events-auto">
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">Keyboard shortcuts</button>
              <span className="text-gray-500">Map data ©2025</span>
              <button className="text-gray-500 hover:text-gray-700">Terms</button>
            </div>
          </div>
        )}
        
        {/* Google Logo */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="text-sm font-medium text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded">
            Google
          </div>
        </div>
      </div>
      
      {/* Control Buttons */}
      <div className="absolute top-2 right-2 flex flex-col bg-white rounded shadow-md pointer-events-auto">
        <button 
          className="p-2 border-b border-gray-200 hover:bg-gray-100"
          onClick={handleZoomIn}
        >
          <ZoomIn size={20} className="text-gray-600" />
        </button>
        <button 
          className="p-2 border-b border-gray-200 hover:bg-gray-100"
          onClick={handleZoomOut}
        >
          <ZoomOut size={20} className="text-gray-600" />
        </button>
        <button 
          className="p-2 border-b border-gray-200 hover:bg-gray-100"
          onClick={() => setShowLayers(!showLayers)}
        >
          <Layers size={20} className="text-gray-600" />
        </button>
        <button 
          className="p-2 hover:bg-gray-100"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default GoogleMapComponent;