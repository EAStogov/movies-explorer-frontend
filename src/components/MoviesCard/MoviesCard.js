import { useEffect, useState } from "react";
// import { likeMovie, deleteMovie } from "../../utils/MainApi";
import "./MoviesCard.css";

function MoviesCard({ name, duration, image, saved, movie, handleLike, handleDislike }) {
  const [isSaved, setIsSaved] = useState(false);

  const moviesArray = JSON.parse(localStorage.savedMovies);

  useEffect(() => {
    const savedMovie = moviesArray.find((movieItem) => {
      return movieItem.movieId === movie.id || movieItem.owner === movie.owner;
    })
    if (savedMovie !== undefined) {
      setIsSaved(true);
    }
  }, [])

  

  function toggleLike() {
    if (!isSaved) {
      Promise.resolve(handleLike(movie))
        .then(() => {
          setIsSaved(!isSaved);
        })
    } else {
      Promise.resolve(handleDislike(movie))
        .then(res => {
          setIsSaved(!isSaved);
        })
    }
  }
  return (
    <li className="movie-card">
      <div className="movie-card__container">
        <h2 className="movie-card__title">{name}</h2>
        <p className="movie-card__duration">{duration < 60 ? `${duration}м` : `${Math.floor(duration / 60)}ч ${duration % 60}м` }</p>
        <button
          type="button"
          className={`page__button movie-card__like ${isSaved && "movie-card__like_active"} ${
            window.location.href === "http://localhost:3000/saved-movies" && "movie-card__remove"
          }`}
          onClick={toggleLike}
        ></button>
      </div>
      <img className="movie-card__image" src={image} alt={name} />
    </li>
  );
}

export default MoviesCard;
