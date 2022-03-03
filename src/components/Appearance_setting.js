import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import "./Apperance_setting.css";
import MessageNotifications from "./Notifications";

function AppearanceSetting() {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  const changeTheme = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };

  return (
    <div
      className={`background ${
        darkMode ? "background-dark" : "background-light"
      }`}
    >
      <h1 className={`head ${darkMode ? "head-dark" : "head-light"}`}>
        Appearance
      </h1>
      <p className={`para ${darkMode ? "para-dark" : "para-light"}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
      <button
        className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
        onClick={changeTheme}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default AppearanceSetting;
