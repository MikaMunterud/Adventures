import { useState, useEffect } from "react";
import { ImFilter } from "react-icons/im";
import AdventureCard from "../components/AdventureCard";

import RadioButton from "../components/filter/RadioButton";
import Selector from "../components/filter/Selector";
import Checks from "../components/filter/Checks";
import RangeDays from "../components/filter/RangeDays";
import "../sass/filterBar.scss";
import "../sass/AllAdventures.scss";

export default function AllAdventures() {
  const [adventures, setAdventures] = useState([]);
  const [continents, setContinents] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("startDate");
  const [showContinent, setShowContinent] = useState({
    Africa: true,
    Oceania: true,
    "Central America": true,
    "Central Asia": true,
    "East & Southeast Asia": true,
    Europe: true,
    "Middle East": true,
    "North America": true,
    "South America": true,
    "South Asia": true,
  });
  const [filterMinDays, setFilterMinDays] = useState(0);
  const [filterMaxDays, setFilterMaxDays] = useState(100);

  useEffect(function () {
    /* this fetches the data that contains all adventures and when the response is ok
     * an array is created that contains all the total days value for all adventures.
     * That array is then used to set the filter, min-value and max-value for all days.
     */
    async function getAdventures() {
      /*
       *  If this repo is locally used with JSON Server, this fetch should be
       * used instead to make the changes work correctly.
       * const response = await fetch("http://localhost:3002/adventures");
       */

      const response = await fetch(
        "https://mikamunterud.github.io/data/adventures.json"
      );
      if (response.ok) {
        const adventures = await response.json();
        setAdventures(adventures);
        const array = [];

        adventures.forEach(function (adventure) {
          array.push(adventure.totalDays);
        });

        const minValue = array.reduce(function (a, b) {
          return Math.min(a, b);
        });
        const maxValue = array.reduce(function (a, b) {
          return Math.max(a, b);
        });

        setFilterMinDays(minValue);
        setFilterMaxDays(maxValue);
      }
    }

    getAdventures();

    /* this fetches the data that contains all continents/ countries and
     * creates a new array of only the names of the continents and adds them
     * into the variable 'continents'.
     *
     * If this repo is locally used with JSON Server, this fetch should be
     * used instead to make the changes work correctly.
     * const response = await fetch("http://localhost:3002/continents");
     */
    async function getContinents() {
      const response = await fetch(
        "https://mikamunterud.github.io/data/continents.json"
      );
      if (response.ok) {
        const continentsList = await response.json();
        const array = [];

        continentsList.forEach(function (continent) {
          array.push(continent.continent);
        });
        setContinents(array);
      }
    }
    getContinents();
  }, []);

  function showFilterMenu(event) {
    const filterMenu = document.querySelector(".filterBar");
    const menuBar = document.querySelector(".navBar__box");

    filterMenu.style.visibility = "visible";
    filterMenu.style.opacity = "1";
    menuBar.style.visibility = "hidden";
    menuBar.style.opacity = "0";
  }

  function hideFilterBar() {
    const menuBar = document.querySelector(".filterBar");
    menuBar.style.visibility = "hidden";
    menuBar.style.opacity = "0";
  }

  const filteredContinents = continents.filter(function (continent) {
    return showContinent[continent];
  });

  const filteredAdventuresByContinent = adventures.filter(function (adventure) {
    return adventure.continent.find(function (continent) {
      return filteredContinents.includes(continent);
    });
  });

  const filteredAdventuresByDays = filteredAdventuresByContinent.filter(
    function (adventure) {
      return (
        adventure.totalDays >= filterMinDays &&
        adventure.totalDays <= filterMaxDays
      );
    }
  );

  let sortOnAdventures = [];

  // eslint-disable-next-line default-case
  switch (sortField) {
    case "startDate":
      sortOnAdventures = filteredAdventuresByDays.sort(function (a, b) {
        return a.startDate.localeCompare(b.startDate);
      });
      break;
    case "totalDays":
      sortOnAdventures = filteredAdventuresByDays.sort(function (a, b) {
        return a.totalDays - b.totalDays;
      });
      break;
    case "name":
      sortOnAdventures = filteredAdventuresByDays.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      break;
  }

  let sortedAdventures = [];

  if (sortDirection === "asc") {
    sortedAdventures = sortOnAdventures;
  } else {
    sortedAdventures = sortOnAdventures.reverse();
  }

  /*
  const message = document.querySelector(".errorMessage");
  if (filteredAdventuresByDays.length === 0) {
    message.style.visibility = "visible";
    message.style.opacity = "1";
  } else {
    message.style.visibility = "hidden";
    message.style.opacity = "0";
  }
*/

  return (
    <>
      <h2>All Adventures</h2>
      <div
        className="filterButton"
        onClick={function (event) {
          showFilterMenu(event);
        }}
        onMouseOver={showFilterMenu}
      >
        <span className="imageButton__message" data-hover="Filter Adventures">
          <ImFilter className="imageButton" />
        </span>
      </div>

      <div
        className="filterBar"
        onMouseLeave={hideFilterBar}
        onMouseOver={showFilterMenu}
      >
        <h3 className="filterBar_heading">Filter adventures</h3>
        <RadioButton
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />

        <Selector sortField={sortField} setSortField={setSortField} />

        <Checks
          showContinent={showContinent}
          setShowContinent={setShowContinent}
          continents={continents}
        />

        <RangeDays
          filterMinDays={filterMinDays}
          setFilterMinDays={setFilterMinDays}
          filterMaxDays={filterMaxDays}
          setFilterMaxDays={setFilterMaxDays}
        />
      </div>

      <section className="allAdventures">
        {sortedAdventures.map(function (adventure, index) {
          const startYear = adventure.startDate.substring(
            0,
            adventure.startDate.indexOf("-")
          );

          return (
            <AdventureCard
              key={index}
              adventure={adventure}
              startYear={startYear}
            />
          );
        })}
      </section>
      <p className="errorMessage">No Adventures match your filter...</p>
    </>
  );
}
