import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import "./CryptoHome.css";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const CryptoHome = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  console.log(data);

  if (isFetching) return "Loading...";

  return (
    // <>
    //   <Title level={2} className="heading">
    //     Global Crypto Stats
    //   </Title>
    //   <Row>
    //     <Col span={12}>
    //       <Statistic title="Total Cryptocurrencies" value="5" />
    //     </Col>
    //     <Col span={12}>
    //       <Statistic title="Total Exchanges" value="5" />
    //     </Col>
    //     <Col span={12}>
    //       <Statistic title="Total Market Cap" value="5" />
    //     </Col>
    //     <Col span={12}>
    //       <Statistic title="Total 24h Volume" value="5" />
    //     </Col>
    //     <Col span={12}>
    //       <Statistic title="Total Markets" value="5" />
    //     </Col>
    //   </Row>
    // </>
    <div className="crypto-home">
      <h1>Crypto Homepage</h1>
      <h3>Total Cryptocurrencies : {globalStats.total}</h3>
      <h3>Total Exchanges : {millify(globalStats.totalExchanges)}</h3>
      <h3>Total Market Cap : {millify(globalStats.totalMarketCap)}</h3>
      <h3>Total 24h Volume : {millify(globalStats.total24hVolume)}</h3>
      <h3>Total Markets : {millify(globalStats.totalMarkets)}</h3>
    </div>
  );
};

export default CryptoHome;
