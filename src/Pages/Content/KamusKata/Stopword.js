import React, { useEffect, useState } from "react";
import { Layout, Table, theme, Input, Form, message, Modal } from "antd";
import TambahData from "../../../Components/Fragments/TambahData";
import ImportData from "../../../Components/Fragments/ImportData";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import axios, { Axios } from "axios";
import Foter from "../../Footer";
import Swal from "sweetalert2";

const { Content } = Layout;
const { Search } = Input;

function Stopword() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("TambahData");
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [CreatedAt, setCreatedAt] = useState("");
  const [Dummy, setDummy] = useState("");
  const [recordData, setRecordData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const GetdataUsers = () => {
    axios
      .get("http://localhost:3002/stopword/")
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
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

  const handleOk = async () => {
    if (!CreatedAt) {
      alert("Harap tambahkan data!");
      return; // Hentikan eksekusi jika input kosong
    }

    try {
      const newId = `id${Dummy.length + 1}`;
      const response = await axios.post("http://localhost:3002/stopword", {
        id: newId,
        createdat: CreatedAt,
      });
      console.log("Data berhasil dikirim:", response.data);
      message.success("Data Berhasil Ditambahkan!");
      setIsModalOpen(false);
      GetdataUsers();
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
      message.error("Gagal Menambahkan Data!");
    }
  };

  const showModal = (record) => {
    setRecordData(record);
    setCreatedAt(record.createdat);
    setIsModalEdit(true);
  };

  const handleEdit = async () => {
    if (!CreatedAt) {
      alert("Harap ubah data");
      return; // Hentikan eksekusi jika input kosong
    }

    // console.log("id", id);
    if (CreatedAt) {
      // KETIKA KLIK YES AKAN MASUK KE FUNCTION INI
      axios
        .put(`http://localhost:3002/stopword/${recordData.id}`, {
          createdat: CreatedAt,
        })
        .then((res) => {
          message.success("Data Berhasil di Tambah");
          setIsModalEdit(false);
          GetdataUsers();
        })
        .catch((err) => console.log(err));
      return;
    }
  };
  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSearch = (value) => {
    // If no search value, reset the data to the full list by calling GetdataUsers
    if (value.trim() === "") {
      console.log("Resetting to full data...");
      GetdataUsers(); // Reset to the original full dataset
    } else {
      // If there is a search value, filter the data
      const filteredData = Dummy.filter((item) =>
        item.createdat.toLowerCase().includes(value.toLowerCase())
      );
      setDummy(filteredData);
    }
  };

  const handleDelete = (record) => {
    // alert delete muncul
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
        // KETIKA KLIK YES AKAN MASUK KE FUNCTION INI
        axios
          .delete(`http://localhost:3002/stopword/${record.id}`)
          .then((res) => {
            // KETIKA SUKSES AKAN GET DATA KEMBALI SUPAYA TERUPDATE
            GetdataUsers();
            message.success("Data Berhasil Dihapus");
          })
          .catch((err) => console.log(err));
        return;
      }
      // KETIKA KLIK NO AKAN MASUK KE FUNCTION INI
      console.log("GGAL");
    });
  };

  const columns = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Created At", dataIndex: "createdat", key: "createdat" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <a
            style={{ marginRight: 16 }}
            onClick={() => {
              showModal(record);
            }}
          >
            Edit
          </a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <Modal
        title="Edit Data"
        open={isModalEdit}
        onOk={() => {
          handleEdit();
        }}
        onCancel={handleCancelEdit}
      >
        <Form.Item name="createdat" label="Created At">
          <Input
            type="text"
            value={CreatedAt}
            defaultValue={CreatedAt}
            key={recordData.id}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </Form.Item>
      </Modal>
      {modalContent === "TambahData" && (
        <TambahData open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {" "}
          <Form.Item name="createdat" label="Created At">
            <Input
              type="text"
              value={CreatedAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
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
            style={{ width: "400px" }}
            placeholder="Search by created at"
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

export default Stopword;
