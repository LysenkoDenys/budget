'use client';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import React, { useState, useEffect, useContext } from 'react';
import { open, getData } from '../../utils/indexdb';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';

const StatisticsChart = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  const { state } = useContext(AppContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await open();
        const data = await getData(0, Infinity);

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

  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      (!startDate || transactionDate >= new Date(startDate)) &&
      (!endDate || transactionDate <= new Date(endDate))
    );
  });

  const totalExpenses = filteredData
    .reduce((acc, t) => acc + t.value, 0)
    .toFixed(0);
  const totalIncomes = filteredTransactions
    .filter((t) => t.value > 0)
    .reduce((acc, t) => acc + t.value, 0)
    .toFixed(0);

  const totalBudget = totalIncomes - totalExpenses;

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
          <input
            type="button"
            value="Last month"
            onChange={() => {}}
            className="w-full md:w-auto px-4 py-1 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
            placeholder="Last month"
          />
        </div>
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500 mb-2">
        <h2 className="text-xl font-bold text-center mb-2">
          <FormattedMessage id="statistics.pieChart" />
        </h2>
        <PieChartComponent data={filteredData} />
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500">
        <h2 className="text-xl font-bold text-center mb-2">
          <FormattedMessage id="statistics.budgetPer" />
        </h2>
        <p className="text-center">
          <FormattedMessage id="statistics.income" />{' '}
          {new Intl.NumberFormat(state.locale).format(totalIncomes)}{' '}
          {state.currency}
        </p>
        <p className="text-center">
          <FormattedMessage id="statistics.expenses" />{' '}
          {new Intl.NumberFormat(state.locale).format(totalExpenses)}{' '}
          {state.currency}
        </p>
        <p className="text-center">
          <FormattedMessage id="statistics.budget" />{' '}
          {new Intl.NumberFormat(state.locale).format(totalBudget)}{' '}
          {state.currency}
        </p>
      </div>
    </>
  );
};

export default StatisticsChart;
