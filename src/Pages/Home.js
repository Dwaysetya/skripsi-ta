import { Layout } from "antd";
import React from "react";
import Content from "../Components/Content";
import IndexHeaders from "./Header";
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
