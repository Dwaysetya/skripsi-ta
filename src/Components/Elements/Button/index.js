import { Button } from "antd";
import React from "react";

function IndexButton(props) {
  const { type, children, onClick, margin = "0px" } = props;
  return (
    <Button
      type={type}
      htmlType="submit"
      style={{
        width: "auto",
        height: "30px",
        padding: "0px 10px",
        margin: margin,
      }}
      onClick={onClick}
    >
      {children} {/* Render children untuk isi tombol */}
    </Button>
  );
}

export default IndexButton;
