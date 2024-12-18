import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import Sidebar from "./Pages/Sidebar";
import Layout from "antd/es/layout/layout";
import IndexHeaders from "./Pages/Header";
import Content from "./Components/Content";
import PrivateRoute from "./Routes/PrivateRoutes";
import { isLoginState } from "./utils/constants";

function App() {
  const renderRoutes = () => {
    if (isLoginState) {
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
    }
    return <PrivateRoute />;
  };

  return (
    <div className="App">
      <Router>{renderRoutes()}</Router>
    </div>
  );
}

export default App;
