import { SatellitePosition } from "../types/position";

export type OrbitType = "LEO" | "MEO" | "GEO" | "HEO" | "ALL";

/**
 * Determine orbit type based on satellite altitude
 */
export function getOrbitType(altitudeMeters: number): OrbitType {
  const altitudeKm = altitudeMeters / 1000;
  
  if (altitudeKm < 2000) return "LEO"; // Low Earth Orbit
  if (altitudeKm < 35786) return "MEO"; // Medium Earth Orbit  
  if (altitudeKm < 35800) return "GEO"; // Geostationary Orbit
  return "HEO"; // High Earth Orbit
}

/**
 * Get orbit type display name
 */
export function getOrbitTypeDisplayName(orbitType: OrbitType): string {
  switch (orbitType) {
    case "LEO": return "Low Earth Orbit (LEO)";
    case "MEO": return "Medium Earth Orbit (MEO)";
    case "GEO": return "Geostationary Orbit (GEO)";
    case "HEO": return "High Earth Orbit (HEO)";
    case "ALL": return "All Orbits";
    default: return "Unknown Orbit";
  }
}

/**
 * Get orbit type description
 */
export function getOrbitTypeDescription(orbitType: OrbitType): string {
  switch (orbitType) {
    case "LEO": return "Below 2,000 km altitude - Most Earth observation and communication satellites";
    case "MEO": return "2,000-35,786 km altitude - GPS and navigation satellites";
    case "GEO": return "~35,786 km altitude - Geostationary communication satellites";
    case "HEO": return "Above 35,800 km altitude - Deep space and specialized satellites";
    case "ALL": return "All orbital altitudes";
    default: return "Unknown orbital classification";
  }
}

/**
 * Get orbit type color for visual representation
 */
export function getOrbitTypeColor(orbitType: OrbitType): string {
  switch (orbitType) {
    case "LEO": return "#00ff00"; // Green
    case "MEO": return "#ffff00"; // Yellow
    case "GEO": return "#ff0000"; // Red
    case "HEO": return "#ff00ff"; // Magenta
    case "ALL": return "#ffffff"; // White
    default: return "#cccccc"; // Gray
  }
}

/**
 * Get statistics about orbit types in a satellite dataset
 */
export function getOrbitTypeStats(satellites: SatellitePosition[]) {
  const stats = new Map<OrbitType, number>();
  
  satellites.forEach((satellite) => {
    const orbitType = getOrbitType(satellite.alt);
    stats.set(orbitType, (stats.get(orbitType) || 0) + 1);
  });
  
  return Array.from(stats.entries())
    .map(([type, count]) => ({
      type,
      count,
      displayName: getOrbitTypeDisplayName(type),
      description: getOrbitTypeDescription(type),
      color: getOrbitTypeColor(type),
    }))
    .sort((a, b) => {
      // Sort by orbit altitude (LEO -> MEO -> GEO -> HEO)
      const order = ["LEO", "MEO", "GEO", "HEO"];
      return order.indexOf(a.type) - order.indexOf(b.type);
    });
}
