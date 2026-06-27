import { useEffect, useRef, useState, useCallback } from 'react';
import { ROUTE_META } from '../data/routesData';
import nearbyRoutesRaw from '../data/nearby_routes.json';
import { property } from '../data';
import './GoogleTransitMap.css';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/* ── Route data ────────────────────────────────────────────── */
const rutasCercanas = nearbyRoutesRaw
  .filter(r => ROUTE_META[r.name])
  .map(r => {
    let coords = r.coords;
    if (r.name === 'Ruta 300 N-S') coords = [...coords].reverse();
    return { ...ROUTE_META[r.name], nombre: r.name, dist_km: r.dist_km, coords };
  });

const grouped = {};
rutasCercanas.forEach(r => {
  if (!grouped[r.linea]) grouped[r.linea] = [];
  grouped[r.linea].push(r);
});
const groupedArray = Object.entries(grouped)
  .map(([linea, rutas]) => ({
    linea,
    rutas: rutas.sort((a, b) => a.dist_km - b.dist_km),
    minDist: Math.min(...rutas.map(r => r.dist_km)),
  }))
  .sort((a, b) => a.minDist - b.minDist);

/* ── Geometry helpers ──────────────────────────────────────── */
function haversineM(a, b) {
  const R = 6371000, toR = d => d * Math.PI / 180;
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function bearingDeg(a, b) {
  const toR = d => d * Math.PI / 180, toD = r => r * 180 / Math.PI;
  const dLng = toR(b[1] - a[1]);
  const lat1 = toR(a[0]), lat2 = toR(b[0]);
  const x = Math.sin(dLng) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toD(Math.atan2(x, y)) + 360) % 360;
}

function sampleAlongRoute(coords, spacingM) {
  if (!coords || coords.length < 2) return [];
  const pts = [];
  let acc = spacingM * 0.5;
  for (let i = 0; i < coords.length - 1; i++) {
    const len = haversineM(coords[i], coords[i + 1]);
    const angle = bearingDeg(coords[i], coords[i + 1]);
    while (acc <= len) {
      const t = acc / len;
      pts.push({
        lat: coords[i][0] + t * (coords[i + 1][0] - coords[i][0]),
        lng: coords[i][1] + t * (coords[i + 1][1] - coords[i][1]),
        angle,
      });
      acc += spacingM;
    }
    acc -= len;
  }
  return pts;
}

function spacingForZoom(zoom) {
  if (zoom >= 17) return 80;
  if (zoom >= 16) return 130;
  if (zoom >= 15) return 200;
  if (zoom >= 14) return 380;
  return 700;
}

/* ── Map style: only hide transit labels to avoid clutter ───── */
const MAP_STYLE = [
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

/* ── Arrow path (points north, rotation applied per bearing) ── */
const ARROW_PATH = 'M 0,-10 L 5.5,5 L 0,2 L -5.5,5 Z';

/* ── Rounded-rect path for badge ───────────────────────────── */
function roundRectPath(w, h, r = 3.5) {
  const x = -w / 2, y = -h / 2;
  return [
    `M ${x + r},${y}`,
    `L ${x + w - r},${y}`, `Q ${x + w},${y} ${x + w},${y + r}`,
    `L ${x + w},${y + h - r}`, `Q ${x + w},${y + h} ${x + w - r},${y + h}`,
    `L ${x + r},${y + h}`, `Q ${x},${y + h} ${x},${y + h - r}`,
    `L ${x},${y + r}`, `Q ${x},${y} ${x + r},${y}`,
    'Z',
  ].join(' ');
}

/* ── Property pin — classic 📍 location pin SVG ────────────── */
function propertyPinUrl() {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="56" viewBox="0 0 40 56">',
    '<defs>',
    '<filter id="sh" x="-30%" y="-10%" width="160%" height="150%">',
    '<feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="rgba(0,0,0,0.4)"/>',
    '</filter>',
    '</defs>',
    // Pin teardrop body
    '<path d="M20 1 C9.5 1 1 9.5 1 20 C1 34 20 55 20 55 C20 55 39 34 39 20 C39 9.5 30.5 1 20 1Z"',
    ' fill="#EA4335" stroke="white" stroke-width="2" filter="url(#sh)"/>',
    // White inner circle
    '<circle cx="20" cy="20" r="8" fill="white"/>',
    '</svg>',
  ].join('');
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

/* ── Google Maps script loader ─────────────────────────────── */
let _gmPromise = null;
function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve();
  if (_gmPromise) return _gmPromise;
  _gmPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    s.async = true;
    s.onload = resolve;
    s.onerror = () => { _gmPromise = null; reject(new Error('No se pudo cargar Google Maps')); };
    document.head.appendChild(s);
  });
  return _gmPromise;
}

