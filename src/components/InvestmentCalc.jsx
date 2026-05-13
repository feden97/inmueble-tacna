import React, { useState } from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './InvestmentCalc.css';

export default function InvestmentCalc() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [rentPrice, setRentPrice] = useState(400);
  const [rooms, setRooms] = useState(12);

  const monthlyIncome = rentPrice * rooms;
  const annualIncome = monthlyIncome * 12;
  const roi = ((annualIncome / property.precio) * 100).toFixed(1);
  const recoveryYears = (property.precio / annualIncome).toFixed(1);

  return (
    <section id="inversion" className="section-padding bg-blue" ref={ref}>
      <div className="container">
        <div className={`calc-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>

          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>
              Potencial de Inversión
            </h2>
            <p className="calc-intro">
              Calculá el retorno estimado si destinás el inmueble a renta por habitaciones o como hostal.
            </p>
          </div>

          <div className="calc-grid">

            {/* Controls */}
            <div className="calc-controls card" style={{ color: 'var(--text-primary)' }}>
              <div className="control-group">
                <label>Alquiler por habitación / mes (S/.)</label>
                <input
                  id="rent-price"
                  className="calc-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={rentPrice}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setRentPrice(val === '' ? 0 : Number(val));
                  }}
                />
              </div>

              <div className="control-group">
                <label>Habitaciones alquiladas</label>
                <div className="slider-row">
                  <span className="slider-label">1</span>
                  <input
                    id="rooms-slider"
                    type="range"
                    min="1"
                    max="16"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <span className="slider-label">16</span>
                  <div className="slider-value-badge">{rooms}</div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="calc-results">
              <div className="result-card">
                <div className="result-label">Ingreso Mensual Bruto</div>
                <div className="result-value text-gold">
                  S/. {monthlyIncome.toLocaleString('es-PE')}
                </div>
              </div>
              <div className="result-card">
                <div className="result-label">Ingreso Anual Bruto</div>
                <div className="result-value text-gold">
                  S/. {annualIncome.toLocaleString('es-PE')}
                </div>
              </div>
              <div className="result-card">
                <div className="result-label">ROI Anual Estimado</div>
                <div className="result-value text-gold">{roi}%</div>
              </div>
              <div className="result-card">
                <div className="result-label">Recupero Estimado</div>
                <div className="result-value text-gold">{recoveryYears} años</div>
              </div>
            </div>

          </div>

          <p className="calc-note">
            * Cálculo referencial. No incluye gastos operativos, impuestos, tipo de cambio ni vacancia.
          </p>
        </div>
      </div>
    </section>
  );
}
