import { Button } from "@mui/material";
import React from "react";

function ChatInput({ channelName, channelId }) {
  const sendMessage = (e) => {
    e.preventDefault(); //Prevents refresh
  };
  return (
    <div className="chat-input">
      <form>
        <input placeholder={`Message #ROOM`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
