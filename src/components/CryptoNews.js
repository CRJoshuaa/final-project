import React, { useEffect, useState } from "react";
import "./CryptoNews.css";
import { Typography, Select, Avatar } from "antd";
import moment from "moment";
import { io } from "socket.io-client";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const CryptoNews = ({ simplified }) => {
  const socket = io("https://tranquil-dawn-08836.herokuapp.com");
  // const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.emit("request-crypto-news", "Cryptocurrency", simplified ? 3 : 10);
  }, []);

  const [cryptoNews, setCryptoNews] = useState([]);

  // socket.on("connect", () => {
  //   console.log("connected to websocket");
  // });
  socket.on("response-crypto-news", (message) => {
    setCryptoNews(message);
  });

  if (!cryptoNews?.value) return "Loading...";
  return (
    <div className="cryptoNews-container">
      <div className="news-header">
        <h1>Crypto News </h1>
      </div>
      <div className="cryptoNews-card">
        {cryptoNews.value.map((news, i) => (
          <a
            key={i}
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="top"
          >
            <div className="news-headline">
              <div className="news-img">
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <div className="news-title" level={4}>
                {news.name}
                <p className="news-desc">
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
              </div>

              <div className="provider-container">
                <img
                  className="source-logo"
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt="news"
                />
                <p className="provider-name">{news.provider[0]?.name}</p>
                <p>{moment(news.datePublished).startOf("ss").fromNow()}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
