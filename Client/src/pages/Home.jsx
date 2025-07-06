import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { JobListing } from "../components/JobListing";
import App from "../App";
import AppDown from "../components/AppDown";
import Footer from "../components/Footer";
export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDown />
      <Footer />
    </div>
  );
};
