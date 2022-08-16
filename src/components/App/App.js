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
  function toggleHeader(value) {
    setIsHeaderShown(value);
  }

  const [isFooterShown, setIsFooterShown] = useState(true);
  function toggleFooter(value) {
    setIsFooterShown(value);
  }

  return (
    <div className="page">
      <Header isHeaderShown={isHeaderShown}/>
      <Routes>
        <Route
          path="/"
          element={
            <Main />
          }>
        </Route>
        <Route
          path="/movies"
          element={
            <Movies moviesList={moviesList}/>
          } />
        <Route
          path="/saved-movies"
          element={
            <Movies moviesList={savedMoviesList}/>
          } />
        <Route
          path="/profile"
          element={
            <Profile toggleFooter={toggleFooter} />
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
