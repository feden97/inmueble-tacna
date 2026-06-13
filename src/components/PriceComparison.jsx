import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TrendingUp } from 'lucide-react';
import './PriceComparison.css';

const zonaPromedio = { min: 800, max: 1200, label: 'Promedio zona Gregorio Albarracin' };

export default function PriceComparison() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  const precioM2 = property.precioPorM2;
  const ahorro = zonaPromedio.min - precioM2;
  const ahorroPercent = Math.round((ahorro / zonaPromedio.min) * 100);

  return (
    <section className="section-padding" ref={ref}>
      <div className="container">
        <div className={`price-compare-card ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="price-compare-header">
            <TrendingUp size={24} className="text-gold" />
            <h3>Precio por m² construido</h3>
          </div>

          <div className="price-compare-bars">
            <div className="price-bar-row">
              <div className="price-bar-label">Este inmueble</div>
              <div className="price-bar-track">
                <div
                  className="price-bar-fill this-property"
                  style={{ width: `${(precioM2 / zonaPromedio.max) * 100}%` }}
                >
                  <span className="price-bar-value">${precioM2}/m²</span>
                </div>
              </div>
            </div>

            <div className="price-bar-row">
              <div className="price-bar-label">{zonaPromedio.label}</div>
              <div className="price-bar-track">
                <div
                  className="price-bar-fill zone-avg"
                  style={{ width: '100%' }}
                >
                  <span className="price-bar-value">${zonaPromedio.min} - ${zonaPromedio.max}/m²</span>
                </div>
              </div>
            </div>
          </div>

          {ahorro > 0 && (
            <div className="price-savings">
              <span className="savings-badge">~{ahorroPercent}% por debajo del promedio</span>
              <span className="savings-detail">Ahorro estimado de ~${ahorro} USD por m² construido</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
