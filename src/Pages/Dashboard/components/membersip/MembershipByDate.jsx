/* eslint-disable react/prop-types */

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  Tooltip,
} from "recharts";



export function MembershipByDate({ chartData }) {
  // console.log(chartData)
  return (
    <div>
      <LineChart
        width={580}
        height={350}
        data={chartData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value + "-01");
            return date.toLocaleString("default", { month: "short" });
          }}
          tick={{ fontSize: 11, fill: "gray" }}
         
        />
        <Tooltip />
        <Line
          dataKey="members"
          type="natural"
          stroke="var(--chart-line-color, #8884d8)"
          strokeWidth={2}
          dot={{
            fill: "var(--chart-line-color, #8884d8)",
          }}
          activeDot={{
            r: 6,
          }}
          name="Total Members"
        >
          <LabelList
            dataKey="members"
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </div>
  );
}
