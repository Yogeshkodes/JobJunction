/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard.jsx";
export const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  function handleCategoryChange(category) {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  function handleLocationChange(location) {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  }

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategory.length === 0 || selectedCategory.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.title.toLowerCase().includes(searchFilter.location.toLowerCase());
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategory, selectedLocation, searchFilter]);

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

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded lg:hidden border border-gray-500 cursor-pointer tracking-wider "
        >
          {showFilter ? "Close" : "Filters"}
        </button>
        {/* Category Filter */}

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>

          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name={category}
                  className="scale-125"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategory.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Search by Location */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>

          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name={location}
                  className="scale-125"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />
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

        {filteredJobs.length === 0 ? (
          <div className="bg-orange-200 h-40 flex items-center justify-center rounded flex-col">
            <p className="text-xl mb-5">
              There's no job listed on selected filters ☹️
            </p>
            <p>Job Posting will be listing soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        )}

        {/* {Pagination */}

        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-3 mt-10 ">
            <a href="#job-list">
              <img
                onClick={(e) => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt="left arrow"
              />
            </a>

            {Array.from(
              { length: Math.ceil(filteredJobs.length / 6) },
              (_, index) => (
                <a href="#job-list" key={index}>
                  <button
                    onClick={(e) => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded cursor-pointer ${
                      currentPage === index + 1
                        ? "bg-[#FD8A33] text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <a href="#job-list">
              <img
                onClick={(e) =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt="right arrow"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};
