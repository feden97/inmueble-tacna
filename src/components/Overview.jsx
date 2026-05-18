import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CheckCircle2 } from 'lucide-react';
import './Overview.css';

export default function Overview() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <section id="descripcion" className="section-padding" ref={ref}>
      <div className="container">
        <div className={`overview-grid ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="overview-text">
            <h2 className="section-title">Descripción</h2>
            <div className="overview-description">
              {property.descripcionCompleta.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

          </div>

          <div className="overview-sidebar">
            <div className="card stats-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.areaConstruidaM2} m2</div>
                  <div className="stat-label">Área construida</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.areaTerrenoM2} m2</div>
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
                  <div className="stat-value text-gold">{property.localComercialM2} m2</div>
                  <div className="stat-label">Local comercial</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.pisos}</div>
                  <div className="stat-label">Niveles + azotea</div>
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
                <CheckCircle2 size={18} className="text-gold" /> Sin comisiones
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
