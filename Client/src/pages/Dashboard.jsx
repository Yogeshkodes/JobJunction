import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setCompanyToken(null);
    setCompanyData(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* NAvbar REcruiter Paenl */}

      <div className="px-4 shadow">
        <div className="flex items-center justify-between px-5">
          <img
            onClick={(e) => navigate("/dashboard/add-job")}
            src={assets.logo}
            alt=""
            className="h-[100px] w-[180px] cursor-pointer max-sm:w-32"
          />

          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border border-gray-300 rounded-full bg-cover "
                  src={companyData.image}
                  alt=""
                />
                <div className="absolute top-0 right-0 text-black   rounded pt-[67px] group-hover:block hidden  z-10  ">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-300 text-sm">
                    <li
                      className="py-1 px-2 pr-10 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left Side bar with option to add job, manage jobs, view Applications */}
        <div className="inline-block border-r-2 min-h-screen border-gray-300">
          <ul className="flex flex-col items-start pt-5 text-gray-800  py-10">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 cursor-pointer ${
                  isActive && "bg-orange-200 border-r-2 border-orange-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img src={assets.add_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to={"/dashboard/manage-jobs"}
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 cursor-pointer ${
                  isActive && "bg-orange-200 border-r-2 border-orange-500"
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              to={"/dashboard/view-applications"}
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 cursor-pointer ${
                  isActive && "bg-orange-200 border-r-2 border-orange-500 "
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
