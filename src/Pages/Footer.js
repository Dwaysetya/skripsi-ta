import { Layout } from "antd";
import React from "react";
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
