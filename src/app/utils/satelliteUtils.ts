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
  date: Date = new Date()
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
  return calculateSatellitePositions(satellites);
}

/**
 * Get satellite positions at a specific time
 */
export async function getSatellitePositionsAtTime(
  tleData: TLEData[],
  date: Date
): Promise<SatellitePosition[]> {
  const satellites = parseTLEs(tleData);
  return calculateSatellitePositions(satellites, date);
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
      new Date(currentTime)
    );
    results.push({
      timestamp: new Date(currentTime),
      positions,
    });
    currentTime.setTime(currentTime.getTime() + intervalMs);
  }

  return results;
}
