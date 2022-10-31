import "./FilterCheckbox.css";

function FilterCheckbox({ isShortMovie, onClick, route }) {
  
  function handleClick() {
    onClick(route);
  }

  return (
    <div className="filter">
      <button
        type="button"
        className={`filter__checkbox ${isShortMovie && "filter__checkbox_active"}`}
        onClick={handleClick}
      >
        <div
          className={`filter__checkbox-circle ${isShortMovie && "filter__checkbox-circle_active"}`}
        ></div>
      </button>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
