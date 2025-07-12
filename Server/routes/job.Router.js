import express from "express";
import { getJobById, getJobs } from "../controllers/jobs.controller.js";

const router = express.Router();

// get the job
router.get("/get-jobs", getJobs);

router.get("/get-job/:id", getJobById);

export default router;
