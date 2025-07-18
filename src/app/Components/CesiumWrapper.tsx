"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { CesiumType } from "../types/cesium";
import type { Position, SatellitePosition } from "../types/position";
import LoadingScreen from "./LoadingScreen";

const CesiumDynamicComponent = dynamic(() => import("./CesiumComponent"), {
  ssr: false,
});

export const CesiumWrapper: React.FunctionComponent<{
  positions?: Position[];
  satellites?: SatellitePosition[];
}> = ({ positions = [], satellites = [] }) => {
  const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);
  const [loadingStage, setLoadingStage] = React.useState(
    "Initializing Cesium..."
  );
  const [isGlobeReady, setIsGlobeReady] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (CesiumJs !== null) return;

    setLoadingStage("Loading Cesium Engine...");
    setProgress(20);

    const CesiumImportPromise = import("cesium");
    Promise.all([CesiumImportPromise]).then((promiseResults) => {
      const { ...Cesium } = promiseResults[0];
      setCesiumJs(Cesium);
      setLoadingStage("Cesium Engine Loaded");
      setProgress(50);
    });
  }, [CesiumJs]);

  const handleGlobeReady = React.useCallback(() => {
    setIsGlobeReady(true);
    setLoadingStage("Application Ready");
    setProgress(100);

    // Hide loading screen after a brief delay
    setTimeout(() => {
      setLoadingStage("");
    }, 500);
  }, []);

  // Show loading screen if Cesium is not loaded or globe is not ready
  const showLoadingScreen = !CesiumJs || !isGlobeReady || loadingStage !== "";

  return (
    <>
      {showLoadingScreen && (
        <LoadingScreen
          loadingStage={loadingStage}
          progress={progress}
          details={
            !CesiumJs
              ? "Loading 3D visualization engine..."
              : !isGlobeReady
              ? `Rendering ${satellites.length.toLocaleString()} satellites...`
              : undefined
          }
        />
      )}
      {CesiumJs && (
        <CesiumDynamicComponent
          CesiumJs={CesiumJs}
          positions={positions}
          satellites={satellites}
          onGlobeReady={handleGlobeReady}
          onLoadingStageChange={setLoadingStage}
          onProgressChange={setProgress}
        />
      )}
    </>
  );
};

export default CesiumWrapper;
