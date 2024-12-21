import React, { useState, useEffect } from "react";
import { Layout, Table, theme } from "antd";
import axios from "axios";

const { Content } = Layout;

const columns = [
  { title: "No", key: "index", render: (text, record, index) => index + 1 },
  { title: "Created At", dataIndex: "Created At", key: "created_at" },
  { title: "User Name", dataIndex: "username", key: "username" },
  { title: "Ulasan", dataIndex: "raw_data", key: "raw_data" },
];

const PreprocessingData = () => {
  const [] = useState(false);
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
      .get("http://127.0.0.1:5000/dataset")
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
        // const dataUpdate = res.data.sort((a, b) => {
        //   return new Date(a.date) - new Date(b.date);
        // });
        console.log("Data yang diurutkan:", res);
        setDummy(res);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  useEffect(() => {
    GetdataUsers();
  }, []);

  return (
    <div>
      <Content
        style={{
          margin: "20px 15px 20px 16px",
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
    </div>
  );
};
export default PreprocessingData;
