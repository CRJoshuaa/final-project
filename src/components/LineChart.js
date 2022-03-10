import React, { useState } from "react";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Select from "react-select";
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

const LineChart = ({ coinHistory, coinName, coinTimeperiod }) => {
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

  // const resetZoomChart = () => {
  //   LineChart.resetZoom();
  // };

  // function resetZoomChart() {
  //   options.resetZoom();
  // }

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
      x: {
        ticks: {
          maxTicksLimit: function () {
            if (coinTimeperiod === "3h") {
              return 3;
            } else if (coinTimeperiod === "24h") {
              return 24;
            } else if (coinTimeperiod === "7d") {
              return 7;
            } else if (coinTimeperiod === "30d") {
              return 30;
            } else if (coinTimeperiod === "3m") {
              return 60;
            } else if (coinTimeperiod === "1y") {
              return 12;
            } else if (coinTimeperiod === "3y") {
              return 3;
            } else if (coinTimeperiod === "5y") {
              return 5;
            }
          },
        },
      },
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
        {/* <h2 className="chart-title">{coinName} Price Chart</h2> */}
        <div className="price-container">
          <h5 className="price-change">
            Change : {coinHistory?.data?.change}%
          </h5>
          {/* <Button onClick="resetZoomChart()">Reset Zoom</Button> */}
          {/* <button onClick={resetZoom}>Reset Zoom</button> */}
        </div>
      </div>
      <div className="chart-cont">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

// function resetZoomChart() {
//   LineChart.resetZoom();
// }

// function resetZoomChart() {
//   options.resetZoom();
// }

export default LineChart;
