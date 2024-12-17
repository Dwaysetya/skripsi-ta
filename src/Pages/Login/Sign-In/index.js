import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Layout } from "antd";
import Label from "../../../Components/Elements/Label";
const SignIn = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <div style={{}}>
        <Label
          htmlFor="Sign-In"
          text="Sign-In"
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: "20px",
          }}
        />
      </div>
      <div style={{ margin: "5%" }}>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
