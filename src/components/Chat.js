import React from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  // const roomId = useSelector(selectRoomId);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  console.log(roomDetails);
  console.log(roomMessages);

  return (
    <div className="chat">
      <>
        <div className="chat-header">
          <div className="chat-header-left">
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </div>
          <div className="chat-header-right">
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </div>
        </div>

        <div className="chat-messages">
          {roomMessages?.docs.map((doc) => {
            const { message, timestamp, user, userImage } = doc.data();

            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <div className="chat-bottom"></div>
        </div>
        <ChatInput channelName={roomDetails?.data().name} channelId={roomId} />
      </>
    </div>
  );
}

export default Chat;
