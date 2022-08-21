import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";

function MoviesCardList({ moviesList }) {
  const [moviesBlock, setMoviesBlock] = useState([]);
  const windowWidth = useWindowSize();

  function handleButtonClick() {
    setMoviesBlock(moviesList.slice(0, moviesBlock.length + (windowWidth > 500 ? 7 : 5)));
  }

  useEffect(() => {
    moviesBlock.length = 0;
    setMoviesBlock(moviesList.slice(0, moviesBlock.length + (windowWidth > 500 ? 7 : 5)));
  }, [moviesList]);

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}

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
