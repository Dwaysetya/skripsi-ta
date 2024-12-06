import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "antd";

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
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

const TambahData = ({ onSubmit, open, onOk, onCancel, children }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  return (
    <Modal title="Tambah Data" open={open} onOk={onOk} onCancel={onCancel}>
      <Form
        form={form}
        name="customForm"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        {children}{" "}
      </Form>
    </Modal>
  );
};

export default TambahData;
