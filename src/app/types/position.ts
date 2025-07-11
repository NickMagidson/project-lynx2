export type Position = {
  lat: number;
  lng: number;
  alt?: number;
};

export type SatellitePosition = {
  name: string;
  lat: number;
  lng: number;
  alt: number;
  velocity?: {
    x: number;
    y: number;
    z: number;
  };
  orbitalElements?: {
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
  };
};
