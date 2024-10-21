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
import SideBar from "@/components/nav";
import { overviewService } from "@/utils/overviewService";
import useSWR from "swr";
import LoadingOrError from "@/components/cacheState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetcher = async () => {
  const data = await overviewService();
  const sortedData = data.sort(
    (a, b) => new Date(a.visit_date) - new Date(b.visit_date)
  );
  return sortedData;
};

const Trend = () => {
  const { data, error } = useSWR("/api/trend", fetcher, {
    refreshInterval: 10000000,
  });

  // Check if data is available, otherwise provide an empty array
  const chartData = {
    labels: data ? data.map((item) => item.visit_date) : [],
    datasets: [
      {
        label: "Page Views",
        data: data ? data.map((item) => item.page_views) : [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
        text: "Website Visits Over the Past 30 Days",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Page Views",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <LoadingOrError {...{ data, error }}>
      <div className="flex flex-col md:flex-row h-screen">
        <SideBar />
        <div className="flex-col flex-1 items-center m-4 p-8 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-center mb-8 text-xl font-bold text-gray-800 uppercase">
            Website Visits Over the Past 30 Days
          </h2>
          <div className="w-full h-full min-w-[500px]">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </LoadingOrError>
  );
};

export default Trend;
