import React from 'react';

function LimitSelector({ limit, onChange }) {
  const options = [5, 10, 15, 'All'];

  const handleSelectChange = (e) => {
    const value = e.target.value;
    onChange(value === 'All' ? 'All' : Number(value));
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-700">
      <label htmlFor="limit-select" className="font-medium">Show per page:</label>
      <select
        id="limit-select"
        value={limit}
        onChange={handleSelectChange}
        className="block w-24 rounded-md border-gray-300 py-2 pl-3 pr-8 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LimitSelector; 