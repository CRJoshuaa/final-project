import React from "react";
import "./SidebarOption.css";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Settings } from "@mui/icons-material";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const history = useHistory();

  const routeChange = () => {
    let path = "DirectMessage";
    history.push(path);
  };
  const dispatch = useDispatch();

  const history = useHistory();

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

  const routeDirectMessage = () => {
    let path = "DirectMessage";
    history.push(path);
  };

  // const DirectMessage = () => {
  //   <Link to="/DirectMessage"> Direct Message </Link>;
  // };

  const routeCryptoHome = () => {
    let path = "crypto-home";
    history.push(path);
  };

  const routeCryptocurrencies = () => {
    let path = "cryptocurrencies";
    history.push(path);
  };

  const routeCryptoExchange = () => {
    let path = "crypto-exchange";
    history.push(path);
  };

  const routeCryptoNews = () => {
    let path = "crypto-news";
    history.push(path);
  };

  // const cryptoNews = () => {
  //   <Link to="/crypto-news"> Crypto News </Link>;
  // };

  const routeSettings = () => {
    let path = "settings";
    history.push(path);
  };

  const routeDirectMessage = () => {
    let path = "DirectMessage";
    history.push(path);
  };

  const routeCryptoHome = () => {
    let path = "crypto-home";
    history.push(path);
  };

  const routeCryptocurrencies = () => {
    let path = "cryptocurrencies";
    history.push(path);
  };

  const routeCryptoExchange = () => {
    let path = "crypto-exchange";
    history.push(path);
  };

  const routeCryptoNews = () => {
    let path = "crypto-news";
    history.push(path);
  };

  return (
    <div
      className="sidebar-option-cont"
      onClick={
        // {addChannelOption ? addChannel : selectChannel}
        (e) => {
          switch (e.target.innerText) {
            case "Settings":
              routeSettings();
              break;
            case "Add Channel":
              addChannel();
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
            case "Crypto Exchange":
              routeCryptoExchange();
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
