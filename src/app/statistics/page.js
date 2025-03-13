'use client';
import { FormattedMessage } from 'react-intl';
import React, { useState, useEffect } from 'react';
import { open, getData } from '../../utils/indexdb';
import StackedBarChartComponent from '../../components/StackedBarChartComponent/StackedBarChartComponent';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';

const StatisticsChart = () => {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const groupDataByTimePeriod = (data, period) => {
    let groupedData = [];

    //=======
    console.log('Fetched Transactions:', data);
    console.log('Grouped Data:', groupedData);
    console.log('Filtered Data after filtering:', filteredData);
    //=======

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
            existingWeek.amount += parseFloat(curr.value);
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
            existingMonth.amount += parseFloat(curr.value);
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

  const filterData = (data, category, startDate, endDate) => {
    let filtered = data;

    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) >= new Date(`${startDate}T00:00:00`)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) <= new Date(`${endDate}T23:59:59`)
      );
    }

    return filtered;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await open();
        const data = await getData(0, 50);
        const parsedData = data
          .map((transaction) => ({
            ...transaction,
            value: Number(transaction.value),
          }))
          .filter((transaction) => !isNaN(transaction.value));

        setTransactions(parsedData);

        const uniqueCategories = [
          ...new Set(data.map((transaction) => transaction.category)),
        ];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching transactions from IndexedDB', error);
      }
    };

    fetchTransactions();
  }, []);

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

  //==================================================
  useEffect(() => {
    console.log('Time Period:', timePeriod);
    console.log('Category:', selectedCategory);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Filtered Data:', filteredData);
  }, [timePeriod, selectedCategory, startDate, endDate, filteredData]);
  //==================================================

  return (
    <>
      <h1 className="text-4xl mx-[2%] mt-12">
        <FormattedMessage id="statistics.statistics" />
      </h1>
      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500 mb-2">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button
            onClick={() => setTimePeriod('daily')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none dark:bg-gray-800"
          >
            Daily
          </button>
          <button
            onClick={() => setTimePeriod('weekly')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none dark:bg-gray-800"
          >
            Weekly
          </button>
          <button
            onClick={() => setTimePeriod('monthly')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none dark:bg-gray-800"
          >
            Monthly
          </button>

          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-800"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-800"
              placeholder="End Date"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none dark:bg-gray-800"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-xl font-bold text-center mb-4">Bar chart</h2>
        <StackedBarChartComponent data={filteredData} />
      </div>
      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500">
        <h2 className="text-xl font-bold text-center mb-4">Pie chart</h2>
        <PieChartComponent data={filteredData} />
      </div>
    </>
  );
};

export default StatisticsChart;
