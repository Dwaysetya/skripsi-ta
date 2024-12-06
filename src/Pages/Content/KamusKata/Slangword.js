import React, { useEffect, useState } from "react";
import { Layout, Table, theme, Input, Form, message, Modal } from "antd";
import TambahData from "../../../Components/Fragments/TambahData";
import ImportData from "../../../Components/Fragments/ImportData";
import DataEdit from "../../../Components/Fragments/DataEdit";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
import axios, { Axios } from "axios";
import Foter from "../../Footer";
import Swal from "sweetalert2";

const { Content } = Layout;
const { Search } = Input;

function Slangword() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("TambahData");
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [kataSlang, setKataSlang] = useState("");
  const [kataBuku, setKataBuku] = useState("");
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
      .get("http://localhost:3002/kataslang/")
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
        const dataUpdate = res.data.sort((a, b) =>
          a.katabuku.localeCompare(b.katabuku)
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
    if (!kataSlang || !kataBuku) {
      alert("Harap tambahkan data!");
      return; // Hentikan eksekusi jika input kosong
    }

    try {
      const response = await axios.post("http://localhost:3002/kataslang", {
        id: Dummy.length + 1,
        katabuku: kataBuku,
        kataslang: kataSlang,
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
    setKataBuku(record.katabuku);
    setKataSlang(record.kataslang);
    setIsModalEdit(true);
  };

  const handleEdit = async () => {
    if (!kataSlang || !kataBuku) {
      alert("Harap ubah data");
      return; // Hentikan eksekusi jika input kosong
    }

    // console.log("id", id);
    if (kataBuku || kataSlang) {
      // KETIKA KLIK YES AKAN MASUK KE FUNCTION INI
      axios
        .put(`http://localhost:3002/kataslang/${recordData.id}`, {
          katabuku: kataBuku,
          kataslang: kataSlang,
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
    const filteredData = Dummy.filter(
      (item) =>
        item.katabuku.toLowerCase().includes(value.toLowerCase()) ||
        item.kataslang.toLowerCase().includes(value.toLowerCase())
    );
    setDummy(filteredData);
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
          .delete(`http://localhost:3002/kataslang/${record.id}`)
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
    { title: "Kata Buku", dataIndex: "katabuku", key: "katabuku" },
    { title: "Kata Slang", dataIndex: "kataslang", key: "kataslang" },
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
    <Layout style={{ marginLeft: "17%", marginTop: "5%" }}>
      <Modal
        title="Edit Data"
        open={isModalEdit}
        onOk={() => {
          handleEdit();
        }}
        onCancel={handleCancelEdit}
      >
        <Form.Item name="katabuku" label="kata buku">
          <Input
            type="text"
            value={kataBuku}
            defaultValue={kataBuku}
            key={recordData.id}
            onChange={(e) => setKataBuku(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="kataslang" label="kata slang">
          <Input
            type="text"
            value={kataSlang}
            key={recordData.id}
            defaultValue={kataSlang}
            onChange={(e) => setKataSlang(e.target.value)}
          />
        </Form.Item>
      </Modal>
      {modalContent === "TambahData" && (
        <TambahData open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {" "}
          <Form.Item name="katabuku" label="kata buku">
            <Input
              type="text"
              value={kataBuku}
              onChange={(e) => setKataBuku(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="kataslang" label="kata slang">
            <Input
              type="text"
              value={kataSlang}
              onChange={(e) => setKataSlang(e.target.value)}
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
        htmlFor="Slangword"
        text="Slangword"
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
            placeholder="Search by buku or slang"
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

export default Slangword;
