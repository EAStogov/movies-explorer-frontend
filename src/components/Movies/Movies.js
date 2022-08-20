import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ onChangeRoute, searchKeywords, isShortMovie, onChangeKeywords, handleSubmitSearch, handleFilterClick, route, ...props }) {
  useEffect(() => {
    onChangeRoute(route);
  })
  return(
    <>
      <SearchForm searchKeywords={searchKeywords} isShortMovie={isShortMovie} onChangeKeywords={onChangeKeywords} handleSubmitSearch={handleSubmitSearch} handleFilterClick={handleFilterClick} />
      <MoviesCardList {...props} />
    </>
  );
}

export default Movies;