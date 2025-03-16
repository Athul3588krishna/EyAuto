import express from "express";
import axios from "axios";
import { body } from "express-validator";
// import authenticateToken from "../middleware/authenticateToken";
import getFare  from "../utils/rider.js";

const router = express.Router();

router.post(
  "/calculate-distance",
  //   authenticateToken,
  [
    body("origin").isString().isLength({ min: 3 }),
    body("destination").isString().isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      throw new Error("Origin and destination are required");
    }

    try {
      const apiKey = "AIzaSyAjp35o4It0Htr4IM15mtpb_fUJYInBHms";
      // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      //   origin
      // )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

      const response = await axios.get(url);
      //   const distance = response.data.rows[0].elements[0].distance.text;
      if (response.data.status === "OK") {
        if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
          throw new Error("No routes found");
        }
        const distance = response.data.rows[0].elements[0].distance;
        const duration = response.data.rows[0].elements[0].duration;
        const fare = await getFare(distance.value, duration.value);
        const resData = {
          price: fare,
          time: duration.text,
          distance: distance.text,
        };
        console.log(resData);

        res.json(resData);
      } else {
        throw new Error("Unable to fetch distance and time");
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
      res.status(500).json({ error: "Unable to calculate distance" });
    }
  }
);

router.post(
  "/get-coordinate",
  //   authenticateToken,
  body("address").isString().isLength({ min: 3 }),
  async (req, res) => {
    const { address } = req.body; // Fixed typo
    const apiKey = "AIzaSyAjp35o4It0Htr4IM15mtpb_fUJYInBHms";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location; // Fixed access to `results[0]`
        res.json({
          lat: location.lat,
          lng: location.lng,
        });
      } else {
        res.status(400).json({
          error: response.data.error_message || "Unable to get coordinates",
        });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post(
  "/get-sugession",
  // authenticateToken,
  async (req, res) => {
    const { address } = req.body;
    const apiKey = "AIzaSyAjp35o4It0Htr4IM15mtpb_fUJYInBHms";
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.data.status === "OK") {
        const sugessions = response.data.predictions.map((prediction) => {
          return {
            description: prediction.description,
            place_id: prediction.place_id,
          };
        });

        res.json(sugessions);
      } else {
        res.status(400).json({
          error: response.data.error_message || "Unable to get sugessions",
        });
      }
    } catch (error) {
      console.error("Error fetching sugessions:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
