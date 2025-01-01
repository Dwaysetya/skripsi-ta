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

function Slangword() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("TambahData");
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [kataSlang, setKataSlang] = useState("");
  const [kataBaku, setKataBaku] = useState("");
  const [Dummy, setDummy] = useState("");
  const [recordData, setRecordData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const GetdataUsers = () => {
    axios
      .get("http://127.0.0.1:5000/slangword")
      .then((res) => {
        console.log("Data dari server:", res.data); // Tampilkan data
        const dataUpdate = res.data.sort((a, b) =>
          a.kata_baku.localeCompare(b.kata_baku)
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
    if (!kataSlang || !kataBaku) {
      alert("Harap tambahkan data!");
      return; // Hentikan eksekusi jika input kosong
    }

    try {
      const newId = `id${Dummy.length + 1}`;

      const response = await axios.post("http://127.0.0.1:5000/slangword", {
        id: newId,
        kata_baku: kataBaku,
        kata_slang: kataSlang,
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
    setKataBaku(record.kata_baku);
    setKataSlang(record.kata_slang);
    setIsModalEdit(true);
  };

  const handleEdit = async () => {
    if (!kataSlang || !kataBaku) {
      alert("Harap ubah data");
      return; // Hentikan eksekusi jika input kosong
    }

    // console.log("id", id);
    if (kataBaku || kataSlang) {
      // KETIKA KLIK YES AKAN MASUK KE FUNCTION INI
      axios
        .put(`http://127.0.0.1:5000/slangword/update/${recordData.id}`, {
          kata_baku: kataBaku,
          kata_slang: kataSlang,
        })
        .then((res) => {
          message.success("Data Berhasil di Tambah");
          GetdataUsers();
          setIsModalEdit(false);
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
      const filteredData = Dummy.filter(
        (item) =>
          item.kata_baku.toLowerCase().includes(value.toLowerCase()) ||
          item.kata_slang.toLowerCase().includes(value.toLowerCase())
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
          .delete(`http://127.0.0.1:5000/slangword/delete/${record.id}`)
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
    { title: "Kata Baku", dataIndex: "kata_baku", key: "kata_baku" },
    { title: "Kata Slang", dataIndex: "kata_slang", key: "kata_slang" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <a
            style={{ marginRight: 16 }}
            onClick={() => {
              showModal(record);
              console.log(record);
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
        <Form.Item name="kata_baku" label="kata_baku">
          <Input
            type="text"
            value={kataBaku}
            defaultValue={kataBaku}
            key={recordData.id}
            onChange={(e) => setKataBaku(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="kata_slang" label="kata_slang">
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
          <Form.Item name="katabaku" label="kata baku">
            <Input
              type="text"
              value={kataBaku}
              onChange={(e) => setKataBaku(e.target.value)}
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
          onOk={() => {
            setIsModalOpen(false);
            GetdataUsers();
          }}
          onCancel={handleCancel}
          url={"http://127.0.0.1:5000/slangword/import"}
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
            style={{ width: "400px" }}
            placeholder="Search by baku or slang"
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
