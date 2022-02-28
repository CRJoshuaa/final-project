import React from "react";
import "./Message.css";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

import ReplyIcon from "@mui/icons-material/Reply";
import Linkify from "react-linkify";

function Message({
  messageId,
  message,
  replyDocId,
  roomId,
  timestamp,
  user,
  userImage,
  isCurrentUser,
  setReplyDocId,
}) {
  const [replyDetails] = useDocument(
    roomId &&
      replyDocId &&
      db.collection("rooms").doc(roomId).collection("messages").doc(replyDocId)
  );

  return (
    <div className="message-outer">
      <div className={`message ${isCurrentUser && `current-user`}`}>
        {replyDocId && (
          <div className="reply-message">
            <h5>{replyDetails?.data().user}</h5>
            <Linkify>
              <p>{replyDetails?.data().message}</p>
            </Linkify>
          </div>
        )}

        <div className="current-message">
          <img src={userImage} alt="" />
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
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
