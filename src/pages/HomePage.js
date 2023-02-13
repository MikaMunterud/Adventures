import { useState, useEffect } from "react";
import TotalCountriesList from "../components/TotalCountriesList";
import CalculateCountries from "../components/CalculateCountries";

import "../sass/WorldMap.scss";
import "../sass/Buttons.scss";

export default function HomePage() {
  const [countryList, setCountryList] = useState([]);
  const [countriesVisitedList, setCountryVisitedList] = useState([]);
  const [checkedCountry, setCheckedCountry] = useState([]);
  const [countriesAmount, setCountriesAmount] = useState();
  const [countriesVisitedAmount, setCountriesVisitedAmount] = useState();

  useEffect(function () {
    async function getCountryList() {
      let response = null;
      /* If this repo is locally used with JSON Server, this first fetch should
       * make the changes work correctly.
       * const response = await fetch("http://localhost:3030/continents");
       */
      try {
        response = await fetch("http://localhost:3030/continents");
      } catch (FetchError) {
        console.log(
          'JSON server is not active, clone this repository and run "npm run dev"'
        );
      }
      try {
        response = await fetch(
          "https://mikamunterud.github.io/data/continents.json"
        );
      } catch (FetchError) {
        console.log(
          "Could not fetch data, please check your internet connection."
        );
      }

      if (response.ok) {
        const countryList = await response.json();

        setCountryList(countryList);

        const countriesVisited = countryList.map(function (continent) {
          return {
            continent: continent.continent,
            countries: continent.countries.filter(function (country) {
              return country.visited;
            }),
          };
        });

        setCountryVisitedList(getCountriesVisited(countriesVisited));
        setCountriesAmount(CalculateCountries(countryList));
      } else {
        setCountryList(null);
      }
    }
    getCountryList();
  }, []);

  useEffect(
    function () {
      function getCountriesVisited() {
        const countriesArray = [];

        countriesVisitedList.forEach(function (continent) {
          continent.countries.forEach(function (country) {
            countriesArray.push(country.country);
          });
        });

        setCheckedCountry(countriesArray);
        setCountriesVisitedAmount(countriesArray.length);
      }

      getCountriesVisited();
    },
    [countriesVisitedList]
  );

  function getCountriesVisited(continentList) {
    return continentList.map(function (continent) {
      return {
        continent: continent.continent,
        countries: continent.countries.filter(function (country) {
          return country.visited;
        }),
      };
    });
  }

  function openContinentLists() {
    const continentLists = document.querySelectorAll(".continentListContainer");
    continentLists.forEach(function (list) {
      list.setAttribute("open", "");
    });
  }

  function closeContinentLists() {
    const continentLists = document.querySelectorAll(".continentListContainer");
    continentLists.forEach(function (list) {
      list.removeAttribute("open");
    });
  }

  function handleCheckChange(event) {
    if (event.target.checked) {
      const countriesVisited = countryList.map(function (continent) {
        return {
          continent: continent.continent,
          countries: continent.countries.map(function (country) {
            return country.country === event.target.value
              ? { ...country, visited: true }
              : country;
          }),
        };
      });

      setCountryList(countriesVisited);
      setCountryVisitedList(getCountriesVisited(countriesVisited));
    } else {
      const countriesVisited = countryList.map(function (continent) {
        return {
          continent: continent.continent,
          countries: continent.countries.map(function (country) {
            return country.country === event.target.value
              ? { ...country, visited: false }
              : country;
          }),
        };
      });

      setCountryList(countriesVisited);

      setCountryVisitedList(getCountriesVisited(countriesVisited));
    }
  }

  // const visitedCountriesAmount = setCountriesVisitedAmount(
  //   CountriesVisited(countriesVisitedAmount)
  // );

  return (
    <main className="WorldMap">
      <h2>{`Countries visited ${countriesVisitedAmount}/${countriesAmount}`}</h2>

      <div>
        <button type="button" onClick={openContinentLists}>
          {"Open all tabs"}
        </button>

        <button type="button" onClick={closeContinentLists}>
          {"Close all tabs"}
        </button>
      </div>

      <TotalCountriesList
        countryList={countryList}
        visitedList={countriesVisitedList}
        checkedCountry={checkedCountry}
        handleCheckChange={handleCheckChange}
      />
    </main>
  );
}
