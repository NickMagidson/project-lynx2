"use client";

import React from "react";
import { SATELLITE_CONFIG, getSatelliteType } from "../config/satelliteConfig";
import { SatellitePosition } from "../types/position";
import { OrbitType, getOrbitType, getOrbitTypeDisplayName, getOrbitTypeStats } from "../utils/orbitUtils";

interface SatelliteFilterProps {
  satellites: SatellitePosition[];
  onFilterChange: (filteredSatellites: SatellitePosition[]) => void;
}

export type SatelliteCategory = keyof typeof SATELLITE_CONFIG.VISUAL.COLORS | "ALL";

export const SatelliteFilter: React.FC<SatelliteFilterProps> = ({
  satellites,
  onFilterChange,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<SatelliteCategory>("ALL");
  const [selectedOrbitType, setSelectedOrbitType] = React.useState<OrbitType>("ALL");

  // Get unique categories from satellites
  const getAvailableCategories = React.useMemo(() => {
    const categories = new Set<keyof typeof SATELLITE_CONFIG.VISUAL.COLORS>();
    satellites.forEach((satellite) => {
      const type = getSatelliteType(satellite.name);
      categories.add(type);
    });
    return Array.from(categories).sort();
  }, [satellites]);

  // Get available orbit types from satellites
  const getAvailableOrbitTypes = React.useMemo(() => {
    return getOrbitTypeStats(satellites);
  }, [satellites]);

  // Get category display name
  const getCategoryDisplayName = (category: SatelliteCategory): string => {
    if (category === "ALL") return "All Satellites";
    return category.replace(/_/g, " ");
  };

  // Get satellite count for each category
  const getCategoryCount = (category: SatelliteCategory): number => {
    if (category === "ALL") {
      return getFilteredSatellites(category, selectedOrbitType).length;
    }
    return getFilteredSatellites(category, selectedOrbitType).length;
  };

  // Get satellite count for each orbit type
  const getOrbitTypeCount = (orbitType: OrbitType): number => {
    if (orbitType === "ALL") {
      return getFilteredSatellites(selectedCategory, orbitType).length;
    }
    return getFilteredSatellites(selectedCategory, orbitType).length;
  };

  // Apply both category and orbit type filters
  const getFilteredSatellites = (category: SatelliteCategory, orbitType: OrbitType): SatellitePosition[] => {
    return satellites.filter((satellite) => {
      const matchesCategory = category === "ALL" || getSatelliteType(satellite.name) === category;
      const matchesOrbitType = orbitType === "ALL" || getOrbitType(satellite.alt) === orbitType;
      return matchesCategory && matchesOrbitType;
    });
  };

  // Handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as SatelliteCategory;
    setSelectedCategory(category);
    const filtered = getFilteredSatellites(category, selectedOrbitType);
    onFilterChange(filtered);
  };

  // Handle orbit type change
  const handleOrbitTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orbitType = event.target.value as OrbitType;
    setSelectedOrbitType(orbitType);
    const filtered = getFilteredSatellites(selectedCategory, orbitType);
    onFilterChange(filtered);
  };

  React.useEffect(() => {
    // Initialize with all satellites
    onFilterChange(satellites);
  }, [satellites, onFilterChange]);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        backgroundColor: "rgba(42, 42, 42, 0.95)",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        minWidth: "280px",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="satellite-category-filter"
          style={{
            display: "block",
            color: "#00d4ff",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Filter by Category
        </label>
        <select
          id="satellite-category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <option value="ALL">
            {getCategoryDisplayName("ALL")} ({getCategoryCount("ALL")})
          </option>
          {getAvailableCategories.map((category) => (
            <option key={category} value={category}>
              {getCategoryDisplayName(category)} ({getCategoryCount(category)})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="orbit-type-filter"
          style={{
            display: "block",
            color: "#ffd700",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Filter by Orbit Type
        </label>
        <select
          id="orbit-type-filter"
          value={selectedOrbitType}
          onChange={handleOrbitTypeChange}
          style={{
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <option value="ALL">
            {getOrbitTypeDisplayName("ALL")} ({getOrbitTypeCount("ALL")})
          </option>
          {getAvailableOrbitTypes.map((orbitStat) => (
            <option key={orbitStat.type} value={orbitStat.type}>
              {orbitStat.displayName} ({getOrbitTypeCount(orbitStat.type)})
            </option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "10px" }}>
        Showing {getFilteredSatellites(selectedCategory, selectedOrbitType).length} of {satellites.length} satellites
      </div>

      {/* Color legend for selected filters */}
      <div style={{ paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        {selectedCategory !== "ALL" && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: SATELLITE_CONFIG.VISUAL.COLORS[selectedCategory].toLowerCase(),
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            />
            <span style={{ fontSize: "11px", color: "#ccc" }}>
              Category: {getCategoryDisplayName(selectedCategory)}
            </span>
          </div>
        )}
        {selectedOrbitType !== "ALL" && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: getAvailableOrbitTypes.find(o => o.type === selectedOrbitType)?.color || "#ccc",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            />
            <span style={{ fontSize: "11px", color: "#ccc" }}>
              Orbit: {getOrbitTypeDisplayName(selectedOrbitType)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SatelliteFilter;
