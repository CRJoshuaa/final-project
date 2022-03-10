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

import { selectSocket } from "../features/appSlice";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import LineChart from "./LineChart";
import ShakeLoader from "./ShakeLoader";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const CryptoDetails = () => {
  const socket = useSelector(selectSocket);
  // const socket = io("http://localhost:3001");

  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const [cryptoDetails, setcryptoDetails] = useState([]);

  const [coinHistory, setCoinHistory] = useState([]);

  //REQUESTING DATA
  //request crypto details data
  useEffect(() => {
    socket.emit("request-crypto-details", coinId);
  }, []);

  //request crypto history
  useEffect(() => {
    socket.emit("request-crypto-history", coinId, timeperiod);
  }, [timeperiod]);

  //RECEIVING DATA
  //receiving coin history data
  socket.on("response-crypto-history", (response) => {
    setCoinHistory(response);
  });

  //receiving crypto details data
  socket.on("response-crypto-details", (response) => {
    setcryptoDetails(response.data.coin);
  });

  //is loading conditions
  const isFetching = cryptoDetails.length === 0 || coinHistory.length === 0;

  //render loading screen
  if (isFetching) return <ShakeLoader />;

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
      title: "Price in USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    // { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
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
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "All-time high (daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
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
      title: "Approved Supply",
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
  ];

  if (isFetching) return <ShakeLoader />;

  return (
    <div className="coin-detail-container">
      <div className="coin-detail-heading">
        <IconButton>
          <Link
            to="/cryptocurrencies"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </Link>
        </IconButton>

        <h1>
          All About {cryptoDetails.name} ({cryptoDetails.symbol})
        </h1>
      </div>
      <div className="coin-detail-body">
        <div className="coin-header">
          <div className="coin-img">
            <img src={cryptoDetails.iconUrl} />
            <h2>{cryptoDetails.name}</h2>
          </div>

          <div className="coin-header-stats-cont">
            {stats.map(({ icon, title, value }) => (
              <div className="coin-header-stats" key={title}>
                <div className="coin-header-stats-name" key={value}>
                  <p>{icon} </p>
                  <p>{title}</p>
                </div>
                <p className="stats">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="chart-title">{cryptoDetails.name} Price Chart</h2>
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
        <div className="coin-desc-link">
          <div className="coin-desc">
            <h3 className="coin-details-heading">
              What is {cryptoDetails.name}?
            </h3>
            {HTMLReactParser(cryptoDetails.description)}
          </div>
          <div className="misc-details">
            <div className="other-stats-info">
              <div className="coin-value-statistics-heading">
                <h3 className="coin-details-headings">Other Statistics</h3>
                <p>An overview of {cryptoDetails.name}'s details</p>
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
            <div className="coin-links">
              <h3 className="coin-details-heading">
                {cryptoDetails.name} Link
              </h3>
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
    </div>
  );
};

export default CryptoDetails;
