import React from "react";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { Button } from "@mui/material";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ coinHistory, currentPrice, coinName, coinTimeperiod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Changed from 'push' to 'unshift' to invert the dates of data in correct manner
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    let coinDate;

    if (coinTimeperiod === "3h" || coinTimeperiod === "24h") {
      coinDate = new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleString("en-MY");
    } else {
      coinDate = new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString("en-MY");
    }
    coinTimestamp.unshift(coinDate);
  }

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

  // const actions = {
  //   handler(LineChart) {
  //     LineChart.resetZoom();
  //   },
  // };

  // const resetZoomChart = (resetZoom) => {
  //   LineChart.resetZoom;
  // };

  const options = {
    // plugins: {
    //   zoom: {
    //     zoom: {
    //       wheel: {
    //         enabled: true,
    //       },
    //       pinch: {
    //         enabled: true,
    //       },
    //       mode: "xy",
    //     },
    //   },
    // },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <div className="chart-header">
        <h2 className="chart-title">{coinName} Price Chart</h2>
        <div className="price-container">
          <h5 className="price-change">
            Change : {coinHistory?.data?.change}%
          </h5>
          <h5 className="current-price">
            Current {coinName} Price : ${currentPrice}
          </h5>
          {/* <Button onClick="resetZoomChart()">Reset Zoom</Button> */}
          {/* <button onClick={resetZoom}>Reset Zoom</button> */}
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

// function resetZoomChart() {
//   LineChart.resetZoom();
// }

function resetZoom() {
  LineChart.resetZoom();
}

export default LineChart;
