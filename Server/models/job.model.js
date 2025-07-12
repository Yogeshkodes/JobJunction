import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    requiere: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    requiered: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
