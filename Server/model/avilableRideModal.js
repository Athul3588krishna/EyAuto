import mongoose from "mongoose";

const drivrSchema = new mongoose.Schema({
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
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Completed", "Cancelled"],
        default: "Pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

const AvailableRide = mongoose.model("AvailableRide", drivrSchema);

export default AvailableRide;