import React from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CheckCircle2, Lightbulb } from 'lucide-react';
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

            <div className="comparative-banner">
              <Lightbulb size={22} className="bulb-icon" />
              <p>
                El precio/m² de este inmueble (<strong>USD {property.precioPorM2}/m²</strong>) está en línea 
                con el mercado de {property.distrito} (rango: $518–$620/m²).
              </p>
            </div>
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
                  <div className="stat-value text-gold">{property.localComercialM2} m²</div>
                  <div className="stat-label">Local comercial</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value text-gold">{property.pisos}</div>
                  <div className="stat-label">Pisos + Azotea</div>
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
