import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/404";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Routes>
      <Route path="*" element={<Login />} Navigate />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PrivateRoute;
