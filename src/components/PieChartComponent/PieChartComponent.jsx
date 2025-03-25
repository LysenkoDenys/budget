'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28EF0',
  '#FF6384',
  '#36A2EB',
  '#4BC0C0',
  '#F77825',
  '#D4A5A5',
];

const PieChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius="100%"
        innerRadius="50%"
        labelLine={false}
        label={({
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
          if (value < -100) return null;

          return (
            <text
              x={x}
              y={y}
              fill="white"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={window.innerWidth < 600 ? 10 : 14}
            >
              {`${data[index]?.name || 'Unknown'}: ${value.toFixed(0)}`}
            </text>
          );
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartComponent;
