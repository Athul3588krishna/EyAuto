import express from "express";
import axios from "axios";
import getFare from "../utils/rider.js";

const router = express.Router();

const OSM_USER_AGENT = "EyAuto-RideHailing/1.0 (support@eyauto.local)";

// Haversine formula fallback for distance calculation
function haversineDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.25); // Road winding factor 1.25
}

// Geocode using OpenStreetMap Nominatim
async function geocodeWithOSM(address) {
  if (!address || typeof address !== "string") {
    throw new Error("Address is required");
  }

  // Check if address is already lat,lng
  const coordMatch = address.trim().match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (coordMatch) {
    return {
      lat: parseFloat(coordMatch[1]),
      lng: parseFloat(coordMatch[3]),
      displayName: address,
    };
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`;

    const response = await axios.get(url, {
      headers: { "User-Agent": OSM_USER_AGENT },
      timeout: 5000,
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
        displayName: response.data[0].display_name,
      };
    }
  } catch (err) {
    console.warn("OSM Geocoding warning:", err.message);
  }

  // Fallback coordinates (default: Valanchery, Kerala)
  return {
    lat: 10.8801 + (Math.random() - 0.5) * 0.02,
    lng: 76.0711 + (Math.random() - 0.5) * 0.02,
    displayName: address,
  };
}

// 1. Calculate Distance & Fare using OpenStreetMap (OSRM / Nominatim)
router.post("/calculate-distance", async (req, res) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        error: "Origin and destination are required",
      });
    }

    const [originCoords, destCoords] = await Promise.all([
      geocodeWithOSM(origin),
      geocodeWithOSM(destination),
    ]);

    let distanceMeters = 0;
    let durationSeconds = 0;

    // Try OSRM route calculation
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=false`;
      const osrmRes = await axios.get(osrmUrl, {
        headers: { "User-Agent": OSM_USER_AGENT },
        timeout: 5000,
      });

      if (
        osrmRes.data &&
        osrmRes.data.routes &&
        osrmRes.data.routes.length > 0
      ) {
        distanceMeters = osrmRes.data.routes[0].distance;
        durationSeconds = osrmRes.data.routes[0].duration;
      }
    } catch (osrmError) {
      console.warn("OSRM routing warning (using fallback):", osrmError.message);
    }

    // Fallback if OSRM was unreachable or returned 0
    if (!distanceMeters || distanceMeters < 50) {
      distanceMeters = haversineDistanceMeters(
        originCoords.lat,
        originCoords.lng,
        destCoords.lat,
        destCoords.lng
      );
      if (distanceMeters < 1000) distanceMeters = 2500; // minimum reasonable trip
      const averageSpeedKmh = 28; // auto rickshaw city speed
      durationSeconds = Math.round((distanceMeters / (averageSpeedKmh * 1000)) * 3600);
    }

    const fare = await getFare(distanceMeters, durationSeconds);
    const durationMinutes = Math.max(1, Math.round(durationSeconds / 60));
    const distanceKm = (distanceMeters / 1000).toFixed(1);

    const resData = {
      price: fare,
      time: `${durationMinutes} mins`,
      distance: `${distanceKm} km`,
      originCoords,
      destinationCoords: destCoords,
    };

    return res.status(200).json(resData);
  } catch (error) {
    console.error("Error calculating distance:", error);
    return res.status(500).json({
      error: "Unable to calculate distance and fare",
      details: error.message,
    });
  }
});

// 2. Get Coordinate using OpenStreetMap Nominatim
router.post("/get-coordinate", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const coords = await geocodeWithOSM(address);
    return res.status(200).json({
      lat: coords.lat,
      lng: coords.lng,
      displayName: coords.displayName,
    });
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return res.status(500).json({ error: "Server error fetching coordinates" });
  }
});

// 3. Autocomplete Place Suggestions using OpenStreetMap Nominatim
router.post("/get-sugession", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address || address.trim().length === 0) {
      return res.status(200).json([]);
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&addressdetails=1&limit=5&countrycodes=in`;

      const response = await axios.get(url, {
        headers: { "User-Agent": OSM_USER_AGENT },
        timeout: 4000,
      });

      if (response.data && response.data.length > 0) {
        const suggestions = response.data.map((item) => ({
          description: item.display_name,
          place_id: String(item.place_id),
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        }));
        return res.status(200).json(suggestions);
      }
    } catch (osmErr) {
      console.warn("OSM suggestion warning:", osmErr.message);
    }

    // Default regional suggestions for Valanchery & vicinity
    const localPlaces = [
      "Valanchery Bus Stand, Malappuram, Kerala",
      "Kuttippuram Railway Station, Kerala",
      "Kottakkal Arya Vaidya Sala, Kerala",
      "Tirur Town, Malappuram, Kerala",
      "Perinthalmanna Town, Kerala",
    ];

    const fallbackSuggestions = localPlaces
      .filter((place) =>
        place.toLowerCase().includes(address.toLowerCase())
      )
      .map((place, idx) => ({
        description: place,
        place_id: `local-${idx}`,
        lat: 10.8801,
        lng: 76.0711,
      }));

    return res.status(200).json(fallbackSuggestions.length > 0 ? fallbackSuggestions : [
      {
        description: `${address}, Valanchery, Kerala, India`,
        place_id: "custom-1",
        lat: 10.8801,
        lng: 76.0711,
      }
    ]);
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    return res.status(500).json({ error: "Server error fetching suggestions" });
  }
});

export default router;
