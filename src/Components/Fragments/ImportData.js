import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload, message } from "antd";
import React from "react";

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const ImportData = ({ url, onSubmit, open, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const props = {
    name: "file",
    action: url.toString(),

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
        console.log("gagal", info);

        message.error(`${info.file.name} file upload failed.`);
      }

      console.log("info", info);
    },
  };

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Modal title="Import Data" open={open} onOk={onOk} onCancel={onCancel}>
      {/* <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}
      {/* <Form.Item>
          <Space>
            <SubmitButton form={form}>Submit</SubmitButton>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form> */}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
};

export default ImportData;
