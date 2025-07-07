import React from "react";
import { useState } from "react";

import { Navbar } from "../components/Navbar.jsx";
import { assets, jobsApplied } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import moment from "moment";
export const Applications = () => {
  const [isEdit, setisEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      {<Navbar />}

      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-medium">Your Resume</h2>

        <div className="flex gap-2 mb-3 mt-3">
          {isEdit ? (
            <>
              <label
                className="flex items-center gap-2 "
                htmlFor="resumeUpload"
              >
                <p className="bg-orange-100  text-orange-500 px-4 py-2 rounded-lg cursor-pointer">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <img
                  src={assets.profile_upload_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </label>
              <button
                onClick={() => setisEdit(false)}
                className="bg-blue-100  text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href=""
                className="bg-orange-100  text-orange-500 px-4 py-2 rounded-lg cursor-pointer"
              >
                Resume
              </a>
              <button
                onClick={() => setisEdit(true)}
                className="text-gray-500 border-gray-300 border px-4 py-2 rounded-lg cursor-pointer "
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-medium mb-4">Jobs Applied</h2>
        <table className="min-w-full border border-gray-300 bg-white rounded-2xl ">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Title
              </th>
              <th className="py-3 px-4 border-b border-gray-300 max-sm:hidden text-left">
                Loaction
              </th>
              <th className="py-3 px-4 border-b border-gray-300 max-sm:hidden text-left">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 border-b border-gray-300 flex items-center gap-2">
                    <img className="w-8 h-8" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                    {moment(job.date).fromNow("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <span
                      className={`${
                        job.status === "Rejected"
                          ? "bg-red-100 border-red-200"
                          : job.status === "Pending"
                          ? "bg-orange-100 border-orange-200"
                          : "bg-green-100 border-green-200"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
