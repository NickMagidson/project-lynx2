"use client";

import React from "react";
import { Suspense } from "react";
import LoadingScreen from "../Components/LoadingScreen";

interface SatelliteDataWrapperProps {
  children: React.ReactNode;
}

export const SatelliteDataWrapper: React.FC<SatelliteDataWrapperProps> = ({
  children,
}) => {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          loadingStage="Loading Satellite Data..."
          progress={30}
          details="Fetching TLE data and calculating positions..."
        />
      }
    >
      {children}
    </Suspense>
  );
};

export default SatelliteDataWrapper;
