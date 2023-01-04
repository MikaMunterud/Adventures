export default function ContinentCountryLength({ object, continentName }) {
  const continent = object.find(function (list) {
    return list.continent === continentName;
  });
}
