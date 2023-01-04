import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TotalCountriesList from "../components/TotalCountriesList";
import "../sass/WorldMap.scss";
import "../sass/Buttons.scss";

export default function EditCountriesList() {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [countriesVisitedList, setCountryVisitedList] = useState([]);
  const [checkedCountry, setCheckedCountry] = useState([]);

  useEffect(function () {
    async function getCountryList() {
      const response = await fetch("http://localhost:3002/continents");
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
      console.log(countriesVisited);
      handleCountriesList(countriesVisited);
      /*
      setCountryList(countriesVisited);
      setCountryVisitedList(getCountriesVisited(countriesVisited));
      */
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
      console.log(countriesVisited);
      /*
      setCountryList(countriesVisited);

      setCountryVisitedList(getCountriesVisited(countriesVisited));
      */
    }
  }

  async function handleCountriesList(continentList) {
    const response = await fetch("http://localhost:3002/continents", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(continentList),
    });

    if (response.ok) {
      navigate("/visited_countries");
    } else {
      alert("Something went wrong, continent list has not been edited!");
    }
  }

  return (
    <section className="WorldMap">
      <h2>{"Edit Countries Visited"}</h2>

      <button type="button" onClick={openContinentLists}>
        {"Open all tabs"}
      </button>

      <button type="button" onClick={closeContinentLists}>
        {"Close all tabs"}
      </button>

      <TotalCountriesList
        countryList={countryList}
        visitedList={countriesVisitedList}
        checkedCountry={checkedCountry}
        handleCheckChange={handleCheckChange}
      />
    </section>
  );
}
