'use client';
import { Component } from 'react';
import Balance from '@/components/Balance';
import Transactions from '@/components/Transactions';
import Form from '@/components/Form';

let id = 0;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      transactions: [],
    };
    this.onChange = this.onChange.bind(this);
    console.log('constructor');
  }

  onChange = (value) => {
    this.setState((state) => ({
      balance: state.balance + +value,
      transactions: [
        { value, label: 'change', id: ++id },
        ...state.transactions,
      ],
    }));
  };

  render() {
    console.log('render'); //
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Balance balance={this.state.balance} />
          <Form onChange={this.onChange} />
          <hr />
          <Transactions transactions={this.state.transactions} />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    );
  }
}
