import React, { useState, useContext, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./Cryptocurrencies.css";
import { selectSocket } from "../features/appSlice";
import { useSelector } from "react-redux";
import { ThemeContext } from "./ThemeContext";

import ShakeLoader from "./ShakeLoader";

const Cryptocurrencies = ({ simplified }) => {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;
  const count = simplified ? 3 : 100;
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm] = useState("");

  const socket = useSelector(selectSocket);
  // const socket = io("http://localhost:3001");

  //REQUESTING DATA
  // request crypto ranking data
  useEffect(() => {
    socket.emit("request-crypto", count);

    return () => {};
  }, []);

  //filter crypto data
  useEffect(() => {
    const filteredData = cryptos.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCryptos(filteredData);
  }, [cryptos, searchTerm]);

  //RECEIVE DATA
  //receive crypto ranking data
  socket.on("response-crypto", (response) => {
    setCryptos(response.data.coins);
  });

  const top3 = filteredCryptos?.slice(0, 3);
  const theRest = filteredCryptos?.slice(3, 101);

  //render loading screen
  if (filteredCryptos.length === 0) return <ShakeLoader />;

  return (
    <div
      className={`cryptocurrency-page ${simplified && `simplified`} ${
        darkMode ? "cryptocurrency-page-dark" : "cryptocurrency-page-light"
      }`}
    >
      {!simplified && (
        <div className="cryptocurrency-header">
          <h1>Cryptocurrencies</h1>
        </div>
      )}
      <div className="leaderboard">
        {top3 &&
          top3.map((currency) => (
            <div className="crypto-lead" key={currency.id}>
              {" "}
              <Link to={`/crypto/${currency.uuid}`}>
                <div className="crypto-deets">
                  <div className="leader-rank">
                    <h2>{`${currency.rank}`}</h2>
                  </div>
                  <img className="lead-image" src={currency.iconUrl} />
                  <div className="crypto-name">{`${currency.name}`} </div>
                  <div className="crypto-leader-info">
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {millify(currency.change)}%</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="crypto-card-container">
        {filteredCryptos &&
          theRest?.map((currency) => (
            <div
              className={`crypto-card ${
                darkMode ? "crypto-card-dark" : "crypto-card-light"
              }`}
              key={currency.id}
            >
              <div className="crypto-rank">
                <h2>{`${currency.rank}`}</h2>
              </div>
              <Link to={`/crypto/${currency.uuid}`}>
                <div
                  className={`crypto-name ${
                    darkMode ? "crypto-name-dark" : "crypto-name-light"
                  }`}
                >
                  <img className="crypto-image" src={currency.iconUrl} />
                  {`${currency.name}`}{" "}
                </div>
                <div
                  className={`crypto-info ${
                    darkMode ? "crypto-info-dark" : "crypto-info-light"
                  }`}
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
