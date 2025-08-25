import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);
  const { user } = useUser();

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="shadow">
      <div className="flex container px-4 2xl:px-20 mx-auto justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="h-[100px] w-[180px] cursor-pointer"
        />
        {user ? (
          <div className="flex gap-5 items-center ">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi , {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-5 max-sm:text-xs items-center">
            <div className="relative">
              <button
                className="text-gray-600 cursor-pointer"
                onClick={(e) => setShowRecruiterLogin(true)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                Recruiter Login
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                  <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    This is for testing purpose only. Guest Login - Email:{" "}
                    <br /> google@gmail.com , Password: 12345
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => openSignIn()}
              className="bg-[#FD8A33] px-6 sm:px-9 py-2 text-white rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
