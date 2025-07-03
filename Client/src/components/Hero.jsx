import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

export const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  function onSearch() {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  }

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-[#FD8A33] to-[#F9433B] text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl lg:text-4xl md:text-3xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="max-w-xl flex justify-between items-center bg-white rounded pl-4 text-gray-600 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.search_icon}
              alt="search_icon"
            />
            <input
              type="text"
              placeholder="Search for Jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.location_icon}
              alt="location_icon"
            />
            <input
              type="text"
              placeholder="location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            className="bg-[#FD8A33] text-white px-6 py-2 rounded m-1 cursor-pointer"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 rounded-md p-6 ">
        <div className="flex justify-center items-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img
            src={assets.microsoft_logo}
            alt="microsoft_logo"
            className="h-6"
          />
          <img
            src={assets.accenture_logo}
            alt="acceture_logo"
            className="h-6"
          />
          <img src={assets.walmart_logo} alt="walmart_logo" className="h-6" />
          <img src={assets.adobe_logo} alt="adobe_logo" className="h-6" />
          <img src={assets.samsung_logo} alt="google_logo" className="h-6" />
          <img src={assets.amazon_logo} alt="amazon_logo" className="h-6" />
        </div>
      </div>
    </div>
  );
};
