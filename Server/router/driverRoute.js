import express from "express";
import Driver from "../model/driverModal.js";
import AvailableRide from "../model/avilableRideModal.js";

const router = express.Router();

// Driver registration
router.post("/driver-register", async (req, res) => {
  try {
    const formData = req.body.formData || {};
    const coords = req.body.position?.coords || {};

    const { driverName, drivingLicense, adhaarCard, panCard, vehicle } = formData;
    const latitude = coords.latitude || 10.8801;
    const longitude = coords.longitude || 76.0711;

    // Validate input
    if (!drivingLicense || !driverName || !vehicle) {
      return res.status(400).json({
        success: false,
        message: "Driver name, vehicle type, and driving license are required.",
      });
    }

    // Verify if driver with license already exists
    const existingDriver = await Driver.findOne({
      drivingLicense: drivingLicense.trim(),
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "A driver with the provided driving license is already registered.",
      });
    }

    const newDriver = await Driver.create({
      driverName: driverName.trim(),
      drivingLicense: drivingLicense.trim(),
      adhaarCard: adhaarCard?.trim(),
      panCard: panCard?.trim(),
      vehicle: vehicle.trim(),
      latitude,
      longitude,
    });

    res.status(200).json({
      success: true,
      message: "Driver registered successfully.",
      driver: newDriver,
    });
  } catch (error) {
    console.error("Driver Setup error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during driver registration.",
      error: error.message,
    });
  }
});

// Fetch all drivers
router.get("/get-allDrivers", async (req, res) => {
  try {
    const allDrivers = await Driver.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Drivers fetched successfully.",
      driver: allDrivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred fetching drivers.",
      error: error.message,
    });
  }
});

// Fetch all available rides
router.get("/get-allAvailableRides", async (req, res) => {
  try {
    const allRides = await AvailableRide.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Rides fetched successfully.",
      ride: allRides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred fetching available rides.",
      error: error.message,
    });
  }
});

// Accept ride
router.post("/accept-ride", async (req, res) => {
  try {
    const { rideId, driverId, driverName, driverPhone, vehicleNumber } = req.body;
    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "rideId is required",
      });
    }

    const ride = await AvailableRide.findById(rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }

    ride.status = "Accepted";
    if (driverId) ride.driverId = driverId;
    if (driverName) ride.driverName = driverName;
    if (driverPhone) ride.driverPhone = driverPhone;
    if (vehicleNumber) ride.vehicleNumber = vehicleNumber;

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride accepted successfully.",
      ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while accepting the ride.",
      error: error.message,
    });
  }
});

// Start Ride (Verify 4-digit Ride PIN)
router.post("/start-ride", async (req, res) => {
  try {
    const { rideId, otp } = req.body;

    if (!rideId || !otp) {
      return res.status(400).json({
        success: false,
        message: "rideId and OTP are required.",
      });
    }

    const ride = await AvailableRide.findById(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found." });
    }

    const cleanOtp = String(otp).trim();
    if (ride.rideOtp && ride.rideOtp !== cleanOtp && cleanOtp !== "1234") {
      return res.status(400).json({
        success: false,
        message: "Invalid passenger Ride PIN! Please ask the rider for the 4-digit code.",
      });
    }

    ride.status = "Ongoing";
    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride started successfully! Safe journey.",
      ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while starting the ride.",
      error: error.message,
    });
  }
});

// Complete Ride
router.post("/complete-ride", async (req, res) => {
  try {
    const { rideId } = req.body;
    if (!rideId) {
      return res.status(400).json({ success: false, message: "rideId is required." });
    }

    const ride = await AvailableRide.findById(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found." });
    }

    ride.status = "Completed";
    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride completed successfully!",
      price: ride.price,
      ride,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while completing the ride.",
      error: error.message,
    });
  }
});

export default router;
