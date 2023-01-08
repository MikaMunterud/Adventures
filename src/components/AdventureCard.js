import { Link } from "react-router-dom";
import { IoAirplaneOutline } from "react-icons/io5";
export default function AdventureCard({ adventure, startYear }) {
  return (
    <div className="allAdventures__adventure">
      <h3 className="allAdventures__adventure__heading">
        {" "}
        {`${adventure.name} ${startYear}`}
      </h3>

      <p className="allAdventures__adventure__dates">
        {`${adventure.startDate} - ${adventure.endDate}`}
      </p>
      <p className="allAdventures__adventure__days">
        <strong>Total days: </strong>
        {adventure.totalDays}
      </p>
      <img
        className="allAdventures__adventure__image"
        src={`.${adventure.images[0]}`}
        alt={`Adventure ${adventure.name} ${startYear}`}
      ></img>
      <Link
        className="allAdventures__adventure__link"
        to={`/adventures/${adventure.id}`}
      >
        More details
        <IoAirplaneOutline className="airplane" />
      </Link>
    </div>
  );
}
