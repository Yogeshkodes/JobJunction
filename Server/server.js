import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhook.controller.js";

import companyRouter from "./routes/company.Router.js";
import jobRouter from "./routes/job.Router.js";
import userRouter from "./routes/user.Router.js";

import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

// initialize express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/v1", companyRouter);
app.use("/api/v1", jobRouter);
app.use("/api/v1", userRouter);

app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);

// connect DB

await connectDB();

// Cludinary connection
await connectCloudinary();

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
