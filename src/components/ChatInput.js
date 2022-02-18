import { Button } from "@mui/material";
import React, { useState } from "react";
import "./ChatInput.css";
import { db } from "../firebase";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault(); //Prevents refresh

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "bruh",
      userImage: "https://c.tenor.com/46lAWM-p0eYAAAAC/kermit-falling.gif",
    });

    setInput("");
  };
  return (
    <div className="chat-input">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
