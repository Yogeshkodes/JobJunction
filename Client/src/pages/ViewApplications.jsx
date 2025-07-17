import React from "react";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);

  const fetchCompanyApplicants = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applicants.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message)
        return toast.error(error.response.data.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplicants();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
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
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-gray-700"
                  >
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4  text-center flex items-center">
                      <img
                        src={data.userId.image}
                        alt=""
                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                      />
                      <span> {data.userId.name}</span>
                    </td>
                    <td className="py-2 px-4 text-center max-sm:hidden">
                      {data.jobId.title}
                    </td>
                    <td className="py-2 px-4 text-center max-sm:hidden">
                      {data.jobId.location}
                    </td>
                    <td className="py-2 px-4 text-center ">
                      <a
                        href={data.userId.resume}
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
    )
  ) : (
    <Loader />
  );
};

export default ViewApplications;
