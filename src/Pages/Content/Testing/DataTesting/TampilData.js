import React, { useState, useEffect } from "react";
import { Layout, Table, theme, Input } from "antd";
import Label from "../../../../Components/Elements/Label";

import IndexButton from "../../../../Components/Elements/Button";
import axios from "axios";

const { Content } = Layout;
const { Search } = Input;

function TampilData() {
  const [] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [Dummy, setDummy] = useState("");

  //   const getDataDummy = () => {
  //     axios
  //       .get("https://fakestoreapi.com/products")
  //       .then((res) => {
  //         return setDummy(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     getDataDummy();
  //   }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (value) => {
    const filteredData = Dummy.filter(
      (item) =>
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
    );
    setDummy(filteredData);
  };
  const columns = [
    { title: "No", key: "index", render: (text, record, index) => index + 1 },
    { title: "googleplay", dataIndex: "googleplay", key: "googleplay" },
    { title: "label", dataIndex: "label", key: "label" },
    {
      title: "Action",
      key: "action",
    },
  ];
  return (
    <Layout style={{ margin: "10px" }}>
      <Content
        style={{
          margin: "5px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table columns={columns} dataSource={Dummy} />
      </Content>
    </Layout>
  );
}
export default TampilData;
