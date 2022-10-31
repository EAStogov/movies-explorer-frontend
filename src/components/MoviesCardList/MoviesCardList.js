import "./MoviesCardList.css";
import {  useEffect, useState } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList, isSavedMovies, handleLike, handleDislike, route }) {
  const [moviesBlock, setMoviesBlock] = useState([]);
  const [windowWidth, setWindowWidth] = useState(undefined);

  function handleButtonClick() {
    setMoviesBlock(moviesList.slice(0, moviesBlock.length + (windowWidth > 500 ? 7 : 5)));
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSavedMovies) {
      setMoviesBlock(moviesList.slice(0, moviesList.length));
    } else {
      moviesBlock.length = 0;
      setMoviesBlock(moviesList.slice(0, moviesBlock.length + (windowWidth > 500 ? 7 : 5)));
    }
  }, [moviesList]);

  return (
    <section className="movies">
      <ul className="movies__card-list">
        {moviesBlock.length !== 0 && moviesBlock.map((movie) => {
          return (
            <MoviesCard
              name={movie.nameRU}
              duration={movie.duration}
              image={isSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
              key={movie.id ? movie.id : movie._id}
              movie={movie}
              handleLike={handleLike}
              handleDislike={handleDislike}
              route={route}
            />
          );
        })}
      </ul>
      <button
        type="button"
        className={`page__button movies__more ${
          (isSavedMovies || moviesBlock.length === 0 || moviesBlock.length === moviesList.length) &&
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
