import { ChevronDown } from 'lucide-react';
import { property } from '../data';
import './Hero.css';

const stats = [
  { value: `${property.areaConstruidaM2} m2`, label: 'Construidos' },
  { value: property.habitaciones, label: 'Habitaciones' },
  { value: property.banios, label: 'Baños' },
  { value: `${property.localComercialM2} m2`, label: 'Local comercial' },
  { value: property.pisos, label: 'Niveles' },
];

export default function Hero() {
  const scrollToDesc = () => {
    const el = document.getElementById('descripcion');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-container">
      <div className="hero-overlay"></div>

      <div className="hero-content fade-in-up visible">
        <div className="hero-badge">TACNA - GREGORIO ALBARRACIN</div>

        <h1 className="hero-title">{property.titulo}</h1>

        <div className="hero-price">{property.precioTexto}</div>

        <p className="hero-tagline">{property.tagline}</p>

        <p className="hero-note">{property.precioNota}</p>
      </div>

      <div className="hero-stats-wrapper">
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat-item">
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="hero-scroll-indicator animate-bounce" onClick={scrollToDesc} aria-label="Desplazarse hacia abajo">
        <ChevronDown size={28} color="white" />
      </button>
    </section>
  );
}
