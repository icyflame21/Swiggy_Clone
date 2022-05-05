import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import Button from "@mui/material/Button";
import MarkerIcon from "../Assets/marker.png";
import style from "./Address.module.css";
import { v4 as uuidv4 } from "uuid";
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components';

export const Address=()=>{

  const [isDraweropen, setisDraweropen] = useState(false);
  const [location, setLocation] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      setLocation(success.coords);
    });
  }, []);

const [viewport, setViewport] = useState({
    latitude: 22.2604,
    longitude: 84.8536,
    width: "100%",
    height: "100%",
    zoom: 8,
    pitch:50
})
  return (
    <>
      <Drawer
        anchor="left"
        open={isDraweropen}
        onclose={() => {
          setisDraweropen(false);
        }}
      >
        <Box role="presentation" p={6} width="400px">
          <CloseIcon
            onClick={() => {
              setisDraweropen(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </Box>
       
      </Drawer>
      <Button
        variant="contained"
        onClick={() => {
          setisDraweropen(true);
        }}
      >
        Add New Address
          </Button>
          <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={"pk.eyJ1IjoibmlmdHk2NTgiLCJhIjoiY2wyc21lNW4xMDA2NDNrazRwNWw2d2F6NiJ9.i5AVEPPUMJMIALcaxfJwWw"}
          onViewportChange={(newview) => {
            setViewport(newview);
                  }}
                  mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {/* <Marker
            key={location.latitude}
            latitude={location.longitude}
            longitude={location.longitude}
          >
                      <img src={MarkerIcon} alt="" className={style.marker_icon} />
                      
                  </Marker> */}
                 
        </ReactMapGL>
    </>
  );
};
