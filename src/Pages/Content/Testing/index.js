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
import { Percent } from "antd/es/progress/style";

const { Content } = Layout;

const Testing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("UjiData");
  const [kontenAktif, setKontenAktif] = useState("B");
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
      1: 0.9,
      2: 0.8,
      3: 0.7,
      4: 0.6,
      5: 0.5,
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
  const Datadecimal = () => {
    const decimalAccuracy = (dataKnn.accuracy * 100).toFixed(2) + "%";
    const decimalPrecision = (dataKnn.precision * 100).toFixed(2) + "%";
    const decimalRecall = (dataKnn.recall * 100).toFixed(2) + "%";
    const decimalPercentPositive = (
      dataKnn?.positive_count && dataKnn?.testing_data?.length
        ? (dataKnn.positive_count / dataKnn.testing_data.length) * 100
        : 0
    ).toFixed(2);

    const decimalPercentNegative = (
      dataKnn?.negative_count && dataKnn?.testing_data?.length
        ? (dataKnn.negative_count / dataKnn.testing_data.length) * 100
        : 0
    ).toFixed(2);

    return {
      decimalAccuracy,
      decimalPrecision,
      decimalRecall,
      decimalPercentPositive,
      decimalPercentNegative,
    };
  };
  const {
    decimalAccuracy,
    decimalPrecision,
    decimalRecall,
    decimalPercentPositive,
    decimalPercentNegative,
  } = Datadecimal();

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

  const dataSource = [
    {
      key: "1",
      dataAktual: "Positif",
      prediksiPositif: 111,
      prediksiNegatif: 121,
      total: 232,
    },
    {
      key: "2",
      dataAktual: "Negatif",
      prediksiPositif: dataKnn.confusion_matrix,
      prediksiNegatif: dataKnn.confusion_matrix,
      total: 459,
    },
    {
      key: "3",
      dataAktual: "Total",
      prediksiPositif: 156,
      prediksiNegatif: 535,
      total: 691,
    },
  ];

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
          rules={[
            { required: true, message: "Masukkan nilai K!" },
            {
              pattern: /^[1-9]\d*$/, // Hanya angka positif
              message: "Nilai K harus berupa angka positif!",
            },
          ]}
        >
          <Input
            value={nilaiK}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && Number.isInteger(+value)) {
                setNilaiK(value);
              } else {
                message.error("Nilai K harus berupa angka bulat!");
                setNilaiK("");
              }
            }}
            placeholder="Masukkan Nilai K"
            type="number"
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
        <Table
          dataSource={dataSource}
          pagination={false} // Nonaktifkan pagination
          bordered // Tambahkan border pada tabel
          style={{
            backgroundColor: "yellow",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Table.Column
            title="Data Aktual"
            dataIndex="dataAktual"
            key="dataAktual"
            render={(text) => <b>{text}</b>}
          />
          <Table.ColumnGroup title="Data Prediksi">
            <Table.Column
              title="Positif"
              dataIndex="prediksiPositif"
              key="prediksiPositif"
            />
            <Table.Column
              title="Negatif"
              dataIndex="prediksiNegatif"
              key="prediksiNegatif"
            />
          </Table.ColumnGroup>
          <Table.Column title="Total" dataIndex="total" key="total" />
        </Table>
        <Divider> Detail Perhitungan Evaluasi</Divider>
        <Table
          dataSource={[{ decimalAccuracy, decimalPrecision, decimalRecall }]}
        >
          <Column
            title="Akurasi"
            dataIndex="decimalAccuracy"
            key="decimalAccuracy"
          />
          <Column
            title="Presisi"
            dataIndex="decimalPrecision"
            key="decimalPrecision"
          />
          <Column
            title="Recall"
            dataIndex="decimalRecall"
            key="decimalRecall"
          />
        </Table>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Positive"
                value={decimalPercentPositive}
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
                value={decimalPercentNegative}
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