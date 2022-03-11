import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import "./Apperance_setting.css";
// import MessageNotifications from "./Notifications";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ReplyIcon from "@mui/icons-material/Reply";

function AppearanceSetting() {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  const changeTheme = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };
  const [user] = useAuthState(auth);

  return (
    <div
      className={`background ${
        darkMode ? "background-dark" : "background-light"
      }`}
    >
      <h2 className={`header ${darkMode ? "header-dark" : "header-light"}`}>
        Appearance
      </h2>
      <div className="appearance-setting">
        <div className={`para ${darkMode ? "para-dark" : "para-light"}`}>
          <div className="chat-preview">
            <h3> Chatroom Preview</h3>
            <div className="preview-msg">
              <img
                className="preview-avatar"
                alt={user?.displayName}
                src={user?.photoURL}
              />
              <div
                className={`msg-detail ${darkMode ? "msg-dark" : "msg-light"}`}
              >
                <div className="current-msg">
                  <h4>
                    {user?.displayName}
                    <span>27/7/1987, 12:00:00 PM</span>
                  </h4>
                  <p>Never gonna give you up</p>
                  <ReplyIcon />
                </div>
              </div>
            </div>
            <div className="preview-msg">
              <img
                className="preview-avatar"
                alt={user?.displayName}
                src={user?.photoURL}
              />
              <div
                className={`msg-detail ${darkMode ? "msg-dark" : "msg-light"}`}
              >
                <div className="current-msg">
                  <h4>
                    {user?.displayName}
                    <span>27/7/1987, 12:00:00 PM</span>
                  </h4>
                  <p>Never gonna let you down</p>
                  <ReplyIcon />
                </div>
              </div>
            </div>
            <div className="preview-user">
              <img
                className="user-avatar"
                alt={user?.displayName}
                src={user?.photoURL}
              />
              <div
                className={`user-msg ${darkMode ? "user-dark" : "user-light"}`}
              >
                <div className="current-msg">
                  <h4>
                    {user?.displayName}
                    <span>27/7/1987, 12:00:00 PM</span>
                  </h4>
                  <p>Never gonna run around and desert you</p>
                  <ReplyIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
          onClick={changeTheme}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default AppearanceSetting;
