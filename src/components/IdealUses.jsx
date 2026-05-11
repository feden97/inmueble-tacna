import React from 'react';
import { usosIdeales } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './IdealUses.css';

export default function IdealUses() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">¿Para qué es ideal?</h2>
        
        <div className={`uses-container ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          {usosIdeales.map((uso, index) => (
            <div key={index} className="use-card card">
              <div className="use-icon">{uso.icono}</div>
              <h3 className="use-title">{uso.uso}</h3>
              <p className="use-desc">{uso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
