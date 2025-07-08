import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhook.controller.js";

// initialize express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/webhooks", clerkWebhooks);
// connect DB

await connectDB();

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
