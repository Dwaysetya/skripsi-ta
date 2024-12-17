import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { Component } from "react";
import Slangword from "./Pages/Content/KamusKata/Slangword";
import Dashboard from "./Pages/Content/Dashboard";
import Sidebar from "./Pages/Sidebar";
import LayoutPages from "./Pages/Layout";
import Layout from "antd/es/layout/layout";
import IndexHeaders from "./Pages/Header";
import Content from "./Components/Content";
import Foter from "./Pages/Footer";
import SignIn from "./Pages/Login/Sign-In";

function App() {
  return (
    <div className="App">
      <Router>
        <SignIn />
      </Router>
      {/* <Router>
        <Layout>
          <IndexHeaders />
          <Layout>
            <Sidebar />
            <Layout>
              <Content />
            </Layout>
          </Layout>
        </Layout>
      </Router> */}
    </div>
  );
}

export default App;
