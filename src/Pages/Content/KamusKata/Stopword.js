import React, { useEffect, useState } from "react";
import { Layout, Table, theme, Input, Form } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import TambahData from "../../../Components/Fragments/TambahData";
import ImportData from "../../../Components/Fragments/ImportData";
import Label from "../../../Components/Elements/Label";
import IndexButton from "../../../Components/Elements/Button";
import DataEdit from "../../../Components/Fragments/DataEdit";
import Foter from "../../Footer";

// import Preprocessing from "./Dashboard/Preprocessing/Index";
const { Content } = Layout;
const { Search } = Input;

// Definisikan data tabel
function Stopword() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("TambahData");
  const [Dummy, setDummy] = useState("");

  const GetdataUsers = () => {
    axios
      .get("http://localhost:3005/kataslang/")
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
        setDummy(res.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  useEffect(() => {
    GetdataUsers();
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const handleSearch = (value) => {
    const filteredData = Dummy.filter((item) =>
      item.CreatedAt.toLowerCase().includes(value.toLowerCase())
    );
    setDummy(filteredData);
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus saja",
    }).then((result) => {
      if (result.isConfirmed) {
        setDummy((prevData) =>
          prevData.filter((item) => item.key !== record.key)
        );
        Swal.fire("Deleted!", "Data telah dihapus.", "success");
      }
    });
  };
  const columns = [
    {
      title: "No",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    { title: "Kata Buku", dataIndex: "CreatedAt", key: "CreatedA" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <a
            style={{ marginRight: 16 }}
            onClick={() => handleButtonClick("EditData")}
          >
            Edit
          </a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </span>
      ),
    },
  ];

  const dataSource = Array.from({
    length: Dummy.length,
  }).map((_, i) => ({
    key: i,
    title: i.katabuku,
    render: (_, record) => (
      <span>
        <a
          style={{ marginRight: 16 }}
          onClick={() => handleButtonClick("EditData")}
        >
          Edit
        </a>
        <a onClick={() => handleDelete(record)}>Delete</a>
      </span>
    ),
  }));

  return (
    <Layout style={{ marginLeft: "17%", marginTop: "5%" }}>
      {modalContent === "TambahData" && (
        <TambahData open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form.Item
            name="createdat"
            label="Created At"
            rules={[
              { required: true, message: "Please input your Craeted At" },
            ]}
          >
            <Input />
          </Form.Item>
        </TambahData>
      )}
      {modalContent === "ImportData" && (
        <ImportData
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      )}
      {modalContent === "EditData" && (
        <DataEdit open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
      )}
      <Label
        htmlFor="Stopword"
        text="Stopword"
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
            placeholder="Search by stopword"
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
          <IndexButton
            type="primary"
            onClick={() => handleButtonClick("ImportData")}
          >
            Import Data
          </IndexButton>
          <IndexButton
            type="primary"
            onClick={() => handleButtonClick("TambahData")}
          >
            Tambah Data
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
        <Table columns={columns} dataSource={Dummy} />
      </Content>
      <Foter style={{ position: "fixed" }} />
    </Layout>
  );
}
export default Stopword;
