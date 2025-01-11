'use client';
import { Component } from 'react';
import Balance from '@/components/Balance';
import Transactions from '@/components/Transactions';

let id = 0;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      transactions: [],
    };
    this.onIncrease = this.onIncrease.bind(this);
    console.log('constructor');
  }

  onIncrease() {
    this.setState((state) => ({
      balance: state.balance + 1,
      transactions: [
        { label: 'increase', value: 1, id: ++id },
        ...state.transactions,
      ],
    }));
  }

  onDecrease = () => {
    this.setState((state) => ({
      balance: state.balance - 1,
      transactions: [
        { label: 'decrease', value: -1, id: ++id },
        ...state.transactions,
      ],
    }));
  };

  render() {
    console.log('render'); //
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Hello Next!</h1>
          <Balance balance={this.state.balance} />
          <button onClick={this.onIncrease}>increment</button>
          <button onClick={this.onDecrease}>decrement</button>
          <hr />
          <Transactions transactions={this.state.transactions} />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    );
  }
}
