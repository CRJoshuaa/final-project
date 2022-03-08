import React, { useState } from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { selectRoomId } from "../features/appSlice";
import RightBar from "./RightBar";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";

import Message from "./Message";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useAuthState } from "react-firebase-hooks/auth";
import Replybox from "./ReplyBox";
import LandingPage from "./LandingPage";

function Chat() {
  // const roomId = useSelector(selectRoomId);
  const [replyDocId, setReplyDocId] = useState(null);
  const chatRef = useRef();
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")

        .orderBy("timestamp", "asc")
  );

  const [currentUser] = useAuthState(auth);

  const scrollIntoView = () => {
    document.querySelector("#dummy")?.scrollIntoView({ behavior: "smooth" });
  };

  // const isInViewport = (elem) => {
  //   if (elem) {
  //     var bounding = elem?.getBoundingClientRect();
  //     return (
  //       bounding.top >= 0 &&
  //       bounding.left >= 0 &&
  //       bounding.bottom <=
  //         (window.innerHeight || document.documentElement.clientHeight) &&
  //       bounding.right <=
  //         (window.innerWidth || document.documentElement.clientWidth)
  //     );
  //   }
  // };

  // if (isInViewport(document.querySelector("#dummy"))) {
  //   document.querySelector("#scroll-down").style.visibility = "hidden";
  // } else {
  //   document.querySelector("#scroll-down").style.visibility = "visible";
  // }

  useEffect(() => {
    scrollIntoView();
    // if (isInViewport(document.querySelector("#dummy"))) {
    //   console.log("visible");
    //   document.querySelector("#scroll-down").style.visibility = "hidden";
    // } else {
    //   console.log("hidden");
    // }
  }, [roomId, loading, roomMessages]);

  return (
    <div className="chat">
      {!roomId && <LandingPage user={currentUser} />}
      {roomId && (
        <>
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

          <div className="chat-body">
            {roomDetails && roomMessages && (
              <>
                <div className="chat-messages">
                  <div id="scroll-down">
                    <IconButton
                      style={{ position: "absolute" }}
                      onClick={scrollIntoView}
                    >
                      <KeyboardDoubleArrowDownIcon
                        style={{
                          fontSize: "25px",
                          backgroundColor: "white",
                          borderRadius: "999px",
                          marginRight: "0px",
                          marginLeft: "auto",
                          position: "relative",
                          right: "0px",
                        }}
                      />
                    </IconButton>
                  </div>

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
                  <div id="dummy" className="chat-messages"></div>
                </div>
              </>
            )}
            <RightBar />
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
                setReplyDocId={setReplyDocId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
