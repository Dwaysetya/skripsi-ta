import { Layout, Table, theme } from "antd";
import React, { useState } from "react";
import Label from "../../../../Components/Elements/Label";
const { Content } = Layout;

function DataLatih(data) {
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
    { title: "Ulasan", dataIndex: "raw_data", key: "raw_data" },
    {
      title: "label",
      dataIndex: "label",
      key: "label",
    },
  ];

  return (
    <div>
      <Label
        htmlFor="Data Latih"
        text="Data Latih"
        style={{
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <Content
        style={{
          margin: "5px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table columns={columns} dataSource={data.data.training_data} />
      </Content>
    </div>
  );
}

export default DataLatih;
