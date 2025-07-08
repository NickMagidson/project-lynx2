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
};
