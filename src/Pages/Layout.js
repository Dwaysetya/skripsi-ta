import React from "react";
import { Layout } from "antd";
import Dashboard from "./Content/Dashboard";
import Sidebar from "./Sidebar";
import Slangword from "./Content/KamusKata/Slangword";
import { useLocation } from "react-router";
const { Header: AntHeader, Content, Sider } = Layout;

function LayoutPages({ children }) {
  let { pathname } = useLocation();
  console.log("dway", pathname);
  return (
    <Layout>
      <Sider>
        <Sidebar />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
}

export default LayoutPages;
