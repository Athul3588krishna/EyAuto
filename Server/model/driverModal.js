import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
    trim: true,
  },
  vehicle: {
    type: String,
    required: true,
    trim: true,
  },
  drivingLicense: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  adhaarCard: {
    type: String,
    trim: true,
  },
  panCard: {
    type: String,
    trim: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Driver", driverSchema);
