import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router";
import Label from "../../../Components/Elements/Label";
import { BASE_URL } from "../../../utils/constants";
const SignUp = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post(`${BASE_URL}/user/signup`, {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        message.success("Data berhasil di tambahkan");
      })
      .catch((err) => {
        message.error("Data Sudah Ada");
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "30%",
          paddingTop: "20%",
          background: "#001529",
        }}
      >
        <div style={{ margin: "5%" }}>
          <div>
            <Label
              htmlFor="Sign-Up"
              text="Sign-Up"
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
              {/* <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="axample@gmail.com"
                />
              </Form.Item> */}
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
                  Register
                </Button>
                <Link to="/signin">Log-In</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "70%",
          display: "flex", // Tambahkan display flex
          alignItems: "center", // Menengahkan vertikal
          justifyContent: "center", // Menengahkan horizontal
          textAlign: "center", // Teks berada di tengah
          margin: "0 auto", // Memusatkan elemen div ke tengah
          height: "100vh", // Tinggi penuh viewport
        }}
      >
        <div>
          <div>
            <h3>Selamat datang di website</h3>
          </div>
          <div>
            <h1>
              ANALISIS SENTIMEN KEPUASAN PENGGUNA APLIKASI BANK SAQU PADA MEDIA
              ULASAN GOOGLE PLAY MENGGUNAKAN METODE K-NEAREST NEIGHBOR DAN
              LEXICON BASED
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
