export default function CalculateCountries(continentList) {
  function getTotalCountriesAmount() {
    const totalCountriesList = continentList.map(function (continent) {
      return continent.countries.length;
    });
    const totalCountries = totalCountriesList.reduce(function (a, b) {
      return a + b;
    }, 0);
    return totalCountries;
  }
  return getTotalCountriesAmount();
}
