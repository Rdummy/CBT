import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartCustom = ({ onBarHover, onBarClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/overview/barchart"
        );
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the exam data: ", error);
      }
    };

    fetchData();
  }, []);

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
