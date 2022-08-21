import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";

function MoviesCardList({ moviesList }) {
  const [moviesBlock, setMoviesBlock] = useState([]);

  function handleButtonClick() {
    setMoviesBlock(moviesList.slice(0, moviesBlock.length + 7));
  }

  useEffect(() => {
    moviesBlock.length = 0;
    setMoviesBlock(moviesList.slice(0, moviesBlock.length + 7));
  }, [moviesList]);

  return (
    <section className="movies">
      <ul className="movies__card-list">
        {moviesBlock.map((movie) => {
          return (
            <MoviesCard
              name={movie.nameRU}
              duration={movie.duration}
              image={`https://api.nomoreparties.co/${movie.image.url}`}
              key={movie.id}
              saved={movie.saved}
            />
          );
        })}
      </ul>
      <button
        type="button"
        className={`page__button movies__more ${
          (moviesBlock.length === 0 || moviesBlock.length === moviesList.length) &&
          "movies__more_hidden"
        }`}
        onClick={handleButtonClick}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
