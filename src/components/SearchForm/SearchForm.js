import "./SearchForm.css";
import searchIcon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ route, searchKeywords, isShortMovie, onChangeKeywords, handleFilterClick, onSubmit}) {

  function handleSubmitButtonClick(e) {
    e.preventDefault();
    onSubmit(isShortMovie, searchKeywords);
  }

  function handleInputChange(e) {
    onChangeKeywords(e.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitButtonClick}>
        <img className="search__icon" src={searchIcon} alt="Поиск" />
        <input className="search__input" value={searchKeywords} onChange={handleInputChange} placeholder="Фильм" required />
        <button type="submit" className="page__button search__submit-button"></button>
      </form>
      <FilterCheckbox route={route} isShortMovie={isShortMovie} onClick={handleFilterClick}/>
    </section>
  );
}

export default SearchForm;
