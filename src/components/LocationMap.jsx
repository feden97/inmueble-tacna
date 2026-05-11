import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { property, puntosReferencia } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin } from 'lucide-react';
import './LocationMap.css';

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Gold icon for property
const goldIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:22px;height:22px;border-radius:50%;
    background:var(--accent-gold, #c9a84c);
    border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.35);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function LocationMap() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const center = [property.coordenadas.lat, property.coordenadas.lng];
  const whatsapp = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  return (
    <section id="mapa" className="section-padding bg-light" ref={ref}>
      <div className="container">
        <h2 className={`section-title text-center ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          Ubicación
        </h2>

        <div className={`map-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>

          {/* Mobile: horizontal chip strip ABOVE map */}
          <div className="map-ref-strip">
            {puntosReferencia.map((p, i) => (
              <div key={i} className="ref-chip">
                <MapPin size={14} color="var(--accent-gold)" />
                <span>{p.nombre}</span>
                <span className="ref-chip-dist">{p.distancia}</span>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="map-container">
            <MapContainer
              center={center}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={center} icon={goldIcon}>
                <Popup>
                  <strong>{property.titulo}</strong><br />
                  {property.areaConstruidaM2} m² · {property.precioTexto}<br />
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">💬 Consultar</a>
                </Popup>
              </Marker>

              {puntosReferencia.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lng]}>
                  <Popup><strong>{p.nombre}</strong><br />Distancia: {p.distancia}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Desktop sidebar */}
          <div className="map-sidebar">
            <div className="sidebar-title">Puntos de referencia</div>
            <ul className="ref-list">
              {puntosReferencia.map((p, i) => (
                <li key={i} className="ref-item">
                  <MapPin size={18} color="var(--accent-blue)" />
                  <div>
                    <div className="ref-name">{p.nombre}</div>
                    <div className="ref-dist">{p.distancia}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
