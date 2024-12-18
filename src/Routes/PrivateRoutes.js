import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/404";
import SignIn from "../Pages/Login/Sign-In";
import SignUp from "../Pages/Login/Sign-Up";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Routes>
      <Route path="*" element={<SignIn />} Navigate />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default PrivateRoute;
