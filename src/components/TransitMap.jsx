import { useCallback, useState } from 'react';
import { groupedArray, rutasCercanas } from './transit/routeData';
import TransitMapCanvas from './transit/TransitMapCanvas';
import TransitRoutesPanel from './transit/TransitRoutesPanel';
import './TransitMap.css';

export default function TransitMap() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);

  const handleGroupClick = useCallback((linea) => {
    if (activeGroup === linea) {
      setActiveGroup(null);
      setActiveVariant(null);
      return;
    }

    setActiveGroup(linea);
    setActiveVariant(null);
  }, [activeGroup]);

  const handleSingleRouteClick = useCallback((linea, ruta) => {
    if (activeGroup === linea) {
      setActiveGroup(null);
      setActiveVariant(null);
      return;
    }

    setActiveGroup(linea);
    setActiveVariant(ruta.id);
  }, [activeGroup]);

  const handleVariantClick = useCallback((ruta, event) => {
    event.stopPropagation();

    if (activeVariant === ruta.id) {
      setActiveVariant(null);
      return;
    }

    setActiveVariant(ruta.id);
  }, [activeVariant]);

  const handleClearSelection = useCallback(() => {
    setActiveGroup(null);
    setActiveVariant(null);
  }, []);

  return (
    <section id="mapa" className="section-padding bg-light">
      <div className="container">
        <h2 className="section-title text-center">Ubicación y transporte</h2>
        <p className="map-subtitle text-center">
          {groupedArray.length} líneas de transporte pasan cerca. Selecciona una para ver su trayecto
        </p>

        <div className="transit-layout">
          <TransitMapCanvas
            activeGroup={activeGroup}
            activeVariant={activeVariant}
            groupedArray={groupedArray}
            rutasCercanas={rutasCercanas}
            onGroupClick={handleGroupClick}
            onVariantClick={handleVariantClick}
            onClearSelection={handleClearSelection}
          />

          <TransitRoutesPanel
            groupedArray={groupedArray}
            activeGroup={activeGroup}
            activeVariant={activeVariant}
            onGroupClick={handleGroupClick}
            onSingleRouteClick={handleSingleRouteClick}
            onVariantClick={handleVariantClick}
          />
        </div>
      </div>
    </section>
  );
}
