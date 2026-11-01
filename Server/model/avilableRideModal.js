import mongoose from "mongoose";

const availableRideSchema = new mongoose.Schema({
  destinationFrom: {
    type: String,
    required: true,
    trim: true,
  },
  destinationTo: {
    type: String,
    required: true,
    trim: true,
  },
  originCoords: {
    lat: Number,
    lng: Number,
  },
  destinationCoords: {
    lat: Number,
    lng: Number,
  },
  rideType: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  distance: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  rideOtp: {
    type: String,
    default: () => Math.floor(1000 + Math.random() * 9000).toString(),
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Ongoing", "Completed", "Cancelled"],
    default: "Pending",
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  driverName: {
    type: String,
    default: "Suresh Kumar",
  },
  driverPhone: {
    type: String,
    default: "9847123456",
  },
  vehicleNumber: {
    type: String,
    default: "KL 55 Z 1234",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AvailableRide = mongoose.model("AvailableRide", availableRideSchema);

export default AvailableRide;
