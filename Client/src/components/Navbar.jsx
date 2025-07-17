import React from "react";
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
          <div className="flex gap-5 max-sm:text-xs">
            <button
              className="text-gray-600 cursor-pointer"
              onClick={(e) => setShowRecruiterLogin(true)}
            >
              Recruiter Login
            </button>
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
