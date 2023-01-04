import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TotalCountriesList from "./TotalCountriesList";
import CalculateCountries from "./CalculateCountries";
import CountriesVisited from "./CountriesVisited";

export default function WorldMap() {
  const [countryList, setCountryList] = useState([]);

  useEffect(function () {
    async function getCountryList() {
      const response = await fetch("http://localhost:3002/continents");
      if (response.ok) {
        const countryList = await response.json();
        setCountryList(countryList);
      }
    }
    getCountryList(countryList);
  }, []);

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

  const totalCountriesAmount = CalculateCountries(countryList);
  const countriesVisitedList = CountriesVisited(countryList);
  const countriesVisitedAmount = CalculateCountries(countriesVisitedList);

  if (!countryList) {
    return null;
  }

  return (
    <div className="WorldMap">
      <h2>{`Countries visited ${countriesVisitedAmount}/${totalCountriesAmount}`}</h2>
      {/* <img
        className="WorldMap__image"
        src="/images/WorldMap.jpg"
        alt="World map marked with countries been"
      ></img> */}
      <button type="button" onClick={openContinentLists}>
        {"Open all tabs"}
      </button>

      <button type="button" onClick={closeContinentLists}>
        {"Close all tabs"}
      </button>

      <Link className="editContinentList" to={"/visited_countries/editor"}>
        Edit countries visited
      </Link>

      <TotalCountriesList
        countryList={countryList}
        visitedList={countriesVisitedList}
      />
    </div>
  );
}

/*
  const countryList = JSON.parse(localStorage.getItem("countriesList"));
  const myData = JSON.parse(localStorage.getItem("myCountries"));
  const continentList = countryList.map(function (continents) {
    return continents.continent;
  });

  const countriesList = countryList.map(function (countries) {
    return countries.countries.filter(function (country) {
      return country.visited === true;
    });
  });

  continentList.forEach(function (continent) {
    countriesList.forEach(function (countries) {
      const newData = {
        continent: continent,
        countries: [countries],
      };
      addData(myData, newData);
    });
  });

  for (let index = 0; index < continentList.length; index++) {
    let newData = {
      continent: continentList[index],
      countries: countriesList[index],
    };

    addData(myData, newData);
  }

  function addData(myData, data) {
    myData.push(data);

    localStorage.setItem("myCountries", JSON.stringify(myData));
  }
  */
