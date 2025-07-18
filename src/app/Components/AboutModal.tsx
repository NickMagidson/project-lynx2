"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const flexRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonStyle = {
  position: "fixed",
  top: "20px",
  left: "20px",
  color: "white",
  padding: "8px 20px",
  background: "rgba(255, 255, 255, 0.35)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  backgroundColor: "rgba(17, 25, 40, 0.75)",
  borderRadius: "6px",
  border: "1px solid rgba(255, 255, 255, 0.125)",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "rgba(17, 25, 40, 0.85)",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "80vh",
  overflow: "auto",
  p: 4,
  background: "rgba(255, 255, 255, 0.35)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  backgroundColor: "rgba(17, 25, 40, 0.75)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.125)",
  "&:focus": {
    outline: "none",
  },
};

const closeButtonStyle = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const AboutModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} sx={buttonStyle}>
        About
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={flexRow}>
            <Typography sx={{ color: "white" }} variant="h3">
              Welcome!
            </Typography>
            <Box sx={closeButtonStyle} onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0,0,256,256"
              >
                <g
                  fillOpacity="0.90196"
                  fill="#ffffff"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <g transform="scale(3.55556,3.55556)">
                    <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z"></path>
                  </g>
                </g>
              </svg>
            </Box>
          </Box>

          <Typography sx={{ mt: 1, color: "white" }} variant="h6">
            This is <strong>Project: Lynx</strong>
          </Typography>

          <Typography sx={{ mt: 2, color: "white" }}>
            A satellite tracking application that lets you view active
            satellites in orbit.
          </Typography>

          <hr
            style={{
              border: "1px solid gray",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <Typography
            sx={{ mt: 2, color: "white", fontWeight: "bold" }}
            variant="h6"
          >
            How does it work?
          </Typography>
          <Typography sx={{ color: "white" }}>
            This pulls from{" "}
            <a
              href="https://celestrak.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Celestrak&apos;s TLE API
            </a>{" "}
            and uses that TLE data to calculate the satellites&apos; position in
            real time. TLE stands for{" "}
            <a
              href="https://en.wikipedia.org/wiki/Two-line_element_set"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Two Line Element Set
            </a>
            , which is a data format encoding a list of orbital elements of an
            Earth-orbiting object for a given point in time. Once the position
            is calculated, it&apos;s displayed on the{" "}
            <a
              href="https://cesium.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Cesium
            </a>{" "}
            3D globe.
          </Typography>

          <hr
            style={{
              border: "1px solid gray",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <Typography
            sx={{ mt: 2, color: "white", fontWeight: "bold" }}
            variant="h6"
          >
            Instructions
          </Typography>
          <Typography sx={{ color: "white" }}>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                Click on the satellites to view their coordinates and orbital
                elements.
              </li>
              <li>
                Double click or use the camera button to track a satellite up
                close
              </li>
              <li>
                Press the home button to re-center the map (your location!)
              </li>
            </ul>
          </Typography>

          <hr
            style={{
              border: "1px solid gray",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <Box sx={flexRow}>
            <Typography sx={{ color: "white" }} variant="body2">
              Created by Nick Magidson
            </Typography>
            <Box>
              <a
                href="https://github.com/NickMagidson"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  marginRight: "15px",
                  textDecoration: "underline",
                }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nick-magidson/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  marginRight: "15px",
                  textDecoration: "underline",
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.nickmagidson.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "underline" }}
              >
                Portfolio
              </a>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AboutModal;
