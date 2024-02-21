import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import { Box, Container, Typography } from "@mui/material";

interface GoogleLineChartProps {
  data: [number, string][];
}
const GoogleLineChart = ({ data }: GoogleLineChartProps) => {
  const chartData = [
    ["Time", "Value"],
    ...data.map((item) => [new Date(item[0]), item[1]]),
  ];

  const options = {
    title: "Google Chart Sample",
    legend: { position: "bottom" },
    hAxis: {
      format: "M/d/yy",
    },
    vAxis: {
      minValue: 0,
    },
  };

  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    const simulateChartLoad = () => {
      return new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1000 + 500)
      );
    };

    simulateChartLoad().then(() => {
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      setLoadTime(timeTaken);
    });
  }, []);
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>
        Load Time: <strong>{(loadTime / 1000).toFixed(2)}s</strong>
      </Typography>
      <Chart
        chartType="LineChart"
        data={chartData}
        options={options}
        height={"400px"}
      />
      <Typography marginY={2}>
        If your usecase is to use charts without any complex interactions then
        you should consider this. It offers maximum charts among any open source
        liraries. However, these charts do not offer ennough customizations and
        interactivity. Also, Google is known to change direction of the open
        source project without a notice or backward compatibility and Google
        Charts is no exception. Their support for only Flutter and availabilty
        on Dart package manager is the evidence.
      </Typography>
    </Container>
  );
};
export default GoogleLineChart;
