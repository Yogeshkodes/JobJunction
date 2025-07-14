import React, { useEffect, useContext, useState } from "react";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const navigate = useNavigate();

  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  async function chnageVisibilty(id) {
    setJobs((prev) =>
      prev.map((job) =>
        job._id === id ? { ...job, visible: !job.visible } : job
      )
    );

    try {
      const { data } = await axios.post(
        `${backendUrl}/change-visiblity`,
        { id },
        { headers: { token: companyToken } }
      );
      console.log(data);
      if (data.success) {
        fetchPostedJobs();
      }
    } catch (error) {
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, visible: !job.visible } : job
        )
      );

      toast.error("Failed to update visibility. Rolled back.");
      console.error(error);
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchPostedJobs();
    }
  }, [companyToken]);

  async function fetchPostedJobs() {
    try {
      const { data } = await axios.get(`${backendUrl}/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobData.reverse());
        console.log(data.jobData.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="container max-w-5xl p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full  bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600">
              <th className="py-2 px-4 text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-center ">Applicants</th>
              <th className="py-2 px-4 text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-gray-700"
              >
                <td className="py-2 px-4 max-sm:hidden">{index + 1}</td>
                <td className="py-2 px-4 ">{data.title}</td>
                <td className="py-2 px-4 max-sm:hidden">
                  {moment(data.date).format("ll")}
                </td>
                <td className="py-2 px-4 max-sm:hidden">{data.location}</td>
                <td className="py-2 px-4 text-center">{data.applicants}</td>
                <td className="text-center py-2">
                  <input
                    onChange={(e) => chnageVisibilty(data._id)}
                    className="scale-125"
                    type="checkbox"
                    name="visible"
                    checked={data.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-[#FD8A33] text-white py-2 mt-4 px-4 rounded cursor-pointer"
          onClick={(e) => navigate("/dashboard/add-job")}
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
