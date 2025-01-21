/* eslint-disable react/prop-types */
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export function SmsByDate({ chartData }) {
  return (
    <div className="sms-by-date-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => {
              const [year, month] = value.split("-");
              return `${month}/${year}`;
            }}
            tick={{ fontSize: 11, fill: "gray" }}
            tickMargin={5}
            axisLine={{ stroke: "lightgray" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "gray" }}
            tickMargin={5}
            axisLine={{ stroke: "lightgray" }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
