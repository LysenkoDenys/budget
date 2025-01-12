'use client';
import { Component } from 'react';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();

    this.props.onChange(this.state.value);
  };

  onChange = (e) => {
    const { value } = e.target;
    // or:
    // const value = e.target.value;

    this.setState({ value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="number"
          name="balance"
          placeholder="Sum"
          onChange={this.onChange}
          value={this.state.value}
          className="py-2.5 px-5 mr-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-lg">
          Save
        </button>
      </form>
    );
  }
}

export default Form;
