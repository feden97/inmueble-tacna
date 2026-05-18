export const property = {
  titulo: 'Asoc. José Carlos Mariátegui Mz 37 Lote 24',
  tagline: 'Uso mixto - 387 m2 construidos - local comercial - 4 niveles',
  descripcionCorta: 'Inmueble comercial y residencial con alto potencial de renta',
  precio: 230000,
  precioTexto: 'USD 230,000',
  precioNota: 'Negociable - Trato directo con propietario',
  precioPorM2: 594,
  distrito: 'Coronel Gregorio Albarracín Lanchipa',
  ciudad: 'Tacna, Perú',
  coordenadas: { lat: -18.037787, lng: -70.256499 },
  areaTerrenoM2: 120.5,
  areaConstruidaM2: 387.1,
  pisos: 4,
  habitaciones: 16,
  banios: 8,
  medioBanio: 1,
  localComercialM2: 75,
  construccion: 'Antisísmica con planos de arquitectura e ingeniería',
  agua: 'Servicio 24 h - 2 tanques de 1,000 L + reservorio subterráneo de 2,000 L',
  estado: 'Inscrito en SUNARP - único propietario - papeles al día',
  contactoWhatsapp: '+51991463029',
  contactoNombre: 'Propietario directo',
  descripcionCompleta: `Propiedad de uso mixto en Gregorio Albarracín, Tacna: 387.1 m2 construidos sobre 120.5 m2 de terreno, con local comercial de 75 m2 al frente y ambientes distribuidos en 4 niveles más azotea.\n\nPor su ubicación a pasos de la Av. La Cultura, cerca del Colegio Jorge Chávez y frente al Polideportivo Los Ediles, es una alternativa atractiva para renta por habitaciones, hostal, consultorios, oficinas, academia o negocio familiar.\n\nCuenta con 16 habitaciones, 8 baños completos, medio baño, terraza, patio/lavandería y azotea. La estructura es antisísmica y cuenta con planos de arquitectura e ingeniería por nivel.\n\nServicio de agua 24 horas mediante dos tanques elevados de 1,000 litros y reservorio subterráneo de 2,000 litros. Documentación en regla: inscrito en SUNARP, único propietario, listo para escritura pública y trato directo sin comisiones.`,
};

export const pisos = [
  {
    nombre: 'Primer Piso',
    area: 106.8,
    descripcion: 'Local comercial de 75 m2 con frente a la calle, adaptable para restaurante, farmacia, gimnasio, oficina de atención o negocio familiar. Incluye 1 habitación, 1 baño completo, medio baño, patio interior y lavandería.',
    ambientes: ['Local comercial 75 m2', '1 habitación', '1 baño completo', 'Medio baño', 'Patio interior / lavandería'],
  },
  {
    nombre: 'Segundo Piso',
    area: 108.1,
    descripcion: 'Distribución funcional para renta por habitaciones, consultorios u oficinas independientes.',
    ambientes: ['6 habitaciones simples', '2 baños completos'],
  },
  {
    nombre: 'Tercer Piso',
    area: 108.1,
    descripcion: 'Ambientes con ventilación e iluminación natural, adecuados para hospedaje, oficinas o alquiler individual.',
    ambientes: ['6 habitaciones simples', '3 baños completos'],
  },
  {
    nombre: 'Cuarto Piso / Terraza',
    area: 64.1,
    descripcion: 'Departamento independiente con terraza amplia y vistas a la zona.',
    ambientes: ['3 habitaciones', '1 baño completo', 'Terraza amplia', 'Zona de lavandería'],
  },
  {
    nombre: 'Azotea',
    area: null,
    descripcion: 'Zona técnica con abastecimiento de agua y vista abierta hacia el entorno.',
    ambientes: ['2 tanques elevados de 1,000 L c/u', 'Reservorio subterráneo de 2,000 L', 'Mirador con vistas', 'Agua 24 horas'],
  },
];

export const caracteristicas = [
  'Estructura antisísmica con planos de arquitectura e ingeniería',
  'Agua las 24 horas - 2 tanques + reservorio subterráneo',
  'Local comercial 75 m2 con frente a la calle',
  '16 habitaciones distribuidas en 4 niveles',
  'Terraza amplia en el cuarto nivel',
  'Azotea con área técnica y vista abierta',
  'Patio interior / lavandería',
  'Inscrito en SUNARP - único propietario',
  'Documentación completa al día',
  'Listo para escritura - sin cargas ni hipotecas',
  'Trato directo - sin comisiones inmobiliarias',
  'A pasos de Av. La Cultura',
  '2 cuadras del Colegio Jorge Chávez',
  'Frente al Polideportivo Los Ediles',
  'Zona con movimiento residencial, comercial y de transporte',
];

export const usosIdeales = [
  { uso: 'Hotel / Hostal', icono: 'Hotel', descripcion: '16 habitaciones y distribución por niveles para operación de hospedaje o renta temporal.' },
  { uso: 'Clínica / Consultorios', icono: 'Stethoscope', descripcion: 'Ambientes independientes para atención profesional, con local frontal para recepción.' },
  { uso: 'Oficinas', icono: 'Building2', descripcion: 'Cada nivel puede organizarse como área de trabajo, archivo, atención o administración.' },
  { uso: 'Academia / Instituto', icono: 'GraduationCap', descripcion: 'Ambientes superiores para aulas y local comercial para informes o recepción.' },
  { uso: 'Renta por habitaciones', icono: 'Key', descripcion: 'Potencial de ingresos por alquiler individual, con servicios y ubicación conveniente.' },
  { uso: 'Restaurante / Negocio', icono: 'UtensilsCrossed', descripcion: 'Local de 75 m2 con frente a la calle para negocio propio o alquiler comercial.' },
];

export const puntosReferencia = [
  { nombre: 'Av. La Cultura', distancia: 'A pasos', lat: -18.0365, lng: -70.2548 },
  { nombre: 'Colegio Jorge Chávez', distancia: '2 cuadras', lat: -18.0355, lng: -70.2562 },
  { nombre: 'Polideportivo Los Ediles', distancia: 'Frente', lat: -18.0372, lng: -70.257 },
  { nombre: 'Plaza Los Ediles', distancia: '1 cuadra', lat: -18.036, lng: -70.2575 },
];
