import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function RadioOption({ sortMap, setSortMap }) {
  const handleSortMapChange = function (event) {
    setSortMap(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Show countries list</FormLabel>
      <RadioGroup
        name="sorting-map"
        value={sortMap}
        onChange={handleSortMapChange}
      >
        <FormControlLabel
          value="allCountries"
          control={<Radio />}
          label="All countries"
        />
        <FormControlLabel
          value="visitedCountries"
          control={<Radio />}
          label="Visited countries"
        />
      </RadioGroup>
    </FormControl>
  );
}
