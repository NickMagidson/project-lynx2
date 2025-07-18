"use client";

import React from "react";

interface LoadingScreenProps {
  loadingStage: string;
  progress?: number;
  details?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loadingStage,
  progress,
  details,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0c1445 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Satellite Icon Animation */}
      <div
        style={{
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(45deg, #00d4ff, #0099cc)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
          }}
        >
          🛰️
        </div>

        {/* Orbit Animation */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "120px",
            height: "120px",
            border: "2px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotate 4s linear infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: "50%",
              width: "8px",
              height: "8px",
              background: "#00d4ff",
              borderRadius: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px #00d4ff",
            }}
          />
        </div>
      </div>

      {/* Project Title */}
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          background: "linear-gradient(45deg, #00d4ff, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
        }}
      >
        Project Lynx 2.0
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#a0a0a0",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        Satellite Tracking & Visualization
      </p>

      {/* Loading Stage */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            marginBottom: "0.5rem",
            color: "#00d4ff",
          }}
        >
          {loadingStage}
        </h2>
        {details && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "#888",
              marginBottom: "1rem",
            }}
          >
            {details}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div
          style={{
            width: "300px",
            height: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #00d4ff, #0099cc)",
              borderRadius: "4px",
              transition: "width 0.3s ease",
              boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
            }}
          />
        </div>
      )}

      {/* Loading Dots */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "1rem",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              background: "#00d4ff",
              borderRadius: "50%",
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
