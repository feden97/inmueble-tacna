import { useEffect, useMemo, useState } from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './InvestmentCalc.css';

const penFormatter = new Intl.NumberFormat('es-PE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function parseExchangeRate(input) {
  if (!input) return 0;

  const cleaned = input.replace(/\s/g, '');
  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  let normalized = cleaned;

  if (hasComma && !hasDot) {
    normalized = cleaned.replace(',', '.');
  } else if (hasComma && hasDot) {
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      normalized = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      normalized = cleaned.replace(/,/g, '');
    }
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPen(value) {
  return penFormatter.format(value);
}

export default function InvestmentCalc() {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [rentPrice, setRentPrice] = useState(250);
  const [commercialRent, setCommercialRent] = useState(1200);
  const [exchangeRateInput, setExchangeRateInput] = useState('3,50');
  const [exchangeSource, setExchangeSource] = useState('Fijo');
  const [rooms, setRooms] = useState(15);

  useEffect(() => {
    let cancelled = false;

    async function loadExchangeRate() {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('No se pudo consultar tipo de cambio');

        const data = await response.json();
        const penRate = Number(data?.rates?.PEN);
        if (!Number.isFinite(penRate) || penRate <= 0) throw new Error('Respuesta invalida');

        if (!cancelled) {
          setExchangeRateInput(penRate.toFixed(2).replace('.', ','));
          setExchangeSource(`Actualizado ${data?.time_last_update_utc || ''}`);
        }
      } catch {
        if (!cancelled) {
          setExchangeRateInput('3,50');
          setExchangeSource('Fijo');
        }
      }
    }

    loadExchangeRate();

    return () => {
      cancelled = true;
    };
  }, []);

  const exchangeRate = useMemo(() => parseExchangeRate(exchangeRateInput), [exchangeRateInput]);
  const maxRooms = property.habitaciones || 16;
  const propertyPricePen = property.precio * exchangeRate;
  const roomMonthlyIncome = rentPrice * rooms;
  const monthlyIncome = roomMonthlyIncome + commercialRent;
  const annualIncome = monthlyIncome * 12;

  const roi = annualIncome > 0 && propertyPricePen > 0
    ? ((annualIncome / propertyPricePen) * 100).toFixed(1)
    : null;

  const recoveryYears = annualIncome > 0 && propertyPricePen > 0
    ? (propertyPricePen / annualIncome).toFixed(1)
    : null;

  return (
    <section id="inversion" className="section-padding bg-blue" ref={ref}>
      <div className="container">
        <div className={`calc-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>
              Potencial de Inversion
            </h2>
            <p className="calc-intro">
              Calcula el retorno estimado en soles (PEN) para renta por habitaciones y local comercial.
            </p>
          </div>

          <div className="calc-grid">
            <div className="calc-controls card" style={{ color: 'var(--text-primary)' }}>
              <div className="control-group">
                <label>Alquiler por habitacion / mes (S/.)</label>
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
                <label>Alquiler local comercial / mes (S/.)</label>
                <input
                  id="commercial-rent"
                  className="calc-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={commercialRent}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setCommercialRent(val === '' ? 0 : Number(val));
                  }}
                />
              </div>

              <div className="control-group">
                <label>Tipo de cambio (USD a PEN)</label>
                <input
                  id="exchange-rate"
                  className="calc-input"
                  type="text"
                  inputMode="decimal"
                  value={exchangeRateInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*([.,]\d{0,2})?$/.test(val)) {
                      setExchangeRateInput(val);
                    }
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
                    max={maxRooms}
                    value={rooms}
                    onChange={e => setRooms(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <span className="slider-label">{maxRooms}</span>
                  <div className="slider-value-badge">{rooms}</div>
                </div>
              </div>
            </div>

            <div className="calc-results">
              <div className="result-card">
                <div className="result-label">Precio del Inmueble (PEN)</div>
                <div className="result-value text-gold">S/. {formatPen(propertyPricePen)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Ingreso Mensual Habitaciones</div>
                <div className="result-value text-gold">S/. {formatPen(roomMonthlyIncome)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Ingreso Mensual Local</div>
                <div className="result-value text-gold">S/. {formatPen(commercialRent)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Ingreso Mensual Bruto Total</div>
                <div className="result-value text-gold">S/. {formatPen(monthlyIncome)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Ingreso Anual Bruto</div>
                <div className="result-value text-gold">S/. {formatPen(annualIncome)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">ROI Anual Estimado</div>
                <div className="result-value text-gold">{roi === null ? '-' : `${roi}%`}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Recupero Estimado</div>
                <div className="result-value text-gold">{recoveryYears === null ? '-' : `${recoveryYears} anios`}</div>
              </div>
            </div>
          </div>

          <p className="calc-note">
            * Cálculo referencial.
          </p>
        </div>
      </div>
    </section>
  );
}
