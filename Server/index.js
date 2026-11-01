import path from "path";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { errorHandler, notFound } from "./middlewares/errorMiddlware.js";
import userRouter from "./router/userRouter.js";
import driverRouter from "./router/driverRoute.js";
import riderRouter from "./router/riderRoute.js";
import maps from "./router/maps.js";
import adminRouter from "./router/adminRoute.js";
import connect from "./connect/connect.js";

// Load environment variables
dotenv.config();

// Connect Database
connect();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "EyAuto API Server",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/user", userRouter);
app.use("/api/driver", driverRouter);
app.use("/api/rider", riderRouter);
app.use("/api/maps", maps);
app.use("/api/admin", adminRouter);

// Production Static Client Serving
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Client/dist", "index.html"));
  });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🟢 EyAuto Server running on port ${PORT} [Mode: ${process.env.NODE_ENV || "development"}]`);
});
