import React from "react";
import { Button } from "antd";

function IndexButton(props) {
  const { type, children, onClick, margin = "0px" } = props; // Gunakan children, bukan Children dan label
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
