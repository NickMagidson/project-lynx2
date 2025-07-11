"use client";

import { Cesium3DTileset, type Entity, type Viewer } from "cesium";
import React from "react";
import { SATELLITE_CONFIG, getSatelliteColor } from "../config/satelliteConfig";
import { dateToJulianDate } from "../example_utils/date";
import type { CesiumType } from "../types/cesium";
import type { Position, SatellitePosition } from "../types/position";
//NOTE: This is required to get the stylings for default Cesium UI and controls
import "cesium/Build/Cesium/Widgets/widgets.css";

export const CesiumComponent: React.FunctionComponent<{
  CesiumJs: CesiumType;
  positions?: Position[];
  satellites?: SatellitePosition[];
}> = ({ CesiumJs, positions = [], satellites = [] }) => {
  const cesiumViewer = React.useRef<Viewer | null>(null);
  const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
  const addedScenePrimitives = React.useRef<Cesium3DTileset[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const resetCamera = React.useCallback(async () => {
    // Set the initial camera to look at Seattle
    // No need for dependancies since all data is static for this example.
    if (cesiumViewer.current !== null) {
      cesiumViewer.current.scene.camera.setView({
        destination: CesiumJs.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
        orientation: {
          heading: CesiumJs.Math.toRadians(10),
          pitch: CesiumJs.Math.toRadians(-10),
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanUpPrimitives = React.useCallback(() => {
    //On NextJS 13.4+, React Strict Mode is on by default.
    //The block below will remove all added primitives from the scene.
    addedScenePrimitives.current.forEach((scenePrimitive) => {
      if (cesiumViewer.current !== null) {
        cesiumViewer.current.scene.primitives.remove(scenePrimitive);
      }
    });
    addedScenePrimitives.current = [];
  }, []);

  const initializeCesiumJs = React.useCallback(async () => {
    if (cesiumViewer.current !== null) {
      //Using the Sandcastle example below
      //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
      const osmBuildingsTileset = await CesiumJs.createOsmBuildingsAsync();

      //Clean up potentially already-existing primitives.
      cleanUpPrimitives();

      //Adding tile and adding to addedScenePrimitives to keep track and delete in-case of a re-render.
      const osmBuildingsTilesetPrimitive =
        cesiumViewer.current.scene.primitives.add(osmBuildingsTileset);
      addedScenePrimitives.current.push(osmBuildingsTilesetPrimitive);

      //Position camera to show global view for satellites
      cesiumViewer.current.scene.camera.setView({
        destination: CesiumJs.Cartesian3.fromDegrees(0, 0, 20000000), // Global view
        orientation: {
          heading: 0,
          pitch: CesiumJs.Math.toRadians(-90), // Look down at Earth
          roll: 0,
        },
      });

      // Add satellites to the globe with better performance
      console.log(`Adding ${satellites.length} satellites to Cesium`);

      satellites.forEach((satellite, index) => {
        // Get color based on satellite type (constellation/purpose)
        const colorName = getSatelliteColor(satellite.name);
        const color = (CesiumJs.Color as any)[colorName] || CesiumJs.Color.CYAN;

        cesiumViewer.current?.entities.add({
          //   id: `satellite-${index}`,
          name: satellite.name,
          position: CesiumJs.Cartesian3.fromDegrees(
            satellite.lng,
            satellite.lat,
            satellite.alt
          ),
          point: {
            pixelSize: SATELLITE_CONFIG.VISUAL.POINT_SIZE,
            color: color,
            outlineColor: CesiumJs.Color.BLACK,
            // outlineWidth: SATELLITE_CONFIG.VISUAL.OUTLINE_WIDTH,
            heightReference: CesiumJs.HeightReference.NONE,
            scaleByDistance: SATELLITE_CONFIG.PERFORMANCE.USE_DISTANCE_SCALING
              ? new CesiumJs.NearFarScalar(1.5e6, 3.0, 1.5e8, 0.3)
              : undefined,
          },
          label: {
            text: satellite.name,
            font: SATELLITE_CONFIG.VISUAL.LABEL.FONT,
            style: CesiumJs.LabelStyle.FILL_AND_OUTLINE,
            // outlineWidth: SATELLITE_CONFIG.VISUAL.OUTLINE_WIDTH,
            verticalOrigin: CesiumJs.VerticalOrigin.BOTTOM,
            pixelOffset: new CesiumJs.Cartesian2(
              0,
              SATELLITE_CONFIG.VISUAL.LABEL.PIXEL_OFFSET_Y
            ),
            fillColor: CesiumJs.Color.WHITE,
            outlineColor: CesiumJs.Color.BLACK,
            scaleByDistance: SATELLITE_CONFIG.PERFORMANCE.USE_LOD_SCALING
              ? new CesiumJs.NearFarScalar(1.5e6, 0.8, 1.5e8, 0.0)
              : undefined,
            show: new CesiumJs.ConstantProperty(
              !SATELLITE_CONFIG.PERFORMANCE.HIDE_LABELS_BY_DEFAULT
            ),
          },
        });
      });

      // Add click handler to show satellite info
      cesiumViewer.current.selectedEntityChanged.addEventListener(() => {
        const selectedEntity = cesiumViewer.current?.selectedEntity;
        if (selectedEntity && selectedEntity.name) {
          console.log(`Selected satellite: ${selectedEntity.name}`);
          // Show label for selected satellite
          if (selectedEntity.label) {
            selectedEntity.label.show = new CesiumJs.ConstantProperty(true);
          }
        }
      });

      //Set loaded flag
      setIsLoaded(true);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [satellites, CesiumJs, cleanUpPrimitives]);

  React.useEffect(() => {
    if (cesiumViewer.current === null && cesiumContainerRef.current) {
      //OPTIONAL: Assign access Token here
      //Guide: https://cesium.com/learn/ion/cesium-ion-access-tokens/
      CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

      //NOTE: Always utilize CesiumJs; do not import them from "cesium"
      cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
        //Using the Sandcastle example below
        //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
        terrain: CesiumJs.Terrain.fromWorldTerrain(),
      });

      //NOTE: Example of configuring a Cesium viewer
      cesiumViewer.current.clock.clockStep =
        CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isLoaded) return;
    initializeCesiumJs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satellites, isLoaded, initializeCesiumJs]);

  //NOTE: Examples of typing... See above on "import type"
  const entities: Entity[] = [];
  //NOTE: Example of a function that utilizes CesiumJs features
  const julianDate = dateToJulianDate(CesiumJs, new Date());

  return (
    <div
      ref={cesiumContainerRef}
      id="cesium-container"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default CesiumComponent;
