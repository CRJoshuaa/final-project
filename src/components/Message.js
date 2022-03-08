import React from "react";
import "./Message.css";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
// import { checkedCheck } from "./testnoti";
import ReplyIcon from "@mui/icons-material/Reply";
import Linkify from "react-linkify";
import { current } from "@reduxjs/toolkit";
import { List } from "@mui/material";
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

  // addNotification(message);

  // if (
  //   Date(timestamp?.toDate()).toLocaleString(Date.DATE_FULL) <= currentTimestamp
  // ) {
  // checkedCheck(channelName, message);

  // console.log(message);
  // }
  return (
    <div className="message-outer">
      <div className={`message ${isCurrentUser && `current-user`}`}>
        <img className="message-avatar" src={userImage} alt="" />
        <div className="message-details">
          {replyDocId && (
            <div className="reply-message">
              <h5>{replyDetails?.data().user}</h5>
              <Linkify>
                <p>{replyDetails?.data().message}</p>
              </Linkify>
            </div>
          )}

          <div className="current-message">
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

              <div className="message-buttons">
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
