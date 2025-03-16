import express from "express";
import Driver from "../model/driverModal.js";
import AvailableRide from "../model/avilableRideModal.js";

const router = express.Router();

router.post("/driver-register", async (req, res) => {
  try {
    const { driverName, drivingLicense, adhaarCard, panCard, vehicle } =
      req.body.formData;
    const { latitude, longitude } = req.body.position.coords;

    //   // Validate input
    if (!drivingLicense || !driverName || !vehicle) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    //   // Verify that the userID exists in the User collection
    const existingUser = await Driver.findOne({
      drivingLicense: drivingLicense,
    });

    console.log(
      existingUser,
      "existingUserexistingUserexistingUserexistingUser"
    );

    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "User with the provided driving license does not exist.",
      });
    }

    const newDriver = await Driver.create({
      driverName,
      drivingLicense,
      adhaarCard,
      panCard,
      vehicle,
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

// fetch all drivers

router.get("/get-allDrivers", async (req, res) => {
  try {
    const allDrivers = await Driver.find({});

    console.log(allDrivers,"allDriversallDriversallDriversallDrivers");
    
    res.status(200).json({
      success: true,
      message: "Drivers find successfully.",
      driver: allDrivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during driver registration.",
      error: error.message,
    });
  }
});

// fetch all available rides

router.get("/get-allAvailableRides", async (req, res) => {
  try {
    const allRides = await AvailableRide.find({});

    console.log(allRides, "allRidesallRidesallRidesallRides");

    res.status(200).json({
      success: true,
      message: "Rides find successfully.",
      ride: allRides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during driver registration.",
      error: error.message,
    });
  }
});

// accept ride
router.post("/accept-ride", async (req, res) => {
  try {
    const { rideId } = req.body;
    const ride = await AvailableRide.findById(rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found.",
      });
    }
    ride.status = "Accepted";
    await ride.save();
    res.status(200).json({
      success: true,
      message: "Ride accepted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while accepting the ride.",
      error: error.message,
    });
  }
});

export default router;
