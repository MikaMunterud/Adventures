import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import "../sass/SingleAdventure.scss";

export default function SingleAdventure() {
  const { id } = useParams();
  const [adventure, setAdventure] = useState("not_loaded");
  const navigate = useNavigate();
  useEffect(
    function () {
      async function getAdventure() {
        /* If this repo is locally used with JSON Server, this fetch should
         * make the changes work correctly.
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

        if (response.ok) {
          const adventure = await response.json();

          /* This part is added to make it possible to show a single adventure without
           * using JSON server.
           * If this repo is used locally with JSON server replace the below with only
           * setAdventure(adventure);
           */

          if (
            response.url !==
            "https://mikamunterud.github.io/data/adventures.json"
          ) {
            setAdventure(adventure);
          } else {
            const singleAdventure = adventure.find(function (adventure) {
              return adventure.id === id;
            });
            setAdventure(singleAdventure);
          }
        } else {
          setAdventure(null);
        }
      }

      getAdventure();
    },
    [id]
  );

  async function deleteAdventure() {
    const deleteMessage = window.confirm(
      `Are you sure you want to delete adventure ${adventure.name}`
    );

    if (deleteMessage) {
      let response = null;
      try {
        response = await fetch(`http://localhost:3030/adventures/${id}`, {
          method: "DELETE",
        });
      } catch (FetchError) {
        alert(
          'JSON server is not active, clone this repository and run "npm run dev" if you want to be able to change the data content.'
        );
      }

      if (response.ok) {
        // navigate("/Adventures/all");
        window.location.href = "/Adventures/all";
      } else {
        alert(`Deletion of adventure ${adventure.name} could not be made`);
      }
    } else {
      alert(`Deletion of adventure ${adventure.name} has been cancelled`);
    }
  }

  if (adventure === "not_loaded") {
    return null;
  }

  if (!adventure) {
    return <h2>Adventure does not exist!</h2>;
  }

  const startYear = adventure.startDate.substring(
    0,
    adventure.startDate.indexOf("-")
  );

  return (
    <main>
      <h2 className="singleAdventure__heading">
        {" "}
        {`${adventure.name} ${startYear}`}
      </h2>
      <section className="singleAdventure">
        <div className="singleAdventure__icons">
          <div className="edit">
            <span className="imageButton__message" data-hover="Edit adventure">
              <Link to={`/Adventures/edit/${adventure.id}`}>
                <MdOutlineSettings className="imageButton" />
              </Link>
            </span>
          </div>
          <div className="delete">
            <span
              className="imageButton__message"
              data-hover="Delete adventure"
            >
              <MdDeleteOutline
                className="imageButton"
                onClick={deleteAdventure}
              />
            </span>
          </div>
        </div>

        <div className="singleAdventure__length">
          <p className="singleAdventure__length__days">
            <strong>Total days: </strong>
            {adventure.totalDays}
          </p>
          <p className="singleAdventure__length__dates">
            {`${adventure.startDate} - ${adventure.endDate}`}
          </p>
        </div>
        <p className="singleAdventure__description">{adventure.description}</p>
        <div className="singleAdventure__images">
          {adventure.images.map(function (image, index) {
            return (
              <img
                className={`singleAdventure__images__image${index + 1}`}
                key={index}
                src={`${image}`}
                alt={`Adventure ${adventure.name} ${startYear}`}
              ></img>
            );
          })}
        </div>
        <div className="singleAdventure__info">
          <details className="singleAdventure__info__details">
            <summary className="singleAdventure__info__details__heading">
              Continent <IoAirplaneOutline className="airplane" />
            </summary>
            {adventure.continent.map(function (name, index) {
              return (
                <p
                  className="singleAdventure__info__details__content"
                  key={index}
                >
                  {name}
                </p>
              );
            })}
          </details>
          <details className="singleAdventure__info__details">
            <summary className="singleAdventure__info__details__heading">
              Countries <IoAirplaneOutline className="airplane" />
            </summary>

            {adventure.countries.map(function (country, index) {
              return (
                <p
                  className="singleAdventure__info__details__content"
                  key={index}
                >
                  {country}
                </p>
              );
            })}
          </details>
        </div>
      </section>
    </main>
  );
}
