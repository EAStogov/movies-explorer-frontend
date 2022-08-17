import { useState } from "react";
import { NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import "./Navigation.css";

function Navigation({ isHeaderAuth, route }) {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function handleBurgerClick() {
    setIsBurgerOpened(!isBurgerOpened);
    console.log("click");
  }

  return (
    <div className="navigation">
      {isHeaderAuth ? (
        <ul className="navigation__list navigation__auth">
          <li className="navigation__list-item">
            <button className="navigation__button navigation__button_type_register">
              Регистрация
            </button>
          </li>
          <li className="navigation__list-item">
            <button className="navigation__button navigation__button_type_signin">Войти</button>
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
                <NavLink to="/" className={`navigation__button navigation__button_hidden`}>
                  Главная
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies">
                <NavLink
                  to="/movies"
                  className={`navigation__button ${
                    route === "/movies" && "navigation__button_active"
                  }`}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_movies">
                <NavLink
                  to="/saved-movies"
                  className={`navigation__button ${
                    route === "/saved-movies" && "navigation__button_active"
                  }`}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_type_account">
                <NavLink
                  to="/profile"
                  className={`navigation__button navigation__button_type_account ${
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
