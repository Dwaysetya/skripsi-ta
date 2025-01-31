import {
  CheckSquareOutlined,
  DatabaseOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  LoadingOutlined,
  ReadOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/saquL.png";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus data login dari localStorage
    localStorage.removeItem("isLogin");
    // Tampilkan pesan sukses (opsional)
    console.log("Anda telah logout");
    // Arahkan ke halaman login
    navigate("/signin");
  };

  return (
    <Sider
      width={200}
      style={{ height: "100vh", position: "fixed", zIndex: "99", left: 0 }}
    >
      <header>
        <img
          alt="Logo"
          src={Logo}
          style={{
            padding: "5px",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "80px",
          }}
        />
      </header>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {/* Home Menu Item */}
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        {/* About Menu Item with SubMenu */}
        <SubMenu icon={<ReadOutlined />} key="2" title="Kamus Kata">
          <Menu.Item icon={<DoubleRightOutlined />} key="2-1">
            <Link to="/kamuskata/slangword">Slangword</Link>
          </Menu.Item>
          <Menu.Item icon={<DoubleRightOutlined />} key="2-2">
            <Link to="/kamuskata/stopword">Stopword</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="3" icon={<DatabaseOutlined />}>
          <Link to="/dataset">Dataset</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<LoadingOutlined />}>
          <Link to="/preprocessing">Preprocessing</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<TagOutlined />}>
          <Link to="/labeling">Labeling</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<CheckSquareOutlined />}>
          <Link to="/Testing">Testing</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;
