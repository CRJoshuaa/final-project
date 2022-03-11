import React, { useContext, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./CryptoHome.css";
import Cryptocurrencies from "./Cryptocurrencies";
import CryptoNews from "./CryptoNews";
import RotateLoading from "./RotateLoading";
import { io } from "socket.io-client";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { ThemeContext } from "./ThemeContext";

import { selectSocket } from "../features/appSlice";
import { useSelector } from "react-redux";

const CryptoHome = () => {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;
  const socket = useSelector(selectSocket);
  // const socket = io("http://localhost:3001");

  const [cryptos, setCryptos] = useState([]);

  //REQUESTING DATA
  // request crypto ranking data
  useEffect(() => {
    socket.emit("request-crypto", 10);
  }, []);

  //RECEIVE DATA
  //receive crypto ranking data
  socket.on("response-crypto", (response) => {
    setCryptos(response);
  });

  const globalStats = cryptos?.data?.stats;

  if (cryptos.length === 0) return <RotateLoading />;

  return (
    <div
      className={`crypto-home ${darkMode ? "crypto-home-dark" : "crypto-home"}`}
    >
      <div className="cryptohome-header">
        <h1>Crypto Homepage</h1>
      </div>
      <div
        className={`crypto-stats ${
          darkMode ? "crypto-stats-dark" : "crypto-stats-light"
        }`}
      >
        <h2>Cryptocurrency Statistics</h2>
        <div className="total-table">
          <div className="top-row-box">
            <div className="total-box cards">
              <li>
                <h3>Total Crypto</h3>
                <p>{globalStats.total}</p>
              </li>
              <li>
                <h3>Total Exchanges</h3>
                <p>{millify(globalStats.totalExchanges)}</p>
              </li>
              <li>
                <h3>Total Market Cap</h3>
                <p>{millify(globalStats.totalMarketCap)}</p>
              </li>
              <li>
                <h3>Total 24h Volume</h3>
                <p>{millify(globalStats.total24hVolume)}</p>
              </li>
              <li>
                <h3>Total Markets</h3>
                <p>{millify(globalStats.totalMarkets)}</p>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div className="top-ten-container">
        <Cryptocurrencies simplified />
        <Link to="/cryptocurrencies">
          <h4
            className={`show-more-icon ${
              darkMode ? "show-more-dark" : "show-more-light"
            }`}
          >
            <ReadMoreIcon />
          </h4>
        </Link>
      </div>

      <div className="crypto-news-cont">
        <CryptoNews simplified />
        <Link to="/crypto-news">
          <h4
            className={`show-more-icon ${
              darkMode ? "show-more-dark" : "show-more-light"
            }`}
          >
            <ReadMoreIcon />
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default CryptoHome;
