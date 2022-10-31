import "../../vendor/normalize.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import * as auth from "../../utils/Auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getMovies, likeMovie, deleteMovie, editProfile } from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import findAllRightMovies from "../../utils/MoviesFilter";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(true);
  const [isHeaderAuth, setIsHeaderAuth] = useState(false);
  const [route, setRoute] = useState("");
  const [searchKeywordsAllMovies, setSearchKeywordsAllMovies] = useState('');
  const [searchKeywordsSavedMovies, setSearchKeywordsSavedMovies] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      auth.authorizate()
        .then(res => {
          signIn(res.data);
          getMovies()
            .then(movies => {
              if (movies) {
                localStorage.setItem('savedMovies', JSON.stringify(movies.data));
                localStorage.setItem('/saved-movies', JSON.stringify({movies: movies.data, isShortMovie: false, keywords: ''}));
                localStorage.setItem('/movies', JSON.stringify({movies: [], isShortMovie: false, keywords: ''}))
              }
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          if (err.status === 401) {
            navigate('/');
          }
        })
    }, []);

  function handleFilterClick(route) {
    const data = JSON.parse(localStorage.getItem(route));
    localStorage.setItem(route, JSON.stringify({keywords: data.keywords,
      movies: data.movies,
      isShortMovie: !isShortMovie}))
    // data.isShortMovie = !isShortMovie;
    // JSON.parse(localStorage.getItem(route)).isShortMovie = !isShortMovie;
    setIsShortMovie(!isShortMovie);
  }

  function handleChangeKeywordsAllMovies(value) {
    setSearchKeywordsAllMovies(value);
  }

  function handleChangeKeywordsSavedMovies(value) {
    setSearchKeywordsSavedMovies(value);
  }

  async function handleSubmitSearchMovies(isShortMovie, searchKeywords) {
    setIsRequestLoading(true)
    moviesApi.getMovies()
      .then(movies => {
        const foundMovies = findAllRightMovies(movies, isShortMovie, searchKeywords)
        localStorage.setItem('/movies', JSON.stringify({ keywords: searchKeywords,
                                                                     movies: foundMovies,
                                                                     isShortMovie: isShortMovie
                                                                    }));
        setIsRequestLoading(false);
        setIsNotFound(foundMovies.length === 0)
        setMoviesList(foundMovies)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSubmitSearchSavedMovies(isShortMovie, searchKeywords) {
    const movies = JSON.parse(localStorage.savedMovies);
    const foundMovies = findAllRightMovies(movies, isShortMovie, searchKeywords);
    setMoviesList(foundMovies);
    localStorage.setItem('/saved-movies', JSON.stringify({ keywords: searchKeywords,
      movies: foundMovies,
      isShortMovie: isShortMovie
     }))
    return foundMovies;
  }

  function toggleHeader(value) {
    setIsHeaderShown(value);
  }

  function toggleFooter(value) {
    setIsFooterShown(value);
  }

  function toggleHeaderAuth(value) {
    setIsHeaderAuth(value);
  }

  function handleNavigation(value) {
    setRoute(value);
    if (value === '/movies' || value === '/saved-movies') {
      setMoviesList(JSON.parse(localStorage.getItem(value)).movies);
      setIsShortMovie(JSON.parse(localStorage.getItem(value)).isShortMovie);
    }
  }

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
      .then(res => {
        auth.login(email, password)
          .then(result => {
            navigate('/movies');
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleLoginSubmit(email, password) {
    auth.login(email, password)
      .then(res => {
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      })
  }

  function signIn(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    navigate('/movies');
  }

  function unSign() {
    auth.signout()
    .then(res => {
    setIsLoggedIn(false);
    })
      .catch(err => {
        console.log(err);
      })
  }

  function handleLike(movie) {
    likeMovie(movie)
      .then(res => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const savedMoviesData = JSON.parse(localStorage.getItem('/saved-movies'));
        savedMovies.push(res.data)
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        if (savedMoviesData.keywords !== '') {
          savedMoviesData.movies = findAllRightMovies(savedMovies, savedMoviesData.isShortMovie, savedMoviesData.keywords);
          localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
        } else {
          savedMoviesData.movies = savedMovies;
          localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleDislike(movie) {
    deleteMovie(movie._id ? movie._id : JSON.parse(localStorage.getItem('/saved-movies')).movies.find(el => el.movieId === movie.id)._id)
      .then(res => {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const savedMoviesData = JSON.parse(localStorage.getItem('/saved-movies'));
        savedMovies = savedMovies.filter(element => element.movieId !== res.data.movieId)
        if (savedMoviesData.keywords !== '') {
          savedMoviesData.movies = findAllRightMovies(savedMovies, savedMoviesData.isShortMovie, savedMoviesData.keywords);
          localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
          if (route === '/saved-movies') {
            setMoviesList(savedMoviesData.movies);
          }
        } else {
          savedMoviesData.movies = savedMovies;
          localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
          if (route === '/saved-movies') {
            setMoviesList(savedMovies);
          }
        }
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSubmitEditProfile(name, email) {
    editProfile(name, email)
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="page">
      <Header
        isHeaderShown={isHeaderShown}
        isHeaderAuth={isHeaderAuth}
        route={route}
        isLoggedIn={isLoggedIn}
      />
      <main>
    <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                toggleHeaderAuth={toggleHeaderAuth}
                toggleFooter={toggleFooter}
                onChangeRoute={handleNavigation}
                route="/"
              />
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  onChangeRoute={handleNavigation}
                  route="/movies"
                  moviesList={moviesList}
                  searchKeywords={searchKeywordsAllMovies}
                  onChangeKeywords={handleChangeKeywordsAllMovies}
                  isShortMovie={isShortMovie}
                  onSubmit={handleSubmitSearchMovies}
                  handleFilterClick={handleFilterClick}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  isSavedMovies={false}
                  isRequestLoading={isRequestLoading}
                  isNotFound={isNotFound}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  moviesList={moviesList}
                  searchKeywords={searchKeywordsSavedMovies}
                  onChangeKeywords={handleChangeKeywordsSavedMovies}
                  onChangeRoute={handleNavigation}
                  onSubmit={handleSubmitSearchSavedMovies}
                  isShortMovie={isShortMovie}
                  handleFilterClick={handleFilterClick}
                  route="/saved-movies"
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  isSavedMovies={true}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onSubmit={handleSubmitEditProfile}
                  toggleFooter={toggleFooter}
                  onChangeRoute={handleNavigation}
                  route="/profile"
                  onClickLogoutButton={unSign}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                toggleFooter={toggleFooter}
                onChangeRoute={handleNavigation}
                route="/signup"
                onSubmit={handleRegisterSubmit}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login toggleFooter={toggleFooter} onChangeRoute={handleNavigation} route="/signin" onSubmit={handleLoginSubmit} />
            }
          />
          <Route
            path="*"
            element={<NotFound toggleHeader={toggleHeader} toggleFooter={toggleFooter} />}
          />
        </Routes>
      </CurrentUserContext.Provider>
      </main>
      <Footer isFooterShown={isFooterShown} />
    </div>
  );
}

export default App;
