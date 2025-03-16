import mongoose from "mongoose";

const drivrSchema = new mongoose.Schema({

  driverName: {
    type: String,
    required: true,
    trim: true,
  },
  
  vehicle: {
    type: String, // References the User model
    required: true,
  },
  drivingLicense: {
    type:String, // References the User model
    required: true,
    trim: true,
  },
adhaarCard: {
    type: String,
    // required: true,
    trim: true,
  },

  panCard: {
    type: String,
    // required: true,
    trim: true,
  },
 
  latitude: {
    type: String, // References the User model
    // required: true,
  },

  longitude: {
    type: String, // References the User model
    // required: true,
  },
});

export default mongoose.model("Driver", drivrSchema);