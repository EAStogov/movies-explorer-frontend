import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(true);
  function toggleCheck() {
    setIsChecked(!isChecked);
  }
  return (
    <div className="filter">
      <button
        className={`filter__checkbox ${isChecked && "filter__checkbox_active"}`}
        onClick={toggleCheck}
      >
        <div
          className={`filter__checkbox-circle ${isChecked && "filter__checkbox-circle_active"}`}
        ></div>
      </button>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
