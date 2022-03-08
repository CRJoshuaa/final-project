import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./CryptoHome.css";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import CryptoNews from "./CryptoNews";
import RotateLoading from "./RotateLoading";

const CryptoHome = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  console.log(data);

  if (isFetching) return <RotateLoading />;

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
        <Cryptocurrencies simplified />
        <Link to="/cryptocurrencies">
          <h4 className="show-more">Show More Cryptocurrencies</h4>
        </Link>
      </div>

      <div className="crypto-news-cont">
        <CryptoNews simplified />
        <Link to="/crypto-news">
          <h4 className="show-more">Show More News</h4>
        </Link>
      </div>
    </div>
  );
};

export default CryptoHome;
