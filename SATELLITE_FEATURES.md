# Satellite Tracking with TLE Data

This project demonstrates real-time satellite tracking using Two-Line Element (TLE) data, satellite.js, and Cesium.js in a Next.js application.

## Features

- 🛰️ **Real-time satellite positions** calculated from TLE data using satellite.js
- 🌍 **3D visualization** on Cesium globe with interactive satellite markers
- 📡 **Multiple satellite types** including ISS, Starlink, GPS, NOAA, Hubble, and more
- ⚡ **Server-side rendering** for optimal performance
- 📊 **Detailed satellite information** including altitude, velocity, and orbital parameters

## Satellite Data

The application includes mock TLE data for the following satellites:

- **ISS (International Space Station)**
- **Starlink satellites**
- **NOAA weather satellites**
- **Hubble Space Telescope**
- **GPS satellites**
- **Sentinel Earth observation satellites**
- **Terra and Aqua Earth observation satellites**
- **Landsat 8**
- **GOES weather satellites**

## Technical Implementation

### TLE Processing

- Two-Line Element (TLE) data is processed using the `satellite.js` library
- TLE data contains orbital parameters needed to calculate satellite positions
- Positions are calculated in real-time based on the current date/time

### Coordinate Conversion

- ECI (Earth-Centered Inertial) coordinates are converted to geodetic coordinates
- Latitude and longitude are converted from radians to degrees
- Altitude is converted from kilometers to meters for Cesium compatibility

### Cesium Integration

- Satellites are rendered as yellow points with labels on the Cesium globe
- Points scale with distance for better visibility
- Labels show satellite names and scale appropriately

## File Structure

```
src/app/
├── data/
│   └── mockTles.ts           # TLE data for satellites
├── utils/
│   └── satelliteUtils.ts     # Satellite calculation utilities
├── services/
│   └── satelliteService.ts   # Server-side satellite data fetching
├── types/
│   └── position.ts           # TypeScript type definitions
├── Components/
│   ├── CesiumWrapper.tsx     # Cesium component wrapper
│   └── CesiumComponent.tsx   # Main Cesium 3D component
├── main/
│   └── page.tsx              # 3D globe view with satellites
└── satellites/
    └── page.tsx              # Satellite data table view
```

## Usage

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **View the application:**
   - Navigate to `http://localhost:3000` for the homepage
   - Visit `/main` for the 3D Cesium globe view
   - Visit `/satellites` for the detailed satellite data table

## API Reference

### getSatellitePositions()

Returns current satellite positions calculated from TLE data.

### getSatellitePositionsAtTime(date)

Returns satellite positions at a specific time.

### calculateSatellitePositions(satellites, date)

Core function that calculates satellite positions using satellite.js.

## TLE Data Format

TLE (Two-Line Element) data consists of three lines:

1. Satellite name
2. Line 1: Contains satellite catalog number, epoch, and orbital decay information
3. Line 2: Contains orbital elements like inclination, right ascension, eccentricity, etc.

Example:

```
ISS (ZARYA)
1 25544U 98067A   24188.50000000  .00016717  00000-0  10270-3 0  9992
2 25544  51.6392 339.0042 0001015  94.8340 265.2864 15.49309620 36106
```

## Environment Variables

Set your Cesium Ion access token in `.env.local`:

```
NEXT_PUBLIC_CESIUM_TOKEN=your_cesium_token_here
```

## Dependencies

- `satellite.js` - For TLE processing and satellite position calculations
- `cesium` - For 3D globe visualization
- `next` - React framework
- `typescript` - Type safety

## Future Enhancements

- Real-time updates using WebSocket or polling
- Satellite orbit prediction and visualization
- Historical satellite tracking
- Integration with live TLE data sources
- Satellite collision detection
- Ground track visualization
