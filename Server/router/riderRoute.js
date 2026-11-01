import express from "express";
import axios from "axios";
import Ride from "../model/rideModal.js";
import AvailableRide from "../model/avilableRideModal.js";

const router = express.Router();
const OSM_USER_AGENT = "EyAuto-RideHailing/1.0 (support@eyauto.local)";

// Helper function to geocode with OpenStreetMap Nominatim
const getCoordinates = async (address) => {
  if (!address) return { lat: 10.8801, lng: 76.0711 };

  const match = address.trim().match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[3]) };
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
      };
    }
  } catch (error) {
    console.warn("Geocoding Error with OSM:", error.message);
  }
  return { lat: 10.8801, lng: 76.0711 };
};

// Book Ride Route
router.post("/book-ride", async (req, res) => {
  try {
    const { userID, startFrom, endTo } = req.body;

    if (!startFrom || !endTo) {
      return res.status(400).json({
        success: false,
        message: "startFrom and endTo are required.",
      });
    }

    const [startCoordinates, endCoordinates] = await Promise.all([
      getCoordinates(startFrom),
      getCoordinates(endTo),
    ]);

    const newRide = await Ride.create({
      userID: userID || null,
      startFrom,
      endTo,
      startCoordinates,
      endCoordinates,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Ride booked successfully.",
      ride: newRide,
    });
  } catch (error) {
    console.error("Book Ride Error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while booking the ride.",
      error: error.message,
    });
  }
});

// Submit Ride (from rider chooser)
router.post("/submit-ride", async (req, res) => {
  try {
    const { status, destination, rideType, price, distance, time, originCoords, destinationCoords } = req.body;

    const fromAddress = destination?.from || "Origin";
    const toAddress = destination?.to || "Destination";
    // 4-digit Ride Start OTP
    const rideOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newRide = await AvailableRide.create({
      destinationFrom: fromAddress,
      destinationTo: toAddress,
      originCoords: originCoords || null,
      destinationCoords: destinationCoords || null,
      rideType: rideType || "auto",
      price: Number(price) || 50,
      distance: String(distance || "0 km"),
      time: String(time || "0 mins"),
      rideOtp,
      status: status || "Pending",
    });

    res.status(200).json({
      success: true,
      message: "Ride submitted successfully.",
      rideId: newRide._id,
      rideOtp: newRide.rideOtp,
      ride: newRide,
    });
  } catch (error) {
    console.error("Submit Ride Error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting the ride.",
      error: error.message,
    });
  }
});

// Check Ride Status
router.get("/check-ride-status", async (req, res) => {
  try {
    const { rideId } = req.query;
    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "rideId is required.",
      });
    }

    const ride = await AvailableRide.findById(rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ride status retrieved successfully.",
      rideStats: ride.status,
      rideOtp: ride.rideOtp,
      driverName: ride.driverName || "Suresh Kumar",
      driverPhone: ride.driverPhone || "9847123456",
      vehicleNumber: ride.vehicleNumber || "KL 55 Z 1234",
      price: ride.price,
      ride,
    });
  } catch (error) {
    console.error("Check Ride Status Error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while checking the ride status.",
      error: error.message,
    });
  }
});

export default router;
