import React, { useContext } from "react";
import "./RotateLoading.css";
import { ThemeContext } from "./ThemeContext";

const RotateLoading = () => {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;
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
