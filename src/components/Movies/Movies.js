import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ moviesList, onChangeRoute, searchKeywords, isShortMovie, onChangeKeywords, handleFilterClick, route, onSubmit, ...props }) {

  useEffect(() => {
    onChangeRoute(route);
  }, [route])

  return(
    <>
      <SearchForm searchKeywords={searchKeywords} isShortMovie={isShortMovie} onChangeKeywords={onChangeKeywords} handleFilterClick={handleFilterClick} onSubmit={onSubmit} />
      <MoviesCardList moviesList={moviesList} {...props} />
    </>
  );
}

export default Movies;