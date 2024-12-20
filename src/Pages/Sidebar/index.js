import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  DatabaseOutlined,
  LoadingOutlined,
  DoubleRightOutlined,
  TagOutlined,
  CheckSquareOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const imagePath = collapsed
    ? "../src/images/logoS.png"
    : "../src/images/logoSS.png";

  return (
    <Sider
      width={200}
      style={{ height: "100vh", position: "fixed", zIndex: "99", left: 0 }}
    >
      <header>
        <img
          alt="Logo"
          src={imagePath}
          style={{
            display: "flex",
            padding: "5px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "10vh",
          }}
          onClick={() => setCollapsed(!collapsed)}
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
          <Link to="/contact">Testing</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LogoutOutlined />}>
          <Link to="/contact">Log-Out</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;
