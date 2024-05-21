import "./adStatistics.scss";
import LineCharts from "../../../components/charts/LineChart/LineChart";
import { Link } from "react-router-dom";

const AdStatistics = () => {
  // Sales
  const sales = [
    {
      name: "Day 1",
      "People Reached": 50000,
    },
    {
      name: "Day 2",
      "People Reached": 70000,
    },
    {
      name: "Day 3",
      "People Reached": 80000,
    },
    {
      name: "Day 4",
      "People Reached": 160000,
    },
    {
      name: "Day 5",
      "People Reached": 200000,
    },
    {
      name: "Day 6",
      "People Reached": 250000,
    },
    {
      name: "Day 7",
      "People Reached": 280000,
    },
    {
      name: "Day 8",
      "People Reached": 320000,
    },
    {
      name: "Day 9",
      "People Reached": 370000,
    },
    {
      name: "Day 10",
      "People Reached": 410000,
    },
    {
      name: "Day 11",
      "People Reached": 450000,
    },
    {
      name: "Day 12",
      "People Reached": 500000,
    },
    {
      name: "Day 13",
      "People Reached": 50000,
    },
    {
      name: "Day 14",
      "People Reached": 70000,
    },
    {
      name: "Day 15",
      "People Reached": 80000,
    },
    {
      name: "Day 16",
      "People Reached": 160000,
    },
    {
      name: "Day 17",
      "People Reached": 200000,
    },
    {
      name: "Day 8",
      "People Reached": 250000,
    },
    {
      name: "Day 19",
      "People Reached": 280000,
    },
    {
      name: "Day 20",
      "People Reached": 320000,
    },
    {
      name: "Day 21",
      "People Reached": 370000,
    },
    {
      name: "Day 22",
      "People Reached": 410000,
    },
    {
      name: "Day 23",
      "People Reached": 450000,
    },
    {
      name: "Day 24",
      "People Reached": 500000,
    },
    {
      name: "Day 25",
      "People Reached": 280000,
    },
    {
      name: "Day 26",
      "People Reached": 320000,
    },
    {
      name: "Day 27",
      "People Reached": 370000,
    },
    {
      name: "Day 28",
      "People Reached": 410000,
    },
    {
      name: "Day 29",
      "People Reached": 450000,
    },
    {
      name: "Day 30",
      "People Reached": 500000,
    },
    {
      name: "Day 31",
      "People Reached": 500000,
    },
  ];
  return (
    <div className="ad-statistics">
      <div className="breadcrumbs">
        <Link to="/advertisements" className="link">
          Advertisements
        </Link>
        <p>/</p>
        <Link to="/advertisements/ad-details/3" className="link">
          Ad Details
        </Link>
        <p>/</p>
        <p>Ad Statistics</p>
      </div>
      <div className="page-title">Ad Statistics</div>

      <div className="ad-statistics-card">
        <div className="ad-chart">
          <h3>Ad performance</h3>
          <LineCharts grid data={sales} TotalSales="People Reached" />
        </div>
      </div>
    </div>
  );
};

export default AdStatistics;
