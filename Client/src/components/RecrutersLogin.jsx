import React from "react";
import { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecrutersLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { showRecruiterLogin, setShowRecruiterLogin, backendUrl } =
    useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function onSubmithandler(e) {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  }

  console.log(showRecruiterLogin);
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-2 backdrop-blur-md bg-black/30 flex items-center justify-center ">
      <form
        className="relative  bg-white p-10 rounded-lg "
        onSubmit={onSubmithandler}
      >
        <h1 className="text-2xl font-medium text-center">Recruiter {state}</h1>
        <p className="mb-3 text-gray-500">
          Welcome back! Please sign in to continue
        </p>

        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image" className="flex items-center gap-4">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                  className="w-16 rounded-full cursor-pointer"
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <p>
                  Upload Company <br />
                  Logo
                </p>
              </label>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="flex items-center  gap-2 border border-gray-200 rounded-4xl p-2 px-4 mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-gray-500"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="flex items-center  gap-2 border border-gray-200 rounded-4xl p-2 px-4 mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-gray-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Id"
                required
              />
            </div>

            <div className="flex items-center  gap-2 border border-gray-200 rounded-4xl p-2 px-4 mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-gray-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </>
        )}
        {state === "Login" && (
          <p className="text-sm text-orange-500 mt-4 text-center ">
            Forgot password
          </p>
        )}

        <button
          type="submit"
          className="bg-[#FD8A33] px-4 py-2 text-white rounded-full cursor-pointer w-full mt-4"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p
            onClick={(e) => setState("Sign Up")}
            className="mt-4 cursor-pointer text-sm text-neutral-500 text-center"
          >
            Don't have an account?{" "}
            <span className="text-[#FD8A33]">Sign Up</span>
          </p>
        ) : (
          <p
            onClick={(e) => setState("Login")}
            className="mt-4 cursor-pointer text-sm text-neutral-500 text-center"
          >
            Already have a account?{" "}
            <span className="text-[#FD8A33]">Login</span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
          onClick={(e) => setShowRecruiterLogin(false)}
        />
      </form>
    </div>
  );
};

export default RecrutersLogin;
