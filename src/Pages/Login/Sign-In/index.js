import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../../../Components/Elements/Label";
import { BASE_URL } from "../../../utils/constants";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    localStorage.setItem("isLogin", "true");
    try {
      const SignIn = await axios.post(`${BASE_URL}/user/signin`, {
        username: values.username,
        password: values.password,
      });
      console.log("dway", SignIn);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.log("Password Salah", error);
      message.error("Password Salah");
    }
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
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"

                  //   onChange={(e) => setUserName(e.target.value)}
                />
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

                  //   onChange={(e) => setIsPassword(e.target.value)}
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
                <Link to="/signup">Register Now</Link>
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
export default SignIn;
