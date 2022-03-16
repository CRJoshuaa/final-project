import React, { useContext, useState } from "react";
import "./SidebarOption.css";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Settings } from "@mui/icons-material";
import { ThemeContext } from "./ThemeContext";
import Modal from "react-modal";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

toast.configure();

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const history = useHistory();
  const [modalNewChannelIsOpen, setModalNewChannelIsOpen] = useState(false);
  const [channelName, setChannelName] = useState("");

  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  const routeChange = () => {
    let path = "DirectMessage";
    history.push(path);
  };
  const dispatch = useDispatch();

  const addChannel = () => {
    //Channel string check
    let symbolsRegex = new RegExp(/^[a-zA-Z0-9_]*$/gm);
    let startingNumRegex = new RegExp(/^[0-9]/g);
    let startingWhitespaceRegex = new RegExp(/^[\s]/g);

    if (!channelName) {
      toast.error("Channel name cannot be empty");
    } else if (startingNumRegex.test(channelName)) {
      toast.error("Channel name cannot start with number");
    } else if (startingWhitespaceRegex.test(channelName)) {
      toast.error("Channel name cannot start with white space");
    } else if (!symbolsRegex.test(channelName)) {
      toast.error("Channel name cannot have symbols");
    } else if (channelName.length > 25) {
      toast.error("Channel name cannot have more than 25 characters");
    } else if (channelName.length < 3) {
      toast.error("Channel name cannot have less than 3 characters");
    } else {
      db.collection("rooms").add({
        name: channelName,
      });
      toast.success(`${channelName} channel successfully created!`);
      setChannelName("");
      setModalNewChannelIsOpen(false);
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

  const routeDirectMessage = () => {
    let path = "DirectMessage";
    history.push(path);
  };

  const routeCryptoHome = () => {
    let path = "/crypto-home";
    history.push(path);
  };

  const routeCryptocurrencies = () => {
    let path = "/cryptocurrencies";
    history.push(path);
  };

  const routeCryptoNews = () => {
    let path = "/crypto-news";
    history.push(path);
  };

  const routeSettings = () => {
    let path = "/settings";
    history.push(path);
  };

  if (addChannelOption) {
    return (
      <div className="channel-header" title="Add channel">
        <h3>Channels</h3>
        <IconButton
          onClick={() => {
            setModalNewChannelIsOpen(true);
            console.log(modalNewChannelIsOpen);
          }}
        >
          <AddOutlinedIcon />
        </IconButton>
        <Modal isOpen={modalNewChannelIsOpen} className="pop-up">
          <div className="input">
            <input
              type="text"
              placeholder="Insert New Channel Name"
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />
          </div>
          <div className="pop-up-btn">
            <button onClick={addChannel}>Create</button>
            <button
              onClick={() => {
                setChannelName("");
                setModalNewChannelIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div
      className={`sidebar-option-cont ${
        darkMode ? "sidebar-option-cont-dark" : "sidebar-option-cont-dark"
      }`}
      onClick={
        // {addChannelOption ? addChannel : selectChannel}
        (e) => {
          switch (e.target.innerText) {
            case "Settings":
              routeSettings();
              break;
            case "Add Channel":
              setModalNewChannelIsOpen(true);
              break;
            case "Direct Message":
              routeDirectMessage();
              break;
            case "Crypto Home":
              routeCryptoHome();
              break;
            case "Cryptocurrencies":
              routeCryptocurrencies();
              break;
            case "Crypto News":
              routeCryptoNews();
              break;
            default:
              selectChannel();
          }
        }
      }
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
