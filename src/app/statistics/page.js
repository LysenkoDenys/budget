'use client';
import { useState, memo, useMemo } from 'react';

const list = new Array(20).fill(0).map(() => {
  return `Item - ${Math.random()}`;
});

const ListComponent = (props) => {
  const [filter, setFilter] = useState('');

  const filteredList = list.filter((item) => item.includes(filter));

  return (
    <>
      <label htmlFor="filter">filter:</label>
      <input
        type="text"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
export const List = memo(ListComponent);

const Statistics = () => {
  const [n, setN] = useState(0);

  return (
    <div className="m-2">
      <List list={list} />
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
