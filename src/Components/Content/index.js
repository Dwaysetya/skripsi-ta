import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Pages/404";
import Dashboard from "../../Pages/Content/Dashboard";
import Dataset from "../../Pages/Content/Dataset";
import Slangword from "../../Pages/Content/KamusKata/Slangword";
import Stopword from "../../Pages/Content/KamusKata/Stopword";
import Labeling from "../../Pages/Content/Labeling";
import Preprocessing from "../../Pages/Content/Preprocessing/Preprocessing";
import Testing from "../../Pages/Content/Testing";

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
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </div>
  );
};

export default Content;
