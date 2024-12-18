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
import Login from "./Pages/Login";
import LoginRoute from "./Components/LoginRoute";
import Home from "./Pages/Home";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Register} />
        </Routes>
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
