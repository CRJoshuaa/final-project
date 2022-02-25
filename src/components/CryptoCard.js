import React, { useState } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";

function CryptoCard() {
  const { data: cryptosList } = useGetCryptosQuery();
  const [cryptos] = useState(cryptosList?.data?.coins);

  return (
    <div className="crypto-card-container">
      {cryptos.map((currency) => (
        <div>
          <h4>{`${currency.rank}. ${currency.name}`}</h4>
          <img className="crypto-image" src={currency.iconUrl} />
          <p>Price: {millify(currency.price)}</p>
          <p>Market Cap: {millify(currency.marketCap)}</p>
          <p>Daily Change: {millify(currency.change)}%</p>
        </div>
      ))}
    </div>
  );
}

export default CryptoCard;
