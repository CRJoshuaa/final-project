import React from "react";
import "./CryptoNews.css";
import { Typography, Select, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import RotateLoading from "./RotateLoading";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const CryptoNews = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 3 : 10,
  });
  if (!cryptoNews?.value) return <RotateLoading />;
  return (
    <div className="cryptoNews-container">
      <div className="news-header">
        <h1>Crypto News </h1>
      </div>
      <div className="cryptoNews-card">
        {cryptoNews.value.map((news, i) => (
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="top"
            key={news.url}
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
