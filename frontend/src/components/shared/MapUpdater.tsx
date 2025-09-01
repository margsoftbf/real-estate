import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapUpdaterProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const MapUpdater = ({ latitude, longitude, zoom }: MapUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], zoom);
    }
  }, [map, latitude, longitude, zoom]);

  return null;
};

export default MapUpdater;