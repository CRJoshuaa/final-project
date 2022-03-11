import React from "react";
import "./ShakeLoader.css";
import logo from "../images/appLogoSquare.png";

const ShakeLoader = () => {
  return (
    <div className="loading-cont">
      <div className="shaker-load">
        <img src={logo} alt="Loading..." />
        <h1 className="motto">Earn High Like You Never Before</h1>
      </div>
    </div>
  );
};

export default ShakeLoader;
