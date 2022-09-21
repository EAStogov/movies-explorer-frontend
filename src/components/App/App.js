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
import { getMovies, likeMovie, deleteMovie } from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(true);
  const [isHeaderAuth, setIsHeaderAuth] = useState(false);
  const [route, setRoute] = useState("");
  const [searchKeywords, setSearchKeywords] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
      auth.authorizate()
        .then(res => {
          signIn(res.data);
          getMovies()
            .then(movies => {
              if (movies) {
                localStorage.setItem('savedMovies', JSON.stringify(movies.data));
                setSavedMoviesList(movies.data);
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

  function handleFilterClick() {
    setIsShortMovie(!isShortMovie);
  }

  function handleChangeKeywords(value) {
    setSearchKeywords(value);
  }

  function handleSubmitSearch(list) {
    setMoviesList(list);
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
  }

  function handleChangeName(name) {
    setUserName(name);
  }

  function handleChangeEmail(email) {
    setUserEmail(email);
  }

  function handleRegisterSubmit(name, email, password) {
    auth.register(name, email, password)
      .then(res => {
        if (res.ok) {
          auth.login(email, password)
            .then(result => {
              if (result.ok) {
                navigate('/movies');
                return result.json();
              } else {
                return Promise.reject(res);
              }
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          return Promise.reject(res);
        }
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
    setUserName(user.name);
    setUserEmail(user.email);
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
        let array = savedMoviesList;
        array.push(res.data)
        setSavedMoviesList(array)
        localStorage.savedMovies = JSON.stringify(savedMoviesList);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleDislike(movie) {
    deleteMovie(movie._id ? movie._id : savedMoviesList.find(el => el.movieId === movie.id)._id)
      .then(res => {
        const array = savedMoviesList.filter(element => element.movieId !== res.data.movieId);
        setSavedMoviesList(array);
        localStorage.savedMovies = JSON.stringify(array);
      })
      .catch(err => {
        console.log(err);
      });
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
                  moviesList={moviesList}
                  onChangeRoute={handleNavigation}
                  route="/movies"
                  searchKeywords={searchKeywords}
                  isShortMovie={isShortMovie}
                  handleSubmitSearch={handleSubmitSearch}
                  handleFilterClick={handleFilterClick}
                  onChangeKeywords={handleChangeKeywords}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                  isSavedMovies={false}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  moviesList={savedMoviesList}
                  onChangeRoute={handleNavigation}
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
                  name={userName}
                  email={userEmail}
                  onChangeName={handleChangeName}
                  onChangeEmail={handleChangeEmail}
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
