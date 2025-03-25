'use client';
import { FormattedMessage } from 'react-intl';
import React, { useState, useEffect } from 'react';
import { open, getData } from '../../utils/indexdb';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';

const StatisticsChart = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await open();
        const data = await getData(0, 50);

        const parsedData = data.map((transaction) => ({
          ...transaction,
          value: Number(transaction.value), // Convert to number
        }));

        setTransactions(parsedData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      let filtered = transactions.filter((t) => t.value < 0);

      //Apply date filtering:
      if (startDate) {
        filtered = filtered.filter(
          (t) => new Date(t.date) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (t) => new Date(t.date) <= new Date(endDate)
        );
      }

      // Aggregate expenses by category
      const aggregatedData = filtered.reduce((acc, transaction) => {
        if (!transaction.category) return acc;

        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += Math.abs(transaction.value);
        return acc;
      }, {});

      // Transform into an array format for PieChartComponent
      const pieChartData = Object.entries(aggregatedData).map(
        ([category, value]) => ({
          name: category,
          value,
        })
      );

      setFilteredData(pieChartData);
    }
  }, [transactions, startDate, endDate]);

  return (
    <>
      <h1 className="text-2xl mt-12 sm:text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        <FormattedMessage id="statistics.statistics" />
      </h1>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500 mb-2">
        <div className="flex flex-col sm:flex-row md:items-center justify-center gap-4 w-full">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-auto px-4 py-1 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full md:w-auto px-4 py-1 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500 mb-2">
        <h2 className="text-xl font-bold text-center mb-2">
          Pie Chart (Expenses %)
        </h2>
        <PieChartComponent data={filteredData} />
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500">
        <h2 className="text-xl font-bold text-center mb-2">Statistics:</h2>
        <p>
          Your income in the period:{' '}
          {transactions
            .filter((t) => t.value > 0)
            .reduce((acc, t) => acc + t.value, 0)}
        </p>
        <p>
          Your expenses in the period:{' '}
          {filteredData.reduce((acc, t) => acc + t.value, 0)}
        </p>
      </div>
    </>
  );
};

export default StatisticsChart;
