'use client';
import React, { useContext, memo, useMemo, useEffect, useState } from 'react';
import { AppContext } from '../../providers/context';
import { useBooleanToggle } from '../../hooks';
import { LOCALES } from '../../providers/i18n';
import { saveToStorage } from '../../utils/localStorage';
import { FormattedMessage } from 'react-intl';
import ButtonDownload from '../../components/ButtonDownload';
import ButtonUpload from '../../components/ButtonUpload';
import ButtonClear from '../../components/ButtonClear';
import { useData } from '../../hooks';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

// const Test = memo(({ data }) => {
//   console.log('rendering'); //
//   return <div>{JSON.stringify(data)}</div>;
// });

const Settings = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status, handleStatusChange } = useBooleanToggle();
  const { downloadTransactions, uploadTransactions, clearDatabase } = useData();
  // const [isAdvancedSettingsShown, setIsAdvancedSettingsShown] = useState(false);
  const currencyHandler = (e) => {
    dispatch({ type: 'changeCurrency', currency: e.target.value });
    saveToStorage('currency', e.target.value);
  };

  const onChangeLocale = (e) => {
    dispatch({ type: 'setLocal', locale: e.target.value });
    saveToStorage('locale', e.target.value);
  };

  // const data = useMemo(() => [2], []);

  const handleDecimalToggle = () => {
    const newValue = !state.showDecimals;
    dispatch({ type: 'setShowDecimals', showDecimals: newValue });
    saveToStorage('showDecimals', newValue);
  };

  useEffect(() => {
    const savedDecimals = JSON.parse(localStorage.getItem('showDecimals'));
    if (savedDecimals !== null) {
      dispatch({ type: 'setShowDecimals', showDecimals: savedDecimals });
    }
  }, [dispatch]);

  const confirmDelete = () => {
    clearDatabase();
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mx-[2%] mt-12">
        {' '}
        <FormattedMessage id="settings.settings" />
      </h1>
      {/* <Test data={data} /> */}
      <div className="m-4 ">
        <form action="">
          <div className="my-2">
            <label htmlFor="selector" className="text-gray-500 ">
              <FormattedMessage id="settings.currency" />
              <select
                name="currency"
                value={state.currency}
                onChange={currencyHandler}
                id="selector"
                className="inline-flex w-36 justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 ml-1"
              >
                <option value="UAH">hryvna</option>
                <option value="USD">dollar</option>
                <option value="EUR">euro</option>
                <option value="CZK">koruna</option>
              </select>
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="selector" className="text-gray-500 ">
              <FormattedMessage id="settings.language" />
              <select
                name="locate"
                value={state.locale}
                onChange={onChangeLocale}
                id="selectorTwo"
                className="inline-flex w-36 justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 ml-1"
              >
                <option value={LOCALES.ENGLISH}>English</option>
                <option value={LOCALES.UKRAINIAN}>Українська</option>
                <option value={LOCALES.CZECH}>Čeština</option>
              </select>
            </label>
          </div>
          <ul className="space-y-2 list-none">
            <li>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={state.showDecimals}
                  onChange={handleDecimalToggle}
                  className="form-checkbox text-blue-600"
                />
                <FormattedMessage id="settings.decimal" />
              </label>
            </li>
          </ul>
        </form>
      </div>
      <div className="m-4">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 my-1 border-2 border-blue-500 hover:border-transparent rounded mb-4"
          onClick={handleStatusChange}
        >
          <FormattedMessage id="settings.extended" />
        </button>

        {status ? (
          <div className="">
            <ul className="space-y-2 list-none">
              <li>
                <ButtonUpload
                  buttonName={<FormattedMessage id="settings.upload" />}
                  uploadTransactions={uploadTransactions}
                  title="upload (add) transactions from a JSON file"
                />
              </li>
              <li>
                <ButtonDownload
                  buttonName={<FormattedMessage id="settings.download" />}
                  downloadTransactions={downloadTransactions}
                  title="download all the transactions in a JSON file"
                />
              </li>
              <li>
                <ButtonClear
                  buttonName={<FormattedMessage id="settings.clear" />}
                  title="remove all the transactions"
                  clearDatabase={() => {
                    setIsModalOpen(true);
                  }}
                />
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        caption="captionDB"
      />
    </div>
  );
};

export default Settings;
