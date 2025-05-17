"use client";

import {useState, useCallback, useRef, useEffect, useMemo} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {RealtimeRow} from "@/types/analytics";
import {getCountryCoordinates} from "@/utils/countryCoordinates";
import {googleMapsApiKey, mapStyles} from "@/lib/map";

interface UserLocationsMapProps {
  data: RealtimeRow[];
}

export function UserLocationsMap({data}: UserLocationsMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<RealtimeRow | null>(
    null
  );
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "450px",
  };

  const defaultCenter = {
    lat: 20,
    lng: 0,
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    gestureHandling: "none", // Disable all gestures
    backgroundColor: "#f8f8f8", // Set background color to match the map style
  };

  // Calculate bounds for all markers to fit them on the map
  useEffect(() => {
    if (isLoaded && data.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();

      // Add all country coordinates to bounds
      data.forEach((country) => {
        const coordinates = getCountryCoordinates(country.country);
        bounds.extend(
          new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
        );
      });

      setMapBounds(bounds);

      // If map is already loaded, fit bounds
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);

        // Add a small padding to avoid markers being right at the edge
        window.google.maps.event.addListenerOnce(
          mapRef.current,
          "bounds_changed",
          () => {
            mapRef.current?.setZoom(Math.min(mapRef.current.getZoom() || 2, 5));
          }
        );
      }
    }
  }, [isLoaded]); // Only run when isLoaded changes, not on every data change

  // Separate effect to handle data changes without resetting the view
  useEffect(() => {
    // Only update bounds if map is already loaded and we have data
    if (isLoaded && mapRef.current && data.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();

      // Add all country coordinates to bounds
      data.forEach((country) => {
        const coordinates = getCountryCoordinates(country.country);
        bounds.extend(
          new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
        );
      });

      // Update bounds without animation to prevent jarring changes
      mapRef.current.fitBounds(bounds, 0);

      // Maintain the current zoom level if it's appropriate
      const currentZoom = mapRef.current.getZoom() || 2;
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.setZoom(Math.min(currentZoom, 5));
        }
      }, 100);
    }
  }, [data, isLoaded]);

  const onMarkerClick = useCallback(
    (country: RealtimeRow, e: google.maps.MapMouseEvent) => {
      // Stop propagation to prevent the map from handling the click
      if (e.domEvent) {
        e.domEvent.stopPropagation();
      }
      setSelectedCountry(country);
    },
    []
  );

  const onMapClick = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      // If bounds are already calculated, fit the map to them
      if (mapBounds) {
        map.fitBounds(mapBounds);

        // Add a small padding to avoid markers being right at the edge
        window.google.maps.event.addListenerOnce(map, "bounds_changed", () => {
          map.setZoom(Math.min(map.getZoom() || 2, 5));
        });
      }
    },
    [mapBounds]
  );

  // Memoize the markers to prevent them from disappearing during re-renders
  const memoizedMarkers = useMemo(() => {
    // Only create markers when the Google Maps API is loaded
    if (!isLoaded) return [];

    return data.map((country) => {
      const coordinates = getCountryCoordinates(country.country);
      return (
        <Marker
          key={`${country.country}-${country.activeUsers}`}
          position={coordinates}
          onClick={(e) => onMarkerClick(country, e)}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#2563eb", // Blue color
            fillOpacity: 1,
            strokeWeight: 2, // Increased stroke weight for better visibility
            strokeColor: "#fff",
            scale: 2, // Increased scale for better visibility
            // Create Point object only when Google Maps API is loaded
            anchor: new window.google.maps.Point(12, 24),
          }}
          zIndex={1000} // Ensure markers are above other map elements
        />
      );
    });
  }, [data, onMarkerClick, isLoaded]);

  return (
    <div className="overflow-hidden relative z-0">
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={2}
            onClick={onMapClick}
            options={options}
            onLoad={onMapLoad}
            // Add a key based on data to ensure proper updates
            key={`map-${data.length}-${data.map((c) => c.country).join("-")}`}
          >
            {/* Use memoized markers to prevent disappearing during re-renders */}
            {memoizedMarkers}

            {isLoaded && selectedCountry && (
              <InfoWindow
                position={getCountryCoordinates(selectedCountry.country)}
                onCloseClick={() => setSelectedCountry(null)}
                zIndex={2000} // Ensure InfoWindow is above markers
              >
                <div className="p-2">
                  <h3 className="font-semibold">{selectedCountry.country}</h3>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          {/* We don't need the overlay div anymore since we've disabled all map interactions */}
        </>
      ) : (
        <div className="flex items-center justify-center h-[450px] bg-muted/20">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
}
