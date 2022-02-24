import React from "react";
import "./Message.css";

import ReplyIcon from "@mui/icons-material/Reply";

function Message({ message, timestamp, user, userImage, isCurrentUser }) {
  return (
    <div className={`message ${isCurrentUser && `current-user`}`}>
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
        <p>{message}</p>
        <div className="message-buttons">
          <ReplyIcon
            onClick={() => {
              console.log(message);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
