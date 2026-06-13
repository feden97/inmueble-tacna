import { useEffect, useMemo, useState } from 'react';
import { property } from '../data';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { 
  Coins, 
  Home, 
  Building2, 
  Percent, 
  Calendar, 
  Info 
} from 'lucide-react';
import './InvestmentCalc.css';

const penFormatter = new Intl.NumberFormat('es-PE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function parseExchangeRate(input) {
  if (!input) return 0;

  const cleaned = input.toString().replace(/\s/g, '');
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
  const [commercialRent, setCommercialRent] = useState(500);
  const [exchangeRateInput, setExchangeRateInput] = useState('3.75');
  const [exchangeSource, setExchangeSource] = useState('Fijo');
  const [rooms, setRooms] = useState(15);
  const [customRentMode, setCustomRentMode] = useState(false);
  const [customCommercialMode, setCustomCommercialMode] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadExchangeRate() {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('No se pudo consultar tipo de cambio');

        const data = await response.json();
        const penRate = Number(data?.rates?.PEN);
        if (!Number.isFinite(penRate) || penRate <= 0) throw new Error('Respuesta inválida');

        if (!cancelled) {
          setExchangeRateInput(penRate.toFixed(2).replace('.', ','));
          setExchangeSource(`Online ${data?.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString('es-PE') : ''}`);
        }
      } catch {
        if (!cancelled) {
          setExchangeRateInput('3.75');
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

  const roomsPct = monthlyIncome > 0 ? (roomMonthlyIncome / monthlyIncome) * 100 : 0;
  const localPct = monthlyIncome > 0 ? (commercialRent / monthlyIncome) * 100 : 0;

  const rentPresets = [200, 250, 300, 350];
  const commercialPresets = [400, 500, 750, 1000];

  return (
    <section id="inversion" className="section-padding bg-blue" ref={ref}>
      <div className="container">
        <div className={`calc-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>
              Simulador de Rentabilidad
            </h2>
            <p className="calc-intro">
              Explora la proyección de ingresos mensuales y anuales estimando la ocupación de habitaciones y la renta del local comercial.
            </p>
          </div>

          <div className="calc-grid">
            {/* Control Panel */}
            <div className="calc-controls card">
              {/* Rooms Section */}
              <div className="control-group">
                <div className="flex justify-between items-center">
                  <label className="group-title">
                    <Home size={18} className="icon-gold" /> Habitaciones Alquiladas
                  </label>
                  <span className="badge-value-gold">{rooms} / {maxRooms}</span>
                </div>
                
                <div className="slider-row">
                  <input
                    id="rooms-slider"
                    type="range"
                    min="1"
                    max={maxRooms}
                    value={rooms}
                    onChange={e => setRooms(Number(e.target.value))}
                    className="calc-slider"
                  />
                </div>

                {/* Rooms Grid Visualizer */}
                <div className="visual-grid-wrapper">
                  <span className="grid-helper-text">Visualización de las 16 habitaciones de la propiedad (toca una para cambiar):</span>
                  <div className="room-grid">
                    {Array.from({ length: maxRooms }, (_, i) => {
                      const roomNum = i + 1;
                      const isActive = roomNum <= rooms;
                      return (
                        <button
                          key={roomNum}
                          onClick={() => setRooms(roomNum)}
                          className={`room-node ${isActive ? 'active' : ''}`}
                          aria-label={`Seleccionar ${roomNum} habitaciones`}
                        >
                          {roomNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Price per Room Section */}
              <div className="control-group">
                <label className="group-title">
                  <Coins size={18} className="icon-gold" /> Alquiler Promedio por Habitación
                </label>
                <div className="pill-group">
                  {rentPresets.map(p => (
                    <button
                      key={p}
                      onClick={() => { setRentPrice(p); setCustomRentMode(false); }}
                      className={`pill-btn ${rentPrice === p && !customRentMode ? 'active' : ''}`}
                    >
                      S/. {p} {p === 250 ? '(Ref.)' : ''}
                    </button>
                  ))}
                  {customRentMode ? (
                    <div className="custom-input-wrapper">
                      <span className="custom-input-prefix">S/.</span>
                      <input
                        type="number"
                        className="custom-pill-input"
                        value={rentPrice}
                        onChange={e => {
                          const v = Number(e.target.value);
                          if (v >= 0) setRentPrice(v);
                        }}
                        onBlur={() => { if (rentPrice > 0) setCustomRentMode(false); }}
                        onKeyDown={e => { if (e.key === 'Enter') setCustomRentMode(false); }}
                        autoFocus
                        min="50"
                        max="2000"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setCustomRentMode(true)}
                      className={`pill-btn ${!rentPresets.includes(rentPrice) ? 'active' : ''}`}
                    >
                      {!rentPresets.includes(rentPrice) ? `S/. ${rentPrice}` : 'Otro'}
                    </button>
                  )}
                </div>
              </div>

              {/* Local Comercial Rent Section */}
              <div className="control-group">
                <div className="flex justify-between items-center">
                  <label className="group-title">
                    <Building2 size={18} className="icon-blue" /> Renta Local Comercial
                  </label>
                  <span className="badge-value-blue">S/. {commercialRent}</span>
                </div>
                
                <div className="pill-group">
                  {commercialPresets.map(p => (
                    <button
                      key={p}
                      onClick={() => { setCommercialRent(p); setCustomCommercialMode(false); }}
                      className={`pill-btn ${commercialRent === p && !customCommercialMode ? 'active' : ''}`}
                    >
                      S/. {p} {p === 500 ? '(Ref.)' : ''}
                    </button>
                  ))}
                  {customCommercialMode ? (
                    <div className="custom-input-wrapper">
                      <span className="custom-input-prefix">S/.</span>
                      <input
                        type="number"
                        className="custom-pill-input"
                        value={commercialRent}
                        onChange={e => {
                          const v = Number(e.target.value);
                          if (v >= 0) setCommercialRent(v);
                        }}
                        onBlur={() => { if (commercialRent > 0) setCustomCommercialMode(false); }}
                        onKeyDown={e => { if (e.key === 'Enter') setCustomCommercialMode(false); }}
                        autoFocus
                        min="100"
                        max="5000"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setCustomCommercialMode(true)}
                      className={`pill-btn ${!commercialPresets.includes(commercialRent) ? 'active' : ''}`}
                    >
                      {!commercialPresets.includes(commercialRent) ? `S/. ${commercialRent}` : 'Otro'}
                    </button>
                  )}
                </div>

                <div className="slider-container" style={{ marginTop: '0.75rem' }}>
                  <input
                    type="range"
                    min="300"
                    max="2000"
                    step="50"
                    value={commercialRent}
                    onChange={e => setCommercialRent(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <div className="slider-labels">
                    <span>S/. 300</span>
                    <span className="current-val-label">S/. {commercialRent}</span>
                    <span>S/. 2,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="calc-results-dashboard">
              {/* Monthly KPI card */}
              <div className="dashboard-kpi-card monthly">
                <div className="kpi-header">
                  <span className="kpi-tag"><span className="pulse-dot"></span> SIMULACIÓN</span>
                  <span className="kpi-title">Ingreso Mensual Estimado</span>
                </div>
                <div className="kpi-value text-gold">S/. {formatPen(monthlyIncome)}</div>
                <div className="kpi-footer">Ingresos brutos proyectados por mes</div>
              </div>

              {/* Annual KPI card */}
              <div className="dashboard-kpi-card annual">
                <div className="kpi-header">
                  <span className="kpi-title">Ingreso Anual Estimado</span>
                </div>
                <div className="kpi-value text-gold">S/. {formatPen(annualIncome)}</div>
                <div className="kpi-footer">Proyección bruta a 12 meses con ocupación fija</div>
              </div>

              {/* Stacked Chart Card - hidden from visualization */}
              {/*
              <div className="dashboard-card chart-card">
                <span className="card-label" style={{ marginBottom: '0.5rem' }}>Distribución de Renta</span>
                {monthlyIncome > 0 ? (
                  <>
                    <div className="stacked-bar-chart">
                      <div 
                        className="bar-segment rooms-segment" 
                        style={{ width: `${roomsPct}%` }}
                      >
                        {roomsPct > 12 && `${roomsPct.toFixed(0)}%`}
                      </div>
                      <div 
                        className="bar-segment local-segment" 
                        style={{ width: `${localPct}%` }}
                      >
                        {localPct > 12 && `${localPct.toFixed(0)}%`}
                      </div>
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color rooms-color"></span>
                        <span className="legend-text">Habitaciones: <strong>S/. {formatPen(roomMonthlyIncome)}</strong></span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color local-color"></span>
                        <span className="legend-text">Local: <strong>S/. {formatPen(commercialRent)}</strong></span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="chart-placeholder">Suma ingresos para ver la distribución</div>
                )}
              </div>
              */}

              {/* ROI & Recovery Metrics - hidden from visualization */}
              {/*
              <div className="roi-grid">
                <div className="roi-card">
                  <div className="roi-label">
                    <Percent size={14} className="metric-icon text-gold" /> ROI Bruto Ref.
                  </div>
                  <div className="roi-val">{roi === null ? '-' : `${roi}%`}</div>
                  <div className="roi-desc">Retorno anual del capital</div>
                </div>
                <div className="roi-card">
                  <div className="roi-label">
                    <Calendar size={14} className="metric-icon text-gold" /> Recupero Ref.
                  </div>
                  <div className="roi-val">{recoveryYears === null ? '-' : `${recoveryYears} años`}</div>
                  <div className="roi-desc font-normal">Retorno estimado total</div>
                </div>
              </div>
              */}

              {/* Exchange Rate Tool - hidden from visualization */}
              {/*
              <div className="exchange-settings-bar">
                <span className="exchange-settings-label">
                  <Info size={14} /> Ref. Tipo de Cambio: S/.
                  <input
                    type="text"
                    value={exchangeRateInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*([.,]\d{0,2})?$/.test(val)) {
                        setExchangeRateInput(val);
                      }
                    }}
                    className="exchange-rate-inline-input"
                  />
                </span>
                <span className="exchange-settings-source">
                  {exchangeSource} • Inmueble: S/. {formatPen(propertyPricePen)}
                </span>
              </div>
              */}
            </div>
          </div>

          <p className="calc-note">
            Valores referenciales.
          </p>
        </div>
      </div>
    </section>
  );
}
