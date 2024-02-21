import React from 'react';
import { Chart } from 'react-google-charts';

const LineChart = () => {
  const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2014', 1000, 400],
    ['2015', 1170, 460],
    ['2016', 660, 1120],
    ['2017', 1030, 540],
  ];

  const options = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales and Expenses over the Years',
    },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default LineChart;