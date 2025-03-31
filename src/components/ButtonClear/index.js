const ButtonClear = ({ buttonName, clearDatabase, title }) => {
  return (
    <label
      className="bg-transparent hover:bg-red-500 text-red-400 font-semibold hover:text-white py-1 px-2 my-1 border border-red-500 hover:border-transparent rounded text-sm cursor-pointer"
      title={title}
    >
      {buttonName}
      <input className="hidden" onClick={clearDatabase} />
    </label>
  );
};

export default ButtonClear;
