import React, { useState } from "react";
import Switch from "react-switch";
import "./Notifications.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

import { selectRoomId } from "../features/appSlice";

function MessageNotifications({ newMessage }) {
  //   const [notifications, setNotification] = useState(false);
  //     const [currentUser] = useAuthState(auth);

  //   const [roomDetails] = useDocument(
  //     roomId && db.collection("rooms").doc(roomId)
  //   );
  //   const roomId = useSelector(selectRoomId);

  //   const [roomMessages, loading] = useCollection(
  //     roomId &&
  //       db
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("messages")

  //         .orderBy("timestamp", "asc")
  //   );
  const [user] = useAuthState(auth);

  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    checkedCheck();
  };

  function checkedCheck() {
    console.log("NOTIFICATION");
    console.log(newMessage);
    if (checked === false) {
      console.log(newMessage);
      toast.info(newMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return;
    }
  }

  return (
    <div>
      <h1>Notifications</h1>
      <label>
        <span>Enable your notifications today!</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
    </div>
  );
}

export default MessageNotifications;
