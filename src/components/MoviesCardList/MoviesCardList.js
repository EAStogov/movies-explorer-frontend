import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({moviesList}) {
  return(
    <section className="movies">
      <ul className="movies__card-list">
        {moviesList.map(movie => {
          return (
            <MoviesCard 
              name={movie.name} 
              duration={movie.duration}
              image={movie.image}
              key={movie.id}
              saved={movie.saved}
            />
          )
        })}
      </ul>
      <button className="movies__more">Еще</button>
    </section>
  );
}

export default MoviesCardList;