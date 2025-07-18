import React from "react";
import { useState, useContext } from "react";

import { Navbar } from "../components/Navbar.jsx";
import { assets, jobsApplied } from "../assets/assets.js";
import Footer from "../components/Footer.jsx";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
export const Applications = () => {
  const [isEdit, setisEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    userData,
    backendUrl,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const { user } = useUser();

  const { getToken } = useAuth();

  console.log(userData);
  const updateResume = async () => {
    const token = await getToken();

    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const { data } = await axios.post(
        `${backendUrl}/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(data);
      if (data.success) {
        toast.success(data.message);
        fetchUserData();
        console.log(userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.message) {
        return toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }

    setisEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      {<Navbar />}

      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-medium">Your Resume</h2>

        <div className="flex gap-2 mb-3 mt-3">
          {isEdit || (userData && userData.reusme === "") ? (
            <>
              <label className="flex items-center gap-2 " htmlFor="resume">
                <p className="bg-orange-100  text-orange-500 px-4 py-2 rounded-lg cursor-pointer">
                  {resume ? resume.name : "Upload Resume"}
                </p>
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  name="resume"
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
                onClick={updateResume}
                className="bg-blue-100  text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href={userData.resume}
                target="_blank"
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
            {userApplications.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 border-b border-gray-300 flex items-center gap-2">
                    <img className="w-8 h-8" src={job.companyId.image} alt="" />
                    {job.companyId.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {job.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                    {job.jobId.location}
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
