import React from 'react';
import { ChevronDown, MessageCircle, FileText } from 'lucide-react';
import { property } from '../data';
import './Hero.css';

const stats = [
  { value: `${property.areaConstruidaM2} m²`, label: 'Construidos' },
  { value: property.habitaciones, label: 'Habitaciones' },
  { value: property.banios, label: 'Baños' },
  { value: `${property.localComercialM2} m²`, label: 'Local comercial' },
  { value: property.pisos, label: 'Pisos' },
];

export default function Hero() {
  const scrollToDesc = () => {
    const el = document.getElementById('descripcion');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
  };

  const phoneNumber = property.contactoWhatsapp.replace(/\+/g, '');
  const whatsappText = encodeURIComponent(
    `Hola, me interesa el inmueble de ${property.distrito} de ${property.areaConstruidaM2}m² en ${property.precioTexto}`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappText}`;

  return (
    <section id="hero" className="hero-container">
      <div className="hero-overlay"></div>

      <div className="hero-content fade-in-up visible">
        <div className="hero-badge">TACNA · GREGORIO ALBARRACÍN</div>

        <h1 className="hero-title">{property.titulo}</h1>

        <div className="hero-price">{property.precioTexto}</div>

        <p className="hero-tagline">{property.tagline}</p>

        <p className="hero-note">{property.precioNota}</p>

        <div className="hero-actions">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </a>
          <button onClick={scrollToDesc} className="btn btn-outline">
            <FileText size={20} />
            Ver detalles
          </button>
        </div>
      </div>

      {/* Stats bar */}
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

      <div className="hero-scroll-indicator animate-bounce">
        <ChevronDown size={28} color="white" />
      </div>
    </section>
  );
}
