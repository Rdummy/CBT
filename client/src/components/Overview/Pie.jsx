import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#82ca9d", "#8884d8"];

const PieChartCustom = ({ selectedBar, onClick }) => {
  // Adjust the data based on the selected bar
  const data = selectedBar
    ? [
        { name: "Completed", value: selectedBar.Completed },
        { name: "Incomplete", value: selectedBar.Incomplete },
      ]
    : [
        { name: "Completed", value: 15 },
        { name: "Incomplete", value: 10 },
      ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
        onClick={(entry, index) => onClick(data[index].name)}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              selectedBar && selectedBar.name === entry.name
                ? "#82ca9d"
                : COLORS[index % COLORS.length]
            }
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartCustom;
