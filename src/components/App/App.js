import "../../vendor/normalize.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from "../Movies/Movies";
import { moviesList, savedMoviesList } from "../../constants/moviesList.js";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div className="page">
      <Header />
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
            <Profile />
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
