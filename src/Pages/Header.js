import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { Color } from "antd/es/color-picker";
const { Header } = Layout;

function IndexHeaders(props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus data login dari localStorage
    localStorage.removeItem("isLogin");

    // Arahkan ke halaman login
    navigate("/login");
    window.location.reload();
  };

  return (
    <Layout>
      <Header
        style={{
          background: colorBgContainer,
          width: "100%",
          padding: 0,
          position: "fixed",
          zIndex: "99",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Mengatur horizontal center
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "#001529",
              marginLeft: "15%",
              marginTop: "0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ANALISIS SENTIMEN KEPUASAN PENGGUNA APLIKASI BANK SAQU
          </h3>
        </div>
        <Menu
          // theme="light"
          // mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            position: "absolute", // Menggunakan posisi absolut
            right: 0, // Meletakkan menu di sebelah kanan
            top: 0, // Meletakkan menu di atas (jika perlu)
            display: "flex",
            justifyContent: "flex-end", // Mengatur konten di dalam menu ke sebelah kanan
            width: 120,
            margin: "10px",
          }}
          onClick={() => {
            handleLogout();
          }}
          items={[
            {
              key: "50",
              icon: <LogoutOutlined />,
              label: <Link to="/login">Log-Out</Link>,
            },
          ]}
        />
      </Header>
    </Layout>
  );
}
export default IndexHeaders;
