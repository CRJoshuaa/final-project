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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { selectSocket } from "../features/appSlice";
import { useSelector } from "react-redux";

const CryptoHome = () => {
  const history = useHistory();
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
        <h2 className="crypto-home-titles">Cryptocurrency Statistics</h2>
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
        <h2
          className={`crypto-home-titles ${
            darkMode ? "crypto-stats-dark" : "crypto-stats-light"
          }`}
        >
          Top 3 Cryptos
        </h2>
        <Cryptocurrencies simplified />
      </div>
      <h4
        className={`show-more-icon ${
          darkMode ? "show-more-dark" : "show-more-light"
        }`}
      >
        <ReadMoreIcon onClick={() => history.push("cryptocurrencies")} />
      </h4>

      <div className="crypto-news-cont">
        <h2
          className={`crypto-home-titles ${
            darkMode ? "crypto-stats-dark" : "crypto-stats-light"
          }`}
        >
          Highlights of the Day
        </h2>
        <CryptoNews simplified />
      </div>
      <h4
        className={`show-more-icon ${
          darkMode ? "show-more-dark" : "show-more-light"
        }`}
      >
        <ReadMoreIcon onClick={() => history.push("crypto-news")} />
      </h4>
    </div>
  );
};

export default CryptoHome;
