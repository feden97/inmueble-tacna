import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { property } from '../data';
import { PROPERTY_COORDS, ROUTE_META } from '../data/routesData';
import nearbyRoutesRaw from '../data/nearby_routes.json';
import './TransitMap.css';

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Merge real coords with metadata
const rutasCercanas = nearbyRoutesRaw
  .filter(r => ROUTE_META[r.name])
  .map(r => ({
    ...ROUTE_META[r.name],
    nombre: r.name,
    dist_km: r.dist_km,
    coords: r.coords,
  }));

// Custom gold pin for the property
const propertyIcon = L.divIcon({
  className: '',
  html: `<div class="property-pin-outer"><div class="property-pin-inner"></div></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Fly-to on route selection
function FlyToRoute({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      // En lugar de ajustar todo el recorrido (que puede alejar mucho el mapa),
      // acercamos la vista a la propiedad para que el usuario vea por dónde pasa.
      map.flyTo(PROPERTY_COORDS, 16, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

export default function TransitMap() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [flyCoords, setFlyCoords] = useState(null);
  const whatsapp = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  const handleRouteClick = (ruta) => {
    if (activeRoute?.id === ruta.id) {
      setActiveRoute(null);
      setFlyCoords(null);
    } else {
      setActiveRoute(ruta);
      setFlyCoords(ruta.coords);
    }
  };

  // Group routes by linea number for the panel
  const grouped = {};
  rutasCercanas.forEach(r => {
    if (!grouped[r.linea]) grouped[r.linea] = [];
    grouped[r.linea].push(r);
  });

  // Convert to array and sort by proximity
  const groupedArray = Object.entries(grouped).map(([linea, rutas]) => {
    return {
      linea,
      rutas: rutas.sort((a, b) => a.dist_km - b.dist_km),
      minDist: Math.min(...rutas.map(r => r.dist_km))
    };
  }).sort((a, b) => a.minDist - b.minDist);

  return (
    <section id="mapa" className="section-padding bg-light">
      <div className="container">
        <h2 className="section-title text-center">Ubicación y Transporte</h2>
        <p className="map-subtitle text-center">
          {rutasCercanas.length} líneas de transporte pasan dentro de 800m · Seleccioná una para ver su trayecto
        </p>

        <div className="transit-layout">

          {/* Map */}
          <div className="transit-map-container">
            <MapContainer
              center={PROPERTY_COORDS}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Route polylines */}
              {rutasCercanas.map((ruta) => {
                const isActive = activeRoute?.id === ruta.id;
                return (
                  <Polyline
                    key={ruta.id}
                    positions={ruta.coords}
                    pathOptions={{
                      color: ruta.color,
                      weight: isActive ? 6 : 3,
                      opacity: activeRoute ? (isActive ? 1 : 0.2) : 0.65,
                    }}
                    eventHandlers={{ click: () => handleRouteClick(ruta) }}
                  >
                    <Popup autoPan={false}>
                      <div style={{ fontFamily: 'Inter, sans-serif' }}>
                        <strong style={{ fontSize: '0.95rem' }}>{ruta.nombre}</strong><br />
                        <span style={{ fontSize: '0.82rem', color: '#666' }}>
                          Sentido: {ruta.sentido} · {ruta.dist_km < 0.1 ? `${Math.round(ruta.dist_km * 1000)}m del inmueble` : `${ruta.dist_km} km`}
                        </span><br />
                        <span style={{ fontSize: '0.82rem' }}>{ruta.descripcion}</span>
                      </div>
                    </Popup>
                  </Polyline>
                );
              })}

              {/* Property marker */}
              <Marker position={PROPERTY_COORDS} icon={propertyIcon}>
                <Popup autoPan={false}>
                  <div style={{ fontFamily: 'Inter, sans-serif' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{property.titulo}</strong><br />
                    <span style={{ fontSize: '0.82rem' }}>{property.areaConstruidaM2} m² · {property.precioTexto}</span><br />
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                       style={{ color: '#25D366', fontWeight: 600, fontSize: '0.85rem' }}>
                      💬 Consultar por WhatsApp
                    </a>
                  </div>
                </Popup>
              </Marker>

              {flyCoords && <FlyToRoute coords={flyCoords} />}
            </MapContainer>
          </div>

          {/* Side panel */}
          <div className="transit-panel">
            <div className="transit-panel-title">Líneas cercanas ({rutasCercanas.length})</div>

            <div className="transit-routes-list">
              {groupedArray.map(({ linea, rutas }) => (
                <div key={linea} className="route-group">
                  {rutas.map(ruta => {
                    const isActive = activeRoute?.id === ruta.id;
                    const distLabel = ruta.dist_km < 0.1
                      ? `~${Math.round(ruta.dist_km * 1000)}m`
                      : `~${Math.round(ruta.dist_km * 1000)}m`;
                    return (
                      <button
                        key={ruta.id}
                        className={`route-chip ${isActive ? 'active' : ''}`}
                        onClick={() => handleRouteClick(ruta)}
                        style={{ '--route-color': ruta.color, '--route-text': ruta.textColor }}
                      >
                        <span className="route-badge" style={{ background: ruta.color, color: ruta.textColor }}>
                          {ruta.linea}
                        </span>
                        <div className="route-info">
                          <div className="route-name">{ruta.nombre}</div>
                          <div className="route-desc">{ruta.descripcion}</div>
                        </div>
                        <div className="route-meta-right">
                          <span className={`sentido-tag sentido-${ruta.sentido === 'ida' ? 'ida' : ruta.sentido === 'vuelta' ? 'vuelta' : 'ambos'}`}>
                            {ruta.sentido === 'ida' ? '↓' : ruta.sentido === 'vuelta' ? '↑' : '↕'}
                          </span>
                          <span className="dist-tag">{distLabel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="transit-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#E91E63' }}></span>Muy cercana (&lt;100m)</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#FF6F00' }}></span>Cercana (&lt;400m)</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#5E35B1' }}></span>En el barrio (&lt;800m)</span>
            </div>

            <div className="transit-source">
              Fuente: <a href="https://rutastacna.com" target="_blank" rel="noopener noreferrer">rutastacna.com</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
