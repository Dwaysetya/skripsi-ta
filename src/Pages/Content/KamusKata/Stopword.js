import { Form, Input, Layout, Modal, Table, message, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import ImportData from "../../../Components/Fragments/ImportData";
import TambahData from "../../../Components/Fragments/TambahData";
import Foter from "../../Footer";
import { BASE_URL } from "../../../utils/constants";

const { Content } = Layout;
const { Search } = Input;

function Stopword() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("TambahData");
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [Stopword, setStopword] = useState("");
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
      .get(`${BASE_URL}/stopword`)
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
        const dataUpdate = res.data.sort((a, b) =>
          a.kata_stop.localeCompare(b.kata_stop)
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
    if (!Stopword) {
      alert("Harap tambahkan data!");
      return; // Hentikan eksekusi jika input kosong
    }

    try {
      const newId = `id${Dummy.length + 1}`;
      const response = await axios.post(`${BASE_URL}/stopword`, {
        id: newId,
        kata_stop: Stopword,
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
    setStopword(record.kata_stop);
    setIsModalEdit(true);
  };

  const handleEdit = async () => {
    if (!Stopword) {
      alert("Harap ubah data");
      return; // Hentikan eksekusi jika input kosong
    }

    // console.log("id", id);
    if (Stopword) {
      // KETIKA KLIK YES AKAN MASUK KE FUNCTION INI
      axios
        .put(`${BASE_URL}/stopword/update/${recordData.id}`, {
          kata_stop: Stopword,
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
        item.kata_stop.toLowerCase().includes(value.toLowerCase())
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
          .delete(`${BASE_URL}/stopword/delete/${record.id}`)
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
    { title: "Kata Stop", dataIndex: "kata_stop", key: "kata_stop" },
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
            value={Stopword}
            defaultValue={Stopword}
            key={recordData.id}
            onChange={(e) => setStopword(e.target.value)}
          />
        </Form.Item>
      </Modal>
      {modalContent === "TambahData" && (
        <TambahData open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {" "}
          <Form.Item name="createdat" label="Created At">
            <Input
              type="text"
              value={Stopword}
              onChange={(e) => setStopword(e.target.value)}
            />
          </Form.Item>
        </TambahData>
      )}
      {modalContent === "ImportData" && (
        <ImportData
          open={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
            GetdataUsers();
          }}
          onCancel={handleCancel}
          url={`${BASE_URL}/stopword/import`}
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
