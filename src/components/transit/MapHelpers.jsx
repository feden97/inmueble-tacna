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

    points.forEach(({ pos, angle }, index) => {
      // Determine if this point should be rendered as a badge or an arrow.
      // We render a badge at index Math.floor(points.length / 2) if points count is small,
      // or every 4th point if there are many points (index % 4 === 2).
      const isBadge = points.length < 5
        ? index === Math.floor(points.length / 2)
        : index % 4 === 2;

      if (isBadge) {
        const badgeHtml = `
          <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
            <div class="route-badge-label" style="
              background-color: ${ruta.color};
              color: ${ruta.textColor || '#fff'};
              border: 1.5px solid #ffffff;
              border-radius: 4px;
              padding: 2px 5px;
              font-weight: 800;
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              font-size: 11px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
              white-space: nowrap;
              text-align: center;
              line-height: 1;
              min-width: 14px;
            ">
              ${ruta.linea}
            </div>
          </div>`;

        const icon = L.divIcon({
          className: 'route-badge-wrapper',
          html: badgeHtml,
          iconSize: [32, 20],
          iconAnchor: [16, 10],
        });

        const marker = L.marker(pos, { icon, interactive: false, zIndexOffset: 600 });
        marker.addTo(map);
        markersRef.current.push(marker);
      } else {
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
      }
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
