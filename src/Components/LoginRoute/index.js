import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../Pages/Login/index";
import SignIn from "../../Pages/Login/Sign-In";
import SignUp from "../../Pages/Login/Sign-Up";

const LoginRoute = () => {
  return (
    <div>
      <Routes>
        {/* Main Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default LoginRoute;
