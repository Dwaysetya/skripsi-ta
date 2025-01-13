import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (username, password) => {
    // Contoh logika login sederhana
    if (username === "admin" && password === "password") {
      setIsAuthenticated(false);
      navigate("/dashboard"); // Arahkan ke dashboard setelah login berhasil
    } else {
      alert("Login gagal! Periksa kembali username atau password.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
