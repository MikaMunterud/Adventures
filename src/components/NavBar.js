import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { SiInstagram } from "react-icons/si";
import { ImFilter } from "react-icons/im";
import RadioButton from "../components/filter/RadioButton";
import Selector from "../components/filter/Selector";
import Checks from "../components/filter/Checks";
import RangeDays from "../components/filter/RangeDays";
import "../sass/filterBar.scss";
import "../sass/NavBar.scss";

export default function NavBar({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  showContinent,
  setShowContinent,
  continents,
  filterMinDays,
  setFilterMinDays,
  filterMaxDays,
  setFilterMaxDays,
}) {
  const location = useLocation().pathname;
  const [visibleFilterButton, setVisibleFilterButton] = useState(false);
  useEffect(function () {
    function checkVisibleFilterBar() {
      if (location === "/Adventures/all") {
        setVisibleFilterButton(true);
      } else {
        setVisibleFilterButton(false);
      }
    }
    checkVisibleFilterBar();
  });

  function showMenuBar(event) {
    console.log(event.target.value);
    const menuBar = document.querySelector(".navBar__box");
    const filterMenu = document.querySelector(".filterBar");

    if (menuBar.style.visibility === "visible") {
      hideMenuBar();
    } else {
      menuBar.style.visibility = "visible";
      menuBar.style.opacity = "1";
    }

    if (location === "/Adventures/all") {
      filterMenu.style.visibility = "hidden";
      filterMenu.style.opacity = "0";
    }
  }

  function hideMenuBar() {
    const menuBar = document.querySelector(".navBar__box");
    menuBar.style.visibility = "hidden";
    menuBar.style.opacity = "0";
  }

  function showFilterMenu() {
    const filterMenu = document.querySelector(".filterBar");
    const menuBar = document.querySelector(".navBar__box");

    if (filterMenu.style.visibility === "visible") {
      hideFilterBar();
    } else {
      filterMenu.style.visibility = "visible";
      filterMenu.style.opacity = "1";
      menuBar.style.visibility = "hidden";
      menuBar.style.opacity = "0";
    }
  }

  function hideFilterBar() {
    const menuBar = document.querySelector(".filterBar");
    menuBar.style.visibility = "hidden";
    menuBar.style.opacity = "0";
  }

  return (
    <nav className="navBar">
      <div className="navBar__head">
        <SlMenu
          className="menuButton"
          onClick={function (event) {
            event.preventDefault();
            showMenuBar(event);
          }}
        />

        {visibleFilterButton && (
          <div
            className="filterButton"
            onClick={function (event) {
              showFilterMenu(event);
            }}
          >
            <span
              className="imageButton__message"
              data-hover="Filter Adventures"
            >
              <ImFilter className="imageButton" />
            </span>
          </div>
        )}
        <h1>Mika's Adventures!</h1>

        <a
          className="instagram"
          target={"blank"}
          href="https://www.instagram.com/onegirlexploringtheworld/"
        >
          <SiInstagram className="instagram_icon" />
        </a>
      </div>
      <div className="navBar__box" onMouseLeave={hideMenuBar}>
        <ul className="navBar__box__option">
          <li onClick={hideMenuBar}>
            <Link to="/Adventures/visited_countries">Countries</Link>
          </li>
          <li onClick={hideMenuBar}>
            <Link to="/Adventures/all">All adventures</Link>
          </li>
          <li onClick={hideMenuBar}>
            <Link to="/Adventures/new">Add adventure</Link>
          </li>
        </ul>
      </div>
      <div className="filterBar" onMouseLeave={hideFilterBar}>
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
    </nav>
  );
}
