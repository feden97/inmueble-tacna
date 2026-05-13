import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { property } from '../data';
import { PROPERTY_COORDS, ROUTE_META } from '../data/routesData';
import nearbyRoutesRaw from '../data/nearby_routes.json';
import WhatsAppIcon from './WhatsAppIcon';
import './TransitMap.css';

// --- Arrow direction helpers ---
// Compute bearing in degrees between two [lat,lng] points
function bearing(a, b) {
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x = Math.sin(dLng) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(x, y)) + 360) % 360;
}

// Haversine distance in meters between two [lat,lng] points
function haversineM(a, b) {
  const toRad = d => d * Math.PI / 180;
  const R = 6371000;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Sample points along the entire route, uniformly spaced by distance
function samplePointsByDistance(coords, spacingM) {
  if (!coords || coords.length < 2) return [];
  const points = [];
  let accumDist = spacingM / 2; // start halfway

  for (let i = 0; i < coords.length - 1; i++) {
    const segDist = haversineM(coords[i], coords[i + 1]);

    if (accumDist + segDist >= spacingM) {
      points.push({
        pos: coords[i],
        angle: bearing(coords[i], coords[i + 1]),
      });
      accumDist = 0;
    } else {
      accumDist += segDist;
    }
  }
  return points;
}

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
  .map(r => {
    let coords = r.coords;
    // Fix Ruta 300 N-S direction which was stored backwards in the JSON
    if (r.name === 'Ruta 300 N-S') {
      coords = [...coords].reverse();
    }

    return {
      ...ROUTE_META[r.name],
      nombre: r.name,
      dist_km: r.dist_km,
      coords: coords,
    };
  });

// Group routes by linea number (static data, computed once)
const grouped = {};
rutasCercanas.forEach(r => {
  if (!grouped[r.linea]) grouped[r.linea] = [];
  grouped[r.linea].push(r);
});
const groupedArray = Object.entries(grouped).map(([linea, rutas]) => ({
  linea,
  rutas: rutas.sort((a, b) => a.dist_km - b.dist_km),
  minDist: Math.min(...rutas.map(r => r.dist_km)),
})).sort((a, b) => a.minDist - b.minDist);

// Custom gold pin for the property
const propertyIcon = L.divIcon({
  className: '',
  html: `<div class="property-pin-outer"><div class="property-pin-inner"></div></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});



// Directional arrow markers along the active route
function RouteArrows({ ruta }) {
  const map = useMap();
  const markersRef = useRef([]);
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  // Listen to zoom changes to adapt arrow spacing
  useEffect(() => {
    const handleZoom = () => {
      setZoomLevel(map.getZoom());
    };
    map.on('zoomend', handleZoom);
    return () => map.off('zoomend', handleZoom);
  }, [map]);

  useEffect(() => {
    // Cleanup previous markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (!ruta) return;

    // Adapt spacing based on zoom level so it looks good when zoomed out and zoomed in
    let spacing = 100;
    if (zoomLevel < 14) spacing = 800;
    else if (zoomLevel < 15) spacing = 400;
    else if (zoomLevel < 16) spacing = 200;

    // Generate arrows along the ENTIRE route uniformly
    const points = samplePointsByDistance(ruta.coords, spacing);

    points.forEach(({ pos, angle }) => {
      // Wrapper div handles ROTATION — inner SVG handles fade-in only (no transform conflict)
      // The SVG is a navigation arrow (paper plane shape) that points UP (North) by default.
      // This means rotate(0deg) points North, rotate(90deg) points East, etc., matching the bearing perfectly.
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
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
    };
  }, [ruta, map, zoomLevel]);

  return null;
}

export default function TransitMap() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const whatsapp = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  const handleGroupClick = useCallback((linea) => {
    if (activeGroup === linea) {
      // Deselect group
      setActiveGroup(null);
      setActiveVariant(null);
    } else {
      // Select group, show all its variants on map
      setActiveGroup(linea);
      setActiveVariant(null);
    }
  }, [activeGroup]);

  // For lines with a single variant, clicking directly selects that route
  const handleSingleRouteClick = useCallback((linea, ruta) => {
    if (activeGroup === linea) {
      setActiveGroup(null);
      setActiveVariant(null);
    } else {
      setActiveGroup(linea);
      setActiveVariant(ruta.id);
    }
  }, [activeGroup]);

  const handleVariantClick = useCallback((ruta, e) => {
    e.stopPropagation(); // prevent accordion from toggling
    if (activeVariant === ruta.id) {
      // Deselecting variant returns to showing all variants in the group
      setActiveVariant(null);
    } else {
      setActiveVariant(ruta.id);
    }
  }, [activeVariant]);

  const handleClearSelection = useCallback(() => {
    setActiveGroup(null);
    setActiveVariant(null);
  }, []);

  // Get the active route name for the clear button
  const activeRouteName = activeGroup ? `Línea ${activeGroup}` : null;

  return (
    <section id="mapa" className="section-padding bg-light">
      <div className="container">
        <h2 className="section-title text-center">Ubicación y Transporte</h2>
        <p className="map-subtitle text-center">
          {groupedArray.length} líneas de transporte pasan cerca · Seleccioná una para ver su trayecto
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

              {/* 800m radius circle for context */}
              <Circle
                center={PROPERTY_COORDS}
                radius={800}
                pathOptions={{
                  color: '#c9a84c',
                  fillColor: '#c9a84c',
                  fillOpacity: 0.04,
                  weight: 1,
                  dashArray: '6 4',
                  opacity: 0.35,
                }}
              />

              {/* Route polylines */}
              {rutasCercanas.map((ruta) => {
                const isGroupActive = activeGroup === ruta.linea;
                const isVariantActive = activeVariant === ruta.id;
                // It's active if its specific variant is selected, OR if its parent group is selected and no specific variant is selected
                const showAsActive = isVariantActive || (isGroupActive && !activeVariant);

                return (
                  <Polyline
                    key={ruta.id}
                    positions={ruta.coords}
                    pathOptions={{
                      color: ruta.color,
                      weight: showAsActive ? 6 : 4,
                      // Non-selected routes disappear completely (opacity 0) to clean the map
                      opacity: activeGroup ? (showAsActive ? 1 : 0) : 0.65,
                    }}
                    eventHandlers={{
                      click: () => {
                        if (!activeGroup) {
                          handleGroupClick(ruta.linea);
                        } else {
                          handleVariantClick(ruta, { stopPropagation: () => { } });
                        }
                      }
                    }}
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
                      style={{ color: '#25D366', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <WhatsAppIcon size={16} /> Consultar
                    </a>
                  </div>
                </Popup>
              </Marker>



              {/* Route Direction Arrows */}
              {/* Show arrows for all variants in the group if no specific variant is selected, otherwise only the selected one */}
              {activeGroup && !activeVariant && groupedArray.find(g => g.linea === activeGroup)?.rutas.map(r => (
                <RouteArrows key={r.id} ruta={r} />
              ))}
              {activeVariant && <RouteArrows ruta={rutasCercanas.find(r => r.id === activeVariant)} />}
            </MapContainer>

            {/* Clear selection button - floats over the map */}
            {activeGroup && (
              <button className="transit-clear-btn" onClick={handleClearSelection}>
                <span className="clear-x">✕</span> {activeRouteName}
              </button>
            )}
          </div>

          {/* Side panel / Bottom sheet (mobile) */}
          <div className="transit-panel">
            <div className="transit-panel-title">Líneas cercanas ({groupedArray.length})</div>

            <div className="transit-routes-list">
              {groupedArray.map(({ linea, rutas }) => {
                const isExpanded = activeGroup === linea;
                const primaryColor = rutas[0].color;
                const primaryTextColor = rutas[0].textColor;
                const isSingle = rutas.length === 1;

                // Single variant: flat button, no accordion
                if (isSingle) {
                  const ruta = rutas[0];
                  const isActive = activeGroup === linea;
                  return (
                    <div key={linea} className={`route-group-accordion ${isActive ? 'expanded' : ''}`}>
                      <button
                        className={`route-group-header ${isActive ? 'active' : ''}`}
                        onClick={() => handleSingleRouteClick(linea, ruta)}
                        style={{ '--route-color': primaryColor, '--route-text': primaryTextColor }}
                      >
                        <span className="route-badge" style={{ background: primaryColor, color: primaryTextColor }}>
                          {linea}
                        </span>
                        <div className="route-info">
                          <div className="route-name">{ruta.nombre}</div>
                          <div className="route-desc">{ruta.descripcion} · a {Math.round(ruta.dist_km * 1000)}m</div>
                        </div>
                        {/* Invisible icon placeholder to perfectly align with multi-variant buttons */}
                        <div className="accordion-icon" style={{ opacity: 0 }}>▶</div>
                      </button>
                    </div>
                  );
                }

                // Multiple variants: accordion with expandable children
                return (
                  <div key={linea} className={`route-group-accordion ${isExpanded ? 'expanded' : ''}`}>

                    {/* Parent Group Header */}
                    <button
                      className={`route-group-header ${isExpanded ? 'active' : ''}`}
                      onClick={() => handleGroupClick(linea)}
                      style={{ '--route-color': primaryColor, '--route-text': primaryTextColor }}
                    >
                      <span className="route-badge" style={{ background: primaryColor, color: primaryTextColor }}>
                        {linea}
                      </span>
                      <div className="route-info">
                        <div className="route-name">Línea {linea}</div>
                        <div className="route-desc">ida y vuelta · a {Math.round(rutas[0].dist_km * 1000)}m</div>
                      </div>
                      <div className="accordion-icon">▶</div>
                    </button>

                    {/* Children Variants — always rendered, animated via CSS grid */}
                    <div className="route-group-children-wrapper">
                      <div className="route-group-children">
                        {rutas.map(ruta => {
                          const isVariantActive = activeVariant === ruta.id;
                          const distLabel = `~${Math.round(ruta.dist_km * 1000)}m`;

                          return (
                            <button
                              key={ruta.id}
                              className={`route-variant-chip ${isVariantActive ? 'active' : ''}`}
                              onClick={(e) => handleVariantClick(ruta, e)}
                              style={{ '--route-color': ruta.color, '--route-text': ruta.textColor }}
                            >
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
                    </div>
                  </div>
                );
              })}
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
