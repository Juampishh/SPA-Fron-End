import React from "react";

interface CategoryFilterProps {
  categories: string[];
  onFilterChange: (value: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <label
        htmlFor="category"
        className="mb-2 text-lg font-semibold text-gray-800"
      >
        Filtrar por categoría
      </label>
      <select
        id="category"
        className="w-full max-w-xs p-3 text-gray-800 placeholder-gray-500 transition duration-200 ease-in-out bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
