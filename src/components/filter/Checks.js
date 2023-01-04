import { IoAirplaneOutline } from "react-icons/io5";

export default function Checks({
  showContinent,
  setShowContinent,
  continents,
}) {
  function handleCheckChange(event) {
    setShowContinent({
      ...showContinent,
      [event.target.name]: event.target.checked,
    });
  }

  return (
    <div className="filterContinents">
      <details className="filterContinents__details">
        <summary className="filterContinents__details__heading main_label">
          <label htmlFor="filter-continents">Filter by Continents</label>
          <IoAirplaneOutline className="airplane" />
        </summary>
        <div className="filterContinents__details__content">
          {continents.map(function (continent, index) {
            return (
              <div
                key={index}
                className="filterContinents__details__content__item"
              >
                <input
                  type="checkbox"
                  id={continent}
                  name={continent}
                  onChange={handleCheckChange}
                  checked={showContinent[continent]}
                />
                <label htmlFor={continent}>{continent}</label>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
