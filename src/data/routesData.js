// Rutas de transporte público de Tacna que pasan cerca del inmueble
// Datos reales extraídos del KML oficial (rutastacna.com / Google My Maps)
// Filtradas matemáticamente por proximidad a -18.037787, -70.256499 (umbral: 800m)
// Análisis: 28 líneas totales → 13 segmentos dentro de 800m

// Coordenadas cargadas dinámicamente desde nearby_routes.json
// Importado en TransitMap.jsx

export const PROPERTY_COORDS = [-18.037787, -70.256499];

// Metadatos de estilo y descripción por nombre de ruta
// Los coords se cargan desde el JSON generado por export_routes.py
export const ROUTE_META = {
  'Ruta 203 N-S': {
    id: 'R203-NS',
    linea: '203',
    color: '#E91E63',
    textColor: '#fff',
    sentido: 'ida',
    descripcion: 'Centro → Asociación Los Ediles (pasa a 12m del inmueble)',
  },
  'Ruta 203 S-N A': {
    id: 'R203-SNA',
    linea: '203',
    color: '#F06292',
    textColor: '#fff',
    sentido: 'vuelta',
    descripcion: 'Asociación Los Ediles → Centro (variante A)',
  },
  'Ruta 01 N-S': {
    id: 'R01-NS',
    linea: '01',
    color: '#3949AB',
    textColor: '#fff',
    sentido: 'ida',
    descripcion: 'Centro → sur (pasa a 41m del inmueble)',
  },
  'Ruta 01 S-N': {
    id: 'R01-SN',
    linea: '01',
    color: '#7986CB',
    textColor: '#fff',
    sentido: 'vuelta',
    descripcion: 'Sur → Centro (regreso)',
  },
  'Ruta 300 N-S': {
    id: 'R300-NS',
    linea: '300',
    color: '#00897B',
    textColor: '#fff',
    sentido: 'ida',
    descripcion: 'Centro → sur (pasa a 49m del inmueble)',
  },
  'Ruta 300 S-N': {
    id: 'R300-SN',
    linea: '300',
    color: '#4DB6AC',
    textColor: '#000',
    sentido: 'vuelta',
    descripcion: 'Sur → Centro (regreso)',
  },
  'Ruta 14': {
    id: 'R14',
    linea: '14',
    color: '#FF6F00',
    textColor: '#fff',
    sentido: 'ida/vuelta',
    descripcion: 'Av. Los Poetas (pasa a 57m del inmueble)',
  },
  'Ruta 11 S-N': {
    id: 'R11-SN',
    linea: '11',
    color: '#8E24AA',
    textColor: '#fff',
    sentido: 'vuelta',
    descripcion: 'Sur → Centro (pasa a 304m)',
  },
  'Ruta 10B': {
    id: 'R10B',
    linea: '10B',
    color: '#D81B60',
    textColor: '#fff',
    sentido: 'ida/vuelta',
    descripcion: 'Variante 10B (pasa a 304m)',
  },
  'Ruta 13': {
    id: 'R13',
    linea: '13',
    color: '#F57F17',
    textColor: '#fff',
    sentido: 'ida/vuelta',
    descripcion: 'Pasa a 305m del inmueble',
  },
  'Ruta B': {
    id: 'RB',
    linea: 'B',
    color: '#5E35B1',
    textColor: '#fff',
    sentido: 'ida/vuelta',
    descripcion: 'Ruta B - conecta con centro (473m)',
  },
  'Ruta 15': {
    id: 'R15',
    linea: '15',
    color: '#2E7D32',
    textColor: '#fff',
    sentido: 'ida/vuelta',
    descripcion: 'Pasa a 503m del inmueble',
  },
  'Ruta 11 N-S': {
    id: 'R11-NS',
    linea: '11',
    color: '#AB47BC',
    textColor: '#fff',
    sentido: 'ida',
    descripcion: 'Centro → Sur (pasa a 583m)',
  },
};
