import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container max-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left ">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-gray-700"
              >
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4  text-center flex items-center">
                  <img
                    src={data.imgSrc}
                    alt=""
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                  />
                  <span> {data.name}</span>
                </td>
                <td className="py-2 px-4 text-center max-sm:hidden">
                  {data.jobTitle}
                </td>
                <td className="py-2 px-4 text-center max-sm:hidden">
                  {data.location}
                </td>
                <td className="py-2 px-4 text-center ">
                  <a
                    href=""
                    target="_blank"
                    className="inline-flex items-center flex-row gap-2 py-1 px-3 border border-blue-200 bg-blue-50 rounded"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td>
                  <div className="relative flex  justify-center group  ">
                    <button className="text-gray-500 action-button  ">
                      ...
                    </button>
                    <div className="absolute  right-[-90px] md:left-8 top-[15px] md:-top-[-15px]  z-10 w-32 bg-white border border-gray-300 rounded shadow  group-hover:block hidden">
                      <button className="py-2 px-4 text-blue-500 hover:bg-gray-100 w-full text-left block">
                        Accept
                      </button>
                      <button className="py-2 px-4 text-red-500 hover:bg-gray-100 w-full text-left block">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
