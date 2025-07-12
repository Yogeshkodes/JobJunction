import jwt from "jsonwebtoken";
import Company from "../models/company.model.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized , token missing...", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized something wrong with token",
      success: false,
    });
  }
};
