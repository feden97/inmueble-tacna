export const property = {
  titulo: 'Asoc. José Carlos Mariátegui Mz 37 Lote 24',
  tagline: 'Uso mixto - 384 m² - 3 pisos + dep. con terraza - vista desde Av. Los Poetas',
  descripcionCorta: 'Inmueble comercial y residencial con alto potencial de renta',
  precio: 220000,
  precioTexto: 'USD 220,000',
  precioNota: 'Negociable - Trato directo con el propietario, sin intermediarios',
  precioPorM2: 573,
  distrito: 'Coronel Gregorio Albarracín Lanchipa',
  ciudad: 'Tacna, Perú',
  coordenadas: { lat: -18.037764, lng: -70.256437 },
  areaTerrenoM2: 120.5,
  areaConstruidaM2: 384.0,
  pisos: '3 pisos + terraza',
  habitaciones: 16,
  banios: 8,
  localComercial: true,
  construccion: 'Antisísmica con planos de arquitectura e ingeniería',
  agua: 'Servicio 24 h - 2 tanques de 1,000 L + reservorio subterráneo de 2,000 L',
  estado: 'Inscrito en SUNARP - único propietario - papeles al día',
  contactoWhatsapp: '+51991463029',
  contactoNombre: 'Propietario directo',
  descripcionCompleta: `Propiedad de uso mixto en Gregorio Albarracín, Tacna: 384 m² construidos sobre 120.5 m² de terreno. El inmueble destaca por su excelente visibilidad y exposición visual directa desde la transitada Av. Los Poetas (a pesar de estar ubicado físicamente sobre la calle lateral Carlos Armando Laura), lo que le otorga a su fachada de 4 niveles un gran impacto visual.\n\nPor su ubicación a pasos de la Av. La Cultura, a pasos del Polideportivo Los Ediles y con vista directa desde Av. Los Poetas, es una alternativa muy atractiva para renta por habitaciones, hostal, consultorios, oficinas, academia o negocio familiar.\n\nLa propiedad está distribuida en 3 niveles completos más un departamento independiente con terraza amplia en el cuarto nivel, y azotea. Cuenta con un local comercial en el primer piso que se beneficia directamente de esta alta visibilidad. Tiene además 16 habitaciones, 8 baños completos, patio/lavandería y azotea. La estructura es antisísmica y cuenta con planos de arquitectura e ingeniería por nivel.\n\nServicio de agua 24 horas mediante dos tanques elevados de 1,000 litros y reservorio subterráneo de 2,000 litros. Documentación en regla: inscrito en SUNARP, único propietario, listo para escritura pública y trato directo con el propietario, sin intermediarios.`,
};

export const pisos = [
  {
    nombre: 'Primer Piso',
    area: 106.8,
    descripcion: 'Local comercial con excelente exposición visual directa desde la transitada Av. Los Poetas, altamente adaptable para farmacia, restaurante, gimnasio, consultorios o negocio familiar.',
    ambientes: ['Local comercial con visibilidad directa desde Av. Los Poetas', '1 habitación', '1 baño completo', 'Patio interior / lavandería', 'Reservorio subterráneo de 2,000 L'],
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
    nombre: 'Terraza con departamento',
    area: 61,
    descripcion: 'Departamento independiente con terraza amplia y vistas a la zona.',
    ambientes: ['3 habitaciones', '1 baño completo', 'Terraza amplia', 'Zona de lavandería'],
  },
  {
    nombre: 'Azotea',
    area: null,
    descripcion: 'Zona técnica con abastecimiento de agua y vista abierta hacia el entorno.',
    ambientes: ['2 tanques elevados de 1,000 L c/u', 'Mirador con vistas', 'Agua 24 horas'],
  },
];

export const caracteristicas = [
  'Estructura antisísmica con planos de arquitectura e ingeniería',
  'Agua las 24 horas - 2 tanques + reservorio subterráneo',
  'Excelente visibilidad e impacto visual del inmueble desde Av. Los Poetas',
  'Local comercial que aprovecha el alto flujo de la avenida',
  'Azotea con área técnica y vista abierta',
  'A pasos de Av. La Cultura',
  '2 cuadras del Colegio Jorge Chávez',
  'A pasos del Polideportivo Los Ediles',
  'Zona con movimiento residencial, comercial y de transporte',
];

export const usosIdeales = [
  { uso: 'Hotel / Hostal', icono: 'Hotel', descripcion: '16 habitaciones y distribución en 3 niveles más departamento para operación de hospedaje.' },
  { uso: 'Clínica / Consultorios', icono: 'Stethoscope', descripcion: 'Ambientes independientes para atención profesional, con local frontal para recepción.' },
  { uso: 'Oficinas', icono: 'Building2', descripcion: 'Cada nivel puede organizarse como área de trabajo, archivo, atención o administración.' },
  { uso: 'Academia / Instituto', icono: 'GraduationCap', descripcion: 'Ambientes superiores para aulas y local comercial para informes o recepción.' },
  { uso: 'Renta por habitaciones', icono: 'Key', descripcion: 'Potencial de ingresos por alquiler individual, con servicios y ubicación conveniente.' },
  { uso: 'Restaurante / Negocio', icono: 'UtensilsCrossed', descripcion: 'Local comercial con excelente visibilidad directa desde Av. Los Poetas para negocio propio o alquiler.' },
];

