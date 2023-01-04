export default function Selector({ sortField, setSortField }) {
  function handleChange(event) {
    setSortField(event.target.value);
  }

  return (
    <div className="sortOn">
      <label className="main_label" htmlFor="sorting-on">
        Sort On
      </label>
      <select id="sorting-on" value={sortField} onChange={handleChange}>
        <option value="startDate">Date</option>
        <option value="totalDays">Days</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
