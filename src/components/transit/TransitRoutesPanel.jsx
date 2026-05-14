function sentidoArrow(sentido) {
  if (sentido === 'ida') return 'v';
  if (sentido === 'vuelta') return '^';
  return '<>';
}

export default function TransitRoutesPanel({
  groupedArray,
  activeGroup,
  activeVariant,
  onGroupClick,
  onSingleRouteClick,
  onVariantClick,
}) {
  return (
    <div className="transit-panel">
      <div className="transit-panel-header">
        <div className="transit-panel-title">
          Rutas de Transporte <span className="transit-badge">{groupedArray.length}</span>
        </div>
      </div>

      <div className="transit-panel-body">
        <div className="transit-routes-list">
          {groupedArray.map(({ linea, rutas }) => {
            const isExpanded = activeGroup === linea;
            const primaryColor = rutas[0].color;
            const primaryTextColor = rutas[0].textColor;
            const isSingle = rutas.length === 1;

            if (isSingle) {
              const ruta = rutas[0];
              const isActive = activeGroup === linea;

              return (
                <div key={linea} className={`route-group-accordion ${isActive ? 'expanded' : ''}`}>
                  <button
                    className={`route-group-header ${isActive ? 'active' : ''}`}
                    onClick={() => onSingleRouteClick(linea, ruta)}
                    style={{ '--route-color': primaryColor, '--route-text': primaryTextColor }}
                  >
                    <span className="route-badge" style={{ background: primaryColor, color: primaryTextColor }}>
                      {linea}
                    </span>
                    <div className="route-info">
                      <div className="route-name">{ruta.nombre}</div>
                      <div className="route-desc">{ruta.descripcion} - a {Math.round(ruta.dist_km * 1000)}m</div>
                    </div>
                    <div className="accordion-icon" style={{ opacity: 0 }}>{'>'}</div>
                  </button>
                </div>
              );
            }

            return (
              <div key={linea} className={`route-group-accordion ${isExpanded ? 'expanded' : ''}`}>
                <button
                  className={`route-group-header ${isExpanded ? 'active' : ''}`}
                  onClick={() => onGroupClick(linea)}
                  style={{ '--route-color': primaryColor, '--route-text': primaryTextColor }}
                >
                  <span className="route-badge" style={{ background: primaryColor, color: primaryTextColor }}>
                    {linea}
                  </span>
                  <div className="route-info">
                    <div className="route-name">Linea {linea}</div>
                    <div className="route-desc">ida y vuelta - a {Math.round(rutas[0].dist_km * 1000)}m</div>
                  </div>
                  <div className="accordion-icon">{'>'}</div>
                </button>

                <div className="route-group-children-wrapper">
                  <div className="route-group-children">
                    {rutas.map(ruta => {
                      const isVariantActive = activeVariant === ruta.id;
                      const distLabel = `~${Math.round(ruta.dist_km * 1000)}m`;

                      return (
                        <button
                          key={ruta.id}
                          className={`route-variant-chip ${isVariantActive ? 'active' : ''}`}
                          onClick={event => onVariantClick(ruta, event)}
                          style={{ '--route-color': ruta.color, '--route-text': ruta.textColor }}
                        >
                          <div className="route-info">
                            <div className="route-name">{ruta.nombre}</div>
                            <div className="route-desc">{ruta.descripcion}</div>
                          </div>
                          <div className="route-meta-right">
                            <span className={`sentido-tag sentido-${ruta.sentido === 'ida' ? 'ida' : ruta.sentido === 'vuelta' ? 'vuelta' : 'ambos'}`}>
                              {sentidoArrow(ruta.sentido)}
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
      </div>
    </div>
  );
}
