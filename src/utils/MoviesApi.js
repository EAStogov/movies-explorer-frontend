class MoviesApi {
  constructor(options) {
    this._baseURL = options.url;
    this._headers = options.headers;
  }

  _makeRequest(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      }
    });
  }

  getMovies() {
    return this._makeRequest(fetch(this._baseURL, {
      method: 'GET',
      headers: this._headers
    }))
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default moviesApi;
