import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard.jsx";
export const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* {Sidebar} */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Saerch filter from Hero Section */}

        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex gap-2.5 items-center border bg-blue-50 border-blue-200 rounded px-4 py-1.5">
                    {searchFilter.title}{" "}
                    <img
                      src={assets.cross_icon}
                      alt="cross"
                      className="cursor-pointer"
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="ml-2.5 inline-flex gap-2.5 items-center border bg-orange-50 border-orange-200 rounded px-4 py-1.5">
                    {searchFilter.location}{" "}
                    <img
                      src={assets.cross_icon}
                      alt="cross"
                      className="cursor-pointer"
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* Category Filter */}

        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>

          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input type="checkbox" name={category} className="scale-125" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Search by Location */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>

          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input type="checkbox" name={location} className="scale-125" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* {Job Cards} */}

      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest jobs
        </h3>
        <p className="mb-8 ">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};
