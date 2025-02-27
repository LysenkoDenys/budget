'use client';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Form = (props) => {
  const [form, setForm] = useState({
    value: '',
    date: new Date().toISOString().substring(0, 10) || '',
    category: '',
    comment: '',
  });

  const intl = useIntl();

  const onSubmit = (e) => {
    e.preventDefault();

    props.onChange(form);
    setForm({
      ...form,
      value: '',
      category: '',
      comment: '',
    });
    props.onClick();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    // or:
    // const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      {/* <FormattedMessage id="hello" /> */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center gap-2 flex-wrap items-stretch "
        role="form"
      >
        {/* <label htmlFor="date">
          <FormattedMessage id="form.date" />
        </label> */}
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={onChange}
          className="min-h-10 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-18 md:w-22 lg:w-32 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:hover:text-white text-gray-700 hover:text-gray-900 "
        />
        {/* <label htmlFor="value">
          <FormattedMessage id="form.sum" />
        </label> */}
        <input
          type="number"
          name="value"
          id="value"
          placeholder={intl.formatMessage({ id: 'form.sum' })}
          onChange={onChange}
          value={form.value}
          className="w-full sm:w-18 md:w-22 lg:w-32 py-1 px-1 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg"
        />

        {/* category: */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:hover:text-white ">
              <FormattedMessage id="form.category" />
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-500 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.income" />
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.food" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.transportation" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.utility" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.communication" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.children" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.health" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.new_things" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.holidays" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.repairs" />
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  <FormattedMessage id="form.other" />
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
        {/* category */}

        {/* <label htmlFor="comment">
          <FormattedMessage id="form.comment" />
        </label> */}
        <textarea
          name="comment"
          id="comment"
          value={form.comment}
          placeholder={intl.formatMessage({ id: 'form.purpose' })}
          onChange={onChange}
          className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-60 md:w-72 lg:w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <button className="py-1 px-1 text-lg font-medium text-gray-900 focus:outline-none bg-green-300 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
          <FormattedMessage id="form.save" />
        </button>
      </form>
    </>
  );
};

export default Form;
