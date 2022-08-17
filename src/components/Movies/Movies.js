import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies({ onChangeRoute, route, ...props }) {
  useEffect(() => {
    onChangeRoute(route);
  })
  return(
    <>
      <SearchForm />
      <MoviesCardList {...props} />
    </>
  );
}

export default Movies;