import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies(props) {
  return(
    <>
      <SearchForm />
      <MoviesCardList {...props} />
    </>
  );
}

export default Movies;