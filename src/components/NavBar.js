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

export default function NavBar() {
  const location = useLocation().pathname;

  function showMenuBar() {
    const menuBar = document.querySelector(".navBar__box");
    const filterMenu = document.querySelector(".filterBar");

    menuBar.style.visibility = "visible";
    menuBar.style.opacity = "1";
    if (location === "/adventures") {
      filterMenu.style.visibility = "hidden";
      filterMenu.style.opacity = "0";
    }
  }

  if (location === "/adventures") {
  }

  function hideMenuBar() {
    const menuBar = document.querySelector(".navBar__box");
    menuBar.style.visibility = "hidden";
    menuBar.style.opacity = "0";
  }

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

  return (
    <nav className="navBar">
      <div className="navBar__head">
        <SlMenu
          className="menuButton"
          onClick={showMenuBar}
          onMouseOver={showMenuBar}
        />

        <h1>Mika's Adventures!</h1>

        <a
          className="instagram"
          target={"blank"}
          href="https://www.instagram.com/onegirlexploringtheworld/"
        >
          <SiInstagram className="instagram_icon" />
        </a>
      </div>
      <div
        className="navBar__box"
        onMouseLeave={hideMenuBar}
        onMouseOver={showMenuBar}
      >
        <ul className="navBar__box__option">
          <li>
            <Link to="/visited_countries">Countries</Link>
          </li>
          <li>
            <Link to="/adventures">All adventures</Link>
          </li>
          <li>
            <Link to="/adventure/new">Add adventure</Link>
          </li>
        </ul>
      </div>

      {/* <div
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
      </div> */}
    </nav>
  );
}
