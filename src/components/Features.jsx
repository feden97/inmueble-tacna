import React from 'react';
import { caracteristicas } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Check } from 'lucide-react';
import './Features.css';

export default function Features() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <section id="detalles" className="section-padding bg-light" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">Características</h2>
        
        <div className={`features-grid ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          {caracteristicas.map((item, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">
                <Check size={20} />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
