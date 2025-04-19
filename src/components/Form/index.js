'use client';
import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Form = ({ initialData, onSave, onClose }) => {
  const [form, setForm] = useState({
    value: '',
    date: new Date().toISOString().substring(0, 10),
    category: '',
    comment: '',
  });

  const intl = useIntl();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      value: '',
      date: new Date().toISOString().substring(0, 10),
      category: '',
      comment: '',
    });
    onClose();
  };

  const handleChange = (e) => {
    let { value, name } = e.target;

    if (name === 'value') {
      value = value.replace(/[^\d.-]/g, '');
      setForm((prevForm) => {
        if (prevForm.category === intl.formatMessage({ id: 'form.income' })) {
          value = value.replace('-', '');
        } else {
          if (value.length > 0 && !value.startsWith('-')) {
            value = `-${value}`;
          }
        }
        return { ...prevForm, [name]: value };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCategorySelect = (category) => {
    setForm((prevForm) => {
      let newValue = prevForm.value;
      if (category === intl.formatMessage({ id: 'form.income' })) {
        newValue = newValue.replace('-', '');
      } else {
        if (newValue.length > 0 && !newValue.startsWith('-')) {
          newValue = `-${newValue}`;
        }
      }
      return { ...prevForm, category, value: newValue };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-2 flex-wrap items-stretch"
      role="form"
    >
      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="min-h-10 p-1 text-lg shadow-lg rounded-lg border border-gray-200 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:hover:text-white text-gray-700 hover:text-gray-900 "
      />

      <input
        type="number"
        name="value"
        id="value"
        autoFocus
        placeholder={intl.formatMessage({ id: 'form.sum' })}
        onChange={handleChange}
        value={form.value}
        className="w-full p-1 h-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg appearance-none"
      />

      {/* Category Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton
          className={`inline-flex gap-x-1.5 rounded-md bg-white p-1  h-10 text-lg font-semibold text-gray-400 hover:text-gray-900 shadow-xs ring-gray-300 hover:bg-gray-50 shadow-lg dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white w-full ${
            form.category
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-400 dark:text-gray-400'
          }`}
        >
          {form.category || <FormattedMessage id="form.category" />}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-500 ring-1 shadow-lg ring-black/5 focus:outline-hidden max-h-48 overflow-y-auto">
          {[
            'income',
            'food',
            'transportation',
            'utility',
            'communication',
            'children',
            'health',
            'new_things',
            'holidays',
            'repairs',
            'other',
          ].map((categoryKey) => (
            <div key={categoryKey} className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() =>
                      handleCategorySelect(
                        intl.formatMessage({ id: `form.${categoryKey}` })
                      )
                    }
                    className={`w-full px-4 py-0 text-base text-gray-700 gap-2 flex items-center dark:text-white ${
                      active ? 'bg-gray-100 text-gray-900' : ''
                    } ${
                      categoryKey === 'income'
                        ? 'bg-green-200 dark:bg-green-700'
                        : ''
                    } `}
                  >
                    {categoryKey === 'income' && <span>💰</span>}
                    {categoryKey === 'food' && <span>🥝</span>}
                    {categoryKey === 'transportation' && <span>🚍</span>}
                    {categoryKey === 'utility' && <span>💡</span>}
                    {categoryKey === 'communication' && <span>📱</span>}
                    {categoryKey === 'children' && <span>⚽</span>}
                    {categoryKey === 'health' && <span>⚕️</span>}
                    {categoryKey === 'new_things' && <span>💎</span>}
                    {categoryKey === 'holidays' && <span>🎁</span>}
                    {categoryKey === 'repairs' && <span>🛠️</span>}
                    {categoryKey === 'other' && <span>🎱</span>}
                    <FormattedMessage id={`form.${categoryKey}`} />
                  </button>
                )}
              </MenuItem>
            </div>
          ))}
        </MenuItems>
      </Menu>

      <textarea
        name="comment"
        id="comment"
        value={form.comment}
        placeholder={intl.formatMessage({ id: 'form.purpose' })}
        onChange={handleChange}
        className="min-h-16 p-1 shadow-lg text-lg rounded-lg border border-gray-200   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>

      <button className="py-1 px-1 text-lg font-medium text-gray-900 focus:outline-none bg-green-300 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-green-800 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-900 shadow-lg">
        <FormattedMessage id={initialData ? 'form.update' : 'form.save'} />
      </button>
    </form>
  );
};

export default Form;
