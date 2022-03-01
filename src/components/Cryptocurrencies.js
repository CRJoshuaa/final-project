import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "./Cryptocurrencies.css";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Input } from "@material-ui/core";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);

  const top3 = cryptos.slice(0, 3);
  const theRest = cryptos.slice(3, 101);

  const swapPositions = (top3, a, b, c) => {
    [top3[a], top3[b], top3[c]] = [top3[b], top3[a], top3[c]];
  };

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <div className="cryptocurrency-page">
      <div className="cryptocurrency-header">
        <h2>Cryptocurrency Directory</h2>
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
      <div className="top3">
        <div className="leaderboard">
          {top3.map((currency) => (
            <div className="crypto-lead" key={currency.id}>
              <div className="crypto-rank">
                <h2>{`${currency.rank}`}</h2>
              </div>
              <Link to={`/crypto/${currency.uuid}`}>
                <div className="crypto-name">
                  <img className="lead-image" src={currency.iconUrl} />
                  {`${currency.name}`}{" "}
                </div>
                <div className="crypto-leader-info">
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="crypto-card-container">
        {theRest?.map((currency) => (
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
