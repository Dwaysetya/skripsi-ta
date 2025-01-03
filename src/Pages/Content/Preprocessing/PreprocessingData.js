import { Layout, Table, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;

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

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    { title: "User Name", dataIndex: "username", key: "username" },
    { title: "Ulasan", dataIndex: "raw_data", key: "raw_data" },
  ];

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
