import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  //   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
  //     coinPrice.push(coinHistory.data.history[i].price);
  //     coinTimestamp.push(
  //       new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
  //     );
  //   }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  console.log(coinHistory);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="chart-header">
        <h2 className="chart-title">{coinName} Price Chart</h2>
        <div className="price-container">
          <h5 className="price-change">{coinHistory?.data?.change}%</h5>
          <h5 className="current-price">
            Current {coinName} Price : ${currentPrice}
          </h5>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
    // <>
    //   <Row className="chart-header">
    //     <Title level={2} className="chart-title">
    //       {coinName} Price Chart
    //     </Title>
    //     <Col className="price-container">
    //       <Title level={5} className="price-change">
    //         {coinHistory?.data?.change}%
    //       </Title>
    //       <Title level={5} className="current-price">
    //         Current {coinName} Price : ${currentPrice}
    //       </Title>
    //     </Col>
    //   </Row>
    //   {/* <Line data={data} options={options} /> */}
    // </>
  );
};

export default LineChart;
