import { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Navigation, MapPin } from "lucide-react";

// Fix Leaflet marker icon issue in bundlers
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWithDistance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Driver/Destination coords (default near Valanchery)
  const [driverLat, setDriverLat] = useState(10.8850);
  const [driverLong, setDriverLong] = useState(76.0750);

  // User/Pickup coords
  const [userLat, setUserLat] = useState(10.8801);
  const [userLong, setUserLong] = useState(76.0711);
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    // Parse target coordinates from URL param if available
    if (id && id.includes(",")) {
      const parts = id.split(",");
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        setDriverLat(lat);
        setDriverLong(lng);
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLong(position.coords.longitude);
          setLocationLoaded(true);
        },
        () => {
          // If permission denied, keep default Valanchery coords
          setLocationLoaded(true);
        }
      );
    } else {
      setLocationLoaded(true);
    }
  }, [id]);

  // Calculate distance
  const distanceMeters =
    userLat && userLong && driverLat && driverLong
      ? getDistance(
          { latitude: userLat, longitude: userLong },
          { latitude: driverLat, longitude: driverLong }
        )
      : 0;

  const distanceKm = (distanceMeters / 1000).toFixed(2);
  const centerLat = (userLat + driverLat) / 2;
  const centerLng = (userLong + driverLong) / 2;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between shadow-md z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-lg font-bold text-center">Live Route Tracker (OpenStreetMap)</h1>
        <div className="w-16"></div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex-1 w-full">
        {locationLoaded ? (
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Rider/User Marker */}
            <Marker position={[userLat, userLong]}>
              <Popup>
                <div className="text-sm font-semibold">📍 Pickup / Your Location</div>
              </Popup>
            </Marker>

            {/* Driver/Destination Marker */}
            <Marker position={[driverLat, driverLong]}>
              <Popup>
                <div className="text-sm font-semibold">🛺 EyAuto Driver / Destination</div>
              </Popup>
            </Marker>

            {/* Polyline Route */}
            <Polyline
              positions={[
                [userLat, userLong],
                [driverLat, driverLong],
              ]}
              color="#eab308"
              weight={5}
              dashArray="8, 8"
            />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {/* Ride Info Floating Card */}
        <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto bg-white rounded-xl shadow-xl p-5 border border-yellow-200 z-[1000]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-100 px-2.5 py-1 rounded-full">
              Route Details
            </span>
            <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
              <Navigation size={14} className="text-yellow-600" /> OpenStreetMap Leaflet
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin size={14} className="text-blue-500" /> Total Estimated Distance
              </p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                {distanceKm} <span className="text-base font-normal text-gray-500">km</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Estimated Auto Fare</p>
              <p className="text-2xl font-extrabold text-yellow-600 mt-1">
                ₹{Math.max(30, Math.round(30 + distanceKm * 12))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapWithDistance;
