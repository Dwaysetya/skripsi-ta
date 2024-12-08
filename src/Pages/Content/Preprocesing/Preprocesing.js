import { Layout, Table, theme } from "antd";
import React, { useState, useEffect } from "react";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import axios from "axios";
import Foter from "../../Footer";
const { Content } = Layout;

function Preprocessing() {
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
      .get("http://localhost:3002/preprocesing/")
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
    { title: "Created At", dataIndex: "createdat", key: "createdat" },
    { title: "Ulasan", dataIndex: "ulasan", key: "ulasan" },
    { title: "User Name", dataIndex: "username", key: "username" },
  ];

  return (
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <Label
        htmlFor="Preprocesing"
        text="Preprocesing"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
          margin: "10px",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 15px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginRight: "40%",
          }}
        ></div>
        <div
          style={{
            flexGrow: 0,
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <IndexButton type="primary">Preprocesing</IndexButton>
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
        <Table
          columns={columns}
          dataSource={Dummy}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />
      </Content>
      <Foter />
    </Layout>
  );
}

export default Preprocessing;
