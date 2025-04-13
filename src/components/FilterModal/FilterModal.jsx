const FilterModal = ({ isOpen, onClose, onApplyFilter, currentFilters }) => {
  const handleApply = () => {
    onApplyFilter(currentFilters); // передаємо поточні фільтри назад
    onClose(); // Закриваємо модалку після застосування
  };

  const handleStarToggle = () => {
    // Змінюємо тільки фільтр "starOnly" у переданому об'єкті фільтрів
    onApplyFilter({
      ...currentFilters,
      starOnly: !currentFilters.starOnly,
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="flex justify-end gap-4">
            <button onClick={onClose} className="bg-gray-300 p-2 rounded">
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
