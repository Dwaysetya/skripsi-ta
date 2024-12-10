import React, { useState, useEffect } from "react";
import { Input, Layout, Table, theme } from "antd";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import axios from "axios";
import Foter from "../../Footer";

const { Content } = Layout;
const { Search } = Input;

const Labeling = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Dummy, setDummy] = useState("");

  const GetdataUsers = () => {
    axios
      .get("http://localhost:3002/labeling/")
      .then((res) => {
        console.log("Data dari server:", res.data);
        const dataUpdate = res.data.sort((a, b) =>
          a.createdat.localeCompare(b.createdat)
        );
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

  const handleSearch = (value) => {
    const filteredData = Dummy.filter(
      (item) =>
        item.label.toLowerCase().includes(value.toLowerCase()) ||
        item.username.toLowerCase().includes(value.toLowerCase()) ||
        item.ulasan.toLowerCase().includes(value.toLowerCase())
    );
    setDummy(filteredData);
  };

  const columns = [
    { title: "No", key: "index", render: (text, record, index) => index + 1 },
    { title: "Created At", dataIndex: "Created At", key: "Created At" },
    { title: "username", dataIndex: "username", key: "username" },
    { title: "ulasan", dataIndex: "googleplay", key: "googleplay" },
    { title: "label", dataIndex: "label", key: "label" },
  ];
  return (
    <Layout>
      <Label
        htmlFor="Labeling"
        text="Labeling"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 15px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginRight: "40%",
          }}
        >
          <Search
            style={{ width: "300px" }}
            placeholder="Search by Labeling"
            onSearch={handleSearch}
            enterButton
          />
        </div>
        <div
          style={{
            flexGrow: 0,
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <IndexButton
            type="primary"
            // onClick={() => handleButtonClick("StartLabeling")}
          >
            Start Labeling
          </IndexButton>
        </div>
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
        <Table columns={columns} dataSource={Dummy} />
      </Content>
      <Foter />
    </Layout>
  );
};
export default Labeling;
