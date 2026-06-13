import { useState } from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import './Overview.css';

export default function Overview() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [expanded, setExpanded] = useState(false);

  const paragraphs = property.descripcionCompleta.split('\n\n');

  return (
    <section id="descripcion" className="section-padding" ref={ref}>
      <div className="container">
        <div className={`overview-grid ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="overview-text">
            <h2 className="section-title">Descripción</h2>
            <div className={`overview-description ${expanded ? 'expanded' : 'collapsed'}`}>
              {expanded
                ? paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                : <p>{paragraphs[0]}</p>
              }
            </div>
            {paragraphs.length > 1 && (
              <button
                className="read-more-btn"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Leer menos' : 'Leer más'}
                <ChevronDown size={16} className={`read-more-chevron ${expanded ? 'rotated' : ''}`} />
              </button>
            )}
          </div>

          <div className="overview-sidebar">
            <div className="card stats-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.areaConstruidaM2} m²</div>
                  <div className="stat-label">Área construida</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.areaTerrenoM2} m²</div>
                  <div className="stat-label">Área de terreno</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.habitaciones}</div>
                  <div className="stat-label">Habitaciones</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.banios}</div>
                  <div className="stat-label">Baños completos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">Sí</div>
                  <div className="stat-label">Local comercial</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.pisos}</div>
                  <div className="stat-label">Niveles</div>
                </div>
              </div>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <CheckCircle2 size={18} className="text-gold" /> Inscrito en SUNARP
              </div>
              <div className="trust-badge">
                <CheckCircle2 size={18} className="text-gold" /> Único propietario
              </div>
              <div className="trust-badge">
                <CheckCircle2 size={18} className="text-gold" /> Dueño directo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
