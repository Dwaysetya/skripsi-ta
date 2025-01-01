import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";

const DataEdit = ({ onSubmit, open, onOk, onCancel, childern }) => {
  const [form] = Form.useForm();
  const [kataSlang, setKataSlang] = useState("");
  const [kataBuku, setKataBuku] = useState("");

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Modal title="Edit Data" open={open} ok={onOk} onCancel={onCancel}>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
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
        {childern}
      </Form>
    </Modal>
  );
};

export default DataEdit;
