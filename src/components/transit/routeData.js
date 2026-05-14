import { ROUTE_META } from '../../data/routesData';
import nearbyRoutesRaw from '../../data/nearby_routes.json';

export const rutasCercanas = nearbyRoutesRaw
  .filter(route => ROUTE_META[route.name])
  .map(route => {
    let coords = route.coords;

    // Ruta 300 N-S was persisted reversed in source json.
    if (route.name === 'Ruta 300 N-S') {
      coords = [...coords].reverse();
    }

    return {
      ...ROUTE_META[route.name],
      nombre: route.name,
      dist_km: route.dist_km,
      coords,
    };
  });

const grouped = {};
rutasCercanas.forEach(route => {
  if (!grouped[route.linea]) grouped[route.linea] = [];
  grouped[route.linea].push(route);
});

export const groupedArray = Object.entries(grouped)
  .map(([linea, rutas]) => ({
    linea,
    rutas: rutas.sort((a, b) => a.dist_km - b.dist_km),
    minDist: Math.min(...rutas.map(route => route.dist_km)),
  }))
  .sort((a, b) => a.minDist - b.minDist);
