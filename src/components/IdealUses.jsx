import { usosIdeales } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Hotel, Stethoscope, Building2, GraduationCap, Key, UtensilsCrossed } from 'lucide-react';
import './IdealUses.css';

const iconMap = { Hotel, Stethoscope, Building2, GraduationCap, Key, UtensilsCrossed };

export default function IdealUses() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container">
        <h2 className="section-title text-center">¿Para qué es ideal?</h2>

        <div className={`uses-container ${isVisible ? 'visible' : ''}`}>
          {usosIdeales.map((uso, index) => {
            const IconComponent = iconMap[uso.icono];
            return (
              <div key={index} className="use-card card" style={{ '--i': index }}>
                <div className="use-icon">
                  {IconComponent ? <IconComponent size={32} /> : uso.icono}
                </div>
                <h3 className="use-title">{uso.uso}</h3>
                <p className="use-desc">{uso.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
