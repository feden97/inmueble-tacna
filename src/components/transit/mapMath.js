export function bearing(a, b) {
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x = Math.sin(dLng) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(x, y)) + 360) % 360;
}

export function haversineMeters(a, b) {
  const toRad = d => d * Math.PI / 180;
  const R = 6371000;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function samplePointsByDistance(coords, spacingMeters) {
  if (!coords || coords.length < 2) return [];

  const points = [];
  let accumDist = spacingMeters / 2;

  for (let i = 0; i < coords.length - 1; i += 1) {
    const segDist = haversineMeters(coords[i], coords[i + 1]);
    if (accumDist + segDist >= spacingMeters) {
      points.push({
        pos: coords[i],
        angle: bearing(coords[i], coords[i + 1]),
      });
      accumDist = 0;
    } else {
      accumDist += segDist;
    }
  }

  return points;
}
