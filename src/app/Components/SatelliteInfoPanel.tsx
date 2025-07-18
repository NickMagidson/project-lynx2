import React from "react";
import { SatellitePosition } from "../types/position";

interface SatelliteInfoPanelProps {
  satellite: SatellitePosition | null;
  onClose: () => void;
}

export const SatelliteInfoPanel: React.FC<SatelliteInfoPanelProps> = ({
  satellite,
  onClose,
}) => {
  if (!satellite) return null;

  // Calculate orbital speed magnitude
  const orbitalSpeed = satellite.velocity
    ? Math.sqrt(
        satellite.velocity.x ** 2 +
          satellite.velocity.y ** 2 +
          satellite.velocity.z ** 2
      )
    : 0;

  // Calculate altitude in km
  const altitudeKm = satellite.alt / 1000;

  // Determine orbit type based on altitude
  const getOrbitType = (altitude: number): string => {
    if (altitude < 2000) return "Low Earth Orbit (LEO)";
    if (altitude < 35786) return "Medium Earth Orbit (MEO)";
    if (altitude < 35800) return "Geostationary Orbit (GEO)";
    return "High Earth Orbit (HEO)";
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <h3 style={{ margin: 0, color: "#00d4ff" }}>Satellite Information</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#ff6b6b",
            fontSize: "18px",
            cursor: "pointer",
            padding: "0",
            width: "20px",
            height: "20px",
          }}
        >
          ×
        </button>
      </div>

      {/* Satellite Name */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ margin: "0 0 5px 0", color: "#00d4ff" }}>
          {satellite.name}
        </h4>
        <div style={{ color: "#aaa", fontSize: "12px" }}>
          {getOrbitType(altitudeKm)}
        </div>
      </div>

      {/* Coordinates Section */}
      <div style={{ marginBottom: "20px" }}>
        <h5 style={{ margin: "0 0 10px 0", color: "#ffd700" }}>
          Current Position
        </h5>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ccc" }}>Latitude:</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {satellite.lat.toFixed(6)}°
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ccc" }}>Longitude:</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {satellite.lng.toFixed(6)}°
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ccc" }}>Altitude:</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {altitudeKm.toFixed(2)} km
            </span>
          </div>
        </div>
      </div>

      {/* Velocity Section */}
      {satellite.velocity && (
        <div style={{ marginBottom: "20px" }}>
          <h5 style={{ margin: "0 0 10px 0", color: "#ffd700" }}>
            Orbital Velocity
          </h5>
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Speed:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {orbitalSpeed.toFixed(2)} km/s
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>X Component:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.velocity.x.toFixed(2)} km/s
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Y Component:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.velocity.y.toFixed(2)} km/s
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Z Component:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.velocity.z.toFixed(2)} km/s
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Orbital Parameters Section */}
      <div style={{ marginBottom: "20px" }}>
        <h5 style={{ margin: "0 0 10px 0", color: "#ffd700" }}>
          Orbital Parameters
        </h5>
        <div style={{ display: "grid", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ccc" }}>Orbit Type:</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {getOrbitType(altitudeKm)}
            </span>
          </div>
          {satellite.orbitalElements && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ccc" }}>Inclination:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {satellite.orbitalElements.inclination.toFixed(4)}°
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ccc" }}>Eccentricity:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {satellite.orbitalElements.eccentricity.toFixed(6)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ccc" }}>Orbital Period:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {satellite.orbitalElements.period.toFixed(2)} min
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ccc" }}>Apogee:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {satellite.orbitalElements.apogee.toFixed(2)} km
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#ccc" }}>Perigee:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>
                  {satellite.orbitalElements.perigee.toFixed(2)} km
                </span>
              </div>
            </>
          )}
          {!satellite.orbitalElements && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Orbital Period:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {altitudeKm < 2000
                  ? "~90-120 min"
                  : altitudeKm < 35786
                  ? "~2-12 hours"
                  : "~24 hours"}
              </span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ccc" }}>Ground Track:</span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              {satellite.velocity ? "Active" : "Unknown"}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Orbital Elements Section */}
      {satellite.orbitalElements && (
        <div style={{ marginBottom: "20px" }}>
          <h5 style={{ margin: "0 0 10px 0", color: "#ffd700" }}>
            Detailed Orbital Elements
          </h5>
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Right Ascension:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.rightAscension.toFixed(4)}°
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Arg. of Periapsis:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.argumentOfPeriapsis.toFixed(4)}°
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Mean Anomaly:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.meanAnomaly.toFixed(4)}°
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Mean Motion:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.meanMotion.toFixed(6)} rev/day
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Catalog Number:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.catalogNumber}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ccc" }}>Epoch:</span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                {satellite.orbitalElements.epoch}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          fontSize: "12px",
          color: "#888",
          textAlign: "center",
          paddingTop: "10px",
          borderTop: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div style={{ marginTop: "5px", fontSize: "11px" }}>
          Click anywhere on the globe to deselect
        </div>
      </div>
    </div>
  );
};
