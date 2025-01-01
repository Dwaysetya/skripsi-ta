import { useState, useEffect } from "react";
import { Layout, Table, theme, Input, Form, message, Modal } from "antd";
import Label from "../../../Components/Elements/Label";
import IndexButton from "../../../Components/Elements/Button";
import axios from "axios";
import ImportData from "../../../Components/Fragments/ImportData";
import Foter from "../../Footer";
const { Content } = Layout;
const { Search } = Input;

function Dataset() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Dummy, setDummy] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const GetdataUsers = () => {
    axios
      .get("http://127.0.0.1:5000/dataset")
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

  const handleSearch = (value) => {
    // If no search value, reset the data to the full list by calling GetdataUsers
    if (value.trim() === "") {
      console.log("Resetting to full data...");
      GetdataUsers(); // Reset to the original full dataset
    } else {
      // If there is a search value, filter the data
      const filteredData = Dummy.filter(
        (item) =>
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
          item.raw_data.toLowerCase().includes(value.toLowerCase()) ||
          item.username.toLowerCase().includes(value.toLowerCase())
      );
      setDummy(filteredData);
    }
  };
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
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <ImportData
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        url={"http://127.0.0.1:5000/dataset"}
      />
      <Label
        htmlFor="Dataset"
        text="Dataset"
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
            placeholder="Search by Dataset"
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
          <IndexButton type="primary" onClick={() => setIsModalOpen(true)}>
            Import Data
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

export default Dataset;
