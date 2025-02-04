'use client';
import { useState } from 'react';

const list = new Array(20).fill(0).map(() => {
  return `Item - ${Math.random()}`;
});

const List = (props) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const Statistics = () => {
  const [n, setN] = useState(0);
  return (
    <div className="m-2">
      <List />
      <div className="">Clicked {n} times</div>
      <button
        onClick={() => {
          return setN(n + 1);
        }}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
             rounded-full px-2 text-sm shadow-xl flex items-center justify-center 
             transition-all duration-300 transform hover:scale-110 hover:shadow-2xl 
             active:scale-95 active:shadow-md opacity-70"
      >
        Click me
      </button>
    </div>
  );
};

export default Statistics;
