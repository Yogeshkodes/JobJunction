import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
