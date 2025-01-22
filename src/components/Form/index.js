'use client';
import { useState } from 'react';

const Form = (props) => {
  const [form, setForm] = useState({
    value: '',
    date: new Date().toISOString().substring(0, 10) || '',
    comment: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    props.onChange(form);
    setForm({
      ...form,
      value: '',
      comment: '',
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    // or:
    // const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center gap-2 flex-wrap items-stretch "
    >
      <label htmlFor="value">Sum</label>
      <input
        type="number"
        name="value"
        id="value"
        placeholder="Sum"
        onChange={onChange}
        value={form.value}
        className="w-full sm:w-20 md:w-30 lg:w-40 py-2.5 px-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg"
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={onChange}
        className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-20 md:w-28 lg:w-36"
      />
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        id="comment"
        value={form.comment}
        placeholder="Purpose"
        onChange={onChange}
        className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-60 md:w-72 lg:w-80"
      ></textarea>
      <button className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
        Save
      </button>
    </form>
  );
};

export default Form;
