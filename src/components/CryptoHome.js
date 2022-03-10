import React, { useContext, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./CryptoHome.css";
import Cryptocurrencies from "./Cryptocurrencies";
import CryptoNews from "./CryptoNews";
import RotateLoading from "./RotateLoading";
import { io } from "socket.io-client";
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
          <div className="total-column">
            <p>Total Cryptocurrencies </p>
            <p>Total Exchanges </p>
            <p>Total Market Cap </p>
            <p>Total 24h Volume </p>
            <p>Total Markets </p>
          </div>
          <div className="numbers-column">
            <p>: {globalStats.total}</p>
            <p>: {millify(globalStats.totalExchanges)}</p>
            <p>: {millify(globalStats.totalMarketCap)}</p>
            <p>: {millify(globalStats.total24hVolume)}</p>
            <p>: {millify(globalStats.totalMarkets)}</p>
          </div>
        </div>
      </div>
      <div className="top-ten-container">
        <Cryptocurrencies simplified />
        <Link to="/cryptocurrencies">
          <h4
            className={`show-more ${
              darkMode ? "show-more-dark" : "show-more-light"
            }`}
          >
            Show More Cryptocurrencies
          </h4>
        </Link>
      </div>

      <div className="crypto-news-cont">
        <CryptoNews simplified />
        <Link to="/crypto-news">
          <h4
            className={`show-more ${
              darkMode ? "show-more-dark" : "show-more-light"
            }`}
          >
            Show More News
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default CryptoHome;
