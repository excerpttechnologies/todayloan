import React from "react";
import { MarketOpportunitiesSection } from "../../components/home/Market";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <MarketOpportunitiesSection />
      <Footer />
    </>
  );
};

export default page;
