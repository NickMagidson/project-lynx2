/**
 * Configuration for satellite rendering and performance settings
 */
export const SATELLITE_CONFIG = {
  // Maximum number of satellites to render (balance between performance and completeness)
  MAX_SATELLITES: 5000,

  // Performance settings
  PERFORMANCE: {
    // Use level of detail scaling for better performance with many satellites
    USE_LOD_SCALING: true,

    // Hide labels by default for better performance (show on selection)
    HIDE_LABELS_BY_DEFAULT: true,

    // Reduce point size for distant satellites
    USE_DISTANCE_SCALING: true,
  },

  // Visual settings
  VISUAL: {
    // Point sizes
    POINT_SIZE: 1,
    // OUTLINE_WIDTH: 1,

    // Colors for different satellite types
    COLORS: {
      STARLINK: "CYAN", // SpaceX Starlink constellation
      GPS_NAVSTAR: "LIME", // GPS/NAVSTAR satellites
      GLONASS: "YELLOW", // Russian GLONASS
      GALILEO: "PURPLE", // European Galileo
      BEIDOU: "PINK", // Chinese BeiDou
      IRIDIUM: "LIGHTBLUE", // Iridium constellation
      ONEWEB: "LIGHTGREEN", // OneWeb constellation
      INTELSAT: "ORANGE", // Intelsat commercial satellites
      GEOSTATIONARY: "RED", // Other geostationary satellites
      SCIENTIFIC: "WHITE", // Scientific/research satellites
      MILITARY: "GRAY", // Military satellites
      COMMERCIAL: "GOLD", // Other commercial satellites
      DEBRIS: "DARKGRAY", // Space debris
      DEFAULT: "CYAN", // Default fallback color
    },

    // Label settings
    LABEL: {
      FONT: "10pt monospace",
      PIXEL_OFFSET_Y: -9,
    },
  },

  // Altitude thresholds (in meters)
  ALTITUDE_THRESHOLDS: {
    MEDIUM_ORBIT: 500000, // 500km
    HIGH_ORBIT: 1000000, // 1000km
  },
} as const;

/**
 * Get the maximum number of satellites to render based on performance mode
 */
export function getMaxSatellites(
  performanceMode:
    | "low"
    | "medium"
    | "high"
    | "ultra"
    | "extreme"
    | "unlimited" = "ultra"
): number {
  switch (performanceMode) {
    case "low":
      return 1000; // Conservative for older devices
    case "medium":
      return 5000; // Good balance
    case "high":
      return 10000; // For powerful devices
    case "ultra":
      return 20000; // For very high-end devices (experimental)
    case "extreme":
      return 50000; // For workstation-class hardware
    case "unlimited":
      return Number.MAX_SAFE_INTEGER; // Render every single satellite (may cause performance issues)
    default:
      return SATELLITE_CONFIG.MAX_SATELLITES;
  }
}

/**
 * Determine satellite type based on satellite name
 */
export function getSatelliteType(
  satelliteName: string
): keyof typeof SATELLITE_CONFIG.VISUAL.COLORS {
  const name = satelliteName.toUpperCase();

  // Check for specific constellation patterns
  if (name.includes("STARLINK")) {
    return "STARLINK";
  }
  if (name.includes("NAVSTAR") || name.includes("GPS")) {
    return "GPS_NAVSTAR";
  }
  if (name.includes("GLONASS")) {
    return "GLONASS";
  }
  if (name.includes("GALILEO")) {
    return "GALILEO";
  }
  if (name.includes("BEIDOU") || name.includes("COMPASS")) {
    return "BEIDOU";
  }
  if (name.includes("IRIDIUM")) {
    return "IRIDIUM";
  }
  if (name.includes("ONEWEB")) {
    return "ONEWEB";
  }
  if (name.includes("INTELSAT")) {
    return "INTELSAT";
  }

  // Check for scientific/research satellites
  if (
    name.includes("EXPLORER") ||
    name.includes("VANGUARD") ||
    name.includes("TIROS") ||
    name.includes("GOES") ||
    name.includes("NOAA") ||
    name.includes("METEOSAT") ||
    name.includes("LANDSAT") ||
    name.includes("TERRA") ||
    name.includes("AQUA") ||
    name.includes("SPOT") ||
    name.includes("SENTINEL") ||
    name.includes("MODIS")
  ) {
    return "SCIENTIFIC";
  }

  // Check for military satellites
  if (
    name.includes("USA ") ||
    name.includes("NROL") ||
    name.includes("DSCS") ||
    name.includes("MILSTAR") ||
    name.includes("AEHF") ||
    name.includes("WGS")
  ) {
    return "MILITARY";
  }

  // Check for debris indicators
  if (
    name.includes("DEB") ||
    name.includes("DEBRIS") ||
    name.includes("FRAG") ||
    name.includes("R/B") ||
    name.includes("ROCKET BODY")
  ) {
    return "DEBRIS";
  }

  // Check for geostationary indicators (common GEO satellite names)
  if (
    name.includes("GEO") ||
    name.includes("GEOSTATIONARY") ||
    name.includes("EUTELSAT") ||
    name.includes("ASTRA") ||
    name.includes("HOTBIRD") ||
    name.includes("DIRECTV") ||
    name.includes("DISH") ||
    name.includes("ECHOSTAR") ||
    name.includes("ARABSAT") ||
    name.includes("TURKSAT") ||
    name.includes("HISPASAT")
  ) {
    return "GEOSTATIONARY";
  }

  // Check for other commercial satellites
  if (
    name.includes("SAT") ||
    name.includes("COM") ||
    name.includes("TELESAT") ||
    name.includes("SIRIUS") ||
    name.includes("XM") ||
    name.includes("ORBCOMM")
  ) {
    return "COMMERCIAL";
  }

  return "DEFAULT";
}

/**
 * Get satellite color based on satellite type
 */
export function getSatelliteColor(satelliteName: string): string {
  const type = getSatelliteType(satelliteName);
  return SATELLITE_CONFIG.VISUAL.COLORS[type];
}
