import express from "express";

import {
  registerCompany,
  loginCompany,
  getCompany,
  postJob,
  getCompanyJobApplicants,
  getCompanypostedJobs,
  changeJobApplicantStatus,
  changeVisiblity,
} from "../controllers/company.controller.js";
import { protectCompany } from "../middlewares/protectCompany.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Authentication routes
router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);

// Company profile routes
router.get("/company", protectCompany, getCompany);
router.post("/change-visiblity", protectCompany, changeVisiblity);

// Job management routes
router.post("/post-job", protectCompany, postJob);
router.get("/list-jobs", protectCompany, getCompanypostedJobs);

// Job applicant management routes
router.get("/applicants", protectCompany, getCompanyJobApplicants);
router.post("/change-status", protectCompany, changeJobApplicantStatus);

export default router;
