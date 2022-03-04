import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import millify from "millify";
import "./CryptoDetails.css";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Select from "react-select";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import ShakeLoader from "./ShakeLoader";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <ShakeLoader />;

  // const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const time = [
    { value: "3h", label: "3 Hours" },
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "3m", label: "3 Months" },
    { value: "1y", label: "1 Year" },
    { value: "3y", label: "3 Years" },
    { value: "5y", label: "5 Years" },
  ];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.[Object.keys(cryptoDetails)[11]] &&
        millify(cryptoDetails[Object.keys(cryptoDetails)[11]])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return <ShakeLoader />;

  return (
    <div className="coin-detail-container">
      <div className="coin-detail-heading">
        <h1>
          All About {cryptoDetails.name} ({cryptoDetails.symbol})
        </h1>
      </div>
      <div className="coin-detail-body">
        <div className="coin-heading-container">
          <h2 className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </h2>
          <p>
            {cryptoDetails.name} live price in US dollars (USD). View value
            statistics, market cap, and supply.
          </p>
        </div>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Default : 7 Days"
          onChange={(value) => setTimeperiod(value.value)}
          options={time}
        >
          {time.map((date) => (
            <option key={date}>{date}</option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
          coinTimeperiod={timeperiod}
        />
        <div className="stats-container">
          <div className="coin-value-statistics">
            <div
              className="coin-value-statistics-heading"
              key={cryptoDetails.name}
            >
              <h3 className="coin-details-headings">
                {cryptoDetails.name} Value Statistics
              </h3>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </div>
            {stats.map(({ icon, title, value }) => (
              <div className="coin-stats" key={title}>
                <div className="coin-stats-name" key={value}>
                  <p>{icon} </p>
                  <p>{title}</p>
                </div>
                <p className="stats">{value}</p>
              </div>
            ))}
          </div>
          <div className="other-stats-info">
            <div className="coin-value-statistics-heading">
              <h3 className="coin-details-headings">Other Statistics</h3>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </div>
            {genericStats.map(({ icon, title, value }) => (
              <div className="coin-stats" key={title}>
                <div className="coin-stats-name" key={value}>
                  <p>{icon}</p>
                  <p>{title}</p>
                </div>
                <p className="stats">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="coin-desc-link">
          <div className="coin-desc">
            <h3 className="coin-details-heading">
              What is {cryptoDetails.name}?
            </h3>
            {HTMLReactParser(cryptoDetails.description)}
          </div>
          <div className="coin-links">
            <h3 className="coin-details-heading">{cryptoDetails.name} Link</h3>
            {cryptoDetails.links.map((link) => (
              <div className="coin-link" key={link.url}>
                <h5 className="link-name">{link.type}</h5>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
