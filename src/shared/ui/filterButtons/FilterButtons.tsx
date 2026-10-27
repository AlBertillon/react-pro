export type Filter = "all" | "completed" | "incomplete";

export interface FilterButtonsProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "completed", label: "Выполненные" },
  { value: "incomplete", label: "Невыполненные" },
];

export function FilterButtons({ filter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="task-filter">
      {FILTER_OPTIONS.map(({ value, label }) => {
        const isActive = value === filter;
        return (
          <button
            key={value}
            className={isActive ? "task-filter-btn active" : "task-filter-btn"}
            onClick={() => onFilterChange(value)}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
