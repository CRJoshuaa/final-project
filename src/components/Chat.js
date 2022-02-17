import React from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";

function Chat() {
  // const roomId = useSelector(selectRoomId);
  const roomId = useSelector(selectRoomId);

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
        <ChatInput channelId={roomId} />
      </>
    </div>
  );
}

export default Chat;
