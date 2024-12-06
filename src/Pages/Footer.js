import React from "react";
import { Layout, Menu, theme } from "antd";
const { Footer } = Layout;

function Foter() {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        BUDI LUHUR ©{new Date().getFullYear()} Created by Dwi Setyabudi
      </Footer>
    </Layout>
  );
}

export default Foter;
