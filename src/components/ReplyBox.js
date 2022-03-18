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

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="reply-box" title="reply">
      <div className="reply-box-body">
        <h5>{messageDetails?.data().user}</h5>
        <p>{truncate(`${messageDetails?.data().message}`, 150)}</p>
      </div>

      <CloseIcon
        onClick={() => {
          setReplyDocId(null);
        }}
      />
    </div>
  );
}

export default ReplyBox;
