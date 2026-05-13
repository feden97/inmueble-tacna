import React from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CheckCircle2, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Contact.css';

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  const phoneNumber = property.contactoWhatsapp.replace(/\+/g, '');
  const whatsappText = encodeURIComponent(
    `Hola, me interesa el inmueble de ${property.distrito} (${property.areaConstruidaM2}m², ${property.precioTexto})`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappText}`;
  const phoneLink = `tel:${property.contactoWhatsapp}`;

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">Contacto</h2>

        <div className={`contact-card-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="owner-card card">
            <div className="owner-header">
              <div className="owner-name">{property.contactoNombre}</div>
              <div className="badge badge-gold">Trato sin intermediarios</div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success contact-main-btn">
              <WhatsAppIcon size={24} /> Enviar mensaje por WhatsApp
            </a>

            <a href={phoneLink} className="btn btn-outline-dark contact-secondary-btn">
              <Phone size={20} /> Llamar directamente
            </a>

            <p className="contact-hours text-center">Respondemos consultas de lunes a sábado</p>

            <div className="contact-badges">
              <div className="c-badge"><CheckCircle2 size={16} /> Sin comisiones</div>
              <div className="c-badge"><CheckCircle2 size={16} /> Papeles en regla</div>
              <div className="c-badge"><CheckCircle2 size={16} /> Listo para escritura</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
