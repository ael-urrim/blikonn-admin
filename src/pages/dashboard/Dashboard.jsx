import "./dashboard.scss";
import LineCharts from "../../components/charts/LineChart/LineChart";
// import Barchart from "../../../components/charts/BarChart/Barchart";
// import PieCharts from "../../../components/charts/PieChart/PieChart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Dashboard = () => {

  document.title = "Blikonn - Admin Dashboard"
  const { authToken } = useContext(AuthContext);
  const users = [
    {
      name: "Jan",
      "Active Users": 200000,
      "Total Visitors": 25000,
    },
    {
      name: "Feb",
      "Active Users": 40000,
      "Total Visitors": 60000,
    },
    {
      name: "Mar",
      "Active Users": 80000,
      "Total Visitors": 100000,
    },
    {
      name: "Apr",
      "Active Users": 160000,
      "Total Visitors": 180000,
    },
    {
      name: "May",
      "Active Users": 200000,
      "Total Visitors": 230000,
    },
    {
      name: "Jun",
      "Active Users": 250000,
      "Total Visitors": 280000,
    },
    {
      name: "Jul",
      "Active Users": 280000,
      "Total Visitors": 310000,
    },
    {
      name: "Aug",
      "Active Users": 320000,
      "Total Visitors": 350000,
    },
    {
      name: "Sept",
      "Active Users": 370000,
      "Total Visitors": 400000,
    },
    {
      name: "Oct",
      "Active Users": 410000,
      "Total Visitors": 430000,
    },
    {
      name: "Nov",
      "Active Users": 450000,
      "Total Visitors": 480000,
    },
    {
      name: "Dec",
      "Active Users": 500000,
      "Total Visitors": 530000,
    },
  ];

  // Sales
  const sales = [
    {
      name: "Jan",
      "Total Sales": 50000,
    },
    {
      name: "Feb",
      "Total Sales": 70000,
    },
    {
      name: "Mar",
      "Total Sales": 80000,
    },
    {
      name: "Apr",
      "Total Sales": 160000,
    },
    {
      name: "May",
      "Total Sales": 200000,
    },
    {
      name: "Jun",
      "Total Sales": 250000,
    },
    {
      name: "Jul",
      "Total Sales": 280000,
    },
    {
      name: "Aug",
      "Total Sales": 320000,
    },
    {
      name: "Sept",
      "Total Sales": 370000,
    },
    {
      name: "Oct",
      "Total Sales": 410000,
    },
    {
      name: "Nov",
      "Total Sales": 450000,
    },
    {
      name: "Dec",
      "Total Sales": 500000,
    },
  ];

  // const BarChartdata = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  // Users Counter
  const totalUsersCounter = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/adminUsers/totalUsersCount/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      //console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const {
    //isLoading,
    data: usersCount,
    //error,
  } = useQuery({
    queryKey: ["usersCount"],
    queryFn: totalUsersCounter,
  });

  return (
    <div className="dashboard">
      <div className="page-title">Dashboard</div>
      <div className="top">
        <div className="dashboard-users">
          <div className="card card-one">
            <p className="title">No. of Users</p>
            <p className="value">{usersCount}</p>
          </div>
          <div className="card card-two">
            <p className="title">Active Users</p>
            <p className="value">900k</p>
          </div>
          <div className="card card-three">
            <p className="title">Monthly Visitors</p>
            <p className="value">7Million</p>
          </div>
          <div className="card card-four">
            <p className="title">Total Revenue</p>
            <p className="value">$3million</p>
          </div>
        </div>
      </div>

      <div className="middle">
        <div className="chart users-chart">
          <h3>User statistic</h3>
          <LineCharts
            data={users}
            ActiveUser="Active Users"
            TotalVisitors="Total Visitors"
            activeDot={{ r: 5 }}
            grid
          />
        </div>

        <div className="chart sales-chart">
          <h3>Sales statistic</h3>
          <LineCharts grid data={sales} TotalSales="Total Sales" />
        </div>
      </div>

      {/* <div className="bottom">
        <div className="left">
          <Barchart data={BarChartdata}/>
        </div>
        <div className="right">
          <PieCharts/>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
