import bcrypt from "bcrypt";
import Company from "../models/company.model.js";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
      return res.status(400).json({ message: "Mising required fields" });
    }

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company exists already", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      message: "Company registered successfully",

      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCompany = async (req, res) => {
  const companyId = req.company._id;

  try {
    const company = await Company.findById(companyId).select("-password");

    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, salary, category, level } = req.body;

  if (!title || !description || !location || !salary || !category || !level) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const companyId = req.company._id;

  try {
    if (companyId) {
      const job = await Job.create({
        title,
        description,
        location,
        salary,
        companyId,
        category,
        level,
        date: Date.now(),
      });

      res.status(201).json({
        message: "Job posted successfully",
        success: true,
        job,
      });
    } else {
      res
        .status(401)
        .json({ message: "company not found , Unauthorized", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something wrong with posting job" });
  }
};

export const getCompanyJobApplicants = (req, res) => {};

export const getCompanypostedJobs = async (req, res) => {
  const companyId = req.company._id;

  try {
    const jobs = await Job.find({ companyId });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const changeJobApplicantStatus = (req, res) => {};

export const changeVisiblity = async (req, res) => {
  const companyId = req.company._id;

  const { id } = req.body;

  try {
    const job = await Job.findById(id);
    const company = await Company.findById(companyId);

    if (job.companyId.toString() === company._id.toString()) {
      job.visible = !job.visible;
      await job.save();
      res
        .status(200)
        .json({ message: "Job visiblity changed", success: true, job });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
