import express from "express";

import mailSender from "../utils/mailSender.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

var router = express.Router();

const otpType = {};
// const otpStore = new Map(); // Stores { email: { otp, timestamp } }

// LOGIN AUTHENTICATION
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// send otp signup
router.post("/submitOTP", async (req, res) => {
  try {
    const { email } = req.body;

    // creating otp
    let otpCode = Math.floor(Math.random() * 10000 + 1);

    console.log(otpCode, "emailemailemailemailemailemailemailemail");

    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otpCode}</p>`
    );

    otpType.otpCode = otpCode;
    console.log(otpType, "useruseruseruseruseruseruser");

    console.log("Email sent successfully: ", mailResponse);

    res.status(200).json({
      success: true,
      message: "OTP sent successfullyOTP sent successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists with this email." });
//     }

//     // Generate OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//     const timestamp = Date.now();

//     // Store user details and OTP temporarily
//     otpStore.set(email, { name, password, otp: otpCode, timestamp });

//     // Send OTP via email
//     const mailResponse = await mailSender(
//       email,
//       "Verification Email",
//       `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: <b>${otpCode}</b></p>`
//     );

//     console.log(`OTP sent to ${email}: ${otpCode}`);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully. Please verify to complete signup.",
//     });
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// otp verification signup

router.post("/otpVerification", async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Check if all details are provided
    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }

    console.log(otpType.otpCode);

    // Find recent OTP for the email
    if (otpType.otpCode != otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
        data: null,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "OTP Verified",
        data: existingUser,
      });
    }

    const newUser = await User.create({
      email,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});


// router.post("/otpVerification", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ success: false, message: "Email and OTP are required." });
//     }

//     // Retrieve stored OTP and user data
//     const storedData = otpStore.get(email);

//     if (!storedData) {
//       return res.status(400).json({ success: false, message: "OTP has expired or is invalid." });
//     }

//     // Check if OTP matches
//     if (storedData.otp !== parseInt(otp)) {
//       return res.status(400).json({ success: false, message: "Invalid OTP." });
//     }

//     // OTP is valid; remove from store
//     otpStore.delete(email);

//     // Save the user to the database
//     const hashedPassword = await bcrypt.hash(storedData.password, 10); // Hash the password
//     const newUser = await User.create({
//       name: storedData.name,
//       email,
//       password: hashedPassword,
//     });

//     console.log("User registered:", newUser);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully.",
//       user: { id: newUser._id, name: newUser.name, email: newUser.email },
//     });
//   } catch (error) {
//     console.error("OTP verification error:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


export default router;
