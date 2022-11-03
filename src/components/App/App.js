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
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import { BITMOVIES_URL } from "../../constants/config";

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
  const [errorText, setErrorText] = useState('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('moviesList')) {
      localStorage.setItem('moviesList', JSON.stringify([]))
    }
    if (!localStorage.getItem('savedMovies')) {
      localStorage.setItem('savedMovies', JSON.stringify([]))
    }
    if (!localStorage.getItem('/movies')) {
      localStorage.setItem('/movies', JSON.stringify({movies: [], isShortMovie: false, keywords: ''}))
    }
    if (!localStorage.getItem('/saved-movies')) {
      localStorage.setItem('savedMovies', JSON.stringify({movies: [], isShortMovie: false, keywords: ''}))
    }
    auth.authorizate()
      .then(res => {
        if (!res.ok) {
          navigate('/');
          return Promise.reject(res);
        }
        return res.json();
      })
      .then(res => {
        if (res) {
          getMovies()
            .then(savedMovies => {
              localStorage.setItem('savedMovies', JSON.stringify(savedMovies.data));
              localStorage.setItem('/saved-movies', JSON.stringify({ movies: savedMovies.data, isShortMovie: false, keywords: '' }));
              setSearchKeywordsAllMovies(JSON.parse(localStorage.getItem('/movies')).keywords);
              signIn(res.data);
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
    }, []);

  function handleFilterClick(route) {
    const data = JSON.parse(localStorage.getItem(route));

      if (route === '/movies') {
        const movies = JSON.parse(localStorage.getItem('moviesList'));
        if (movies !== 0) {
          data.movies = findAllRightMovies(movies, !isShortMovie, data.keywords)
          setMoviesList(data.movies);
        }
      } else {
        const movies = JSON.parse(localStorage.getItem('savedMovies'));
        if (movies.length !== 0) {
          data.movies = findAllRightMovies(movies, !isShortMovie, data.keywords)
          setMoviesList(data.movies);
        }
      }

    localStorage.setItem(route, JSON.stringify({keywords: data.keywords,
      movies: data.movies,
      isShortMovie: !isShortMovie}))

    setIsShortMovie(!isShortMovie);
  }

  function handleChangeKeywordsAllMovies(value) {
    setSearchKeywordsAllMovies(value);
  }

  function handleChangeKeywordsSavedMovies(value) {
    setSearchKeywordsSavedMovies(value);
  }

  function handleSubmitSearchMovies(isShortMovie, searchKeywords) {
    setIsRequestLoading(true);

    if (JSON.parse(localStorage.getItem('moviesList')).length === 0) {
      moviesApi.getMovies()
        .then(movies => {
          if (movies) {
            localStorage.setItem('moviesList', JSON.stringify(movies));
            const foundMovies = findAllRightMovies(movies, isShortMovie, searchKeywords);
            setMoviesList(foundMovies);
            localStorage.setItem('/movies', JSON.stringify({ keywords: searchKeywords,
                                                                        movies: foundMovies,
                                                                        isShortMovie: isShortMovie
                                                                        }));
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      const foundMovies = findAllRightMovies(JSON.parse(localStorage.getItem('moviesList')), isShortMovie, searchKeywords);
      setMoviesList(foundMovies);
      localStorage.setItem('/movies', JSON.stringify({ keywords: searchKeywords,
                                                                  movies: foundMovies,
                                                                  isShortMovie: isShortMovie
                                                                  }));
    }
    setIsRequestLoading(false)
  }

  function handleSubmitSearchSavedMovies(isShortMovie, searchKeywords) {
    setIsRequestLoading(true)
    const movies = JSON.parse(localStorage.savedMovies);
    const foundMovies = findAllRightMovies(movies, isShortMovie, searchKeywords);
    setMoviesList(foundMovies);
    localStorage.setItem('/saved-movies', JSON.stringify({ keywords: searchKeywords,
      movies: foundMovies,
      isShortMovie: isShortMovie
     }))
     setIsRequestLoading(false)
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
    setIsInputDisabled(true);
    auth.register(name, email, password)
      .then(res => {
        auth.login(email, password)
          .then(result => {
            setIsInputDisabled(false);
            setIsLoggedIn(true);
            navigate('/movies');
          })
          .catch(err => {
            openPopup('При регистрации пользователя произошла ошибка.');
            setIsInputDisabled(false);
          })
      })
      .catch(err => {
        if (err.status === 409) {
          openPopup('Пользователь с таким email уже существует.')
        } else {
          openPopup('При регистрации пользователя произошла ошибка.')
        }
        setIsInputDisabled(false);
      })
  }

  function handleLoginSubmit(email, password) {
    setIsInputDisabled(true);
    auth.login(email, password)
      .then(res => {
        auth.authorizate()
          .then(res => {
            if (!res.ok) {
              navigate('/');
              return Promise.reject(res);
            }
            return res.json();
          })
          .then(res => {
            if (res) {
              getMovies()
                .then(savedMovies => {
                  localStorage.setItem('savedMovies', JSON.stringify(savedMovies.data));
                  localStorage.setItem('/saved-movies', JSON.stringify({ movies: savedMovies.data, isShortMovie: false, keywords: '' }));
                  signIn(res.data);
                  setIsInputDisabled(false);
                })
            }
          })
      })
      .catch(err => {
        setIsInputDisabled(false);
        if (err.status === 400) {
          openPopup('Вы ввели неправильный логин или пароль. ')
        } else {
          openPopup(' При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
        }
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
        localStorage.setItem('moviesList', JSON.stringify([]))
        localStorage.setItem('savedMovies', JSON.stringify([]));
        localStorage.setItem('/movies', JSON.stringify({movies: [], isShortMovie: false, keywords: ''}))
        localStorage.setItem('/saved-movies', JSON.stringify({movies: [], isShortMovie: false, keywords: ''}));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleLike(movie) {
    likeMovie(movie)
      .then(res => {
        saveMovie(res.data);
      })
      .catch(err => {
        console.log(err)
        if (err.status === 401) {
          unSign();
          setMoviesList([]);
          setIsShortMovie(false);
          setSearchKeywordsSavedMovies('');
          setSearchKeywordsAllMovies('');
          openPopup('При авторизации произошла ошибка. Переданный токен некорректен.');

        } else if (err.status === 500) {
          saveMovie(convertMovie(movie));
        }
        console.log(err);
      })
  }

  function saveMovie(movie) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const savedMoviesData = JSON.parse(localStorage.getItem('/saved-movies'));
    
    savedMovies.push(movie);

    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

    if (savedMoviesData.keywords !== '') {
      savedMoviesData.movies = findAllRightMovies(savedMovies, savedMoviesData.isShortMovie, savedMoviesData.keywords);
      localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
    } else {
      savedMoviesData.movies = savedMovies;
      localStorage.setItem('/saved-movies', JSON.stringify(savedMoviesData));
    }
  }

  function convertMovie(movie) {
    movie.movieId = movie.id;
    movie.image = BITMOVIES_URL + movie.image.url;

    return movie;
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
    setIsInputDisabled(true);
    editProfile(name, email)
      .then(res => {
        setIsInputDisabled(false);
        setCurrentUser(res.data);
        openPopup('Данные успешно изменены')
      })
      .catch(err => {
        setIsInputDisabled(false);
        if (err.status === 409) {
          openPopup('Пользователь с таким email уже существует.')
        } else {
          openPopup('При обновлении профиля произошла ошибка.')
        }
      })
  }

  function openPopup(errorText) {
    setErrorText(errorText);
    setIsPopupOpened(true);
  }

  function closePopup() {
    setIsPopupOpened(false);
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
                  toggleFooter={toggleFooter}
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
                  toggleFooter={toggleFooter}
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
                  isInputDisabled={isInputDisabled}
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
                isInputDisabled={isInputDisabled}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login toggleFooter={toggleFooter} onChangeRoute={handleNavigation} route="/signin" onSubmit={handleLoginSubmit} isInputDisabled={isInputDisabled}/>
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
      <InfoTooltip errorText={errorText} isOpen={isPopupOpened} onClose={closePopup} />
    </div>
  );
}

export default App;
