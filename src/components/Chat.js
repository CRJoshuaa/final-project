import React from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { selectRoomId } from "../features/appSlice";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { IconButton } from "@mui/material";

function Chat() {
  // const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  const dummyScroll = document.getElementById("dummy");
  dummyScroll.scrollTop = dummyScroll.scrollHeight;

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-left">
          <h4>
            <strong>#{roomDetails?.data().name}</strong>
          </h4>
          <IconButton>
            <StarBorderOutlinedIcon />
          </IconButton>
        </div>
        <div className="chat-header-right">
          <InfoOutlinedIcon /> Details
        </div>
      </div>
      {roomDetails && roomMessages && (
        <>
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
          </div>
          <div id="dummy" className="chat-dummy">
            app not scrolling makes 25 y/o cry
          </div>
          <div className="chat-footer">
            <div className="chat-input" ref={chatRef}>
              <ChatInput
                chatRef={chatRef}
                channelName={roomDetails?.data().name}
                channelId={roomId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
