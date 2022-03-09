import React from "react";
import "./RotateLoading.css";

const RotateLoading = () => {
  return (
    <div className="coin">
      <div className="coin__front"></div>
      <div className="coin__edge">
        <div className="coin__edge_image"></div>
        <div className="coin__edge_image"></div>
        <div className="coin__edge_image"></div>
        <div className="coin__edge_image"></div>
        <div className="coin__edge_image"></div>
        <div className="coin__edge_image"></div>
        <div className="coin__shadow"></div>
      </div>
    </div>
  );
};

export default RotateLoading;
