import { useState, useEffect } from "react";
import { Layout, Table, theme, Input, message } from "antd";
import Label from "../../../Components/Elements/Label";
import IndexButton from "../../../Components/Elements/Button";
import axios from "axios";
import ImportData from "../../../Components/Fragments/ImportData";
import Footer from "../../Footer";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;
const { Search } = Input;

function Dataset() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Dummy, setDummy] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Function untuk fetch data
  const GetdataUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dataset`);
      console.log("Data dari dataset:", res.data);

      const dataUpdate = res.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setDummy(dataUpdate);
    } catch (err) {
      console.log("Error fetching data:", err);
      message.error("Gagal mengambil data dataset.");
    }
  };

  // Jalankan hanya sekali saat komponen di-mount
  useEffect(() => {
    GetdataUsers();
  }, []); // Dependency array kosong: hanya jalan sekali saat mount

  const handleSearch = (value) => {
    if (value.trim() === "") {
      GetdataUsers(); // Reset ke data awal
    } else {
      const filteredData = Dummy.filter(
        (item) =>
          (item.created_at &&
            item.created_at.toLowerCase().includes(value.toLowerCase())) ||
          (item.raw_data &&
            item.raw_data.toLowerCase().includes(value.toLowerCase())) ||
          (item.username &&
            item.username.toLowerCase().includes(value.toLowerCase()))
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
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        url={`${BASE_URL}/dataset`}
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
        <Search
          style={{ width: "300px" }}
          placeholder="Search by Dataset"
          onSearch={handleSearch}
          enterButton
        />
        <IndexButton type="primary" onClick={() => setIsModalOpen(true)}>
          Import Data
        </IndexButton>
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
          rowKey={(record) => record.id || record.key}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />
      </Content>
      <Footer />
    </Layout>
  );
}

export default Dataset;
