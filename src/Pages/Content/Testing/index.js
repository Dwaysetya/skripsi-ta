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
  Skeleton,
} from "antd";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import TambahData from "../../../Components/Fragments/TambahData";
import TampilData from "./DataTesting/TampilData";
import Foter from "../../Footer";
import NotFoundPage from "../../404";
import ModalTesting from "../../../Components/Fragments/ModalTesting";
import DataLatih from "./DataTesting/DataLatih";

const { Content } = Layout;

const Testing = () => {
  const [] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("UjiData");
  const [isRenderView, setIsRenderView] = useState(false);
  const [hideTestingButton, setHideTestingButton] = useState(false);
  const [showOtherButtons, setShowOtherButtons] = useState(false);
  const [kontenAktif, setKontenAktif] = useState("A");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const kontenMapping = {
    A: <Testing />,
    B: <TampilData />,
    C: <DataLatih />,
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsRenderView(true);
  };
  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle state
  };

  const handleTestingClick = () => {
    setHideTestingButton(true);
    setShowOtherButtons(true);
    setIsModalOpen(false);
  };

  const renderView = () => {
    if (isRenderView) {
      return <TampilData />;
    }
    return <NotFoundPage />;
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <ModalTesting
        open={isModalOpen}
        onOk={handleTestingClick}
        onCancel={handleCancel}
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
          onChange={onChange}
          value={value}
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
          <Input />
        </Form.Item>
      </ModalTesting>
      <Label
        htmlFor="Testing"
        text="Testing"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          margin: "5px 0 24px 16px",
        }}
      >
        {!hideTestingButton && (
          <IndexButton
            type="primary"
            onClick={() => {
              handleButtonClick("UjiData");
            }}
          >
            Uji Data
          </IndexButton>
        )}
        <Row gutter={[16]}>
          {showOtherButtons &&
            [
              { key: "B", label: "Data Uji" },
              { key: "C", label: "Data Latih" },
            ].map((btn) => (
              <Col key={btn.key} span={12}>
                <IndexButton
                  type="primary"
                  onClick={() => {
                    setKontenAktif(btn.key);
                    handleClick();
                  }}
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
export default Testing;
