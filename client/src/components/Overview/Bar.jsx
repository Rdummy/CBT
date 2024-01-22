import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    paris: 30,
    newYork: 86,
    seoul: 5,
    month: "Cyber Security",
  },
  {
    paris: 40,
    newYork: 78,
    seoul: 8,
    month: "Language Exam",
  },
  {
    paris: 20,
    newYork: 106,
    seoul: 6,
    month: "Company Rules",
  },
];
6;
const valueFormatter = (value) => `${value}mm`;

export default function Bar() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "paris", label: "Incomplete", valueFormatter },
        { dataKey: "newYork", label: "Completed", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
