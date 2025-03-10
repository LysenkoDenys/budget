'use client';
// import withProfiler from '../../HOCs/withProfiler';
// import { useState } from 'react';

// const list = new Array(20).fill(0).map(() => {
//   return `Item - ${Math.random()}`;
// });

// const List = ({ list }) => {
//   const [filter, setFilter] = useState('');

//   const filteredList = list.filter((item) => item.includes(filter));

//   return (
//     <>
//       <section className="mt-12">
//         <h1 className="text-4xl mx-[2%] mt-12">Statistics</h1>
//         <br />
//         <label htmlFor="filter">filter:</label>
//         <input
//           type="text"
//           id="filter"
//           onChange={(e) => setFilter(e.target.value)}
//         />
//         <ul>
//           {filteredList.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// };

// const Clicker = ({ children }) => {
//   const [n, setN] = useState(0);
//   return (
//     <div data-count={n}>
//       {children}
//       <div className="">Clicked {n} times</div>
//       <button
//         onClick={() => {
//           return setN(n + 1);
//         }}
//         className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white
//          rounded-full px-2 text-sm shadow-xl flex items-center justify-center
//          transition-all duration-300 transform hover:scale-110 hover:shadow-2xl
//          active:scale-95 active:shadow-md opacity-70"
//       >
//         Click me
//       </button>
//     </div>
//   );
// };

// const Statistics = () => {
//   return (
//     <Clicker className="m-2">
//       <List list={list} />
//     </Clicker>
//   );
// };

// export default withProfiler(Statistics, 'Statistics');

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { open, getData } from '../../utils/indexdb'; // Assuming you saved the above functions in a file named indexedDB.js

const StatisticsChart = () => {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [chartType, setChartType] = useState('bar');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]); // Store all unique categories

  // Group data by time period (daily, weekly, monthly)
  const groupDataByTimePeriod = (data, period) => {
    let groupedData = [];

    switch (period) {
      case 'daily':
        groupedData = data;
        break;
      case 'weekly':
        groupedData = data.reduce((acc, curr) => {
          const weekStartDate = new Date(curr.date);
          const weekNumber = `${weekStartDate.getFullYear()}-W${Math.ceil(
            (weekStartDate.getDate() - 1) / 7
          )}`;
          const existingWeek = acc.find((item) => item.date === weekNumber);
          if (existingWeek) {
            existingWeek.amount += parseFloat(curr.value); // Use `value` instead of `amount`
          } else {
            acc.push({ date: weekNumber, amount: parseFloat(curr.value) });
          }
          return acc;
        }, []);
        break;
      case 'monthly':
        groupedData = data.reduce((acc, curr) => {
          const monthStartDate = new Date(curr.date);
          const month = `${monthStartDate.getFullYear()}-${
            monthStartDate.getMonth() + 1
          }`;
          const existingMonth = acc.find((item) => item.date === month);
          if (existingMonth) {
            existingMonth.amount += parseFloat(curr.value); // Use `value` instead of `amount`
          } else {
            acc.push({ date: month, amount: parseFloat(curr.value) });
          }
          return acc;
        }, []);
        break;
      default:
        break;
    }

    return groupedData;
  };

  // Filter data by category and date range
  const filterData = (data, category, startDate, endDate) => {
    let filtered = data;

    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) <= new Date(endDate)
      );
    }

    return filtered;
  };

  // Fetch transactions from IndexedDB when component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Open the IndexedDB and fetch data
        await open(); // Initialize IndexedDB
        const data = await getData(0, 50); // Get the first 50 records (you can modify this logic)
        setTransactions(data);

        // Extract unique categories from the data
        const uniqueCategories = [
          ...new Set(data.map((transaction) => transaction.category)),
        ];
        setCategories(['All', ...uniqueCategories]); // Add 'All' option for filtering
      } catch (error) {
        console.error('Error fetching transactions from IndexedDB', error);
      }
    };

    fetchTransactions();
  }, []);

  // Update filtered data based on selected time period, category, and date range
  useEffect(() => {
    if (transactions.length > 0) {
      let groupedData = groupDataByTimePeriod(transactions, timePeriod);
      groupedData = filterData(
        groupedData,
        selectedCategory,
        startDate,
        endDate
      );
      setFilteredData(groupedData);
    }
  }, [transactions, timePeriod, selectedCategory, startDate, endDate]);

  // Customized label for PieChart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${filteredData[index].category}: ${value}`}
      </text>
    );
  };

  // PieChart data preparation
  const pieChartData = filteredData.map((item) => ({
    name: item.category,
    value: item.amount, // Make sure to map `amount` instead of `value`
  }));

  return (
    <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">
        Transaction Statistics
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {/* Time Period Selector */}
        <button
          onClick={() => setTimePeriod('daily')}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Daily
        </button>
        <button
          onClick={() => setTimePeriod('weekly')}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Weekly
        </button>
        <button
          onClick={() => setTimePeriod('monthly')}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Monthly
        </button>

        {/* Category Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Chart Type Selector */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>

        {/* Date Range Selection */}
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Chart Rendering */}
      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'bar' ? (
          <BarChart data={filteredData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <Bar
              dataKey="amount"
              fill="url(#colorUv)"
              radius={[10, 10, 0, 0]}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;
