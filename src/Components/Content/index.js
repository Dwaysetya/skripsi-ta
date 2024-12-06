import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Content/Dashboard";
import Slangword from "../../Pages/Content/KamusKata/Slangword";
import Stopword from "../../Pages/Content/KamusKata/Stopword";

const Content = () => {
  return (
    <div>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Dashboard />} />

        {/* About Routes */}
        <Route path="/kamuskata/slangword" element={<Slangword />} />
        <Route path="/kamuskata/stopword" element={<Stopword />} />
        <Route path="/about/mission" element={<h2>Our Mission</h2>} />

        {/* Other Routes */}
        <Route path="/services" element={<h2>Our Services</h2>} />
        <Route path="/contact" element={<h2>Contact Us</h2>} />
      </Routes>
    </div>
  );
};

export default Content;
