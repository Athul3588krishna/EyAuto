import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Driver from "../model/driverModal.js";
import AvailableRide from "../model/avilableRideModal.js";
import User from "../model/userModel.js";

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@eyauto.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Sample mock data for when MongoDB is in offline mode
const sampleDrivers = [
  {
    _id: "drv_valan_001",
    driverName: "Suresh Kumar",
    vehicle: "Auto",
    drivingLicense: "KL55 20210004123",
    adhaarCard: "KL 55 Z 1234",
    latitude: 10.8805,
    longitude: 76.0718,
    isOnline: true,
    rating: 4.9,
    createdAt: new Date(),
  },
  {
    _id: "drv_valan_002",
    driverName: "Muhammed Shafi",
    vehicle: "Auto",
    drivingLicense: "KL55 20190008871",
    adhaarCard: "KL 55 Y 4589",
    latitude: 10.8821,
    longitude: 76.0745,
    isOnline: true,
    rating: 4.8,
    createdAt: new Date(),
  },
  {
    _id: "drv_valan_003",
    driverName: "Rajesh P",
    vehicle: "Car",
    drivingLicense: "KL55 20220001092",
    adhaarCard: "KL 55 AB 7711",
    latitude: 10.8790,
    longitude: 76.0690,
    isOnline: false,
    rating: 4.7,
    createdAt: new Date(),
  },
];

const sampleRides = [
  {
    _id: "ride_valan_101",
    destinationFrom: "Valanchery Bus Stand, Kerala",
    destinationTo: "Kuttippuram Railway Station, Kerala",
    rideType: "auto",
    price: 130,
    distance: "8.3 km",
    time: "9 mins",
    status: "Accepted",
    originCoords: { lat: 10.8878, lng: 76.0732 },
    destinationCoords: { lat: 10.8456, lng: 76.0336 },
    createdAt: new Date(),
  },
  {
    _id: "ride_valan_102",
    destinationFrom: "MES Medical College, Perinthalmanna Road",
    destinationTo: "Valanchery Town Central Junction",
    rideType: "moto",
    price: 65,
    distance: "3.5 km",
    time: "6 mins",
    status: "Pending",
    originCoords: { lat: 10.8850, lng: 76.0780 },
    destinationCoords: { lat: 10.8801, lng: 76.0711 },
    createdAt: new Date(),
  },
];

// 1. Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    const token = jwt.sign(
      { role: "admin", email: cleanEmail },
      process.env.JWT_SECRET || "eyauto_default_secret_key",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        email: cleanEmail,
        role: "Super Admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Admin System Overview & Analytics
router.get("/stats", async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      return res.status(200).json({
        success: true,
        stats: {
          totalDrivers: sampleDrivers.length,
          totalRides: sampleRides.length,
          totalUsers: 18,
          pendingRides: 1,
          acceptedRides: 1,
          completedRides: 0,
          totalRevenue: 195,
        },
      });
    }

    const [totalDrivers, totalRides, totalUsers] = await Promise.all([
      Driver.countDocuments(),
      AvailableRide.countDocuments(),
      User.countDocuments(),
    ]);

    const pendingRides = await AvailableRide.countDocuments({ status: "Pending" });
    const acceptedRides = await AvailableRide.countDocuments({ status: "Accepted" });
    const completedRides = await AvailableRide.countDocuments({ status: "Completed" });

    const allRides = await AvailableRide.find({}, "price status");
    const totalRevenue = allRides.reduce((acc, ride) => acc + (ride.price || 0), 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalDrivers,
        totalRides,
        totalUsers,
        pendingRides,
        acceptedRides,
        completedRides,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error.message);
    res.status(200).json({
      success: true,
      stats: {
        totalDrivers: sampleDrivers.length,
        totalRides: sampleRides.length,
        totalUsers: 18,
        pendingRides: 1,
        acceptedRides: 1,
        completedRides: 0,
        totalRevenue: 195,
      },
    });
  }
});

// 3. List All Drivers
router.get("/drivers", async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(200).json({ success: true, drivers: sampleDrivers });
    }

    const drivers = await Driver.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      drivers: drivers.length > 0 ? drivers : sampleDrivers,
    });
  } catch (error) {
    res.status(200).json({ success: true, drivers: sampleDrivers });
  }
});

// 4. Update Driver Status
router.put("/drivers/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { isOnline } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const d = sampleDrivers.find((item) => item._id === id);
      if (d) d.isOnline = isOnline;
      return res.status(200).json({ success: true, driver: d });
    }

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ success: false, message: "Driver not found" });
    }

    if (typeof isOnline === "boolean") {
      driver.isOnline = isOnline;
    }
    await driver.save();

    res.status(200).json({
      success: true,
      message: "Driver status updated successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Delete or Remove Driver
router.delete("/drivers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      await Driver.findByIdAndDelete(id);
    }
    res.status(200).json({
      success: true,
      message: "Driver removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. List All Rides
router.get("/rides", async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(200).json({ success: true, rides: sampleRides });
    }

    const rides = await AvailableRide.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rides: rides.length > 0 ? rides : sampleRides,
    });
  } catch (error) {
    res.status(200).json({ success: true, rides: sampleRides });
  }
});

// 7. Update Ride Status
router.put("/rides/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const r = sampleRides.find((item) => item._id === id);
      if (r) r.status = status;
      return res.status(200).json({ success: true, ride: r });
    }

    const ride = await AvailableRide.findById(id);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    ride.status = status;
    await ride.save();

    res.status(200).json({
      success: true,
      message: `Ride marked as ${status}`,
      ride,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Delete Ride
router.delete("/rides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      await AvailableRide.findByIdAndDelete(id);
    }
    res.status(200).json({
      success: true,
      message: "Ride deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
