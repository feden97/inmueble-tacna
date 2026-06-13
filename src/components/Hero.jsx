import { ChevronDown } from 'lucide-react';
import { property, galleryMedia } from '../data';
import './Hero.css';

const stats = [
  { value: `${property.areaConstruidaM2} m²`, label: 'Construidos' },
  { value: property.habitaciones, label: 'Habitaciones' },
  { value: property.banios, label: 'Baños' },
  { value: 'Sí', label: 'Local comercial' },
  { value: property.pisos, label: 'Niveles' },
];

export default function Hero() {
  const scrollToDesc = () => {
    const el = document.getElementById('descripcion');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  };

  // Buscar la primera imagen real disponible
  const heroImage = galleryMedia.find(item => item.type === 'image')?.url || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80';

  return (
    <section 
      id="hero" 
      className="hero-container"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
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
