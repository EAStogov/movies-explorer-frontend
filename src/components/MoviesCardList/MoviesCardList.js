import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  return (
    <section className="movies">
      <ul className="movies__card-list">
        {moviesList.map((movie) => {
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
      <button type="button" className="page__button movies__more">
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
