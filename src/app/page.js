'use client';
import { Component } from 'react';
import Balance from '@/components/Balance';
import Transactions from '@/components/Transactions';
import Form from '@/components/Form';
import Logo from '@/components/Logo';
import ErrorBoundary from '@/components/ErrorBoundary';
import { open, getItems, addItem } from '../../src/utils/inexdb';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      transactions: [],
      loading: true,
    };
    this.onChange = this.onChange.bind(this);
    console.log('constructor');
  }

  componentDidMount() {
    open()
      .then(() => {
        this.setState({
          loading: false,
        });
        return getItems();
      })
      .then((transactions) => {
        const balance = transactions.reduce((sum, t) => sum + t.value, 0);
        this.setState({ transactions, balance });
      })
      .catch((e) => {
        console.error('Error fetching transactions:', e);
      });
  }

  onChange = ({ value, date, comment }) => {
    const transaction = {
      value: +value,
      comment,
      date,
      id: Date.now(),
    };
    this.setState((state) => ({
      balance: state.balance + +value,
      transactions: [transaction, ...state.transactions],
    }));
    addItem(transaction);
  };

  render() {
    if (this.state.loading) {
      return <div className="">Loading...</div>;
    }

    console.log('render'); //
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <ErrorBoundary fallback={<p>Something went wrong...</p>}>
            <Logo />
          </ErrorBoundary>
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