export const puntosReferencia = [
  { nombre: 'Av. La Cultura', distancia: 'A pasos', lat: -18.0365, lng: -70.2548 },
  { nombre: 'Colegio Jorge Chávez', distancia: '2 cuadras', lat: -18.0355, lng: -70.2562 },
  { nombre: 'Polideportivo Los Ediles', distancia: 'A pasos', lat: -18.0372, lng: -70.257 },
  { nombre: 'Plaza Los Ediles', distancia: '1 cuadra', lat: -18.036, lng: -70.2575 },
];

export const galleryMedia = [
  {
    type: 'image',
    url: '/images/inmueble-1.jpg',
    alt: 'Fachada principal del inmueble de uso mixto en Tacna'
  },
  {
    type: 'image',
    url: '/images/inmueble-2.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 2'
  },
  {
    type: 'image',
    url: '/images/inmueble-3.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 3'
  },
  {
    type: 'image',
    url: '/images/inmueble-4.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 4'
  },
  {
    type: 'image',
    url: '/images/inmueble-5.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 5'
  },
  {
    type: 'image',
    url: '/images/inmueble-6.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 6'
  },
  {
    type: 'image',
    url: '/images/inmueble-7.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 7'
  },
  {
    type: 'image',
    url: '/images/inmueble-8.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 8'
  },
  {
    type: 'image',
    url: '/images/inmueble-9.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 9'
  },
  {
    type: 'image',
    url: '/images/inmueble-10.jpg',
    alt: 'Vista de la calle Carlos Armando Laura y entorno de la propiedad'
  },
  {
    type: 'image',
    url: '/images/inmueble-11.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 11'
  },
  {
    type: 'image',
    url: '/images/inmueble-12.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 12'
  },
  {
    type: 'image',
    url: '/images/inmueble-13.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 13'
  },
  {
    type: 'image',
    url: '/images/inmueble-14.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 14'
  },
  {
    type: 'image',
    url: '/images/inmueble-15.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 15'
  },
  {
    type: 'image',
    url: '/images/inmueble-16.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 16'
  },
  {
    type: 'image',
    url: '/images/inmueble-17.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 17'
  },
  {
    type: 'image',
    url: '/images/inmueble-18.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 18'
  },
  {
    type: 'image',
    url: '/images/inmueble-19.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 19'
  },
  {
    type: 'image',
    url: '/images/inmueble-20.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 20'
  },
  {
    type: 'image',
    url: '/images/inmueble-21.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 21'
  },
  {
    type: 'image',
    url: '/images/inmueble-22.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 22'
  },
  {
    type: 'image',
    url: '/images/inmueble-23.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 23'
  },
  {
    type: 'image',
    url: '/images/inmueble-24.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 24'
  },
  {
    type: 'image',
    url: '/images/inmueble-25.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 25'
  },
  {
    type: 'image',
    url: '/images/inmueble-26.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 26'
  },
  {
    type: 'image',
    url: '/images/inmueble-27.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 27'
  },
  {
    type: 'image',
    url: '/images/inmueble-28.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 28'
  },
  {
    type: 'image',
    url: '/images/inmueble-29.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 29'
  },
  {
    type: 'image',
    url: '/images/inmueble-30.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 30'
  },
  {
    type: 'image',
    url: '/images/inmueble-31.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 31'
  },
  {
    type: 'image',
    url: '/images/inmueble-32.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 32'
  },
  {
    type: 'image',
    url: '/images/inmueble-33.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 33'
  },
  {
    type: 'image',
    url: '/images/inmueble-34.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 34'
  },
  {
    type: 'image',
    url: '/images/inmueble-35.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 35'
  },
  {
    type: 'image',
    url: '/images/inmueble-36.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 36'
  },
  {
    type: 'image',
    url: '/images/inmueble-37.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 37'
  },
  {
    type: 'image',
    url: '/images/inmueble-38.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 38'
  },
  {
    type: 'image',
    url: '/images/inmueble-39.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 39'
  },
  {
    type: 'image',
    url: '/images/inmueble-40.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 40'
  },
  {
    type: 'image',
    url: '/images/inmueble-41.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 41'
  },
  {
    type: 'image',
    url: '/images/inmueble-42.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 42'
  },
  {
    type: 'image',
    url: '/images/inmueble-43.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 43'
  },
  {
    type: 'image',
    url: '/images/inmueble-44.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 44'
  },
  {
    type: 'image',
    url: '/images/inmueble-45.jpg',
    alt: 'Vista interior o exterior de la propiedad en Tacna - Foto 45'
  }
];

