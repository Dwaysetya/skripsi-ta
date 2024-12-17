import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Layout } from "antd";
import Label from "../../../Components/Elements/Label";
import SignIn from "./Sign-In";
const Login = () => {
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
          <SignIn />
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
export default Login;