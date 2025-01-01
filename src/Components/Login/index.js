import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../../Pages/Login/Sign-In";
import SignUp from "../../Pages/Login/Sign-Up";
import Login from "../../Pages/Login/index";

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
