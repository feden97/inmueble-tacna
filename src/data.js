export const property = {
  titulo: 'Asoc. Jose Carlos Mariategui Mz 37 Lote 24',
  tagline: 'Oportunidad de inversion - 387 m2 - 4 pisos - Local comercial',
  descripcionCorta: 'Inmueble comercial y residencial en zona de alta valorizacion',
  precio: 230000,
  precioTexto: 'USD 230,000',
  precioNota: 'Negociable - Trato directo con propietario',
  precioPorM2: 594,
  distrito: 'Coronel Gregorio Albarracin Lanchipa',
  ciudad: 'Tacna, Peru',
  coordenadas: { lat: -18.037787, lng: -70.256499 },
  areaTerrenoM2: 120.5,
  areaConstruidaM2: 387.1,
  pisos: 4,
  habitaciones: 16,
  banios: 8,
  medioBanio: 1,
  localComercialM2: 75,
  construccion: 'Antisismica con planos de arquitectura e ingenieria',
  agua: 'Servicio 24hs - 2 tanques 1,000 L + reservorio subterraneo 2,000 L',
  estado: 'Inscrito en SUNARP - Unico propietario - Papeles al dia',
  contactoWhatsapp: '+51991463029',
  contactoNombre: 'Propietario directo',
  descripcionCompleta: `Inmueble de 4 pisos en venta en una de las zonas con mayor crecimiento de Tacna. Ubicado a pasos de la Av. La Cultura, del Colegio Jorge Chavez y del Polideportivo Los Ediles.\n\n387 m2 construidos sobre 120.5 m2 de terreno. Amplio local comercial de 75 m2 con visibilidad directa a la calle, 16 habitaciones, 8 banios completos y terraza en el cuarto piso.\n\nEstructura antisismica con planos de arquitectura e ingenieria por cada piso. Agua las 24 horas garantizada con dos tanques elevados de 1,000 litros y reservorio subterraneo de 2,000 litros.\n\nDocumentacion en regla. Inscrito en SUNARP. Unico propietario. Listo para escritura publica. Sin comisiones inmobiliarias.`,
};

export const pisos = [
  {
    nombre: 'Primer Piso',
    area: 106.8,
    descripcion: 'Local comercial de 75 m2 con visibilidad directa a la calle. Ideal para restaurante, gimnasio, farmacia u otro negocio. 1 habitacion + 1 banio completo + medio banio + patio interior y lavanderia.',
    ambientes: ['Local comercial 75 m2', '1 habitacion', '1 banio completo', 'Medio banio', 'Patio interior / lavanderia'],
  },
  {
    nombre: 'Segundo Piso',
    area: 108.1,
    descripcion: 'Distribucion ideal para hostal, consultorios u oficinas independientes.',
    ambientes: ['6 habitaciones simples', '2 banios completos'],
  },
  {
    nombre: 'Tercer Piso',
    area: 108.1,
    descripcion: 'Ventilacion e iluminacion natural en cada ambiente.',
    ambientes: ['6 habitaciones simples', '3 banios completos'],
  },
  {
    nombre: 'Cuarto Piso / Terraza',
    area: 64.1,
    descripcion: 'Departamento independiente con terraza amplia y vistas a la zona.',
    ambientes: ['3 habitaciones', '1 banio completo', 'Terraza amplia', 'Zona de lavanderia'],
  },
  {
    nombre: 'Azotea',
    area: null,
    descripcion: 'Zona tecnica con mirador panoramico.',
    ambientes: ['2 tanques elevados 1,000 L c/u', 'Reservorio subterraneo 2,000 L', 'Mirador con vistas', 'Agua 24 horas garantizada'],
  },
];

export const caracteristicas = [
  'Estructura antisismica con planos de arquitectura e ingenieria',
  'Agua las 24 horas - 2 tanques + reservorio subterraneo',
  'Local comercial 75 m2 con frente a la calle',
  '16 habitaciones distribuidas en 4 pisos',
  'Terraza amplia en 4to piso',
  'Azotea con mirador panoramico',
  'Patio interior / lavanderia',
  'Inscrito en SUNARP - unico propietario',
  'Documentacion completa al dia',
  'Listo para escritura - sin cargas ni hipotecas',
  'Trato directo - sin comisiones inmobiliarias',
  'A pasos de Av. La Cultura',
  '2 cuadras del Colegio Jorge Chavez',
  'Frente al Polideportivo Los Ediles',
  'Zona de alta demanda y valorizacion constante',
];

export const usosIdeales = [
  { uso: 'Hotel / Hostal', icono: 'Hotel', descripcion: '16 habitaciones listas. Alta demanda turistica en Tacna.' },
  { uso: 'Clinica / Consultorios', icono: 'Stethoscope', descripcion: 'Distribucion por pisos ideal para consultorios independientes.' },
  { uso: 'Oficinas', icono: 'Building2', descripcion: 'Cada piso puede funcionar como unidad independiente.' },
  { uso: 'Academia / Instituto', icono: 'GraduationCap', descripcion: 'Aulas en pisos superiores + recepcion en local comercial.' },
  { uso: 'Renta por habitaciones', icono: 'Key', descripcion: 'Flujo de ingresos inmediato. Zona con alta demanda.' },
  { uso: 'Restaurante / Negocio', icono: 'UtensilsCrossed', descripcion: 'Local 75 m2 con visibilidad directa a la calle.' },
];

export const puntosReferencia = [
  { nombre: 'Av. La Cultura', distancia: 'A pasos', lat: -18.0365, lng: -70.2548 },
  { nombre: 'Colegio Jorge Chavez', distancia: '2 cuadras', lat: -18.0355, lng: -70.2562 },
  { nombre: 'Polideportivo Los Ediles', distancia: 'Frente', lat: -18.0372, lng: -70.257 },
  { nombre: 'Plaza Los Ediles', distancia: '1 cuadra', lat: -18.036, lng: -70.2575 },
];
