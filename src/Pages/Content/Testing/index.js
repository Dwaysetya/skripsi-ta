import React, { useState } from "react";
import {
  Layout,
  theme,
  Form,
  Input,
  Radio,
  Space,
  Row,
  Col,
  Table,
  Divider,
  Statistic,
  Card,
  message,
} from "antd";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import Footer from "../../Footer";
import NotFoundPage from "../../404";
import ModalTesting from "../../../Components/Fragments/ModalTesting";
import DataLatih from "./DataTesting/DataLatih";
import DataUji from "./DataTesting/DataUji";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;

const Testing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("UjiData");
  const [kontenAktif, setKontenAktif] = useState("A");
  const [hideTestingButton, setHideTestingButton] = useState(false);
  const [showOtherButtons, setShowOtherButtons] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [nilaiK, setNilaiK] = useState("");
  const [nilaiRatio, setNilaiRatio] = useState("9:1");
  const [dataKnn, setDataKnn] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleModalOpen = (content) => {
    setModalContent(content);
    setNilaiRatio(content.ratio);
    setNilaiK(content.k);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleTestingClick = () => {
    setHideTestingButton(true);
    setShowOtherButtons(true);
  };

  const renderView = () => {
    switch (kontenAktif) {
      case "B":
        return <DataUji data={dataKnn} />;
      case "C":
        return <DataLatih data={dataKnn} />;
      default:
        return <NotFoundPage />;
    }
  };

  const buttonList = [
    { key: "B", label: "Data Uji" },
    { key: "C", label: "Data Latih" },
  ];

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setRadioValue(selectedValue);

    // Map nilai radio ke rasio yang sesuai
    const ratioMap = {
      1: 9.1,
      2: 8.2,
      3: 7.3,
      4: 6.4,
      5: 5.5,
    };

    setNilaiRatio(ratioMap[selectedValue] || "9:1");
  };

  const handleTestingData = async () => {
    if (!nilaiK || !nilaiRatio) {
      message.error("Harap Masukkan Rasio dan Nilai K");
      return;
    }
    try {
      console.log("Data yang akan dikirim:", {
        ratio: nilaiRatio,
        k: parseInt(nilaiK, 10),
      });

      const response = await axios.post(`${BASE_URL}/testing`, {
        ratio: nilaiRatio,
        k: parseInt(nilaiK, 10), // Pastikan nilai K adalah angka
      });

      if (response.status === 200) {
        setDataKnn(response.data);
        console.log("Data Berhasil Dikirim", response.data);
        message.success("Rasio dan K Berhasil Diinput!");
        setIsModalOpen(false);
        handleTestingClick();
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log("Terjadi Kesalahan Saat Mengirim Data:", error);
      message.error("Gagal Mengirim Rasio dan Nilai K");
    }
  };
  console.log("data", dataKnn);

  // Styles
  const styles = {
    layout: { marginLeft: "14%", marginTop: "5%" },
    label: {
      fontWeight: "bold",
      color: "black",
      fontSize: "20px",
      margin: "20px",
    },
    content: {
      margin: "5px 15px 24px 16px",
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    },
    buttonContainer: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-start",
      margin: "5px 0 24px 16px",
    },
  };

  return (
    <Layout style={styles.layout}>
      <ModalTesting
        open={isModalOpen}
        onOk={handleTestingData}
        onCancel={handleModalClose}
      >
        <div>
          <p>
            Sejumlah 2000 dataset akan dibagi menjadi data latih dan data uji
            berdasarkan pilihan rasio pembagian dataset untuk dilakukan
            pengujian. Silahkan memilih pembagian dataset dan memasukkan nilai K
            untuk penguji K-Nearest Neighbours.
          </p>
        </div>
        <Radio.Group
          onChange={handleRadioChange}
          value={radioValue}
          style={{ margin: "10px" }}
        >
          <Space direction="vertical">
            <Radio value={1}>9 : 1</Radio>
            <Radio value={2}>8 : 2</Radio>
            <Radio value={3}>7 : 3</Radio>
            <Radio value={4}>6 : 4</Radio>
            <Radio value={5}>5 : 5</Radio>
          </Space>
        </Radio.Group>
        <Form.Item
          name="nilai"
          label="Nilai K"
          rules={[{ required: true, message: "Please input your nilai K!" }]}
        >
          <Input
            value={nilaiK}
            onChange={(e) => setNilaiK(e.target.value)}
            placeholder="Masukkan Nilai K"
          />
        </Form.Item>
      </ModalTesting>

      <Label htmlFor="Testing" text="Testing" style={styles.label} />

      <div style={styles.buttonContainer}>
        {!hideTestingButton && (
          <IndexButton
            type="primary"
            onClick={() => handleModalOpen("UjiData")}
          >
            Uji Data
          </IndexButton>
        )}
        <Row gutter={[16]}>
          {showOtherButtons &&
            buttonList.map((btn) => (
              <Col key={btn.key} span={12}>
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

      <Content style={styles.content}>{renderView()}</Content>
      <Content
        style={{
          margin: "5px 15px 24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Divider> Tabel Confusion Matrix</Divider>
        <Table dataSource={dataKnn.confusion_matrix}>
          <Column title="Data Aktual" dataIndex="accuracy" key="accuracy" />
          <ColumnGroup title="Data Prediksi">
            <Column title="Positif" dataIndex="1" key="1" />
            <Column title="Negatif" dataIndex="0" key="0" />
          </ColumnGroup>
          <Column title="Total" dataIndex="f1_score" key="f1_score" />
        </Table>
        <Divider> Detail Perhitungan Evaluasi</Divider>
        <Table dataSource={[dataKnn]}>
          <Column title="Akurasi" dataIndex="accuracy" key="accuracy" />
          <Column title="Presisi" dataIndex="precision" key="precision" />
          <Column title="Recall" dataIndex="recall" key="recall" />
        </Table>
        <Divider> Detail Perhitungan Evaluasi</Divider>
        <Table dataSource={[dataKnn]}>
          <Column title="Akurasi" dataIndex="accuracy" key="accuracy" />
          <Column title="Presisi" dataIndex="precision" key="precision" />
          <Column title="Recall" dataIndex="recall" key="recall" />
        </Table>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Positive"
                value={11.28}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Negative"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Testing;
