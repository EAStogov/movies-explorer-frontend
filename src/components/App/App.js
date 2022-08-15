import "../../vendor/normalize.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from "../Movies/Movies";

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
            <Movies />
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
