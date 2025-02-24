'use client';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const Form = (props) => {
  console.log(props); //
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
        className="flex justify-center gap-2 flex-wrap items-stretch "
        role="form"
      >
        <label htmlFor="date">
          <FormattedMessage id="form.date" />
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={onChange}
          className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-20 md:w-28 lg:w-36 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label htmlFor="value">
          <FormattedMessage id="form.sum" />
        </label>
        <input
          type="number"
          name="value"
          id="value"
          placeholder={intl.formatMessage({ id: 'form.sum' })}
          onChange={onChange}
          value={form.value}
          className="w-full sm:w-20 md:w-30 lg:w-40 py-2.5 px-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg"
        />
        <label htmlFor="value">
          <FormattedMessage id="form.category" />
        </label>
        <input
          type="radio"
          name="value"
          id="value"
          onChange={onChange}
          value={form.value}
          className="w-full sm:w-20 md:w-30 lg:w-40 py-2.5 px-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg"
        />
        <label htmlFor="comment">
          <FormattedMessage id="form.comment" />
        </label>
        <textarea
          name="comment"
          id="comment"
          value={form.comment}
          placeholder={intl.formatMessage({ id: 'form.purpose' })}
          onChange={onChange}
          className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-60 md:w-72 lg:w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <button className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
          <FormattedMessage id="form.save" />
        </button>
      </form>
    </>
  );
};

export default Form;
