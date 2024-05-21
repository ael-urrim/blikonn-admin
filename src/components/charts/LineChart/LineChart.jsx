import './lineChart.scss'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const LineCharts = ({data, ActiveUser, TotalVisitors, activeDot, TotalSales, grid}) => {

  return (
    <ResponsiveContainer width="100%" aspect={4/1}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 50,
              bottom: 5,
            }}
          >
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
            <XAxis dataKey="name" stroke="#5550bd" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={ActiveUser}
              stroke="#8884d8"
              activeDot={activeDot}
            />
            <Line type="monotone" dataKey={TotalVisitors} stroke="#82ca9d" />
            <Line type="monotone" dataKey={TotalSales} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
  )
}

export default LineCharts