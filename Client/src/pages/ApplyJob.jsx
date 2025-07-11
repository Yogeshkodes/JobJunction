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
export const ApplyJob = () => {
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);

    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length === 0) return;
    fetchJob();
  }, [id, jobs]);
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
              <button className="bg-[#FD8A33] px-6 py-2 text-white rounded cursor-pointer">
                Apply Now
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
              <button className="bg-[#FD8A33] px-6 mt-10 py-2 text-white rounded cursor-pointer">
                Apply Now
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
                .filter((job) => job.companyId.name === jobData.companyId.name)
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
