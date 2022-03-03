import React from "react";
import "./Loader.css";
import logo from "../images/appLogoSquare.png";

const Loader = () => {
  return (
    <div className="coingram-logo">
      <img src={logo} alt="Loading..." />
      <h3>Earn High Like You Never Before</h3>
    </div>
  );
};

export default Loader;
