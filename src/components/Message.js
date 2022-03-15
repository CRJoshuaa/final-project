import React, { useContext } from "react";
import "./Message.css";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
// import { checkedCheck } from "./testnoti";
import ReplyIcon from "@mui/icons-material/Reply";
import Linkify from "react-linkify";
import { current } from "@reduxjs/toolkit";
import { List } from "@mui/material";
import { ThemeContext } from "./ThemeContext";

import useNotificationContext from "./useNotificationsContext";

function Message({
  messageId,
  message,
  replyDocId,
  roomId,
  timestamp,
  user,
  channelName,
  userImage,
  isCurrentUser,
  setReplyDocId,
}) {
  const addNotification = useNotificationContext();

  const [replyDetails] = useDocument(
    roomId &&
      replyDocId &&
      db.collection("rooms").doc(roomId).collection("messages").doc(replyDocId)
  );
  //TODO: new message notification
  // addNotification(message);

  // if (
  //   Date(timestamp?.toDate()).toLocaleString(Date.DATE_FULL) <= currentTimestamp
  // ) {
  // checkedCheck(channelName, message);

  // console.log(message);
  // }
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  return (
    <div className="message-outer">
      <div
        className={`message ${
          isCurrentUser &&
          `current-user ${
            darkMode ? "current-user-dark" : "current-user-light"
          }`
        }`}
      >
        <img className="message-avatar" src={userImage} alt="" />
        <div
          className={`message-details ${
            darkMode ? "message-details-dark" : "message-details-light"
          }`}
        >
          {replyDocId && (
            <div
              className={`reply-message ${
                darkMode ? "reply-message-dark" : "reply-message-light"
              }`}
            >
              <h5>{replyDetails?.data().user}</h5>
              <Linkify>
                <p>{replyDetails?.data().message}</p>
              </Linkify>
            </div>
          )}

          <div
            className="current-message"
            // {`current-message ${
            //   darkMode ? "current-message-dark" : "current-message-light"
            // }`}
          >
            <div className="message-info">
              <h4>
                {user}
                <span>
                  {new Date(timestamp?.toDate()).toLocaleString(Date.DATE_FULL)}
                </span>
              </h4>
              {/* <td onClick={() => window.open("someLink", "_blank")}>{message}</td> */}
              {/* Above is for opening another tab when clicking */}
              <Linkify style={{ textDecoration: "inherit", color: "inherit" }}>
                <p>{message}</p>
              </Linkify>

              <div
                className={`message-buttons ${
                  darkMode ? "message-buttons-dark" : "message-buttons"
                }`}
              >
                <ReplyIcon
                  onClick={() => {
                    setReplyDocId(messageId);
                    document.querySelector("#message-input")?.focus();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
