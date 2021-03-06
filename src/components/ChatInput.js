import React, { useState } from "react";
import "./ChatInput.css";
import { auth, db } from "../firebase";
// import MessageNotifications from "./Notifications";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Picker from "emoji-picker-react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { checkedCheck } from "./testnoti";
import useNotificationContext from "./useNotificationsContext";
// import { checkedCheck } from "./testnoti";
import { ThemeContext } from "./ThemeContext";

toast.configure();

function ChatInput({
  channelName,
  channelId,
  chatRef,
  replyDocId,
  setReplyDocId,
}) {
  const addNotification = useNotificationContext();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const [showEmojiPick, setShowEmojiPick] = useState(false);

  const onEmojiPick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    console.log(emojiObject.emoji);
  };

  const validateMessage = () => {
    if (input === "") {
      return false;
    } else {
      return true;
    }
  };
  // const setMessageToNotification = () => {
  //   checkedCheck(channelName, input);
  // };
  const sendMessage = (e) => {
    e.preventDefault(); //Prevents refresh

    if (!channelId) {
      return false;
    }

    if (validateMessage()) {
      setShowEmojiPick(false);
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
          replyDocId: replyDocId ? replyDocId : null,
        });

      // toast.success("Message sent!");
    }

    // if (!channelName) {
    // addNotification(input);

    setInput("");
    setReplyDocId(null);
    // if(channelName){
    // if(timestam)

    // if (!channelName) {
    //   setMessageToNotification();
    // }
    // setMessageToNotification();
  };
  return (
    <div className="chat-input">
      {showEmojiPick && (
        <Picker onEmojiClick={onEmojiPick} disableSearchBar native={true} />
      )}
      <div className="chat-bar">
        <form>
          <InsertEmoticonIcon
            onClick={() => {
              setShowEmojiPick(!showEmojiPick);
            }}
          />
          <input
            id="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />

          <div className="chat-input-options">
            <IconButton
              hidden
              type="submit"
              onClick={sendMessage}
              disabled={input === ""}
            >
              <SendRoundedIcon />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;

//website regex
//(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})
