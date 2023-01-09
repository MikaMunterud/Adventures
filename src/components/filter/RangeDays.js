import { useState, useEffect } from "react";
export default function RangeDays({
  filterMinDays,
  setFilterMinDays,
  filterMaxDays,
  setFilterMaxDays,
}) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  useEffect(function () {
    function getMinMaxDays() {
      if (minValue === 0 && maxValue === 100) {
        setMinValue(filterMinDays);
        setMaxValue(filterMaxDays);
      }
    }
    getMinMaxDays();
  });

  function handleFilterMin(event) {
    setFilterMinDays(event.target.value);
  }

  function handleFilterMax(event) {
    setFilterMaxDays(event.target.value);
  }

  return (
    <div className="filterDays">
      <label className="main_label" htmlFor="filter-days">
        Filter by Days
      </label>
      <div className="min-max-slider">
        <div className="min-max-slider__filter">
          <label htmlFor="min">Minimum days</label>
          <input
            id="min"
            className="min"
            name="min"
            type="range"
            step="1"
            min={minValue}
            max={maxValue - 1}
            value={filterMinDays}
            onChange={function (event) {
              handleFilterMin(event);
            }}
          />
          <span className="min-max-slider__value min">{filterMinDays}</span>
        </div>
        <div className="min-max-slider__filter">
          <label htmlFor="max">Maximum days</label>
          <input
            id="max"
            className="max"
            name="max"
            type="range"
            step="1"
            min={minValue + 1}
            max={maxValue}
            value={filterMaxDays}
            onChange={function (event) {
              handleFilterMax(event);
            }}
          />
          <span className="min-max-slider__value max">{filterMaxDays}</span>
        </div>
      </div>
    </div>
  );
}
