export default function RadioButton({ sortDirection, setSortDirection }) {
  function handleSortDirectionChange(event) {
    setSortDirection(event.target.value);
  }

  return (
    <div className="sortDirection">
      <label className="main_label" htmlFor="sorting-direction">
        Sort Direction
      </label>
      <div className="sortDirection_radio" onChange={handleSortDirectionChange}>
        <div className="sortDirection_radio_options">
          <input
            type={"radio"}
            name="sorting-direction"
            id="asc"
            value="asc"
            defaultChecked
          />
          <label htmlFor="asc">Ascending</label>
        </div>
        <div className="sortDirection_radio_options">
          <input
            type={"radio"}
            name="sorting-direction"
            id="desc"
            value="desc"
          />
          <label htmlFor="desc">Descending</label>
        </div>
      </div>
    </div>
  );
}
