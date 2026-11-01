import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eyauto";
  try {
    const db = await mongoose.connect(uri);
    console.log(`🟢 Connected to MongoDB: ${db.connection.host}`);
    return db;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}`);
    console.warn("⚠️ Please make sure MongoDB is running or configure MONGO_URI in your .env file.");
    return null;
  }
}

export default connect;
