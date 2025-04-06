'use client';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../providers/context';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { open, getData } from '../../utils/indexdb';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
import getDateRange from '../../utils/getDateRange';

const StatisticsChart = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [currentDropdownOpen, setCurrentDropdownOpen] = useState(false);
  const [previousDropdownOpen, setPreviousDropdownOpen] = useState(false);

  const currentDropdownRef = useRef(null);
  const previousDropdownRef = useRef(null);

  const periods = [
    { id: 'year', labelId: 'statistics.year' },
    { id: 'month', labelId: 'statistics.month' },
    { id: 'week', labelId: 'statistics.week' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currentDropdownRef.current &&
        !currentDropdownRef.current.contains(event.target)
      ) {
        setCurrentDropdownOpen(false);
      }
      if (
        previousDropdownRef.current &&
        !previousDropdownRef.current.contains(event.target)
      ) {
        setPreviousDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleDateRangeSelection = (type, period) => {
    const { startDate, endDate } = getDateRange(type, period);
    setStartDate(startDate);
    setEndDate(endDate);

    // Close dropdown after selection
    if (type === 'current') {
      setCurrentDropdownOpen(false);
    } else {
      setPreviousDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currentDropdownRef.current &&
        !currentDropdownRef.current.contains(event.target)
      ) {
        setCurrentDropdownOpen(false);
      }
      if (
        previousDropdownRef.current &&
        !previousDropdownRef.current.contains(event.target)
      ) {
        setPreviousDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCurrentDropdownOpen(false);
        setPreviousDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl mt-12 sm:text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        <FormattedMessage id="statistics.statistics" />
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full mb-2">
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
        {/* Current Period Dropdown */}
        <div
          ref={currentDropdownRef}
          className="relative inline-block text-left"
        >
          <div className="relative inline-block text-left">
            <button
              onClick={() => setCurrentDropdownOpen(!currentDropdownOpen)}
              className={`md:w-auto px-5 py-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium flex items-center justify-between gap-2 shadow-md transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400`}
              aria-expanded={currentDropdownOpen}
            >
              <FormattedMessage id="statistics.current" />
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  currentDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {currentDropdownOpen && (
              <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 transition-all duration-200 transform scale-95 opacity-0 animate-fade-in">
                <div className="py-1">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() =>
                        handleDateRangeSelection('current', period.id)
                      }
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                    >
                      <FormattedMessage id={period.labelId} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Previous Period Dropdown */}
        <div
          ref={previousDropdownRef}
          className="relative inline-block text-left"
        >
          <div className="relative inline-block text-left">
            <button
              onClick={() => setPreviousDropdownOpen(!previousDropdownOpen)}
              className={`md:w-auto px-5 py-1 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium flex items-center justify-between gap-2 shadow-md transition-all duration-300 hover:from-purple-600 hover:to-indigo-600 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400`}
              aria-expanded={previousDropdownOpen}
            >
              <FormattedMessage id="statistics.previous" />
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  previousDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {previousDropdownOpen && (
              <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 transition-all duration-200 transform scale-95 opacity-0 animate-fade-in">
                <div className="py-1">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() =>
                        handleDateRangeSelection('previous', period.id)
                      }
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                    >
                      <FormattedMessage id={period.labelId} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500 mb-2">
        <h2 className="text-xl font-bold text-center mb-2">
          <FormattedMessage id="statistics.pieChart" />
        </h2>
        <PieChartComponent data={filteredData} />
      </div>

      <div className="w-full h-auto p-4 bg-white rounded-2xl shadow-lg dark:bg-gray-500">
        <h2 className="text-xl font-bold text-center">
          <FormattedMessage id="statistics.budgetPer" />
          {startDate && endDate ? (
            <p className="text-sm text-blue-400">
              ({startDate} – {endDate})
            </p>
          ) : (
            ''
          )}
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
