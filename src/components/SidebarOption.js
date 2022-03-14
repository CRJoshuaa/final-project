import React, { useContext, useState } from "react";
import "./SidebarOption.css";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Settings } from "@mui/icons-material";
import { ThemeContext } from "./ThemeContext";
import Modal from "react-modal";

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
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });

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
      {
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
            <button onClick={() => setModalNewChannelIsOpen(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      }
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
