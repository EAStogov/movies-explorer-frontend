import "./SearchForm.css";
import searchIcon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return(
    <section className="search">
      <form className="search__form">
        <img className="search__icon" src={searchIcon} alt="Поиск"/>
        <input className="search__input" placeholder="Фильм" />
        <button className="search__submit-button"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;