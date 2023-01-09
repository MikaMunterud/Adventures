import { IoAirplaneOutline } from "react-icons/io5";
import "../sass/TotalCountriesList.scss";

export default function TotalCountriesList({
  countryList,
  visitedList,
  checkedCountry,
  handleCheckChange,
}) {
  return (
    <section className="totalCountriesList">
      {countryList.map(function (continent, index) {
        return (
          <details key={index} className="continentListContainer">
            <summary className="continentListContainer__continent">
              {`${continent.continent} ${visitedList[index].countries.length}/${continent.countries.length}`}

              <IoAirplaneOutline className="airplane" />
            </summary>
            <table className="continentListContainer__table">
              <thead>
                <tr>
                  <th className={`col_1 label`}>Country</th>
                  <th className={`col_2 label`}>Flag</th>
                  <th className={`col_3 label`}>Visited</th>
                </tr>
              </thead>
              <tbody>
                {continent.countries.map(function (country, index) {
                  const isChecked = checkedCountry.find(function (item) {
                    return country.country === item;
                  });
                  return (
                    <tr key={index}>
                      <td className={`col_1 country`}>{country.country}</td>
                      <td className={`col_2 country`}>{country.flag}</td>
                      <td className={`col_3 country`}>
                        <input
                          type="checkbox"
                          id={country.country}
                          value={country.country}
                          onChange={function (event) {
                            handleCheckChange(event);
                          }}
                          checked={!!isChecked}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </details>
        );
      })}
    </section>
  );
}
