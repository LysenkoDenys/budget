'use client';
import React from 'react';
import currencyContext from './context';

export default function CurrencyProvider({ children }) {
  const currency = {
    value: 'UAH',
    title: 'hryvna',
  };

  return (
    <currencyContext.Provider value={currency}>
      {children}
    </currencyContext.Provider>
  );
}
