import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AllAdventures from "./pages/AllAdventures";
import SingleAdventure from "./pages/SingleAdventure";
import AddNewAdventure from "./pages/AddNewAdventure";
import EditAdventure from "./pages/EditAdventure";
import EditCountriesList from "./pages/EditCountriesList";
import "./sass/App.scss";
function App() {
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

  return (
    <BrowserRouter>
      <NavBar
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        showContinent={showContinent}
        setShowContinent={setShowContinent}
        continents={continents}
        filterMinDays={filterMinDays}
        setFilterMinDays={setFilterMinDays}
        filterMaxDays={filterMaxDays}
        setFilterMaxDays={setFilterMaxDays}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Adventures/" element={<HomePage />} />
        <Route path="/Adventures/visited_countries" element={<HomePage />} />
        <Route
          path="/Adventures/all"
          element={<AllAdventures sortedAdventures={sortedAdventures} />}
        />
        <Route path="/Adventures/:id" element={<SingleAdventure />} />
        <Route path="/Adventures/edit/:id" element={<EditAdventure />} />
        <Route path="/Adventures/new" element={<AddNewAdventure />} />
        <Route
          path="./visited_countries/edit"
          element={<EditCountriesList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
