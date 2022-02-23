import React from "react";
import "./Message.css";

function Message({ message, timestamp, user, userImage }) {
  return (
    <div className="message">
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
      </div>
    </div>
  );
}

export default Message;
