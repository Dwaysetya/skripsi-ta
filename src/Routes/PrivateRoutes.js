import { Route, Routes } from "react-router-dom";
import SignIn from "../Pages/Login/Sign-In";
import SignUp from "../Pages/Login/Sign-Up";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Routes>
      <Route path="*" element={<SignIn />} navigate />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default PrivateRoute;
