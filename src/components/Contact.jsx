import React, { useState } from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    
    // Open WhatsApp
    const text = `Hola, soy ${formData.nombre}. Mi teléfono es ${formData.telefono}. ${formData.mensaje ? `Mensaje: ${formData.mensaje}` : 'Me interesa el inmueble de Gregorio Albarracín.'}`;
    const url = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    // Reset form
    setFormData({ nombre: '', telefono: '', email: '', mensaje: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const whatsappDirecto = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">Contacto</h2>

        <div className={`contact-grid ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="contact-form-container card">
            <h3 className="form-title">Enviar Consulta</h3>
            {success && <div className="form-success">¡Gracias! Te estamos redirigiendo a WhatsApp...</div>}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Nombre completo</label>
                <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email (opcional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mensaje (opcional)</label>
                <textarea rows="4" name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">Enviar consulta</button>
            </form>
          </div>

          <div className="contact-info-container">
            <div className="owner-card card">
              <div className="owner-header">
                <div className="owner-name">{property.contactoNombre}</div>
                <div className="badge badge-gold">Trato sin intermediarios</div>
              </div>
              
              <a href={whatsappDirecto} target="_blank" rel="noopener noreferrer" className="btn btn-success w-full mb-4">
                <MessageCircle size={24} /> WhatsApp Directo
              </a>
              
              <p className="contact-hours text-center">Respondemos consultas de lunes a sábado</p>
              
              <div className="contact-badges">
                <div className="c-badge"><CheckCircle2 size={16}/> Sin comisiones</div>
                <div className="c-badge"><CheckCircle2 size={16}/> Papeles en regla</div>
                <div className="c-badge"><CheckCircle2 size={16}/> Listo para escritura</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
