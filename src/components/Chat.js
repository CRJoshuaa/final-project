import React, { useContext, useState } from "react";
import "./Chat.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { ThemeContext } from "./ThemeContext";

import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { selectRoomId } from "../features/appSlice";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { ref } from "firebase/database";
import Message from "./Message";
import { IconButton } from "@mui/material";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { useAuthState } from "react-firebase-hooks/auth";
import Replybox from "./ReplyBox";
// import { checkedCheck } from "./testnoti";
import useNotificationContext from "./useNotificationsContext";
import LandingPage from "./LandingPage";

function Chat() {
  const addNotification = useNotificationContext();

  // const roomId = useSelector(selectRoomId);
  const [replyDocId, setReplyDocId] = useState(null);
  const chatRef = useRef();
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  // const [notificationMessage, setNotificationMessage] = useState("");
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")

        .orderBy("timestamp", "asc")
  );

  // const [latestRoomMessage, load] = useCollection(
  //   roomId &&
  //     db
  //       .collection("rooms")
  //       .doc(roomId)

  //       .collection("messages")

  //       .orderBy("timestamp", "desc")
  //       .limit(1)
  //   // .ref("rooms")
  //   // .orderByChild("messages")
  //   // .equalTo("message")
  //   // .orderBy("timestamp", "desc")
  //   // .limit(1)
  // );

  // const [lastMessageInTheList, load2] = useCollection(
  //   db.collection("messages").orderBy("timestamp", "desc").limit(1)
  // );

  // console.log(lastMessageInTheList);

  // const ref = firebase.db.ref("rooms");
  // console.log(ref);

  // console.log(latestRoomMessage);
  // const getOnlyMessageForNoti = () => {
  //   {
  //     latestRoomMessage?.docs.map((doc) => {
  //       const { message } = doc.data();
  //       if (message) {
  //         addNotification(message);
  //         console.log(message);
  //       }
  //       return 0;
  //     });
  //   }
  // };

  // getOnlyMessageForNoti();

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
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

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
    <div className={`chat ${darkMode ? "chat-dark" : "chat-light"}`}>
      {!roomId && <LandingPage user={currentUser} />}
      {roomId && (
        <>
          <div className="chat-header">
            <div className="chat-header-left">
              <h4>#{roomDetails?.data().name}</h4>
              <IconButton>
                <StarBorderOutlinedIcon />
              </IconButton>
            </div>
          </div>
          <div className="chat-display">
            <div
              className="chat-body"
              // {`chat-body ${
              //   darkMode ? "chat-body-dark" : "chat-body-light"
              // }`}
            >
              {roomDetails && roomMessages && (
                <>
                  <div
                    className="chat-messages"
                    // {`chat-messages ${
                    //   darkMode ? "chat-messages-dark" : "chat-messages-light"
                    // }`}
                  >
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
                      const {
                        message,
                        replyDocId,
                        timestamp,
                        user,
                        userImage,
                      } = doc.data();

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
              <div className="chat-sidebar">
                <div className="icons">
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <PushPinOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <PermMediaOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <InsertDriveFileOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <LinkOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </div>

            <div
              className="chat-footer"
              // {`chat-footer ${
              //   darkMode ? "chat-footer-dark" : "chat-footer-light"
              // }`}
            >
              {replyDocId && (
                <Replybox
                  replyDocId={replyDocId}
                  setReplyDocId={setReplyDocId}
                  roomId={roomId}
                />
              )}
              <div className="chat-input-cont" ref={chatRef}>
                <ChatInput
                  chatRef={chatRef}
                  channelName={roomDetails?.data().name}
                  channelId={roomId}
                  replyDocId={replyDocId}
                  setReplyDocId={setReplyDocId}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
