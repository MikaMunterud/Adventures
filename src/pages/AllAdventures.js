import AdventureCard from "../components/AdventureCard";
import "../sass/filterBar.scss";
import "../sass/AllAdventures.scss";

export default function AllAdventures({ sortedAdventures }) {
  return (
    <main>
      <h2>All Adventures</h2>
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
    </main>
  );
}
