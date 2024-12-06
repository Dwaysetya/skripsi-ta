import React, { useState } from "react";
import { Layout, theme, Form, Input, Radio, Space } from "antd";
import TambahData from "../../../Components/Fragments/TambahData";
import Label from "../../../Components/Elements/Label";

const Testing = () => {
  const [] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("UjiData");
  const [isRenderView, setIsRenderView] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);

    setIsRenderView(true);
  };

  const renderView = () => {
    if (isRenderView) {
      return <TampilData />;
    }
    return null;
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
    <Layout>
      <TambahData
        open={isModalOpen}
        onOk={handleOk}
        // buttonOk={buttonOk}
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
      </TambahData>
      <IndexHeader />
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
        {/* Batasi lebar search di sini */}
        {/* <Search style={{ width: "30px" }} placeholder="Cari sesuatu..." /> */}
        <IndexButton
          type="primary"
          onClick={() => handleButtonClick("UjiData")}
        >
          Uji Data
        </IndexButton>
      </div>
      {renderView()}
      <IndexFooter />
    </Layout>
  );
};
export default Testing;
