import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDistance } from "geolib";
import { useParams } from "react-router";

const MapWithDistance = () => {
  let { id } = useParams();

  const [driverLong, setDriverLong] = useState("");
  const [driverLat, setDriverLat] = useState("");

  // user
  const [userLong, setUserLong] = useState("");
  const [userLat, setUserLat] = useState("");

  const [latitude, longitude] = id.split(",");

  useEffect(()=>{

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Get latitude and longitude
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
  // driver latitude and longitude
        setDriverLong(longitude);
        setDriverLat(latitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  

  },[])

 
  // Calculate distance using geolib
  const distance = getDistance( { latitude: userLat, longitude: userLong },  { latitude:driverLat, longitude: driverLong });

  // Set up the map center and zoom
  const center = [51.5074, -0.1278]; // London as the center

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[userLat, userLong]}>
          <Popup>Location 1: London</Popup>
        </Marker>
        <Marker position={[driverLat, driverLong]}>
          <Popup>Location 2: Paris</Popup>
        </Marker>

        {/* Draw a line between the two points */}
        <Polyline
          positions={[
            [userLat, userLong],
            [userLat,userLong],
          ]}
          color="blue"
        />
      </MapContainer>

      {/* Display the distance between the two points */}
      <div>
        <h3>Distance: {distance / 1000} km</h3>{" "}
        {/* distance is in meters, so divide by 1000 to get km */}
      </div>
    </div>
  );
};

export default MapWithDistance;
