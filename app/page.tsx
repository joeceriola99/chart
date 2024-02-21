'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import "./styles.css";
import { ResponsiveLine } from '@nivo/line'
import ReactDOM from 'react-dom';
import Chart from "react-apexcharts";
import axios from 'axios'
import jsonData from '../data/data.json' // 10k recharts
import jsonData2 from '../data/data2.json' // 1k recharts
import jsonData3 from '../data/data3.json' // 10k nivo
import jsonData4 from '../data/data4.json' // 1k nivo
import jsonData5 from '../data/data5.json' // 1k visx
import jsonData6 from '../data/data6.json' // 10k visx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Chart as GoogleChart } from 'react-google-charts';

import {Chart as ChartLine} from 'chart.js/auto';
// import { Line as ChartsLine } from 'react-chartjs-2';

  type CsvRow = {
    Index: number,
    "User Id": string,
    "First Name": string,
    "Last Name": string,
    Sex: string,
    Email: string,
    "Phone": string,
    "Date of birth": string,
    "Job Title": string
  };

  
  
  export default function Home() {
    const [csvData, setCsvData] = useState<CsvRow[]>([]);
    const [loadTimeRecharts, setLoadTimeRecharts] = useState<number | null>(null);
    const [loadTimeNivo, setLoadTimeNivo] = useState<number | null>(null);
    const [loadTimeApex, setLoadTimeApex] = useState<number | null>(null);
    const [loadTimeHighChart, setLoadTimeHighChart] = useState<number | null>(null);
    const [loadTimeGoogleChart, setLoadTimeGoogleChart] = useState<number | null>(null);
    const [loadTimeChartsJs, setLoadTimeChartsJs] = useState<number | null>(null);
    const [jsonDataState, setJsonDataState] = useState<any>([]);    
    const [jsonDataStateNivo, setJsonDataStateNivo] = useState<any>([]);    
    const [jsonDataStateApex, setJsonDataStateApex] = useState<any>([]);    
    const [loading, setLoading] = useState(false);
    const [highChartOptions, setHighChartOptions] = useState<any>({});
    const [googleChartOptions, setGoogleChartOptions] = useState<any>({});
    const [googleChartData, setGoogleChartData] = useState<any>([]);
    const [chartsJsData, setChartsJsData] = useState<any>([]);
    const [chartsJsOptions, setChartsJsOptions] = useState<any>({});

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef2 = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<ChartLine<"line", number[], string> | null>(null);
    const fetchLargeDataRecharts = async () => {
      setLoading(true);

      try {
        const startTimeRecharts = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataState(jsonData);
          
        const endTimeRecharts = performance.now();
        setLoadTimeRecharts((endTimeRecharts - startTimeRecharts));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmallDataRecharts = async () => {
      setLoading(true);

      try {
        const startTimeRecharts = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data2.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataState(jsonData);
          
        const endTimeRecharts = performance.now();
        setLoadTimeRecharts((endTimeRecharts - startTimeRecharts));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    const fetchLargeDataNivo = async () => {
      setLoading(true);

      try {
        const startTimeNivo = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data3.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataStateNivo(jsonData);
          
        const endTimeNivo = performance.now();
        setLoadTimeNivo((endTimeNivo - startTimeNivo));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmallDataNivo = async () => {
      setLoading(true);

      try {
        const startTimeNivo = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data4.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataStateNivo(jsonData);
          
        const endTimeNivo = performance.now();
        setLoadTimeNivo((endTimeNivo - startTimeNivo));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLargeDataApex = async () => {
      setLoading(true);

      try {
        const startTimeApex = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataStateApex(jsonData);
          
        const endTimeApex = performance.now();
        setLoadTimeApex((endTimeApex - startTimeApex));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmallDataApex = async () => {
      setLoading(true);

      try {
        const startTimeApex = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data2.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setJsonDataStateApex(jsonData);
          
        const endTimeApex = performance.now();
        setLoadTimeApex((endTimeApex - startTimeApex));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    const processedData = jsonDataStateApex.map((row: any) => ({
      x: row.name, 
      y: {
        uv: row.uv,
        pv: row.pv,
      }
    }));

    const options = {
      chart: {
        id: "class-data",
      },
      xaxis: {
        categories: processedData.map((row: any) => row.x),
      },
    };
    
    const series = [
      {
        name: "uv",
        data: processedData.map((row: any) => row.y.uv),
      },
      {
        name: "pv",
        data: processedData.map((row: any) => row.y.pv),
      },
    ];

    const fetchSmallDataHighChart = async () => {
      setLoading(true);

      try {
        const startTimeHighChart = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data2.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setHighChartOptions({
          title: {
            text: 'Line Chart'
          },
          xAxis: {
            categories: jsonData.map((row: any) => row.name),
          },
          series: [
            {
              name: 'Data',
              data: jsonData.map((row: any) => row.uv),
              data2: jsonData.map((row: any) => row.pv),
            }
          ]
        });
            
        const endTimeHighChart = performance.now();
        setLoadTimeHighChart((endTimeHighChart - startTimeHighChart));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLargeDataHighChart = async () => {
      setLoading(true);

      try {
        const startTimeHighChart = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setHighChartOptions({
          title: {
            text: 'Line Chart'
          },
          xAxis: {
            categories: jsonData.map((row: any) => row.name),
          },
          series: [
            {
              name: 'Data',
              data: jsonData.map((row: any) => row.uv),
              data2: jsonData.map((row: any) => row.pv),
            }
          ]
        });
            
        const endTimeHighChart = performance.now();
        setLoadTimeHighChart((endTimeHighChart - startTimeHighChart));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchSmallDataGoogleChart = async () => {
      setLoading(true);

      try {
        const startTimeGoogleChart = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data7.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        
        const data = [
          ['Year', 'Sales', 'Expenses'],
          ...jsonData
        ]
        console.log(data)

        setGoogleChartData(data);


        setGoogleChartOptions({
          chart: {
            title: 'Line Chart',
            subtitle: 'Sales and Expenses over the Years',
          },
        });
            
        const endTimeGoogleChart = performance.now();
        setLoadTimeGoogleChart((endTimeGoogleChart - startTimeGoogleChart));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLargeDataGoogleChart = async () => {
      setLoading(true);

      try {
        const startTimeGoogleChart = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data8.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        
        const data = [
          ['Class', 'Sales', 'Expenses'],
          ...jsonData
        ]
        console.log(data)

        setGoogleChartData(data);


        setGoogleChartOptions({
          chart: {
            title: 'Line Chart',
            subtitle: 'Sales and Expenses',
          },
        });
            
        const endTimeGoogleChart = performance.now();
        setLoadTimeGoogleChart((endTimeGoogleChart - startTimeGoogleChart));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmallDataChartsJs = async () => {
      setLoading(true);
      const ctx = chartRef.current?.getContext('2d');
      try {
        const startTimeChartsJs = performance.now();
        const response = await fetch('https://joeceriola99.github.io/chart/data2.json')
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const jsonData = await response.json();

       const name = jsonData.map((row: any) => row.name);
       const uv = jsonData.map((row: any) => row.uv);
       const pv = jsonData.map((row: any) => row.pv);
       const amt = jsonData.map((row: any) => row.amt); 

        const chartData = {
          labels: [...name],
          datasets: [
            {
              label: 'UV',
              data: [...uv],
              fill: true,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'PV',
              data: [...pv],
              fill: true,
              backgroundColor: 'rgb(53, 35, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'AMT',
              data: [...amt],
              fill: true,
              backgroundColor: 'rgb(78, 120, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            
          ],
        };

        setChartsJsData(chartData);

        const chartOptions = {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };
        setChartsJsOptions(chartOptions);
        
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
          const chart = new ChartLine(ctx, {
            type: 'line',
            data: chartData,
            options: chartsJsOptions,
          });
        }

            
        const endTimeChartsJs = performance.now();
        setLoadTimeChartsJs((endTimeChartsJs - startTimeChartsJs));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
      return () => {
        chartInstance.current?.destroy();
      };
    };


    const fetchLargeDataChartsJs = async () => {
        setLoading(true);
        const ctx = chartRef.current?.getContext('2d');
        try {
          const startTimeChartsJs = performance.now();
          const response = await fetch('https://joeceriola99.github.io/chart/data.json')
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const jsonData = await response.json();
  
         const name = jsonData.map((row: any) => row.name);
         const uv = jsonData.map((row: any) => row.uv);
         const pv = jsonData.map((row: any) => row.pv);
         const amt = jsonData.map((row: any) => row.amt); 
  
          const chartData = {
            labels: [...name],
            datasets: [
              {
                label: 'UV',
                data: [...uv],
                fill: true,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
              {
                label: 'PV',
                data: [...pv],
                fill: true,
                backgroundColor: 'rgb(53, 35, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
              {
                label: 'AMT',
                data: [...amt],
                fill: true,
                backgroundColor: 'rgb(78, 120, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
              
            ],
          };
  
          setChartsJsData(chartData);
  
          const chartOptions = {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
          setChartsJsOptions(chartOptions);
          
          const ctx = chartRef.current?.getContext('2d');
          if (ctx) {
            const chart = new ChartLine(ctx, {
              type: 'line',
              data: chartData,
              options: chartsJsOptions,
            });
          }
  
              
          const endTimeChartsJs = performance.now();
          setLoadTimeChartsJs((endTimeChartsJs - startTimeChartsJs));
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
        return () => {
          chartInstance.current?.destroy();
        };
      };


    const divStyle = {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Adjust as per your requirement
    };

  return (
    // <div style={divStyle}>
<div className="flex flex-col h-screen">

{/* START OF HIGH CHARTS */}

<section className='bg-gray-100 h-full'>
    <h2 className='text-3xl font-bold text-center'> HIGHCHARTS </h2>
      <div className='flex flex-col items-center'>
        <button onClick={fetchSmallDataHighChart} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
        <button onClick={fetchLargeDataHighChart} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
        <p className='font-bold text-center'>Data load time: {loadTimeHighChart?.toFixed(2)} ms</p>
      </div>

      <div id="highChart" style={{'width':'100%', 'height':'400px'}}>
        <HighchartsReact
          highcharts={Highcharts}
          options={highChartOptions}
        />
      </div>
</section>


{/* END OF HIGH CHARTS */}


{/* START OF CHARTS JS */}
<section className="bg-gray-100 h-full">
      <h2 className='text-3xl font-bold text-center'> CHARTS JS </h2>
      <div className='flex flex-col items-center'>
        <button onClick={fetchSmallDataChartsJs} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
        <button onClick={fetchLargeDataChartsJs} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
        <p className='font-bold text-center'>Data load time: {loadTimeChartsJs?.toFixed(2)} ms</p>
      </div>

      <canvas ref={chartRef} />;

</section>
{/* END OF CHARTS JS */}


{/* START OF GOOGLE CHARTS */}
<section className="bg-gray-100 h-full">
      <h2 className='text-3xl font-bold text-center'> GOOGLE CHARTS </h2>
      <div className='flex flex-col items-center'>
        <button onClick={fetchSmallDataGoogleChart} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
        <button onClick={fetchLargeDataGoogleChart} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
        <p className='font-bold text-center'>Data load time: {loadTimeGoogleChart?.toFixed(2)} ms</p>
      </div>
    <GoogleChart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={googleChartData}
      options={googleChartOptions}
    />
</section>
{/* END OF GOOGLE CHARTS */}


{/* START OF RECHARTS */}
<section className="bg-gray-100 h-full">
      <h2 className='text-3xl font-bold text-center'> RECHARTS </h2>
      <div className='flex flex-col items-center'>
        <button onClick={fetchSmallDataRecharts} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
        <button onClick={fetchLargeDataRecharts} type="button" className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
        <p className='font-bold text-center'>Data load time: {loadTimeRecharts?.toFixed(2)} ms</p>
      </div>
    
    <LineChart
        width={500}
        height={300}
        data={jsonDataState}
        margin={{
          top: 50,
          right: 5,
          left: 10,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Index" stroke="#82ca9d" />
      </LineChart>
</section> 
{/* END OF RECHARTS */}

{/* START OF APEX CHART */}
<section className="bg-gray-100 h-full justify-center">

<h2 className='text-3xl font-bold text-center'>APEXCHARTS</h2>
<div className='flex flex-col items-center'>
  <button onClick={fetchSmallDataApex} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
  <button onClick={fetchLargeDataApex} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
  <p className='font-bold text-center'>Data load time: {loadTimeApex?.toFixed(2)} ms</p>
</div>
<Chart options={options} series={series} type="line" width={1000} />

</section>
{/* END OF APEXCHART*/}

 {/* START OF NIVO */}
 <section className="bg-gray-300 h-full">
 <h2 className='text-3xl font-bold text-center'>NIVO </h2>
    <div className='flex flex-col items-center'>
      <button onClick={fetchSmallDataNivo} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 1000 Data Points</button>
      <button onClick={fetchLargeDataNivo} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load 10000 Data Points</button>
      <p className='font-bold text-center'>Data load time: {loadTimeNivo?.toFixed(2)} ms</p>
    </div>
<ResponsiveLine
        data={jsonDataStateNivo}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
</section>
 {/* END OF NIVO */}


   </div>
  );
}
