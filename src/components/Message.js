import React from "react";
import "./Message.css";

function Message({ message, timestamp, user, userImage, isCurrentUser }) {
  console.log(isCurrentUser);
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
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
