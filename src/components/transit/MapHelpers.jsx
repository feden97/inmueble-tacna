import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { samplePointsByDistance } from './mapMath';

export function RouteArrows({ ruta }) {
  const map = useMap();
  const markersRef = useRef([]);
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  useEffect(() => {
    const handleZoom = () => setZoomLevel(map.getZoom());
    map.on('zoomend', handleZoom);
    return () => map.off('zoomend', handleZoom);
  }, [map]);

  useEffect(() => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (!ruta) return undefined;

    let spacing = 100;
    if (zoomLevel < 14) spacing = 800;
    else if (zoomLevel < 15) spacing = 400;
    else if (zoomLevel < 16) spacing = 200;

    const points = samplePointsByDistance(ruta.coords, spacing);

    points.forEach(({ pos, angle }) => {
      const arrowHtml = `
        <div style="transform: rotate(${angle}deg); width:20px; height:20px; display:flex; align-items:center; justify-content:center;">
          <svg class="route-chevron" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2 L22 22 L12 17 L2 22 Z" fill="${ruta.color}" stroke="white" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>`;

      const icon = L.divIcon({
        className: 'arrow-icon-wrapper',
        html: arrowHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker(pos, { icon, interactive: false, zIndexOffset: 500 });
      marker.addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [map, ruta, zoomLevel]);

  return null;
}

export function MapAttributionCleaner() {
  const map = useMap();

  useEffect(() => {
    map.attributionControl.setPrefix(false);
  }, [map]);

  return null;
}
