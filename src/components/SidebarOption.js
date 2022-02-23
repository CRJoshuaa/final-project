import React from "react";
import "./SidebarOption.css";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { Link, useHistory } from "react-router-dom";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const history = useHistory();

  const routeChange = () => {
    let path = "DirectMessage";
    history.push(path);
  };
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  //setPrivateMessage([...messages, newMessage])

  // const DirectMessage = () => {
  //   <Link to="/DirectMessage"> Direct Message </Link>;
  // };
  // const routeChange = () => {
  //   let path = "DirectMessage";
  //   history.push(path);
  // };

  return (
    <div
      className="sidebar-option-cont"
      // onClick={addChannelOption ? addChannel : selectChannel}
      // onClick={routeChange}
      onClick={(e) => {
        switch (e.target.innerText) {
          case "Add Channel":
            addChannel();
            break;
          case "Direct Message":
            routeChange();
            break;
          // case "select Channel":
          //   selectChannel();
          //   break;
          default:
            selectChannel();
        }
      }}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebar-option-channel">
          <span>#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
