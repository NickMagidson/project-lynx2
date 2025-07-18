import { SatellitePosition } from "../types/position";

/**
 * Generate HTML description for satellite InfoBox
 */
export function generateSatelliteDescription(
  satellite: SatellitePosition
): string {
  const altitudeKm = satellite.alt / 1000;

  // Calculate orbital speed
  const orbitalSpeed = satellite.velocity
    ? Math.sqrt(
        satellite.velocity.x ** 2 +
          satellite.velocity.y ** 2 +
          satellite.velocity.z ** 2
      )
    : 0;

  // Determine orbit type
  const getOrbitType = (altitude: number): string => {
    if (altitude < 2000) return "Low Earth Orbit (LEO)";
    if (altitude < 35786) return "Medium Earth Orbit (MEO)";
    if (altitude < 35800) return "Geostationary Orbit (GEO)";
    return "High Earth Orbit (HEO)";
  };

  const orbitType = getOrbitType(altitudeKm);

  return `
    <div style="font-family: sans-serif; font-size: 13px; color: #edffff; padding: 10px;">
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0 0 5px 0; color: #00d4ff; font-size: 16px;">${
          satellite.name
        }</h3>
        <div style="color: #aaa; font-size: 12px;">${orbitType}</div>
      </div>

      <table class="cesium-infoBox-defaultTable" style="width: 100%; margin-bottom: 15px;">
        <tr>
          <td style="font-weight: bold; color: #ffd700;">Current Position</td>
          <td></td>
        </tr>
        <tr>
          <td>Latitude:</td>
          <td style="font-weight: bold;">${satellite.lat.toFixed(6)}°</td>
        </tr>
        <tr>
          <td>Longitude:</td>
          <td style="font-weight: bold;">${satellite.lng.toFixed(6)}°</td>
        </tr>
        <tr>
          <td>Altitude:</td>
          <td style="font-weight: bold;">${altitudeKm.toFixed(2)} km</td>
        </tr>
      </table>

      ${
        satellite.velocity
          ? `
        <table class="cesium-infoBox-defaultTable" style="width: 100%; margin-bottom: 15px;">
          <tr>
            <td style="font-weight: bold; color: #ffd700;">Orbital Velocity</td>
            <td></td>
          </tr>
          <tr>
            <td>Speed:</td>
            <td style="font-weight: bold;">${orbitalSpeed.toFixed(2)} km/s</td>
          </tr>
          <tr>
            <td>X Component:</td>
            <td style="font-weight: bold;">${satellite.velocity.x.toFixed(
              2
            )} km/s</td>
          </tr>
          <tr>
            <td>Y Component:</td>
            <td style="font-weight: bold;">${satellite.velocity.y.toFixed(
              2
            )} km/s</td>
          </tr>
          <tr>
            <td>Z Component:</td>
            <td style="font-weight: bold;">${satellite.velocity.z.toFixed(
              2
            )} km/s</td>
          </tr>
        </table>
      `
          : ""
      }

      <table class="cesium-infoBox-defaultTable" style="width: 100%; margin-bottom: 15px;">
        <tr>
          <td style="font-weight: bold; color: #ffd700;">Orbital Parameters</td>
          <td></td>
        </tr>
        <tr>
          <td>Orbit Type:</td>
          <td style="font-weight: bold;">${orbitType}</td>
        </tr>
        ${
          satellite.orbitalElements
            ? `
          <tr>
            <td>Inclination:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.inclination.toFixed(
              4
            )}°</td>
          </tr>
          <tr>
            <td>Eccentricity:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.eccentricity.toFixed(
              6
            )}</td>
          </tr>
          <tr>
            <td>Orbital Period:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.period.toFixed(
              2
            )} min</td>
          </tr>
          <tr>
            <td>Apogee:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.apogee.toFixed(
              2
            )} km</td>
          </tr>
          <tr>
            <td>Perigee:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.perigee.toFixed(
              2
            )} km</td>
          </tr>
        `
            : `
          <tr>
            <td>Orbital Period:</td>
            <td style="font-weight: bold;">${
              altitudeKm < 2000
                ? "~90-120 min"
                : altitudeKm < 35786
                ? "~2-12 hours"
                : "~24 hours"
            }</td>
          </tr>
        `
        }
        <tr>
          <td>Ground Track:</td>
          <td style="font-weight: bold;">${
            satellite.velocity ? "Active" : "Unknown"
          }</td>
        </tr>
      </table>

      ${
        satellite.orbitalElements
          ? `
        <table class="cesium-infoBox-defaultTable" style="width: 100%; margin-bottom: 15px;">
          <tr>
            <td style="font-weight: bold; color: #ffd700;">Detailed Orbital Elements</td>
            <td></td>
          </tr>
          <tr>
            <td>Right Ascension:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.rightAscension.toFixed(
              4
            )}°</td>
          </tr>
          <tr>
            <td>Arg. of Periapsis:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.argumentOfPeriapsis.toFixed(
              4
            )}°</td>
          </tr>
          <tr>
            <td>Mean Anomaly:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.meanAnomaly.toFixed(
              4
            )}°</td>
          </tr>
          <tr>
            <td>Mean Motion:</td>
            <td style="font-weight: bold;">${satellite.orbitalElements.meanMotion.toFixed(
              6
            )} rev/day</td>
          </tr>
          <tr>
            <td>Catalog Number:</td>
            <td style="font-weight: bold;">${
              satellite.orbitalElements.catalogNumber
            }</td>
          </tr>
          <tr>
            <td>Epoch:</td>
            <td style="font-weight: bold;">${
              satellite.orbitalElements.epoch
            }</td>
          </tr>
        </table>
      `
          : ""
      }

    </div>
  `;
}
