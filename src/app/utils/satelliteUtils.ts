import * as satellite from "satellite.js";
import { TLEData } from "../data/mockTles";
import { SatellitePosition } from "../types/position";

export interface SatelliteInfo {
  satrec: any; // satellite.js types are not well-defined
  name: string;
}

/**
 * Parse TLE data and create satellite records
 */
export function parseTLEs(tleData: TLEData[]): SatelliteInfo[] {
  return tleData.map((tle) => {
    const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
    return {
      satrec,
      name: tle.name,
    };
  });
}

/**
 * Calculate satellite positions at a given time
 */
export function calculateSatellitePositions(
  satellites: SatelliteInfo[],
  date: Date = new Date(),
  tleData?: TLEData[]
): SatellitePosition[] {
  const validPositions: SatellitePosition[] = [];

  for (const sat of satellites) {
    try {
      // Get position and velocity
      const positionAndVelocity = satellite.propagate(sat.satrec, date);

      // Check if propagation was successful
      if (
        !positionAndVelocity ||
        typeof positionAndVelocity.position === "boolean" ||
        typeof positionAndVelocity.velocity === "boolean"
      ) {
        console.warn(`Failed to calculate position for ${sat.name}`);
        continue;
      }

      const position = positionAndVelocity.position as any;
      const velocity = positionAndVelocity.velocity as any;

      // Convert ECI coordinates to lat/lng/alt
      const gmst = satellite.gstime(date);
      const geodeticCoords = satellite.eciToGeodetic(position, gmst);

      // Convert radians to degrees and km to meters
      const latitude = satellite.degreesLat(geodeticCoords.latitude);
      const longitude = satellite.degreesLong(geodeticCoords.longitude);
      const altitude = geodeticCoords.height * 1000; // Convert km to meters

      // Extract orbital elements from TLE data if available
      const correspondingTLE = tleData?.find((tle) => tle.name === sat.name);
      let orbitalElements;

      if (correspondingTLE) {
        orbitalElements = extractOrbitalElements(correspondingTLE, sat.satrec);
      }

      validPositions.push({
        name: sat.name,
        lat: latitude,
        lng: longitude,
        alt: altitude,
        velocity: {
          x: velocity.x,
          y: velocity.y,
          z: velocity.z,
        },
        orbitalElements,
      });
    } catch (error) {
      console.error(`Error calculating position for ${sat.name}:`, error);
    }
  }

  return validPositions;
}

/**
 * Get current positions of all satellites
 */
export async function getCurrentSatellitePositions(
  tleData: TLEData[]
): Promise<SatellitePosition[]> {
  const satellites = parseTLEs(tleData);
  return calculateSatellitePositions(satellites, new Date(), tleData);
}

/**
 * Get satellite positions at a specific time
 */
export async function getSatellitePositionsAtTime(
  tleData: TLEData[],
  date: Date
): Promise<SatellitePosition[]> {
  const satellites = parseTLEs(tleData);
  return calculateSatellitePositions(satellites, date, tleData);
}

/**
 * Get satellite positions over a time range
 */
export async function getSatellitePositionsOverTime(
  tleData: TLEData[],
  startDate: Date,
  endDate: Date,
  intervalMinutes: number = 5
): Promise<{ timestamp: Date; positions: SatellitePosition[] }[]> {
  const satellites = parseTLEs(tleData);
  const results: { timestamp: Date; positions: SatellitePosition[] }[] = [];

  const currentTime = new Date(startDate);
  const intervalMs = intervalMinutes * 60 * 1000;

  while (currentTime <= endDate) {
    const positions = calculateSatellitePositions(
      satellites,
      new Date(currentTime),
      tleData
    );
    results.push({
      timestamp: new Date(currentTime),
      positions,
    });
    currentTime.setTime(currentTime.getTime() + intervalMs);
  }

  return results;
}

/**
 * Extract orbital elements from TLE data and satellite record
 */
export function extractOrbitalElements(
  tleData: TLEData,
  satrec: any
): {
  inclination: number;
  rightAscension: number;
  eccentricity: number;
  argumentOfPeriapsis: number;
  meanAnomaly: number;
  meanMotion: number;
  period: number;
  apogee: number;
  perigee: number;
  catalogNumber: string;
  epoch: string;
} {
  // Parse TLE line 1 for catalog number and epoch
  const line1 = tleData.line1;
  const catalogNumber = line1.substring(2, 7);
  const epochYear = parseInt(line1.substring(18, 20));
  const epochDay = parseFloat(line1.substring(20, 32));

  // Convert epoch to full year (assumes 2000s for simplicity)
  const fullYear = epochYear < 50 ? 2000 + epochYear : 1900 + epochYear;

  // Parse TLE line 2 for orbital elements
  const line2 = tleData.line2;
  const inclination = parseFloat(line2.substring(8, 16));
  const rightAscension = parseFloat(line2.substring(17, 25));
  const eccentricity = parseFloat("0." + line2.substring(26, 33));
  const argumentOfPeriapsis = parseFloat(line2.substring(34, 42));
  const meanAnomaly = parseFloat(line2.substring(43, 51));
  const meanMotion = parseFloat(line2.substring(52, 63));

  // Calculate period in minutes
  const period = (24 * 60) / meanMotion;

  // Calculate apogee and perigee using semi-major axis
  const earthRadius = 6378.137; // km
  const semiMajorAxis =
    Math.pow((24 * 60 * 60) / ((2 * Math.PI * meanMotion) / 86400), 2 / 3) *
    Math.pow(398600.4418, 1 / 3);
  const apogee = semiMajorAxis * (1 + eccentricity) - earthRadius;
  const perigee = semiMajorAxis * (1 - eccentricity) - earthRadius;

  // Create epoch date string
  const epochDate = new Date(fullYear, 0, epochDay);
  const epoch = epochDate.toISOString().split("T")[0];

  return {
    inclination,
    rightAscension,
    eccentricity,
    argumentOfPeriapsis,
    meanAnomaly,
    meanMotion,
    period,
    apogee,
    perigee,
    catalogNumber,
    epoch,
  };
}
