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
        <Route
          path="/signup"
          element={
            <Register />
          } />
        <Route
          path="/signin"
          element={
            <Login />
          } />
          <Route
            path="*"
            element={
              <NotFound />
            } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
