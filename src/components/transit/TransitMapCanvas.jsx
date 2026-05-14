import { Circle, MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet';
import { property } from '../../data';
import { PROPERTY_COORDS } from '../../data/routesData';
import WhatsAppIcon from '../WhatsAppIcon';
import { GOOGLE_MAPS_LINK, mapGestureText } from './constants';
import './leafletSetup';
import { propertyIcon } from './leafletSetup';
import { MapAttributionCleaner, RouteArrows } from './MapHelpers';

export default function TransitMapCanvas({
  activeGroup,
  activeVariant,
  groupedArray,
  rutasCercanas,
  onGroupClick,
  onVariantClick,
  onClearSelection,
}) {
  const whatsapp = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;
  const activeRouteName = activeGroup ? `Linea ${activeGroup}` : null;

  return (
    <div className="transit-map-container">
      <MapContainer
        center={PROPERTY_COORDS}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        gestureHandling={true}
        gestureHandlingOptions={{ duration: 1000, text: mapGestureText }}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapAttributionCleaner />

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

        {rutasCercanas.map(ruta => {
          const isGroupActive = activeGroup === ruta.linea;
          const isVariantActive = activeVariant === ruta.id;
          const showAsActive = isVariantActive || (isGroupActive && !activeVariant);

          return (
            <Polyline
              key={ruta.id}
              positions={ruta.coords}
              pathOptions={{
                color: ruta.color,
                weight: showAsActive ? 6 : 4,
                opacity: activeGroup ? (showAsActive ? 1 : 0) : 0.65,
              }}
              eventHandlers={{
                click: () => {
                  if (!activeGroup) onGroupClick(ruta.linea);
                  else onVariantClick(ruta, { stopPropagation: () => {} });
                },
              }}
            >
              <Popup autoPan={false}>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{ruta.nombre}</strong><br />
                  <span style={{ fontSize: '0.82rem', color: '#666' }}>
                    Sentido: {ruta.sentido} - {ruta.dist_km < 0.1 ? `${Math.round(ruta.dist_km * 1000)}m del inmueble` : `${ruta.dist_km} km`}
                  </span><br />
                  <span style={{ fontSize: '0.82rem' }}>{ruta.descripcion}</span>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        <Marker position={PROPERTY_COORDS} icon={propertyIcon}>
          <Popup autoPan={false}>
            <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ fontSize: '0.95rem' }}>{property.titulo}</strong><br />
              <span style={{ fontSize: '0.82rem' }}>{property.areaConstruidaM2} m2 - {property.precioTexto}</span><br />
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <WhatsAppIcon size={16} /> Consultar
              </a>
            </div>
          </Popup>
        </Marker>

        {activeGroup && !activeVariant && groupedArray.find(group => group.linea === activeGroup)?.rutas.map(route => (
          <RouteArrows key={route.id} ruta={route} />
        ))}
        {activeVariant && <RouteArrows ruta={rutasCercanas.find(route => route.id === activeVariant)} />}
      </MapContainer>

      {activeGroup && (
        <button className="transit-clear-btn" onClick={onClearSelection}>
          <span className="clear-x">X</span> {activeRouteName}
        </button>
      )}

      <a
        href={GOOGLE_MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="transit-gmaps-floating-btn"
      >
        Ver en Google Maps
      </a>
    </div>
  );
}
