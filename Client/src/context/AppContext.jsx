import { createContext, useEffect } from "react";
import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const { user } = useUser();
  const { getToken } = useAuth();

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState([]);
  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch jobs

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("token");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  // Functions to fetch user Application to jobs

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Homepage Jobs
  async function fetchJobs() {
    try {
      const { data } = await axios.get(`${backendUrl}/get-jobs`);
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  // Fetch User Applications

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/job-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        return toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

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
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
