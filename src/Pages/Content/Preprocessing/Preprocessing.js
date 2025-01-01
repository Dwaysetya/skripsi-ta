import { Col, Layout, Row, Skeleton, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import Foter from "../../Footer";
import CaseFolding from "./CaseFolding";
import Cleansing from "./Cleansing";
import HapusKataStop from "./HapusKataStop";
import Normalisasi from "./Normalisasi";
import PreprocessingData from "./PreprocessingData";
import Steaming from "./Steaming";
import Tokenizing from "./Tokenizing";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;

const Preprocessing = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Dummy, setDummy] = useState("");
  const [Preprocessing, setPreprocessing] = useState("");
  const [kontenAktif, setKontenAktif] = useState("A");
  const [showOtherButtons, setShowOtherButtons] = useState(false); // State untuk kontrol visibilitas tombol lainnya
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  console.log("dddd", Preprocessing);

  const kontenMapping = {
    A: <PreprocessingData />,
    B: <CaseFolding data={Preprocessing} />,
    C: <Cleansing data={Preprocessing} />,
    D: <Normalisasi data={Preprocessing} />,
    E: <HapusKataStop data={Preprocessing} />,
    F: <Steaming data={Preprocessing} />,
    G: <Tokenizing data={Preprocessing} />,
  };

  const handlePreprocessingClick = () => {
    setKontenAktif("B");
    setShowOtherButtons(true); // Menampilkan tombol lainnya
  };

  const handlePreprocessingData = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/preprocessing`)
      .then((res) => {
        console.log("Data dari datset:", res.data); // Tampilkan data
        const dataUpdate = res.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        console.log("Data yang diurutkan:", dataUpdate);
        setPreprocessing(dataUpdate);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      })
      .finally(() => {
        setIsLoading(false); // Akhiri loading
      });
  };

  const GetdataUsers = () => {
    axios
      .get(`${BASE_URL}/dataset`)
      .then((res) => {
        console.log("Data dari datset:", res.data); // Tampilkan data
        const dataUpdate = res.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        console.log("Data yang diurutkan:", dataUpdate);
        setDummy(dataUpdate);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  useEffect(() => {
    GetdataUsers();
  }, []);

  return (
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <Label
        htmlFor="Preprocessing"
        text="Preprocessing"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <div style={{ width: "100%", padding: "10px 15px" }}>
        <Row gutter={[10, 10]}>
          {/* Tombol Preprocessing */}
          <Col span={3}>
            <IndexButton
              type="primary"
              onClick={() => {
                handlePreprocessingClick();
                handlePreprocessingData();
              }}
            >
              Preprocessing
            </IndexButton>
          </Col>
          {/* Tombol lainnya (tersembunyi hingga tombol Preprocessing diklik) */}
          {showOtherButtons &&
            [
              { key: "B", label: "Case Folding" },
              { key: "C", label: "Cleansing" },
              { key: "D", label: "Normalisasi" },
              { key: "E", label: "Hapus Kata Stop" },
              { key: "F", label: "Steaming" },
              { key: "G", label: "Tokenizing" },
            ].map((btn) => (
              <Col key={btn.key} span={3}>
                <IndexButton
                  type="primary"
                  onClick={() => setKontenAktif(btn.key)}
                >
                  {btn.label}
                </IndexButton>
              </Col>
            ))}
        </Row>
      </div>
      <Content
        style={{
          margin: "5px 15px 24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {isLoading ? (
          <Skeleton active /> // Tampilan saat loading
        ) : (
          kontenMapping[kontenAktif] || <div>Masukkan data</div>
        )}
      </Content>
      <Foter />
    </Layout>
  );
};

export default Preprocessing;
