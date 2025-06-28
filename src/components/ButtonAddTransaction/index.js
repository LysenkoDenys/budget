import React from 'react';

const ButtonAddTransaction = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
      rounded-full fixed bottom-8 right-8 text-5xl shadow-xl flex items-center justify-center 
      transition-all duration-300 transform hover:scale-110 hover:shadow-2xl 
      active:scale-95 active:shadow-md dark:opacity-70 z-10"
  >
    +
  </button>
);

export default ButtonAddTransaction;
