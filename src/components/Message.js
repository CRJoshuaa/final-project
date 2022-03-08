import React from "react";
import "./Message.css";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
// import { checkedCheck } from "./testnoti";
import ReplyIcon from "@mui/icons-material/Reply";
import Linkify from "react-linkify";
import { current } from "@reduxjs/toolkit";

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
  // var currentTimestamp = Math.round(new Date().getTime() / 1000);
  // console.log(Date(currentTimestamp?.toDate()).toLocaleString(Date.DATE_FULL));
  // console.log("currentTimestamp: " + currentTimestamp);
  // console.log("timestamp from channel: " + Math.floor(timestamp / 1000));
  // console.log("Normal timestamp: " + timestamp);
  // console.log(Date(timestamp?.toDate()).toLocaleString(Date.DATE_FULL));
  const [replyDetails] = useDocument(
    roomId &&
      replyDocId &&
      db.collection("rooms").doc(roomId).collection("messages").doc(replyDocId)
  );
  // if (
  //   Date(timestamp?.toDate()).toLocaleString(Date.DATE_FULL) <= currentTimestamp
  // ) {
  // checkedCheck(channelName, message[1]);

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
