import { pisos, property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Distribution.css';

function PisoCard({ piso, index }) {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className={`piso-card card ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
      <div className="piso-card-header">
        <div className="piso-badge">{index + 1}</div>
        <div className="piso-title-row">
          <h3 className="piso-nombre">{piso.nombre}</h3>
          <span className="piso-area">{piso.area ? `${piso.area} m2` : '-'}</span>
        </div>
      </div>

      <p className="piso-desc">{piso.descripcion}</p>

      <ul className="piso-ambientes">
        {piso.ambientes.map((amb, i) => (
          <li key={i}>
            <span className="piso-bullet">*</span>
            {amb}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Distribution() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <section id="distribucion" className="section-padding bg-light" ref={ref}>
      <div className="container">
        <h2 className={`section-title text-center ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          Distribución por niveles
        </h2>
        <p className={`dist-subtitle text-center ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          {property.areaConstruidaM2} m2 construidos en {property.pisos} niveles + azotea
        </p>

        <div className="pisos-list">
          {pisos.map((piso, index) => (
            <PisoCard key={piso.nombre} piso={piso} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
