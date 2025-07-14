import { createContext, useEffect } from "react";
import { useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Function to fetch jobs

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("token");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  async function fetchJobs() {
    setJobs(jobsData);
  }

  // Function to fetch company data

  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/company`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
        // console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
