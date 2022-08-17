import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  return (
    <section className="movies">
      <ul className="movies__card-list">
        {moviesList.map((movie) => {
          return (
            <MoviesCard
              name={movie.name}
              duration={movie.duration}
              image={movie.image}
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
