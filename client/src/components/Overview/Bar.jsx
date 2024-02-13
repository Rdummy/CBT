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

const data = [
  { examTitle: "Cyber Security", Incomplete: 30, Completed: 70 },
  { examTitle: "Language Exam", Incomplete: 22, Completed: 78 },
  { examTitle: "Company Rules", Incomplete: 45, Completed: 55 },
];

const BarChartCustom = ({ onBarHover }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="examTitle" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Incomplete"
          fill="#8884d8"
          onMouseEnter={(data) => onBarHover(data)}
        />
        <Bar
          dataKey="Completed"
          fill="#82ca9d"
          onMouseEnter={(data) => onBarHover(data)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
