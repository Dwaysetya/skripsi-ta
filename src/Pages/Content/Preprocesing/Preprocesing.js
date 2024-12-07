import { Input, Layout, Modal, Content } from "antd";
import React from "react";
import IndexButton from "../../../Components/Elements/Button";
import Label from "../../../Components/Elements/Label";
const { Content } = Layout;

function Preprocessing() {
  return (
    <Layout style={{ marginLeft: "14%", marginTop: "5%" }}>
      <ImportData open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
      <Label
        htmlFor="Preprocesing"
        text="Preprocesing"
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
          margin: "20px",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 15px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginRight: "40%",
          }}
        >
          <Search
            style={{ width: "300px" }}
            placeholder="Search by Dataset"
            onSearch={handleSearch}
            enterButton
          />
        </div>
        <div
          style={{
            flexGrow: 0,
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <IndexButton type="primary" onClick={() => setIsModalOpen(true)}>
            Preprocesing
          </IndexButton>
        </div>
      </div>
      <Content
        style={{
          margin: "5px 15px 24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table
          columns={columns}
          dataSource={Dummy}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />
      </Content>
    </Layout>
  );
}

export default Preprocessing;
