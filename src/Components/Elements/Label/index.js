// Label.js
import React from "react";

// A simple Label component that accepts props to customize it
const Label = ({ htmlFor, text, style, className }) => {
  return (
    <label htmlFor={htmlFor} className={className} style={style}>
      {text}
    </label>
  );
};

export default Label;
