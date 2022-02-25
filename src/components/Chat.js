import React, { useState } from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { selectRoomId } from "../features/appSlice";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";

import Message from "./Message";
import { IconButton } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import Replybox from "./ReplyBox";

function Chat() {
  // const roomId = useSelector(selectRoomId);
  const [replyDocId, setReplyDocId] = useState(null);
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

  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

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
              const { message, replyDocId, timestamp, user, userImage } =
                doc.data();

              return (
                <Message
                  key={doc.id}
                  messageId={doc.id}
                  message={message}
                  replyDocId={replyDocId}
                  roomId={roomId}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  isCurrentUser={user === currentUser.displayName}
                  setReplyDocId={setReplyDocId}
                />
              );
            })}
            {/* <div className="chat-dummy">component mounting</div> */}
          </div>
          <div className="chat-footer">
            <div className="chat-input" ref={chatRef}>
              {replyDocId && (
                <div>
                  <Replybox
                    replyDocId={replyDocId}
                    setReplyDocId={setReplyDocId}
                    roomId={roomId}
                  />
                </div>
              )}
              <ChatInput
                chatRef={chatRef}
                channelName={roomDetails?.data().name}
                channelId={roomId}
                replyDocId={replyDocId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
