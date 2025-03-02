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

  // Populate form if editing
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
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategorySelect = (category) => {
    setForm({ ...form, category });
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
        className="min-h-10 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-18 md:w-22 lg:w-32 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:hover:text-white text-gray-700 hover:text-gray-900 "
      />

      <input
        type="number"
        name="value"
        id="value"
        placeholder={intl.formatMessage({ id: 'form.sum' })}
        onChange={handleChange}
        value={form.value}
        className="w-full sm:w-18 md:w-22 lg:w-32 py-1 px-1 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg"
      />

      {/* Category Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 shadow-lg dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
          {form.category || <FormattedMessage id="form.category" />}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-500 ring-1 shadow-lg ring-black/5 focus:outline-hidden">
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
                    className={`block px-4 py-0 text-sm text-gray-700 dark:text-white ${
                      active ? 'bg-gray-100 text-gray-900' : ''
                    }`}
                  >
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
        className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-60 md:w-72 lg:w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>

      <button className="py-1 px-1 text-lg font-medium text-gray-900 focus:outline-none bg-green-300 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
        <FormattedMessage id={initialData ? 'form.update' : 'form.save'} />
      </button>
    </form>
  );
};

export default Form;
