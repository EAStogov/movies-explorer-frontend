import "./SearchForm.css";
import searchIcon from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import moviesApi from "../../utils/MoviesApi";
import findAllRightMovies from "../../utils/MoviesFilter";

function SearchForm({ searchKeywords, isShortMovie, onChangeKeywords, handleSubmitSearch, handleFilterClick}) {

  function handleSubmitButtonClick(e) {
    e.preventDefault();
    moviesApi.getMovies()
      .then(res => {
        handleSubmitSearch(findAllRightMovies(res, isShortMovie, searchKeywords));
      })
      .catch((err) => {
        console.log(err);
      })
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
      <FilterCheckbox isShortMovie={isShortMovie} onClick={handleFilterClick}/>
    </section>
  );
}

export default SearchForm;
