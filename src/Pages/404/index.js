// src/Pages/NotFoundPage.js

import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoginState } from "../../utils/constants";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isLoginState) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px" }}>404</h1>
      <p>Page not found</p>
      <Button type="primary" onClick={handleNavigate}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
