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

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <div className="crypto-card-container">
      {!simplified && (
        <Input
          className="crypto-search"
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      )}
      {cryptos?.map((currency) => (
        <div className="crypto-card" key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`}>
            <div>
              <h4>
                {`${currency.rank}. ${currency.name}`}{" "}
                <img className="crypto-image" src={currency.iconUrl} />
              </h4>
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {millify(currency.change)}%</p>
            </div>
          </Link>
        </div>
      ))}
    </div>

    // <>
    //   <Row gutter={[32, 32]} className="crypto-card-container">
    //     {cryptos.map((currency) => (
    //       <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
    //         <Link to={`/crypto/${currency.id}`}>
    //           <Card
    //             title={`${currency.rank}. ${currency.name}`}
    //             extra={<img className="crypto-image" src={currency.iconUrl} />}
    //             hoverable
    //           >
    //             <p>Price: {millify(currency.price)}</p>
    //             <p>Market Cap: {millify(currency.marketCap)}</p>
    //             <p>Daily Change: {millify(currency.change)}%</p>
    //           </Card>
    //         </Link>
    //       </Col>
    //     ))}
    //   </Row>
    // </>
  );
};

export default Cryptocurrencies;
