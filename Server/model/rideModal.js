import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startFrom: {
    type: String,
    required: true,
    trim: true,
  },
  endTo: {
    type: String,
    required: true,
    trim: true,
  },
  startCoordinates: {
    lat: Number,
    lng: Number,
  },
  endCoordinates: {
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Ongoing", "Completed", "Cancelled", "Accepted"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ride", rideSchema);
