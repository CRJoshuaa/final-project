import React from "react";
import "./CryptoNews.css";
import { Typography, Select, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const CryptoNews = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 3 : 10,
  });
  if (!cryptoNews?.value) return "Loading...";
  return (
    <div className="crypto-news-cont">
      <div className="news-header">
        <h1>Crypto News </h1>
      </div>
      <div className="crypto-news-feed">
        {cryptoNews.value.map((news, i) => (
          <a
            key={i}
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="top"
          >
            <div className="crypto-news-card">
              <div className="crypto-news-img">
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <div className="crypto-news-title" level={4}>
                {news.name}
                <p className="crypto-news-desc">
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
