import { createContext, useEffect } from "react";
import { useState } from "react";
import { jobsData } from "../assets/assets";
const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Function to fetch jobs

  async function fetchJobs() {
    setJobs(jobsData);
  }

  useEffect(() => {
    fetchJobs();
  }, [jobs]);
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
