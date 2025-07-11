import { getMaxSatellites } from "../config/satelliteConfig";
import { SatellitePosition } from "../types/position";
import { getCurrentSatellitePositions } from "../utils/satelliteUtils";
import { loadTLEData } from "../utils/tleParser";

async function getSatellitePositions(
  performanceMode: "low" | "medium" | "high" | "ultra" | "extreme" | "unlimited"
): Promise<SatellitePosition[]> {
  try {
    // Load TLE data from the actual file
    const tleData = await loadTLEData();
    console.log(`Loaded ${tleData.length} satellites from TLE file`);

    // Limit satellites based on performance mode
    const maxSatellites = getMaxSatellites(performanceMode);
    const limitedTleData = tleData.slice(0, maxSatellites); // Sat limit manually changes here
    console.log(
      `Processing ${limitedTleData.length} satellites for rendering (performance mode: ${performanceMode})`
    );

    // Get current satellite positions
    const positions = await getCurrentSatellitePositions(limitedTleData);
    return positions;
  } catch (error) {
    console.error("Error fetching satellite positions:", error);
    return [];
  }
}

export { getSatellitePositions };
