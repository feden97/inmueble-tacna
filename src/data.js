export const property = {
  titulo: "Asoc. Jose Carlos Mariategui Mz 37 Lote 24",
  tagline: "Oportunidad de Inversión · 387 m² · 4 Pisos · Local Comercial",
  descripcionCorta: "Inmueble comercial y residencial en zona de alta valorización",
  precio: 230000,
  precioTexto: "USD 230,000",
  precioNota: "Negociable · Trato directo con propietario",
  precioPorM2: 594,
  distrito: "Coronel Gregorio Albarracín Lanchipa",
  ciudad: "Tacna, Perú",
  coordenadas: { lat: -18.037787, lng: -70.256499 },
  areaTerrenoM2: 120.5,
  areaConstruidaM2: 387.10,
  pisos: 4,
  habitaciones: 16,
  banios: 8,
  medioBanio: 1,
  localComercialM2: 75,
  construccion: "Antisísmica con planos de arquitectura e ingeniería",
  agua: "Servicio 24hs — 2 tanques 1,000 L + reservorio subterráneo 2,000 L",
  estado: "Inscrito en SUNARP · Único propietario · Papeles al día",
  contactoWhatsapp: "+51947688502",
  contactoNombre: "Propietario directo",
  descripcionCompleta: `Inmueble de 4 pisos en venta en una de las zonas con mayor crecimiento de Tacna. Ubicado a pasos de la Av. La Cultura, del Colegio Jorge Chávez y del Polideportivo Los Ediles.\n\n387 m² construidos sobre 120.5 m² de terreno. Amplio local comercial de 75 m² con visibilidad directa a la calle, 16 habitaciones, 8 baños completos y terraza en el cuarto piso.\n\nEstructura antisísmica con planos de arquitectura e ingeniería por cada piso. Agua las 24 horas garantizada con dos tanques elevados de 1,000 litros y reservorio subterráneo de 2,000 litros.\n\nDocumentación en regla. Inscrito en SUNARP. Único propietario. Listo para escritura pública. Sin comisiones inmobiliarias.`
}

export const pisos = [
  {
    nombre: "Primer Piso",
    area: 106.80,
    descripcion: "Local comercial de 75 m² con visibilidad directa a la calle. Ideal para restaurante, gimnasio, farmacia u otro negocio. 1 habitación + 1 baño completo + medio baño + patio interior y lavandería.",
    ambientes: ["Local comercial 75 m²", "1 habitación", "1 baño completo", "Medio baño", "Patio interior / lavandería"]
  },
  {
    nombre: "Segundo Piso",
    area: 108.10,
    descripcion: "Distribución ideal para hostal, consultorios u oficinas independientes.",
    ambientes: ["6 habitaciones simples", "2 baños completos"]
  },
  {
    nombre: "Tercer Piso",
    area: 108.10,
    descripcion: "Ventilación e iluminación natural en cada ambiente.",
    ambientes: ["6 habitaciones simples", "3 baños completos"]
  },
  {
    nombre: "Cuarto Piso / Terraza",
    area: 64.10,
    descripcion: "Departamento independiente con terraza amplia y vistas a la zona.",
    ambientes: ["3 habitaciones", "1 baño completo", "Terraza amplia", "Zona de lavandería"]
  },
  {
    nombre: "Azotea",
    area: null,
    descripcion: "Zona técnica con mirador panorámico.",
    ambientes: ["2 tanques elevados 1,000 L c/u", "Reservorio subterráneo 2,000 L", "Mirador con vistas", "Agua 24 horas garantizada"]
  }
]

export const caracteristicas = [
  "Estructura antisísmica con planos de arquitectura e ingeniería",
  "Agua las 24 horas — 2 tanques + reservorio subterráneo",
  "Local comercial 75 m² con frente a la calle",
  "16 habitaciones distribuidas en 4 pisos",
  "Terraza amplia en 4to piso",
  "Azotea con mirador panorámico",
  "Patio interior / lavandería",
  "Inscrito en SUNARP — único propietario",
  "Documentación completa al día",
  "Listo para escritura — sin cargas ni hipotecas",
  "Trato directo — sin comisiones inmobiliarias",
  "A pasos de Av. La Cultura",
  "2 cuadras del Colegio Jorge Chávez",
  "Frente al Polideportivo Los Ediles",
  "Zona de alta demanda y valorización constante"
]

export const usosIdeales = [
  { uso: "Hotel / Hostal", icono: "Hotel", descripcion: "16 habitaciones listas. Alta demanda turística en Tacna." },
  { uso: "Clínica / Consultorios", icono: "Stethoscope", descripcion: "Distribución por pisos ideal para consultorios independientes." },
  { uso: "Oficinas", icono: "Building2", descripcion: "Cada piso puede funcionar como unidad independiente." },
  { uso: "Academia / Instituto", icono: "GraduationCap", descripcion: "Aulas en pisos superiores + recepción en local comercial." },
  { uso: "Renta por habitaciones", icono: "Key", descripcion: "Flujo de ingresos inmediato. Zona con alta demanda." },
  { uso: "Restaurante / Negocio", icono: "UtensilsCrossed", descripcion: "Local 75 m² con visibilidad directa a la calle." }
]

export const puntosReferencia = [
  { nombre: "Av. La Cultura", distancia: "A pasos", lat: -18.0365, lng: -70.2548 },
  { nombre: "Colegio Jorge Chávez", distancia: "2 cuadras", lat: -18.0355, lng: -70.2562 },
  { nombre: "Polideportivo Los Ediles", distancia: "Frente", lat: -18.0372, lng: -70.2570 },
  { nombre: "Plaza Los Ediles", distancia: "1 cuadra", lat: -18.0360, lng: -70.2575 }
]
