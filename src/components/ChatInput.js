import React, { useState } from "react";
import "./ChatInput.css";
import { auth, db } from "../firebase";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import Picker from "emoji-picker-react";

function ChatInput({
  channelName,
  channelId,
  chatRef,
  replyDocId,
  setReplyDocId,
}) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const [showEmojiPick, setShowEmojiPick] = useState(false);

  const onEmojiPick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    console.log(emojiObject.emoji);
  };

  const sendMessage = (e) => {
    e.preventDefault(); //Prevents refresh

    if (!channelId) {
      return false;
    }

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
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
    setReplyDocId(null);
  };
  return (
    <div className="chat-input">
      <div className="chat-bar">
        <form>
          <InsertEmoticonIcon
            onClick={() => {
              setShowEmojiPick(!showEmojiPick);
            }}
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />

          <div className="chat-input-options">
            <IconButton hidden type="submit" onClick={sendMessage}>
              <SendRoundedIcon />
            </IconButton>
          </div>
        </form>
      </div>

      {showEmojiPick && (
        <Picker
          onEmojiClick={onEmojiPick}
          pickerStyle={{ width: "100%", height: "200px" }}
        />
      )}
    </div>
  );
}

export default ChatInput;
