import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ moviesList, onChangeRoute, searchKeywords, isShortMovie, onChangeKeywords, handleFilterClick, route, onSubmit, isRequestLoading, isNotFound, ...props }) {

  useEffect(() => {
    onChangeRoute(route);
  }, [route])

  return(
    <>
      <SearchForm route={route} searchKeywords={searchKeywords} isShortMovie={isShortMovie} onChangeKeywords={onChangeKeywords} handleFilterClick={handleFilterClick} onSubmit={onSubmit} />
      {isRequestLoading 
        ? <Preloader />
        : isNotFound 
          ? <p className="movies__message-not-found">Ничего не найдено</p>
          : <MoviesCardList moviesList={moviesList} {...props} />}
    </>
  );
}

export default Movies;