import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import Sidebar from "./Pages/Sidebar";
import Layout from "antd/es/layout/layout";
import IndexHeaders from "./Pages/Header";
import Content from "./Components/Content";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <IndexHeaders />
          <Layout>
            <Sidebar />
            <Layout>
              <Content />
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
