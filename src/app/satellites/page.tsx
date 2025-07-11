import { getSatellitePositions } from "../services/satelliteService";

export default async function SatellitesPage() {
  const satellitePositions = await getSatellitePositions("low");

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Real-time Satellite Positions</h1>
      <p>Generated from TLE data using satellite.js</p>
      <p>Total satellites: {satellitePositions.length}</p>

      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {satellitePositions.map((satellite, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {satellite.name}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <div>
                <strong>Latitude:</strong> {satellite.lat.toFixed(6)}°
              </div>
              <div>
                <strong>Longitude:</strong> {satellite.lng.toFixed(6)}°
              </div>
              <div>
                <strong>Altitude:</strong> {(satellite.alt / 1000).toFixed(2)}{" "}
                km
              </div>
              <div>
                <strong>Velocity:</strong>{" "}
                {satellite.velocity
                  ? `${Math.sqrt(
                      satellite.velocity.x ** 2 +
                        satellite.velocity.y ** 2 +
                        satellite.velocity.z ** 2
                    ).toFixed(2)} km/s`
                  : "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h3>View on Globe</h3>
        <p>
          Visit{" "}
          <a href="/main" style={{ color: "#1976d2" }}>
            /main
          </a>{" "}
          to see these satellites rendered on the Cesium globe.
        </p>
      </div>
    </div>
  );
}
