import React, { useState } from "react";
import { Layout, theme, Col, Row } from "antd";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import CaseFolding from "./CaseFolding";
import PreprocessingData from "./PreprocessingData";
import Foter from "../../Footer";
import Cleansing from "./Cleansing";
import Normalisasi from "./Normalisasi";
import HapusKataStop from "./HapusKataStop";
import Steaming from "./Steaming";
import Tokenizing from "./Tokenizing";

const { Content } = Layout;

const Preprocessing = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [kontenAktif, setKontenAktif] = useState("A");
  const [showOtherButtons, setShowOtherButtons] = useState(false); // State untuk kontrol visibilitas tombol lainnya

  const kontenMapping = {
    A: <PreprocessingData />,
    B: <CaseFolding />,
    C: <Cleansing />,
    D: <Normalisasi />,
    E: <HapusKataStop />,
    F: <Steaming />,
    G: <Tokenizing />,
  };

  const handlePreprocessingClick = () => {
    setKontenAktif("A");
    setShowOtherButtons(true); // Menampilkan tombol lainnya
  };

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
            <IndexButton type="primary" onClick={handlePreprocessingClick}>
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
        {kontenMapping[kontenAktif] || <div>Masukkan data</div>}
      </Content>
      <Foter />
    </Layout>
  );
};

export default Preprocessing;
