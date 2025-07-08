import { promises as fs } from "fs";
import path from "path";
import { TLEData } from "../data/mockTles";

/**
 * Parse TLE file format where each satellite has 3 lines:
 * Line 0: Satellite name (starts with "0 ")
 * Line 1: First line of TLE data (starts with "1 ")
 * Line 2: Second line of TLE data (starts with "2 ")
 */
export async function parseTLEFile(filePath: string): Promise<TLEData[]> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const satellites: TLEData[] = [];

    for (let i = 0; i < lines.length; i += 3) {
      // Check if we have all 3 lines for a complete TLE entry
      if (i + 2 >= lines.length) break;

      const nameLine = lines[i];
      const line1 = lines[i + 1];
      const line2 = lines[i + 2];

      // Validate the format
      if (
        nameLine.startsWith("0 ") &&
        line1.startsWith("1 ") &&
        line2.startsWith("2 ")
      ) {
        // Extract satellite name (remove "0 " prefix)
        const name = nameLine.substring(2).trim();

        satellites.push({
          name,
          line1,
          line2,
        });
      } else {
        console.warn(`Invalid TLE format at lines ${i}-${i + 2}:`, {
          nameLine,
          line1,
          line2,
        });
      }
    }

    console.log(
      `Successfully parsed ${satellites.length} satellites from TLE file`
    );
    return satellites;
  } catch (error) {
    console.error("Error parsing TLE file:", error);
    throw error;
  }
}

/**
 * Parse TLE data from a string content
 */
export function parseTLEString(content: string): TLEData[] {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const satellites: TLEData[] = [];

  for (let i = 0; i < lines.length; i += 3) {
    // Check if we have all 3 lines for a complete TLE entry
    if (i + 2 >= lines.length) break;

    const nameLine = lines[i];
    const line1 = lines[i + 1];
    const line2 = lines[i + 2];

    // Validate the format
    if (
      nameLine.startsWith("0 ") &&
      line1.startsWith("1 ") &&
      line2.startsWith("2 ")
    ) {
      // Extract satellite name (remove "0 " prefix)
      const name = nameLine.substring(2).trim();

      satellites.push({
        name,
        line1,
        line2,
      });
    } else {
      console.warn(`Invalid TLE format at lines ${i}-${i + 2}:`, {
        nameLine,
        line1,
        line2,
      });
    }
  }

  return satellites;
}

/**
 * Load and parse TLE data from the project's TLE file
 */
export async function loadTLEData(): Promise<TLEData[]> {
  const tleFilePath = path.join(
    process.cwd(),
    "src",
    "app",
    "tle_04_13_2024.txt"
  );
  return await parseTLEFile(tleFilePath);
}
