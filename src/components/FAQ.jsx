import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    pregunta: '¿Se puede visitar el inmueble?',
    respuesta: 'Si. Coordinamos visitas de lunes a sabado. Escribenos por WhatsApp para agendar una cita.',
  },
  {
    pregunta: '¿Acepta financiamiento bancario?',
    respuesta: 'Si. El inmueble esta inscrito en SUNARP con documentacion completa, lo que facilita cualquier tramite de credito hipotecario.',
  },
  {
    pregunta: '¿Los pisos pueden funcionar independientes?',
    respuesta: 'Si. Cada piso tiene banios propios y acceso independiente. Ideal para alquilar por pisos o tener negocios separados.',
  },
  {
    pregunta: '¿Tiene estacionamiento?',
    respuesta: 'El inmueble no cuenta con cochera propia, pero la zona tiene amplia disponibilidad de estacionamiento en la calle.',
  },
  {
    pregunta: '¿Cuanto se paga de impuesto predial y arbitrios?',
    respuesta: 'Los arbitrios e impuesto predial del distrito son accesibles. Consultanos para montos exactos actualizados.',
  },
  {
    pregunta: '¿El precio es negociable?',
    respuesta: 'Sí, el precio es negociable. El trato es directo con el propietario, sin intermediarios.',
  },
];

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} style={{ '--faq-i': index }}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{faq.pregunta}</span>
        <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{faq.respuesta}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section-padding bg-light" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">Preguntas Frecuentes</h2>

        <div className={`faq-list ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
