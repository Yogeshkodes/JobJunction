import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { JobListing } from "../components/JobListing";
export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
    </div>
  );
};
