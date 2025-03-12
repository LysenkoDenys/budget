const ButtonUpload = ({ buttonName, uploadTransactions, title }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadTransactions(file); // Directly pass the file to be handled properly
    }
  };

  return (
    <label
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 my-1 border border-blue-500 hover:border-transparent rounded text-sm cursor-pointer"
      title={title}
    >
      {buttonName}
      <input
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default ButtonUpload;
