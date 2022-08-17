import "../../vendor/normalize.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
  const [isHeaderAuth, setIsHeaderAuth] = useState(false);
  const [route, setRoute] = useState("")

  function toggleHeader(value) {
    setIsHeaderShown(value);
  }

  function toggleFooter(value) {
    setIsFooterShown(value);
  }

  function toggleHeaderNavigation(value) {
    setIsHeaderAuth(value);
  }

  function handleNavigation(value) {
    setRoute(value)
  }

  return (
    <div className="page">
      <Header isHeaderShown={isHeaderShown} isHeaderAuth={isHeaderAuth} route={route} />
      <Routes>
        <Route
          path="/"
          element={
            <Main toggleHeaderNavigation={toggleHeaderNavigation} toggleFooter={toggleFooter} onChangeRoute={handleNavigation} route="/" />
          }>
        </Route>
        <Route
          path="/movies"
          element={
            <Movies moviesList={moviesList} onChangeRoute={handleNavigation} route="/movies" />
          } />
        <Route
          path="/saved-movies"
          element={
            <Movies moviesList={savedMoviesList} onChangeRoute={handleNavigation} route="/saved-movies" />
          } />
        <Route
          path="/profile"
          element={
            <Profile toggleFooter={toggleFooter} onChangeRoute={handleNavigation} route="/profile" />
          } />
        <Route
          path="/signup"
          element={
            <Register toggleFooter={toggleFooter} />
          } />
        <Route
          path="/signin"
          element={
            <Login toggleFooter={toggleFooter} />
          } />
          <Route
            path="*"
            element={
              <NotFound toggleHeader={toggleHeader} toggleFooter={toggleFooter} />
            } />
      </Routes>
      <Footer isFooterShown={isFooterShown} />
    </div>
  );
}

export default App;
