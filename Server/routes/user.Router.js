import express from "express";
import upload from "./config/multer.js";
import {
  applyForJob,
  getUserData,
  getUserJobApplication,
  updateResume,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/user", getUserData);
router.get("/apply-job", applyForJob);
router.get("/job-applications", getUserJobApplication);
router.get("/update-resume", upload.single("resume"), updateResume);
