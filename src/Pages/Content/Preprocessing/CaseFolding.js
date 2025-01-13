import { Layout, Table, theme } from "antd";
import React, { useState } from "react";
import Label from "../../../Components/Elements/Label";
const { Content } = Layout;

function CaseFolding({ data }) {
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
    { title: "Ulasan Sebelumnya", dataIndex: "awal_data", key: "awal_data" },
    {
      title: "Ulasan Sesudah",
      dataIndex: "caseFolding_data",
      key: "caseFolding_data",
    },
  ];

  return (
    <div>
      <Label
        htmlFor="Case folding"
        text="Case folding"
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

export default CaseFolding;
