/**
 * Satellite color legend and utilities
 */
import { SATELLITE_CONFIG, getSatelliteType } from "../config/satelliteConfig";

/**
 * Get all satellite types with their colors for legend display
 */
export function getSatelliteColorLegend() {
  return Object.entries(SATELLITE_CONFIG.VISUAL.COLORS).map(
    ([type, color]) => ({
      type: type.replace(/_/g, " "), // Replace underscores with spaces for display
      color,
      description: getSatelliteTypeDescription(
        type as keyof typeof SATELLITE_CONFIG.VISUAL.COLORS
      ),
    })
  );
}

/**
 * Get human-readable description for satellite types
 */
function getSatelliteTypeDescription(
  type: keyof typeof SATELLITE_CONFIG.VISUAL.COLORS
): string {
  const descriptions = {
    STARLINK: "SpaceX Starlink Internet Constellation",
    GPS_NAVSTAR: "GPS Navigation Satellites",
    GLONASS: "Russian Global Navigation System",
    GALILEO: "European Global Navigation System",
    BEIDOU: "Chinese Global Navigation System",
    IRIDIUM: "Iridium Communications Constellation",
    ONEWEB: "OneWeb Internet Constellation",
    INTELSAT: "Intelsat Commercial Satellites",
    GEOSTATIONARY: "Geostationary Commercial Satellites",
    SCIENTIFIC: "Scientific & Research Satellites",
    MILITARY: "Military & Defense Satellites",
    COMMERCIAL: "Other Commercial Satellites",
    DEBRIS: "Space Debris & Rocket Bodies",
    DEFAULT: "Unclassified Satellites",
  };

  return descriptions[type] || "Unknown satellite type";
}

/**
 * Get statistics about satellite types in a dataset
 */
export function getSatelliteTypeStats(satellites: Array<{ name: string }>) {
  const stats = new Map<string, number>();

  satellites.forEach((satellite) => {
    const type = getSatelliteType(satellite.name);
    stats.set(type, (stats.get(type) || 0) + 1);
  });

  return Array.from(stats.entries())
    .map(([type, count]) => ({
      type: type.replace(/_/g, " "),
      count,
      color:
        SATELLITE_CONFIG.VISUAL.COLORS[
          type as keyof typeof SATELLITE_CONFIG.VISUAL.COLORS
        ],
      description: getSatelliteTypeDescription(
        type as keyof typeof SATELLITE_CONFIG.VISUAL.COLORS
      ),
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}
