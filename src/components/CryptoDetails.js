import React, { useState } from "react";
import "./CryptoDetails.css";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import millify from "millify";
// import { Col, Row, Typography, Select } from "antd";
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
// import Select from "react-select";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

// const { Title, Text } = Typography;
// const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

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

  if (isFetching) return "Loading...";

  return (
    <div className="coin-detail-container">
      <div className="coin-heading-container">
        <h2 className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </h2>
        <p>
          {cryptoDetails.name} live price in US dollars (USD). View value
          statistics, market cap, and supply.
        </p>
      </div>
      {/* {
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(value) => setTimeperiod(value)}
          options={time}
        >
          {time.map((date) => (
            <option key={date}>{date}</option>
          ))}
        </Select>
      } */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
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
        <div className="coin-desc" key={cryptoDetails.name}>
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

    // <Col className="coin-detail-container">
    //   <Col className="coin-heading-container">
    //     <Title level={2} className="coin-name">
    //       {cryptoDetails.name} ({cryptoDetails.symbol}) Price
    //     </Title>
    //     <p>
    //       {cryptoDetails.name} live price in US dollars. View value statistics,
    //       market cap and supply.
    //     </p>
    //   </Col>
    //   <Select
    //     defaultValue="7d"
    //     className="select-timeperiod"
    //     placeholder="Select Timeperiod"
    //     onChange={(value) => setTimeperiod(value)}
    //   >
    //     {time.map((date) => (
    //       <Option key={date}>{date}</Option>
    //     ))}
    //   </Select>
    //   <LineChart
    //     coinHistory={coinHistory}
    //     currentPrice={millify(cryptoDetails.price)}
    //     coinName={cryptoDetails.name}
    //   />
    //   <Col className="stats-container">
    //     <Col className="coin-value-statistics">
    //       <Col className="coin-value-statistics-heading">
    //         <Title level={3} className="coin-details-headings">
    //           {cryptoDetails.name} Value Statistics
    //         </Title>
    //         <p>An overview showing the stats of {cryptoDetails.name}</p>
    //       </Col>
    //       {stats.map(({ icon, title, value }) => (
    //         <Col className="coin-stats">
    //           <Col className="coin-stats-name">
    //             <Text>{icon}</Text>
    //             <Text>{title}</Text>
    //           </Col>
    //           <Text className="stats">{value}</Text>
    //         </Col>
    //       ))}
    //     </Col>
    //     <Col className="other-stats-info">
    //       <Col className="coin-value-statistics-heading">
    //         <Title level={3} className="coin-details-headings">
    //           Other Statistics
    //         </Title>
    //         <p>An overview showing the stats of all cryptocurrencies</p>
    //       </Col>
    //       {genericStats.map(({ icon, title, value }) => (
    //         <Col className="coin-stats">
    //           <Col className="coin-stats-name">
    //             <Text>{icon}</Text>
    //             <Text>{title}</Text>
    //           </Col>
    //           <Text className="stats">{value}</Text>
    //         </Col>
    //       ))}
    //     </Col>
    //   </Col>
    //   <Col className="coin-desc-link">
    //     <Row className="coin-desc">
    //       <Title level={3} className="coin-details-heading">
    //         What is {cryptoDetails.name}?
    //         {HTMLReactParser(cryptoDetails.description)}
    //       </Title>
    //     </Row>
    //     <Col className="coin-links">
    //       <Title level={3} className="coin-details-heading">
    //         {cryptoDetails.name} Link
    //       </Title>
    //       {cryptoDetails.links.map((link) => (
    //         <Row className="coin-link" key={link.name}>
    //           <Title level={5} className="link-name">
    //             {link.type}
    //           </Title>
    //           <a href={link.url} target="_blank" rel="noreferrer">
    //             {link.name}
    //           </a>
    //         </Row>
    //       ))}
    //     </Col>
    //   </Col>
    // </Col>
  );
};

export default CryptoDetails;
