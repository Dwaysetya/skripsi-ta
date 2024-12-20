import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Content/Dashboard";
import Slangword from "../../Pages/Content/KamusKata/Slangword";
import Stopword from "../../Pages/Content/KamusKata/Stopword";
import Dataset from "../../Pages/Content/Dataset";
import Preprocessing from "../../Pages/Content/Preprocessing/Preprocessing";
import Labeling from "../../Pages/Content/Labeling";
import NotFoundPage from "../../Pages/404";

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        {/* Main Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* About Routes */}
        <Route path="/kamuskata/slangword" element={<Slangword />} />
        <Route path="/kamuskata/stopword" element={<Stopword />} />
        {/* Other Routes */}
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/preprocessing" element={<Preprocessing />} />
        <Route path="/labeling" element={<Labeling />} />
      </Routes>
    </div>
  );
};

export default Content;
