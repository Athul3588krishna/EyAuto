import express from "express";
import Ride from "../model/rideModal.js"; // Assuming the Ride schema is in `model/rideModel.js`
import User from "../model/userModel.js"; // For user validation
import { Client } from "@googlemaps/google-maps-services-js";
import AvailableRide from "../model/avilableRideModal.js";

const router = express.Router();
const client = new Client();

// Helper Function
const getCoordinates = async (address) => {
  try {
    const response = await client.geocode({
      params: { address, key: process.env.GOOGLE_MAPS_API_KEY },
    });
    return response.data.results[0].geometry.location; // { lat, lng }
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    throw new Error("Failed to fetch location coordinates.");
  }
};

// Book Ride Route
router.post("/book-ride", async (req, res) => {
  try {
    const { userID, startFrom, endTo } = req.body;

    // Validate input
    if (!userID || !startFrom || !endTo) {
      return res.status(400).json({
        success: false,
        message: "userID, startFrom, and endTo are required.",
      });
    }

    // Fetch Coordinates
    const startCoordinates = await getCoordinates(startFrom);
    const endCoordinates = await getCoordinates(endTo);

    // Save Ride
    const newRide = await Ride.create({
      userID,
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

// Submit Ride
router.post("/submit-ride", async (req, res) => {
  try {
    const { status, destination, rideType, price, distance, time } = req.body;
    console.log(req.body);

    const newRide = await AvailableRide.create({
      destinationFrom: destination.from,
      destinationTo: destination.to,
      rideType,
      price,
      distance,
      time,
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      message: "Ride submitted successfully.",
      rideId: newRide.id
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
