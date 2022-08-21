import { useState } from "react";
import { NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import "./Navigation.css";

function Navigation({ route, isLoggedIn }) {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function handleBurgerClick() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <div
      className={`navigation ${
        (route === "/signin" || route === "/signup") && "navigation__hidden"
      }`}
    >
      {!isLoggedIn ? (
        <ul className="navigation__list navigation__auth">
          <li className="navigation__list-item">
            <NavLink to="/signup" className="page__link navigation__button navigation__button_type_register">
              Регистрация
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/signin" className="page__button navigation__button navigation__button_type_signin">
              Войти
            </NavLink>
          </li>
        </ul>
      ) : (
        <>
          <div
            className={`navigation__container ${isBurgerOpened && "navigation__container_opened"}`}
          >
            <ul
              className={`navigation__list navigation__movies ${
                isBurgerOpened && "navigation__movies_opened"
              }`}
            >
              <li className="navigation__list-item navigation__list-item_type_movies">
                <NavLink to="/" className={`page__link navigation__button navigation__button_hidden`}>
                  Главная
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies">
                <NavLink
                  to="/movies"
                  className={`page__link navigation__button ${
                    route === "/movies" && "navigation__button_active"
                  }`}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies">
                <NavLink
                  to="/saved-movies"
                  className={`page__link navigation__button ${
                    route === "/saved-movies" && "navigation__button_active"
                  }`}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_account">
                <NavLink
                  to="/profile"
                  className={`page__link navigation__button navigation__button_type_account ${
                    route === "/profile" && "navigation__button_active"
                  }`}
                >
                  <p className="navigation__account-button-text">Аккаунт</p>
                  <div className="navigation__account-image" />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navigation__burger" onClick={handleBurgerClick}>
            <Burger />
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
