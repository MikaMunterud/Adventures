import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addImageInput from "../components/form/addImageInput";
import removeImageInput from "../components/form/removeImageInput";

import "../sass/AddNewAdventure.scss";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { IoAirplaneOutline } from "react-icons/io5";

export default function EditAdventure() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState("not_loaded");

  const [name, setName] = useState("");
  const [nameLength, setNameLength] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [images, setImages] = useState([]);
  const [continentsChecked, setContinentsChecked] = useState([]);
  const [countriesChecked, setCountriesChecked] = useState([]);
  const imageKeys = [
    "image_1",
    "image_2",
    "image_3",
    "image_4",
    "image_5",
    "image_6",
  ];

  const [continentList, setContinentList] = useState([]);
  const [adventureList, setAdventureList] = useState([]);

  useEffect(
    function () {
      async function getAdventure() {
        /* If this repo is locally used with JSON Server, this fetch should be
         * used instead to make the changes work correctly.
         * const response = await fetch(`http://localhost:3030/adventures/${id}`);
         */
        let response = null;
        try {
          response = await fetch(`http://localhost:3030/adventures/${id}`);
        } catch (FetchError) {
          console.log(
            'JSON server is not active, clone this repository and run "npm run dev"'
          );
          try {
            response = await fetch(
              "https://mikamunterud.github.io/data/adventures.json"
            );
          } catch (FetchError) {
            console.log(
              "Could not fetch data, please check your internet connection."
            );
          }
        }
        /* This part is added to make it possible to show a single adventure without
         * using JSON server.
         * If this repo is used locally with JSON server the adventure can be edited.
         * Otherwise it can only be shown in the editing mode.
         */
        if (response.ok) {
          let adventure = null;
          if (
            response.url !==
            "https://mikamunterud.github.io/data/adventures.json"
          ) {
            adventure = await response.json();
          } else {
            const data = await response.json();
            adventure = data.find(function (adventure) {
              return adventure.id === id;
            });
          }

          setAdventure(adventure);
          setName(adventure.name);
          setNameLength(adventure.name.length);
          setStartDate(adventure.startDate);
          setStartYear(
            adventure.startDate.substring(0, adventure.startDate.indexOf("-"))
          );
          setImages(adventure.images);
          setEndDate(adventure.endDate);
          setDescription(adventure.description);
          setDescriptionLength(adventure.description.length);
          setCountryList(adventure.countries);
        } else {
          setAdventure(null);
        }
      }

      getAdventure();
    },
    [id]
  );

  useEffect(function () {
    async function getContinentList() {
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
        try {
          response = await fetch(
            "https://mikamunterud.github.io/data/continents.json"
          );
        } catch (FetchError) {
          console.log(
            "Could not fetch data, please check your internet connection."
          );
        }
      }

      if (response.ok) {
        const continentList = await response.json();
        setContinentList(continentList);
      }
    }

    getContinentList();
  }, []);

  useEffect(function () {
    async function getAdventureList() {
      let response = null;
      /* If this repo is locally used with JSON Server, this first fetch should
       * make the changes work correctly.
       * const response = await fetch("http://localhost:3030/adventures");
       */
      try {
        response = await fetch("http://localhost:3030/adventures");
      } catch (FetchError) {
        console.log(
          'JSON server is not active, clone this repository and run "npm run dev"'
        );
        try {
          response = await fetch(
            "https://mikamunterud.github.io/data/adventures.json"
          );
        } catch (FetchError) {
          console.log(
            "Could not fetch data, please check your internet connection."
          );
        }
      }

      if (response.ok) {
        const adventureList = await response.json();
        setAdventureList(adventureList);
      }
    }

    getAdventureList();
  }, []);

  useEffect(
    function () {
      function getContinents() {
        const countriesCheckedList = continentList.map(function (continent) {
          return {
            continent: continent.continent,
            countries: continent.countries.filter(function (country) {
              return countryList.includes(country.country);
            }),
          };
        });

        const continentCheckedList = countriesCheckedList.filter(function (
          continent
        ) {
          return continent.countries.length > 0;
        });

        const continentArray = [];
        const countriesArray = [];

        continentCheckedList.forEach(function (continent) {
          continentArray.push(continent.continent);
          continent.countries.forEach(function (country) {
            countriesArray.push(country.country);
          });
        });
        setContinentsChecked(continentArray);
        setCountriesChecked(countriesArray);
      }
      getContinents();
    },
    [countryList, continentList]
  );

  function getImages() {
    const imageInputs = document.querySelectorAll(
      ".adventureImages__input__image"
    );
    const array = [];

    for (let index = 0; index < imageInputs.length; index++) {
      if (imageInputs[index].value !== "") {
        array.push(imageInputs[index].value);
      }
    }
    setImages(array);
  }

  function handleCountriesChecked(event) {
    if (event.target.checked) {
      setCountryList([...countryList, event.target.value]);
    } else {
      setCountryList(
        countryList.filter(function (country) {
          return country !== event.target.value;
        })
      );
    }
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    const adventuresDates = adventureList.find(function (adventure) {
      return adventure.startDate === startDate;
    });

    if (!adventuresDates || adventuresDates.id === adventure.id) {
      const replaceNameSpaces = name.trim().replace(/\s/g, "_");
      const newId = replaceNameSpaces + "_" + startDate;
      const totalDays = Math.ceil(
        Math.abs(Date.parse(endDate) - Date.parse(startDate)) /
          (1000 * 60 * 60 * 24) +
          1,
        10
      );

      const newAdventure = {
        id: newId,
        name: name.trim(),
        continent: continentsChecked,
        startDate: startDate,
        endDate: endDate,
        totalDays: totalDays,
        description: description.trim(),
        images: images,
        countries: countriesChecked,
      };
      let response = null;
      try {
        response = await fetch(`http://localhost:3030/adventures/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newAdventure),
        });
      } catch {
        alert(
          'JSON server is not active, clone this repository and run "npm run dev" if you wish to edit the data.'
        );
        return;
      }

      if (response.ok) {
        navigate(`/adventures/${adventure.id}`);
      } else {
        alert("Something went wrong, adventure has not been edited!");
      }
    } else {
      alert(
        `Start date ${startDate} already exists for another adventure, please double check your inputted date!`
      );
    }
  };

  if (adventure === "not_loaded") {
    return null;
  }
  if (!adventure) {
    return <h2>Adventure does not exist!</h2>;
  }

  return (
    <main>
      <h2>{`Edit ${name} ${startYear}`}</h2>
      <form className="addAdventureForm" onSubmit={handleSubmit}>
        <div className="adventureName">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            maxLength={30}
            placeholder="Maximum 30 characters"
            value={name}
            onChange={function (event) {
              setName(event.target.value);
              setNameLength(event.target.value.length);
            }}
            required
          />
          <p>{`${nameLength}/30`}</p>
        </div>

        <div className="dates">
          <div className="dates__date">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={function (event) {
                setStartDate(event.target.value);
              }}
              required
            />
          </div>
          <div className="dates__date">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              min={startDate}
              onChange={function (event) {
                setEndDate(event.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="adventureDescription">
          <label htmlFor="description">Description</label>
          <p>{`${descriptionLength}/500`}</p>
          <textarea
            id="description"
            rows={6}
            maxLength={500}
            placeholder="Maximum 500 characters"
            value={description}
            onChange={function (event) {
              setDescription(event.target.value);
              setDescriptionLength(event.target.value.length);
            }}
            required
          />
        </div>

        <div className="adventureImages">
          <div className="adventureImages__label">
            <label htmlFor="images">Images</label>
            <div className="adventureImages__label__icon">
              <span className="imageButton__message" data-hover="add image">
                <RiImageAddLine
                  className="imageButton"
                  onClick={function (event) {
                    addImageInput(images, setImages);
                  }}
                />
              </span>
            </div>

            <div className="adventureImages__label__icon">
              <span className="imageButton__message" data-hover="remove image">
                <MdOutlineImageNotSupported
                  className="imageButton"
                  onClick={function (event) {
                    removeImageInput(images, setImages);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="adventureImages__input">
            {images.map(function (value, index) {
              return (
                <input
                  id="images"
                  key={index}
                  className="adventureImages__input__image"
                  type="text"
                  placeholder="Image url only!"
                  name={imageKeys[index]}
                  onChange={getImages}
                  value={value}
                  required
                />
              );
            })}
          </div>
          <p className="imageMessage"></p>
        </div>

        <div className="continentCheckboxes">
          {continentList.map(function (continent, index) {
            return (
              <div key={index} className="continentCheckboxes__continent">
                <details>
                  <summary className="continentSummary">
                    {continent.continent}

                    <IoAirplaneOutline className="airplane" />
                  </summary>
                  <div
                    className="countryList"
                    id={`containerFor_${continent.continent}`}
                  >
                    {continent.countries.map(function (country, index) {
                      const isChecked = countryList.find(function (item) {
                        return country.country === item;
                      });
                      return (
                        <div key={index} className="countryRow">
                          <input
                            type="checkbox"
                            id={country.country}
                            value={country.country}
                            onChange={function (event) {
                              handleCountriesChecked(event);
                            }}
                            checked={!!isChecked}
                          />
                          <label htmlFor={country.country}>
                            {country.country}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
        <button className="adventureFormSubmitButton">Edit adventure!</button>
      </form>
    </main>
  );
}
