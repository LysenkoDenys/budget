'use client';
import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  Legend,
} from 'recharts';

const StackedBarChartComponent = ({ data }) => {
  // Step 1: Aggregate transactions by category
  const aggregatedData = data.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.value;
    return acc;
  }, {});

  // Step 2: Convert aggregated data into an array with categories and values
  const chartData = Object.keys(aggregatedData).map((category) => ({
    category,
    value: aggregatedData[category],
  }));

  // Create stacked data by iterating through categories
  const stackedData = data.reduce((acc, transaction) => {
    const existingItem = acc.find((item) => item.date === transaction.date);
    if (existingItem) {
      existingItem[transaction.category] =
        (existingItem[transaction.category] || 0) + transaction.value;
    } else {
      acc.push({
        date: transaction.date,
        [transaction.category]: transaction.value,
      });
    }
    return acc;
  }, []);

  // Step 3: Render StackedBarChart
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={stackedData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Create a separate Bar for each category */}
        {Object.keys(aggregatedData).map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            stackId="a"
            fill={getCategoryColor(category)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Helper function to return a color based on category
const getCategoryColor = (category) => {
  const colors = {
    income: '#82ca9d',
    children: '#ff6f61',
    food: '#8884d8',
    // Add more categories and their colors as needed
  };
  return colors[category] || '#000000'; // Default to black if category not found
};

export default StackedBarChartComponent;
