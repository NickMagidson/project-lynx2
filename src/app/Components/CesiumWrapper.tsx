"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { CesiumType } from "../types/cesium";
import type { Position, SatellitePosition } from "../types/position";

const CesiumDynamicComponent = dynamic(() => import("./CesiumComponent"), {
  ssr: false,
});

export const CesiumWrapper: React.FunctionComponent<{
  positions?: Position[];
  satellites?: SatellitePosition[];
}> = ({ positions = [], satellites = [] }) => {
  const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);

  React.useEffect(() => {
    if (CesiumJs !== null) return;
    const CesiumImportPromise = import("cesium");
    Promise.all([CesiumImportPromise]).then((promiseResults) => {
      const { ...Cesium } = promiseResults[0];
      setCesiumJs(Cesium);
    });
  }, [CesiumJs]);

  return CesiumJs ? (
    <CesiumDynamicComponent
      CesiumJs={CesiumJs}
      positions={positions}
      satellites={satellites}
    />
  ) : null;
};

export default CesiumWrapper;
