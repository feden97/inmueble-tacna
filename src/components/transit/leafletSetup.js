import L from 'leaflet';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { GestureHandling } from 'leaflet-gesture-handling';

L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export const propertyIcon = L.divIcon({
  className: '',
  html: '<div class="property-pin-outer"><div class="property-pin-inner"></div></div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});
