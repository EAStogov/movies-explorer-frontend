import "./SearchForm.css";
import searchIcon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { useState } from "react";

function SearchForm({ route, searchKeywords, isShortMovie, onChangeKeywords, handleFilterClick, onSubmit}) {
  const [isValid, setIsValid] = useState(true);

  function handleSubmitButtonClick(e) {
    e.preventDefault();
    if (searchKeywords === '') {
      setIsValid(false);
    } else {
      onSubmit(isShortMovie, searchKeywords);
    }
  }

  function handleInputChange(e) {
    onChangeKeywords(e.target.value)
    if (searchKeywords !== '') {
      setIsValid(true);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitButtonClick}>
        <img className="search__icon" src={searchIcon} alt="Поиск" />
        <input className={`search__input ${!isValid && 'search__input_invalid'}`} value={searchKeywords} onChange={handleInputChange} placeholder={`${isValid ? "Фильм" : "Нужно ввести ключевое слово"}`} />
        <button type="submit" className="page__button search__submit-button"></button>
      </form>
      <FilterCheckbox route={route} isShortMovie={isShortMovie} onClick={handleFilterClick}/>
    </section>
  );
}

export default SearchForm;
