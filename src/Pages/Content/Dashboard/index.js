import React from "react";
import { Flex, Layout } from "antd";
import Label from "../../../Components/Elements/Label";
import Foter from "../../Footer";
import IndexHeaders from "../../Header";

const { Content } = Layout;

// import Preprocessing from "./Dashboard/Preprocessing/Index";
const Dashboard = () => {
  const colorBgContainer = "#ffffff"; // Default value, adjust accordingly
  const borderRadiusLG = "8px";
  return (
    <Layout style={{ marginLeft: "17%", marginTop: "7%" }}>
      <Label
        htmlFor="Dashboard"
        text="Dashboard"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
        }}
      />
      <div
        style={{
          margin: "5px 15px 24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div
          style={{
            margin: 0,
            padding: "10px",
            width: "100%",
            color: "#fff",
            lineHeight: "160px",
            textAlign: "center",
            background: "#364d79",
            lineHeight: "2",
            textAlign: "center",
          }}
        >
          <h1>
            ANALISIS SENTIMEN KEPUASAN MASYARAKAT
            <br />
            TERHADAP APLIKASI BANK SAQU DENGAN MEDIA GOOGLE PLAY STORE <br />
            MENGGUNAKAN ALGORITMA K-NN DAN LEXICON
          </h1>
        </div>
        <Flex style={{ gap: 300, margin: "20px" }}>
          <div
            style={{
              margin: "30px 0 0 0",
              width: "40%",
              height: 150,
              background: "#364d79",
            }}
          >
            <div style={{ color: "#fff", textAlign: "center", marginTop: 30 }}>
              <h3>Jumlah Dataset</h3>
            </div>
            <div style={{ color: "#fff", margin: "50px 0 0 30px" }}>
              <h3>1500</h3>
            </div>
          </div>
          <div
            style={{
              margin: "30px 0 0 0",
              width: "40%",
              height: 150,
              background: "#364d79",
            }}
          >
            <div style={{ color: "#fff", textAlign: "center", marginTop: 30 }}>
              <h3>Total Akurasi</h3>
            </div>
            <div style={{ color: "#fff", margin: "50px 0 0 30px" }}>
              <h3>80%</h3>
            </div>
          </div>
        </Flex>
      </div>
      <Foter />
    </Layout>
  );
};
export default Dashboard;
