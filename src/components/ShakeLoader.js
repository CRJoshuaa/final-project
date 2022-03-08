import React from "react";
import "./ShakeLoader.css";
import logo from "../images/appLogoSquare.png";

const ShakeLoader = () => {
  return (
    <div className="coingram-logo">
      <img src={logo} alt="Loading..." />
      <h1 className="motto">Earn High Like You Never Before</h1>
    </div>
  );
};

export default ShakeLoader;
