# Project Lynx 2.0 🛰️

A satellite visualizer application built with Next.js, TypeScript, and Cesium.js. View over 26,000 satellites in 3D space with orbital information.

![Project Lynx 2.0](https://img.shields.io/badge/Project-Lynx%202.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Cesium](https://img.shields.io/badge/Cesium.js-3D-green?style=for-the-badge)

## ✨ Features

- 🛰️ **Satellite tracking visualization** - View 26,000+ satellites using Two-Line Element (TLE) data
- 🌍 **Interactive 3D globe** - Powered by Cesium.js with realistic Earth terrain and buildings
- 📡 **Multiple satellite constellations** - Starlink, GPS, GLONASS, Galileo, Iridium, and more
- 🎯 **Performance optimization** - Configurable rendering modes for different device capabilities
- 📊 **Detailed orbital data** - Altitude, velocity, inclination, eccentricity, and orbital elements
- 🎨 **Color-coded satellites** - Visual classification by constellation and purpose
- 🔍 **Interactive selection** - Click satellites for detailed information panels
- ⚡ **Server-side rendering** - Optimized performance with Next.js 14


## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cesium Ion Access Token (free at [cesium.com](https://cesium.com/ion/))

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:NickMagidson/project-lynx2.git
   cd project-lynx2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   touch .env
   ```
   Add your Cesium Ion access token:
   ```env
   NEXT_PUBLIC_CESIUM_TOKEN=your_cesium_token_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```



## 📋 Satellite Data

### Supported Constellations
| Constellation | Color       | Description                   |
| ------------- | ----------- | ----------------------------- |
| Starlink      | Cyan        | SpaceX Internet Constellation |
| GPS/NAVSTAR   | Lime        | US Global Positioning System  |
| GLONASS       | Yellow      | Russian Navigation System     |
| Galileo       | Purple      | European Navigation System    |
| BeiDou        | Pink        | Chinese Navigation System     |
| Iridium       | Light Blue  | Communications Constellation  |
| OneWeb        | Light Green | Internet Constellation        |
| Scientific    | White       | Research & Earth Observation  |
| Military      | Gray        | Defense & Intelligence        |
| Commercial    | Gold        | Commercial Communications     |


### Orbital Classifications

- **LEO** (Low Earth Orbit) - Below 2,000 km altitude
- **MEO** (Medium Earth Orbit) - 2,000-35,786 km altitude  
- **GEO** (Geostationary Orbit) - ~35,786 km altitude
- **HEO** (High Earth Orbit) - Above 35,800 km altitude

### TLE Data Format

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

## 🛠️ Technical Architecture

### Core Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Cesium.js** - 3D geospatial visualization
- **satellite.js** - TLE data processing and orbital calculations
- **Material-UI** - Component library for UI elements

### Key Components

```
src/app/
├── Components/
│   ├── CesiumWrapper.tsx        # Cesium loader and wrapper
│   ├── CesiumComponent.tsx      # Main 3D visualization
│   ├── SatelliteInfoPanel.tsx   # Detailed satellite information
│   └── AboutModal.tsx           # Application information
├── config/
│   └── satelliteConfig.ts       # Performance and visual settings
├── services/
│   └── satelliteService.ts      # Satellite data fetching
├── utils/
│   ├── satelliteUtils.ts        # Orbital calculations
│   ├── satelliteDescription.ts  # Info panel generation
│   └── tleParser.ts             # TLE data parsing
├── types/
│   └── position.ts              # TypeScript definitions
└── main/
    └── page.tsx                 # Main application page
```


### Data Flow

1. **TLE Data Loading** - Two-Line Element sets loaded from file or API
2. **Orbital Calculations** - Real-time position calculation using satellite.js
3. **Coordinate Conversion** - ECI to geodetic coordinate transformation
4. **3D Rendering** - Cesium.js renders satellites on interactive globe
5. **Performance Optimization** - LOD scaling and distance-based rendering

## ⚙️ Configuration

### Performance Tuning

Edit `src/app/config/satelliteConfig.ts` to adjust:

```typescript
export const SATELLITE_CONFIG = {
  // Maximum satellites to render
  MAX_SATELLITES: 10000,
  
  // Performance optimizations
  PERFORMANCE: {
    USE_LOD_SCALING: true,           // Distance-based quality
    HIDE_LABELS_BY_DEFAULT: true,    // Show labels on selection only
    USE_DISTANCE_SCALING: true,      // Scale points by distance
  },
  
  // Visual settings
  VISUAL: {
    POINT_SIZE: 1,                   // Satellite point size
    COLORS: { /* constellation colors */ }
  }
};
```

### Rendering Mode

Change performance mode in `src/app/main/page.tsx`:

```typescript
// Options: 'low', 'medium', 'high', 'ultra', 'extreme', 'unlimited'
const satellitePositions = await getSatellitePositions("high");
```



## 🙏 Acknowledgments

- **[Cesium.js](https://cesium.com/)** - 3D geospatial visualization platform
- **[satellite.js](https://github.com/shashwatak/satellite-js)** - SGP4/SDP4 orbital calculations
- **[Celestrak](https://celestrak.org/)** - TLE data source and orbital mechanics expertise
- **[Next.js Team](https://nextjs.org/)** - React framework development
- **[Hyun](https://github.com/hyundotio)** - For the insight on getting Cesium to work with Next.js

## 📚 Additional Documentation

- [TLE Data Format](https://en.wikipedia.org/wiki/Two-line_element_set) - Understanding orbital elements
- [Cesium Documentation](https://cesium.com/learn/) - 3D visualization guide

