'use client';
import React, { useContext } from 'react';
import { AppContext } from '../../providers/context';

const Test = ({ onClick }) => {
  console.log('rendering'); //
  return <button onClick={onClick}>Click me!</button>;
};

const Settings = () => {
  const { state, dispatch } = useContext(AppContext);
  const currencyHandler = (e) => {
    dispatch({ type: 'changeCurrency', currency: e.target.value });
  };
  const onClick = () => {
    console.log('Parent click'); //
  };

  return (
    <>
      <h1 className="text-4xl m-[1%]">Settings</h1>
      <Test onClick={onClick} />
      <div className="m-[1%]">
        <form action="">
          <label htmlFor="selector" className="text-gray-500 ">
            Currency:
            <select
              name="currency"
              value={state.currency}
              onChange={currencyHandler}
              id="selector"
              className="inline-flex w-36 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 ml-1"
            >
              <option value="UAH">hryvna</option>
              <option value="USD">dollar</option>
              <option value="EUR">euro</option>
            </select>
          </label>
        </form>
      </div>
    </>
  );
};

export default Settings;
