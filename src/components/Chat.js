import React from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { useSelector } from "react-redux";
// import { selectRoomId } from "../features/appSlice";
// import { ChatInput } from "./ChatInput";

function Chat() {
  //   const roomId = useSelector(selectRoomId);

  return (
    <div className="chat">
      <>
        <div className="chat-header">
          <div className="chat-header-left">
            <h4>
              <strong>#Room-name</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </div>
          <div className="chat-header-right">
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </div>
        </div>

        <div className="chat-messages">{/* List out the messages */}</div>
        <div className="chat-input">
          {/* channelName */}
          {/* channelId = {roomId} */}
        </div>
      </>
    </div>
  );
}

export default Chat;
