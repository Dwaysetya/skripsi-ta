import { Layout, Statistic, Row, Col, Table } from "antd";
import React, { useEffect, useState } from "react";
import Label from "../../../Components/Elements/Label";
import Foter from "../../Footer";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;

const Dashboard = ({ data }) => {
  const [datasetCount, setDatasetCount] = useState(0); // State untuk jumlah dataset
  const colorBgContainer = "#ffffff"; // Default warna background
  const borderRadiusLG = "8px";

  useEffect(() => {
    // Panggil API untuk mendapatkan total dataset
    axios
      .get(`${BASE_URL}/dataset/total`)
      .then((res) => {
        console.log("Respons API:", res.data); // Debugging respons API
        const total = res.data?.count || 0; // Ambil total jika ada, default ke 0
        console.log("1111", total);
        setDatasetCount(total);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setDatasetCount(0); // Pastikan ada fallback jika API gagal
      });
  }, []);

  const columns = [{ title: "Ulasan", dataIndex: "count", key: "count" }];

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
            lineHeight: "2",
            textAlign: "center",
            background: "#364d79",
          }}
        >
          <h1>
            ANALISIS SENTIMEN KEPUASAN MASYARAKAT
            <br />
            TERHADAP APLIKASI BANK SAQU DENGAN MEDIA GOOGLE PLAY STORE <br />
            MENGGUNAKAN ALGORITMA K-NN DAN LEXICON
          </h1>
        </div>
        <Row gutter={[20, 20]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <div
              style={{
                height: 150,
                background: "#364d79",
                borderRadius: borderRadiusLG,
                padding: "20px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h3>Jumlah Dataset</h3>
              <Statistic
                value={datasetCount}
                valueStyle={{ color: "#52c41a", fontSize: "20px" }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                height: 150,
                background: "#364d79",
                borderRadius: borderRadiusLG,
                padding: "20px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h3>Total Akurasi</h3>
              <Statistic
                value={"86.83%"}
                valueStyle={{ color: "#52c41a", fontSize: "20px" }}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Foter />
    </Layout>
  );
};

export default Dashboard;
