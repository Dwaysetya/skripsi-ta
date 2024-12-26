import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component, useEffect } from "react";
import Sidebar from "./Pages/Sidebar";
import Layout from "antd/es/layout/layout";
import IndexHeaders from "./Pages/Header";
import Content from "./Components/Content";
import PrivateRoute from "./Routes/PrivateRoutes";
// import { isLogin } from "./utils/constants";

function App() {
  const isLogin = localStorage.getItem("isLogin");
  useEffect(() => {
    console.log("isLogin", isLogin);
    renderRoutes();
  }, [isLogin]);

  const renderRoutes = () => {
    if (isLogin) {
      console.log("Pengguna sudah login");
      return (
        <Layout>
          <IndexHeaders />
          <Layout>
            <Sidebar />
            <Layout>
              <Content />
            </Layout>
          </Layout>
        </Layout>
      );
    } else {
      console.log("Pengguna belum login");
      return <PrivateRoute />;
    }
  };

  return (
    <div className="App">
      <Router>{renderRoutes()}</Router>
    </div>
  );
}

export default App;
