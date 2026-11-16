import { useCallback, memo } from "react";
import type { ProductsQuery } from "entities/product";

import { SORT_OPTIONS } from "./const";

import "./ProductFilters.css";

/** Свойства фильтров */
interface ProductFiltersProps {
  /** Текущие параметры запроса */
  query: ProductsQuery;
  /** Обработчик изменения фильтров */
  onChange: (query: ProductsQuery) => void;
}

/** Фильтры каталога: поиск, цена, сортировка */
const ProductFilters = memo(function ProductFilters({ query, onChange }: ProductFiltersProps) {
  const handleChange = useCallback(
    (field: keyof ProductsQuery, value: string) => {
      onChange({ ...query, [field]: value || undefined });
    },
    [query, onChange],
  );

  return (
    <div className="filters">
      <input
        type="text"
        className="filters__input"
        placeholder="Поиск по названию и описанию"
        value={query.searchTerm || ""}
        onChange={(e) => handleChange("searchTerm", e.target.value)}
      />

      <div className="filters__row">
        <input
          type="number"
          className="filters__input"
          placeholder="Мин. цена"
          value={query.minPrice || ""}
          onChange={(e) => handleChange("minPrice", e.target.value)}
        />

        <input
          type="number"
          className="filters__input"
          placeholder="Макс. цена"
          value={query.maxPrice || ""}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
        />
      </div>

      <div className="filters__row">
        <select
          className="filters__select"
          value={query.sort || ""}
          onChange={(e) => handleChange("sort", e.target.value)}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default ProductFilters;
