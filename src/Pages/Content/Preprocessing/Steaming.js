import { Layout, Table, theme } from "antd";
import React, { useState, useEffect } from "react";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import axios from "axios";
import Foter from "../../Footer";
const { Content } = Layout;

function Steaming() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Dummy, setDummy] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const GetdataUsers = () => {
    axios
      .get("http://127.0.0.1:5000/preprocessing")
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

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Ulasan Sebelumnya", dataIndex: "awal_data", key: "awal_data" },
    { title: "Ulasan", dataIndex: "caseFolding_data", key: "stemming_data" },
  ];

  return (
    <div>
      <Label
        htmlFor="Steaming"
        text="Steaming"
        style={{
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <Content
        style={{
          margin: "20px 15px 20px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table columns={columns} dataSource={Dummy} />
      </Content>
    </div>
  );
}

export default Steaming;
