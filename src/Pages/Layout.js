import { Layout } from "antd";
import React from "react";
import { useLocation } from "react-router";
import Sidebar from "./Sidebar";
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
