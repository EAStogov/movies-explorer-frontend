import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return(
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  );
}

export default Movies;