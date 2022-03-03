import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./Cryptocurrencies.css";

import RotateLoading from "./RotateLoading";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Input } from "@material-ui/core";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 3 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);

  const top3 = cryptos?.slice(0, 3);
  const theRest = cryptos?.slice(3, 101);

  console.log(top3);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <RotateLoading />;

  return (
    <div className="cryptocurrency-page">
      <div className="cryptocurrency-header">
        <h1>Cryptocurrencies</h1>
      </div>{" "}
      <div className="crypto-search-bar">
        {" "}
        {!simplified && (
          <Input
            className="crypto-search"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        )}
      </div>
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
        {cryptos &&
          theRest?.map((currency) => (
            <div className="crypto-card" key={currency.id}>
              <div className="crypto-rank">
                <h2>{`${currency.rank}`}</h2>
              </div>
              <Link to={`/crypto/${currency.uuid}`}>
                <div className="crypto-name">
                  <img className="crypto-image" src={currency.iconUrl} />
                  {`${currency.name}`}{" "}
                </div>
                <div className="crypto-info">
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
