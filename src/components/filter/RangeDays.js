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
    setMinValue(filterMinDays);
    setMaxValue(filterMaxDays);
  }, []);

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
/**
 * import MultiRangeSlider from "./component/multiRangeSlider/MultiRangeSlider";
import "./styles.css";

const App = () => {
  return (
    <MultiRangeSlider
      min={0}
      max={10}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
  );
};

export default App;
 * 
 * 
 * 
 * import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;

 */
