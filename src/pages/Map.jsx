import React, { useState, useEffect } from 'react';

const Map = () => {
  const [map, setMap] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = () => {
      const google = window.google;
      if (!google) {
        setApiError(true);
        setIsLoading(false);
        return;
      }

      const mapOptions = {
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [
          // Your custom map styles
        ],
      };

      const mapElement = document.getElementById('map');
      if (!mapElement) {
        setApiError(true);
        setIsLoading(false);
        return;
      }

      const newMap = new google.maps.Map(mapElement, mapOptions);
      setMap(newMap);
      setIsLoading(false);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        setApiError(true);
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <section className="bg-gray-100 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Find Us</h2>
        {apiError ? (
          <div className="text-red-500 font-medium">
            There was an error loading the map. Please check your Google Maps API key or try again later.
          </div>
        ) : isLoading ? (
          <div className="text-gray-500 font-medium">Loading map...</div>
        ) : (
          <div id="map" className="h-96 rounded-md shadow-lg"></div>
        )}
      </div>
    </section>
  );
};

export default Map;