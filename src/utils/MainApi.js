import { BITMOVIES_URL } from "../constants/config";

export const baseUrl = 'https://api.esto.movie.nomoredomains.xyz';

function _makeRequest(promise) {
  return promise
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
}

export function editProfile(name, email) {
  return _makeRequest(fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  }))
}

export function getMovies() {
  return _makeRequest(fetch(`${baseUrl}/movies`, {
    method: 'GET',
    credentials: 'include'
  }))
}

export function likeMovie(movie) {
  return _makeRequest(fetch(`${baseUrl}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${BITMOVIES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${BITMOVIES_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
  }))
}

export function deleteMovie(id) {
  return _makeRequest(fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  }))
}