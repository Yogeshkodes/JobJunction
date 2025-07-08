import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();
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
            {manageJobsData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-gray-700"
              >
                <td className="py-2 px-4 max-sm:hidden">{data._id}</td>
                <td className="py-2 px-4 ">{data.title}</td>
                <td className="py-2 px-4 max-sm:hidden">
                  {moment(data.date).format("ll")}
                </td>
                <td className="py-2 px-4 max-sm:hidden">{data.location}</td>
                <td className="py-2 px-4 text-center">{data.applicants}</td>
                <td className="text-center py-2">
                  <input className="scale-125" type="checkbox" name="visible" />
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
