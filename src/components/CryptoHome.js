import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./CryptoHome.css";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import CryptoNews from "./CryptoNews";

const CryptoHome = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  console.log(data);

  if (isFetching) return "Loading...";

  return (
    <div className="crypto-home">
      <div className="cryptohome-header">
        <h1>Crypto Homepage</h1>
      </div>
      <div className="crypto-stats">
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
        <h3 className="show-more"></h3> <Cryptocurrencies simplified />
        <Link to="/cryptocurrencies">Show More</Link>
      </div>

      <div className="crypto-news-cont">
        <CryptoNews simplified /> <h3 className="show-more"></h3>
        <Link to="/crypto-news">Show More</Link>
      </div>
    </div>
  );
};

export default CryptoHome;
