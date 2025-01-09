'use client';
import User from '../components/User/index';
import { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Maxim',
      date: Date.now().toLocaleString(),
      age: 27,
    };
  }
  render() {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Hello Next!</h1>
          <User
            name={this.state.name}
            age={this.state.age}
            time={this.state.date}
          />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    );
  }
}
