import { Layout, Table, theme } from "antd";
import React, { useState } from "react";
import Label from "../../../Components/Elements/Label";
const { Content } = Layout;

function HapusKataStop({ data }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Dummy, setDummy] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Ulasan Normalisasi",
      dataIndex: "normalize_data",
      key: "normalize_data",
    },
    {
      title: "Ulasan Sesudah",
      dataIndex: "stopwordsRemoval_data",
      key: "stopwordsRemoval_data",
    },
  ];

  return (
    <div>
      <Label
        htmlFor="HapusKataStop"
        text="Hapus Kata Stopword"
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
        <Table
          columns={columns}
          dataSource={data}
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
}

export default HapusKataStop;
