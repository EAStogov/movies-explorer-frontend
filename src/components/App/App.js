import "../../vendor/normalize.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import { moviesList, savedMoviesList } from "../../constants/moviesList.js";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { useState } from "react";

function App() {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(true);
  const [isHeaderMain, setIsHeaderMain] = useState(false);
  const [isHeaderAuth, setIsHeaderAuth] = useState(false);
  const [route, setRoute] = useState("");
  const [searchKeywords, setSearchKeywords] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

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

  function toggleHeaderNavigation(value) {
    setIsHeaderMain(value);
  }

  function toggleHeaderAuth(value) {
    setIsHeaderAuth(value);
  }

  function handleNavigation(value) {
    setRoute(value);
  }

  return (
    <div className="page">
      <Header
        isHeaderShown={isHeaderShown}
        isHeaderAuth={isHeaderAuth}
        isHeaderMain={isHeaderMain}
        route={route}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                toggleHeaderNavigation={toggleHeaderNavigation}
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
              <Movies
                moviesList={moviesList}
                onChangeRoute={handleNavigation}
                route="/movies"
                searchKeywords={searchKeywords}
                isShortMovie={isShortMovie}
                handleSubmitSearch={handleSubmitSearch}
                handleFilterClick={handleFilterClick}
                onChangeKeywords={handleChangeKeywords}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <Movies
                moviesList={savedMoviesList}
                onChangeRoute={handleNavigation}
                route="/saved-movies"
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                toggleFooter={toggleFooter}
                onChangeRoute={handleNavigation}
                route="/profile"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                toggleFooter={toggleFooter}
                onChangeRoute={handleNavigation}
                route="/signup"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login toggleFooter={toggleFooter} onChangeRoute={handleNavigation} route="/signin" />
            }
          />
          <Route
            path="*"
            element={<NotFound toggleHeader={toggleHeader} toggleFooter={toggleFooter} />}
          />
        </Routes>
      </main>
      <Footer isFooterShown={isFooterShown} />
    </div>
  );
}

export default App;
