import React, { useEffect, useContext, useState } from "react";
import "./CryptoNews.css";
import { Typography, Select, Avatar } from "antd";
import moment from "moment";
import RotateLoading from "./RotateLoading";
import { selectSocket } from "../features/appSlice";
import { useSelector } from "react-redux";
import { ThemeContext } from "./ThemeContext";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const CryptoNews = ({ simplified }) => {
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;
  // const socket = io("http://localhost:3001");
  const socket = useSelector(selectSocket);

  //REQUEST DATA
  //crypto news
  useEffect(() => {
    socket.emit("request-crypto-news", "Cryptocurrency", simplified ? 3 : 10);
    return () => {};
  }, []);

  const [cryptoNews, setCryptoNews] = useState([]);

  //RECEIVE DATA
  //crypto news
  socket.on("response-crypto-news", (message) => {
    setCryptoNews(message);
  });
  if (!cryptoNews?.value) return <RotateLoading />;
  return (
    <div
      className={`crypto-news-cont ${
        darkMode ? "crypto-news-cont-dark" : "crypto-news-cont-light"
      }`}
    >
      <div className="news-header">
        <h1>Crypto News </h1>
      </div>
      <div className="crypto-news-feed">
        {cryptoNews.value.map((news, i) => (
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="top"
            key={news.url}
          >
            <div
              className={`crypto-news-card ${
                darkMode ? "crypto-news-card-dark" : "crypto-news-card-light"
              }`}
            >
              <div className="crypto-news-img">
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <div
                className={`crypto-news-title ${
                  darkMode
                    ? "crypto-news-title-dark"
                    : "crypto-news-title-light"
                }`}
                level={4}
              >
                {news.name}
                <p
                  className={`crypto-news-desc ${
                    darkMode
                      ? "crypto-news-desc-dark"
                      : "crypto-news-desc-light"
                  }`}
                >
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
              </div>

              <div className="crypto-news-source">
                <img
                  className="source-logo"
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt="news"
                />
                <p
                  className={`provider-name ${
                    darkMode ? "provider-name-dark" : "provider-name-light"
                  }`}
                >
                  {news.provider[0]?.name}
                </p>
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
