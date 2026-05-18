import { property } from '../data';
import WhatsAppIcon from './WhatsAppIcon';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer bg-dark">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">{property.titulo}</h3>
            <p className="footer-desc">
              {property.distrito}<br />
              {property.precioTexto}<br />
              Análisis de mercado {currentYear}
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Secciones</h3>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('descripcion')}>Descripción</button></li>
              <li><button onClick={() => scrollToSection('distribucion')}>Distribución</button></li>
              <li><button onClick={() => scrollToSection('galeria')}>Galería</button></li>
              <li><button onClick={() => scrollToSection('mapa')}>Mapa</button></li>
              <li><button onClick={() => scrollToSection('inversion')}>Inversión</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Contacto</h3>
            <p className="footer-desc">
              {property.contactoNombre}<br />
              Venta Directa
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>(c) {currentYear} - Inmueble {property.distrito} - {property.ciudad} - Venta directa</p>
        </div>
      </div>
    </footer>
  );
}
