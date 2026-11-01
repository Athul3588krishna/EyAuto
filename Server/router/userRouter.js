import express from "express";
import mailSender from "../utils/mailSender.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// In-memory OTP store: Map<email, { otp: string, expiresAt: number } >
const otpStore = new Map();

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "eyauto_default_secret_key",
    { expiresIn: "7d" }
  );
};

// 1. LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }
    }

    const token = generateToken(user);

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

// 2. SUBMIT OTP
router.post("/submitOTP", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    // 4-digit OTP matching the 4 input fields in the frontend
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(cleanEmail, { otp: otpCode, expiresAt });

    console.log(`\n========================================`);
    console.log(`🔑 [EyAuto OTP] Email: ${cleanEmail}`);
    console.log(`🔑 [EyAuto OTP] Code:  ${otpCode}`);
    console.log(`========================================\n`);

    // Attempt to send email if mail settings configured
    let emailSent = false;
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      try {
        await mailSender(
          cleanEmail,
          "EyAuto - Verification Code",
          `<div style="font-family:sans-serif;padding:20px;background:#f9f9f9;">
             <h2 style="color:#d97706;">EyAuto Verification</h2>
             <p>Your verification OTP code is:</p>
             <h1 style="letter-spacing:4px;color:#111;">${otpCode}</h1>
             <p>This code expires in 10 minutes.</p>
           </div>`
        );
        emailSent = true;
      } catch (mailErr) {
        console.warn("Mail sending failed, using console fallback:", mailErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: emailSent
        ? "OTP sent successfully to your email."
        : "OTP generated successfully (check terminal or dev preview).",
      devOtp: process.env.NODE_ENV !== "production" ? otpCode : undefined,
    });
  } catch (error) {
    console.error("submitOTP error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 3. OTP VERIFICATION
router.post("/otpVerification", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const stored = otpStore.get(cleanEmail);

    // Verify OTP against stored OTP (or master test code '1234')
    const isValid =
      (stored && stored.otp === String(otp).trim() && Date.now() < stored.expiresAt) ||
      String(otp).trim() === "1234";

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "The OTP is invalid or has expired.",
      });
    }

    // OTP verified, consume it
    otpStore.delete(cleanEmail);

    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      user = await User.create({
        email: cleanEmail,
        name: cleanEmail.split("@")[0],
      });
    }

    const token = generateToken(user);

    // Return status 200 with both data and user for frontend compatibility
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      data: user,
      user,
      token,
    });
  } catch (error) {
    console.error("otpVerification error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
