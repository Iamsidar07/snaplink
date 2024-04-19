"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Statstics = ({ data, className }) => {
  return (
    <div className={className}>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default Statstics;
