'use client';
import { Component } from 'react';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      date: new Date().toISOString().substring(0, 10) || '',
      comment: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();

    this.props.onChange(this.state);
    this.setState({
      value: '',
      comment: '',
    });
  };

  onChange = (e) => {
    const { value, name } = e.target;
    // or:
    // const value = e.target.value;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="flex justify-center gap-2 flex-wrap items-stretch "
      >
        <input
          type="number"
          name="value"
          placeholder="Sum"
          onChange={this.onChange}
          value={this.state.value}
          className="w-full sm:w-20 md:w-30 lg:w-40 py-2.5 px-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg"
        />
        <input
          type="date"
          name="date"
          value={this.state.date}
          onChange={this.onChange}
          className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-20 md:w-28 lg:w-36"
        />
        <textarea
          name="comment"
          value={this.state.comment}
          onChange={this.onChange}
          className="min-h-16 p-1 shadow-lg rounded-lg border border-gray-200 w-full sm:w-60 md:w-72 lg:w-80"
        ></textarea>
        <button className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
          Save
        </button>
      </form>
    );
  }
}

export default Form;
