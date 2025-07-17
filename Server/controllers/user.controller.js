import User from "../models/userSchema.model.js";
import JobApplication from "../models/jobApplication.js";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/job.model.js";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  if (!userId)
    return res.status(400).json({ message: "User not found", success: false });

  try {
    const user = await User.findById(userId);

    // console.log(user);

    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", success: false });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;

  // console.log(jobId);

  const userId = req.auth.userId;

  try {
    const isAllreadyApplied = await JobApplication.find({
      userId,
      jobId,
    });

    if (isAllreadyApplied.length > 0) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const jobData = await Job.findById(jobId);

    console.log(jobData);

    if (!jobData) {
      return res.status(400).json({ message: "Job not found", success: false });
    }

    const jobApplication = await JobApplication.create({
      userId,
      jobId,
      companyId: jobData.companyId,
      date: Date.now(),
    });

    res.status(200).json({
      success: true,
      jobApplication,
      message: "Job applied successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const getUserJobApplication = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image ")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res
        .status(400)
        .json({ message: "No applications found", success: false });
    }

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const updateResume = async (req, res) => {
  const userId = req.auth.userId;
  const resumeFile = req.file;

  if (!userId || !resumeFile) {
    return res
      .status(400)
      .json({ message: "Missing required fields", success: false });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);

    user.resume = resumeUpload.secure_url;

    await user.save();

    res
      .status(200)
      .json({ success: true, user, message: "Resume uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
