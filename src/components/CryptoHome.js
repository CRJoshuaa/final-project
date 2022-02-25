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
      <h1>Crypto Homepage</h1>
      <h3>Total Cryptocurrencies : {globalStats.total}</h3>
      <h3>Total Exchanges : {millify(globalStats.totalExchanges)}</h3>
      <h3>Total Market Cap : {millify(globalStats.totalMarketCap)}</h3>
      <h3>Total 24h Volume : {millify(globalStats.total24hVolume)}</h3>
      <h3>Total Markets : {millify(globalStats.totalMarkets)}</h3>

      <div className="home-heading-container">
        <h2 className="home-title">Top 10 Cryptocurrencies in the World</h2>
        <h3 className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </h3>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <h2 className="home-title">Lastest Crypto News</h2>
        <h3 className="show-more">
          <Link to="/crypto-news">Show More</Link>
        </h3>
      </div>
      {/* <CryptoNews simplified /> */}
    </div>
  );
};

export default CryptoHome;