/* ── Component ─────────────────────────────────────────────── */
export default function GoogleTransitMap() {
  const mapRef        = useRef(null);
  const mapObj        = useRef(null);
  const polylinesRef  = useRef([]);
  const markersRef    = useRef([]);
  const zoomListRef   = useRef(null);

  const [activeGroup,   setActiveGroup]   = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [mapLoaded,     setMapLoaded]     = useState(false);
  const [mapError,      setMapError]      = useState(null);
  const [isFullscreen,  setIsFullscreen]  = useState(false);

  /* Clear all route drawables */
  const clearOverlays = useCallback(() => {
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    if (zoomListRef.current) {
      window.google.maps.event.removeListener(zoomListRef.current);
      zoomListRef.current = null;
    }
  }, []);

  /* Draw arrow + badge markers for one ruta */
  const drawMarkers = useCallback((map, ruta) => {
    const G = window.google.maps;
    const zoom = map.getZoom() ?? 15;
    const pts = sampleAlongRoute(ruta.coords, spacingForZoom(zoom));
    if (!pts.length) return;

    const tc = ruta.textColor || '#fff';
    // Badge width depends on label length
    const bw = ruta.linea.length <= 3 ? 36 : ruta.linea.length <= 4 ? 44 : 52;

    pts.forEach((pt, i) => {
      // Show a badge at every 4th position, arrows elsewhere
      const isBadge = pts.length <= 4
        ? i === Math.floor(pts.length / 2)
        : i % 4 === 1;

      const pos = { lat: pt.lat, lng: pt.lng };

      if (isBadge) {
        // Rounded-rect badge with line number
        const mk = new G.Marker({
          position: pos,
          map,
          zIndex: 900,
          clickable: false,
          optimized: true,
          icon: {
            path:         roundRectPath(bw, 18),
            fillColor:    ruta.color,
            fillOpacity:  1,
            strokeColor:  '#fff',
            strokeWeight: 1.5,
            scale:        1,
            anchor:       new G.Point(0, 0),
          },
          label: {
            text:       ruta.linea,
            color:      tc,
            fontSize:   '11px',
            fontWeight: '800',
            fontFamily: 'Inter, Arial, sans-serif',
          },
        });
        markersRef.current.push(mk);
      } else {
        // Directional arrow (native rotation via icon.rotation)
        const mk = new G.Marker({
          position: pos,
          map,
          zIndex: 700,
          clickable: false,
          optimized: true,
          icon: {
            path:         ARROW_PATH,
            fillColor:    ruta.color,
            fillOpacity:  1,
            strokeColor:  '#fff',
            strokeWeight: 1.5,
            scale:        1.15,
            rotation:     pt.angle,     // ← native rotation, clockwise from north
            anchor:       new G.Point(0, 0),
          },
        });
        markersRef.current.push(mk);
      }
    });
  }, []);

  /* Re-sample arrows only on zoom change */
  const rebuildMarkers = useCallback((map, rutas) => {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    rutas.forEach(r => drawMarkers(map, r));
  }, [drawMarkers]);

  /* Init map once */
  useEffect(() => {
    loadGoogleMaps()
      .then(() => {
        if (!mapRef.current) return;
        const G = window.google.maps;

        const map = new G.Map(mapRef.current, {
          center:            property.coordenadas,
          zoom:              15,
          mapTypeControl:    false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl:       false,
          rotateControl:     false,
          scaleControl:      false,
          gestureHandling:   'cooperative',
          styles:            MAP_STYLE,
        });

        // ── Property pin ──
        new G.Marker({
          position: property.coordenadas,
          map,
          title:   property.titulo,
          zIndex:  1500,
          icon: {
            url:        propertyPinUrl(),
            scaledSize: new G.Size(40, 56),
            anchor:     new G.Point(20, 55), // tip of the pin
          },
        });



        mapObj.current = map;
        setMapLoaded(true);
      })
      .catch(err => setMapError(err?.message || 'Error al cargar Google Maps'));
  }, []);

  /* Redraw when selection changes */
  useEffect(() => {
    if (!mapLoaded || !mapObj.current) return;
    const map = mapObj.current;
    clearOverlays();

    const activeRutas = [];

    rutasCercanas.forEach(ruta => {
      const isGroupActive   = activeGroup === ruta.linea;
      const isVariantActive = activeVariant === ruta.id;
      const showActive      = isVariantActive || (isGroupActive && !activeVariant);

      const poly = new window.google.maps.Polyline({
        path:          ruta.coords.map(c => ({ lat: c[0], lng: c[1] })),
        map,
        strokeColor:   ruta.color,
        strokeWeight:  showActive ? 7 : 5,
        strokeOpacity: activeGroup ? (showActive ? 1 : 0) : 0.65,
        zIndex:        showActive ? 300 : 100,
        clickable:     true,
      });

      poly.addListener('click', () => {
        if (!activeGroup) setActiveGroup(ruta.linea);
        else if (activeGroup === ruta.linea)
          setActiveVariant(v => v === ruta.id ? null : ruta.id);
      });

      polylinesRef.current.push(poly);
      if (showActive) activeRutas.push(ruta);
    });

    activeRutas.forEach(r => drawMarkers(map, r));

    if (activeRutas.length) {
      zoomListRef.current = window.google.maps.event.addListener(
        map, 'zoom_changed', () => rebuildMarkers(map, activeRutas)
      );
    }

    return clearOverlays;
  }, [mapLoaded, activeGroup, activeVariant, drawMarkers, rebuildMarkers, clearOverlays]);

  /* Handlers */
  const handleGroupClick = useCallback(linea => {
    setActiveGroup(prev => prev === linea ? null : linea);
    setActiveVariant(null);
  }, []);
  const handleVariantClick = useCallback((linea, id) => {
    setActiveGroup(linea);
    setActiveVariant(prev => prev === id ? null : id);
  }, []);
  const handleClear = useCallback(() => {
    setActiveGroup(null);
    setActiveVariant(null);
  }, []);

  /* Fullscreen toggle */
  const sectionRef = useRef(null);
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => {
      const next = !prev;
      // Switch gesture handling so single-finger drag works in fullscreen
      if (mapObj.current) {
        mapObj.current.setOptions({ gestureHandling: next ? 'greedy' : 'cooperative' });
      }
      // Lock body scroll when fullscreen on mobile
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <section
      id="mapa-google"
      ref={sectionRef}
      className={`section-padding gmap-section${isFullscreen ? ' gmap-fullscreen' : ''}`}
    >
      <div className={isFullscreen ? 'gmap-fs-wrapper' : 'container'}>
        {!isFullscreen && (
          <>
            <h2 className="section-title text-center">Rutas en Google Maps</h2>
            <p className="gmap-subtitle text-center">
              Vista real de Google Maps con el recorrido de cada línea.
              Selecciona una línea del panel para ver su trazado.
            </p>
          </>
        )}

        <div className="gmap-layout">
          {/* ── Map ── */}
          <div className="gmap-map-container">
            {mapError && <div className="gmap-error">⚠️ {mapError}</div>}
            {!mapLoaded && !mapError && (
              <div className="gmap-loading">
                <div className="gmap-spinner" />
                <span>Cargando Google Maps…</span>
              </div>
            )}
            <div ref={mapRef} className="gmap-canvas" />

            {/* Fullscreen toggle */}
            <button
              className="gmap-fs-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20"/>
                  <polyline points="20 10 14 10 14 4"/>
                  <line x1="14" y1="10" x2="21" y2="3"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"/>
                  <polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              )}
            </button>

            {activeGroup && (
              <button className="gmap-clear-btn" onClick={handleClear}>
                <span className="clear-x">✕</span>&nbsp;Línea {activeGroup}
              </button>
            )}
          </div>

          {/* ── Side panel ── */}
          <div className="gmap-panel">
            <div className="gmap-panel-header">
              <span className="gmap-panel-title">{groupedArray.length} líneas cercanas</span>
              <span className="gmap-panel-hint">Toca para ver recorrido</span>
            </div>

            <div className="gmap-routes-list">
              {groupedArray.map(({ linea, rutas }) => {
                const isExpanded = activeGroup === linea;
                const main = rutas[0];

                if (rutas.length === 1) {
                  return (
                    <button
                      key={linea}
                      className={`gmap-route-item${isExpanded ? ' active' : ''}`}
                      onClick={() => handleVariantClick(linea, main.id)}
                    >
                      <span className="gmap-badge-pill"
                        style={{ background: main.color, color: main.textColor || '#fff' }}>
                        {linea}
                      </span>
                      <div className="gmap-route-info">
                        <span className="gmap-route-name">Línea {linea}</span>
                        <span className="gmap-route-dist">
                          {main.dist_km < 0.1
                            ? `${Math.round(main.dist_km * 1000)} m`
                            : `${main.dist_km} km`}
                        </span>
                      </div>
                    </button>
                  );
                }

                return (
                  <div key={linea} className={`gmap-route-group${isExpanded ? ' expanded' : ''}`}>
                    <button
                      className={`gmap-route-item${isExpanded ? ' active' : ''}`}
                      onClick={() => handleGroupClick(linea)}
                    >
                      <span className="gmap-badge-pill"
                        style={{ background: main.color, color: main.textColor || '#fff' }}>
                        {linea}
                      </span>
                      <div className="gmap-route-info">
                        <span className="gmap-route-name">Línea {linea}</span>
                        <span className="gmap-route-dist">
                          {Math.round(Math.min(...rutas.map(r => r.dist_km)) * 1000)} m
                        </span>
                      </div>
                      <span className="gmap-chevron">{isExpanded ? '▲' : '▼'}</span>
                    </button>

                    {isExpanded && (
                      <div className="gmap-variants">
                        {rutas.map(ruta => {
                          const isVarActive = activeVariant === ruta.id;
                          return (
                            <button
                              key={ruta.id}
                              className={`gmap-variant-item${isVarActive ? ' active' : ''}`}
                              onClick={() => handleVariantClick(linea, ruta.id)}
                            >
                              <span className="gmap-variant-dot" style={{ background: ruta.color }} />
                              <span className="gmap-variant-label">{ruta.sentido}</span>
                              <span className="gmap-variant-dist">
                                {ruta.dist_km < 0.1
                                  ? `${Math.round(ruta.dist_km * 1000)} m`
                                  : `${ruta.dist_km} km`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
