import React from "react";
import "./CryptoNews.css";
import { Typography, Select, Row, Col, Card, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const CryptoNews = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 5 : 10,
  });
  if (!cryptoNews?.value) return "Loading...";
  return (
    // <Row gutter={[24, 24]}>
    //   {cryptoNews.value.map((news, i) => (
    //     <Col xs={24} sm={12} lg={8} key={i}>
    //       <Card hoverable className="news-card">
    //         <a href={news.url} target="_blank" rel="noreferrer">
    //           <div className="news-image-container">
    //             <Title className="news-title" level={4}>
    //               {news.name}
    //             </Title>
    //             <img
    //               src={news?.image?.thumbnail?.contentUrl || demoImage}
    //               alt="news"
    //             />
    //           </div>
    //           <p>
    //             {news.description.length > 100
    //               ? `${news.description.substring(0, 100)}...`
    //               : news.description}
    //           </p>
    // <div className="provider-container">
    //   <div>
    //     <Avatar
    //       src={
    //         news.provider[0]?.image?.thumbnail?.contentUrl ||
    //         demoImage
    //       }
    //       alt=""
    //     />
    //     <Text className="provider-name">
    //       {news.provider[0]?.name}
    //     </Text>
    //   </div>
    //   <Text>
    //     {moment(news.datePublished).startOf("ss").fromNow()}
    //   </Text>
    // </div>
    //         </a>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>
    <div className="cryptoNews-card-container">
      <h1>Cryto News Feed</h1>
      {cryptoNews.value.map((news, i) => (
        <a href={news.url} target="_blank" rel="noreferrer" className="top">
          <div className="box">
            <Title className="news-title" level={4}>
              {news.name}
              <p className="news-desc">
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
            </Title>

            <div className="news-image-container">
              <img
                src={news?.image?.thumbnail?.contentUrl || demoImage}
                alt="news"
              />
            </div>
          </div>
          {/* <p>
            {news.description.length > 100
              ? `${news.description.substring(0, 100)}...`
              : news.description}
          </p> */}
          <div className="provider-container">
            <div>
              <Avatar
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                }
                alt="news"
              />
              <Text className="provider-name">{news.provider[0]?.name}</Text>
            </div>
            <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CryptoNews;
