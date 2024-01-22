import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
const Pie = () => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 15, label: "Completed" },
              { id: 1, value: 10, label: "Incomplete" },
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Pie;
