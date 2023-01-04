export default function CountriesList({ object }) {
  return (
    <ul>
      {object.map(function (countries) {
        return (
          <>
            <li key={countries.country}>{countries.country}</li>
          </>
        );
      })}
    </ul>
  );
}
