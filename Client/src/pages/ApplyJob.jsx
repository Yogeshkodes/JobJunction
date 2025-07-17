import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const ApplyJob = () => {
  const { id } = useParams();

  const { getToken } = useAuth();

  const [jobData, setJobData] = useState(null);
  const [hasAlreadyApplied, sethasAlreadyApplied] = useState(false);
  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const navigate = useNavigate();
  async function applyHandler() {
    try {
      if (!userData) {
        return toast.error("You must be logged in to apply for a job");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/apply-job`,
        {
          jobId: jobData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/get-job/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkIfApplied = () => {
    if (!jobData) {
      return <Loader />;
    }

    const applied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );

    sethasAlreadyApplied(applied);
  };

  useEffect(() => {
    fetchJob();
    checkIfApplied();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkIfApplied();
    }
  }, [jobData, id, userApplications]);
  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto ">
        <div className="bg-white text-black  rounded-lg w-full h-2">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-orange-100 border border-[#FD8A33] rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-50 shadow"
                src={jobData.companyId.image}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl font-medium sm:text-4xl">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {`$${kconvert.convertTo(jobData.salary)}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                className="bg-[#FD8A33] px-6 py-2 text-white rounded cursor-pointer"
              >
                {hasAlreadyApplied ? "Applied Already..." : "Apply Now"}
              </button>
              <p className="mt-1 text-gray-600">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button
                className="bg-[#FD8A33] px-6 mt-10 py-2 text-white rounded cursor-pointer"
                onClick={applyHandler}
              >
                {hasAlreadyApplied ? "Applied Already..." : "Apply Now"}
              </button>
            </div>
            {/* Right Sections */}

            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More Jobs from {jobData.companyId.name}</h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    jobData.companyId._id === job.companyId._id
                )
                .filter((job) => {
                  const appliedJobsIds = new Set(
                    userApplications.map((job) => job.jobId._id)
                  );
                  return !appliedJobsIds.has(job._id);
                })
                .slice(0, 4)
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
            </div>
          </div>

          <div className="mt-20">{<Footer />}</div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};
