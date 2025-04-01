const ButtonDownload = ({ buttonName, downloadTransactions, title }) => (
  <button
    onClick={downloadTransactions}
    className="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-0.5 px-2 my-1 border-2 border-blue-500 hover:border-transparent rounded text-sm"
    title={title}
  >
    {buttonName}
  </button>
);

export default ButtonDownload;
