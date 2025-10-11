import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <AiTools />
      <Testimonial />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;
