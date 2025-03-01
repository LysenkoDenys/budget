'use client';
import React, { useContext, memo, useMemo, useState } from 'react';
import { AppContext } from '../../providers/context';
import { useBooleanToggle } from '../../hooks';
import { LOCALES } from '../../providers/i18n';
import { saveToStorage } from '../../utils/localStorage';

// const Test = memo(({ data }) => {
//   console.log('rendering'); //
//   return <div>{JSON.stringify(data)}</div>;
// });

const Settings = () => {
  const { state, dispatch } = useContext(AppContext);
  const { status, handleStatusChange } = useBooleanToggle();
  // const [isAdvancedSettingsShown, setIsAdvancedSettingsShown] = useState(false);
  const currencyHandler = (e) => {
    dispatch({ type: 'changeCurrency', currency: e.target.value });
    saveToStorage('currency', e.target.value);
  };

  const onChangeLocale = (e) => {
    dispatch({ type: 'setLocal', locale: e.target.value });
    saveToStorage('locale', e.target.value);
  };

  const data = useMemo(() => [2], []);

  return (
    <>
      <h1 className="text-4xl mx-[2%] mt-12">Settings</h1>
      {/* <Test data={data} /> */}
      <div className="m-4">
        <form action="">
          <div className="my-2">
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
                <option value="CZK">koruna</option>
              </select>
            </label>
          </div>
          <div className="my-1">
            <label htmlFor="selector" className="text-gray-500 ">
              Language:
              <select
                name="locate"
                value={state.locate}
                onChange={onChangeLocale}
                id="selectorTwo"
                className="inline-flex w-36 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 ml-1"
              >
                <option value={LOCALES.ENGLISH}>English</option>
                <option value={LOCALES.UKRAINIAN}>Українська</option>
                <option value={LOCALES.CZECH}>Čeština</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      <div className="m-4">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 my-1 border border-blue-500 hover:border-transparent rounded"
          onClick={handleStatusChange}
        >
          Extended settings
        </button>
        {status ? (
          <div className="">
            <ul className="space-y-2">
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  Decimal digits in sum
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  Comparing with the plan
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  Another option
                </label>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Settings;
