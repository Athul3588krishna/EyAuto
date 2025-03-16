import path from "path";
import http from "http";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import { errorHandler, notFound } from "./middlewares/errorMiddlware.js";
import userRouter from "./router/userRouter.js"
import driverRouter from "./router/driverRoute.js"
import riderRouter from "./router/riderRoute.js"
import maps from "./router/maps.js"
import connect from "./connect/connect.js"

// dotenv Configration
dotenv.config();


// db Connectig
connect();


const app = express();

const server = http.createServer(app);



app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  }));


app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json({ limit: "10mb" }));

// redirect api to router

// Lead Auth
app.use("/api/user/", userRouter);
app.use("/api/driver/", driverRouter);
app.use("/api/rider/", riderRouter);
app.use("/api/maps/", maps);

let __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.use("*", (req, res) => {
    console.log("server started");
    res.send("helllo")
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    console.log(
      `🟢 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
