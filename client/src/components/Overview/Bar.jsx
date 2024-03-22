import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartCustom = ({ data, onBarHover, onBarClick }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} onClick={onBarClick}>
        <XAxis dataKey="examTitle" tick={{ fill: "black" }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Incomplete" fill="#8884d8" onMouseEnter={onBarHover} />
        <Bar dataKey="Completed" fill="#82ca9d" onMouseEnter={onBarHover} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
