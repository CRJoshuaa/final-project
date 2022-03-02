import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import "./ReplyBox.css";

function ReplyBox({ replyDocId, setReplyDocId, roomId }) {
  const [messageDetails] = useDocument(
    roomId &&
      db.collection("rooms").doc(roomId).collection("messages").doc(replyDocId)
  );

  return (
    <div className="reply-box">
      <h5>{messageDetails?.data().user}</h5>
      <p>{messageDetails?.data().message}</p>
      <CloseIcon
        onClick={() => {
          setReplyDocId(null);
        }}
      />
    </div>
  );
}

export default ReplyBox;
