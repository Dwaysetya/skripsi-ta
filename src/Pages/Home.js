import React from "react";
import IndexHeaders from "./Header";
import { Layout } from "antd";
import Content from "../Components/Content";
import SidebarComponent from "./Sidebar";

export default function Home() {
  return (
    <>
      <Layout>
        <IndexHeaders />
        <Layout>
          <SidebarComponent />
          <Layout>
            <Content />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
