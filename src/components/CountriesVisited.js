export default function CountriesVisited(objectList) {
  const countriesVisited = objectList.map(function (continent) {
    return {
      continent: continent.continent,
      countries: continent.countries.filter(function (country) {
        return country.visited;
      }),
    };
  });
  return countriesVisited;
}
/*

  * This is another way of filtering the countries visited list

  function getTotalCountriesVisited() {
    let countriesVisited = countryList.map(function (continent) {
      return {
        ...continent,
        countries: continent.countries.filter(function (country) {
          return country.visited === true;
        }),
      };
    });
*/
