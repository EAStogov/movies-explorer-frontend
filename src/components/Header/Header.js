import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ isHeaderShown, isHeaderAuth, route }) {
  return(
    <section className={`header ${!isHeaderShown && 'header__hidden'} ${isHeaderAuth && 'header_grey'}`}>
      <NavLink to="/" className="header__button">
        <img className="header__logo" src={headerLogo} alt="Логос" />
      </NavLink>
      <Navigation isHeaderAuth={isHeaderAuth} route={route} />
    </section>
  );
}

export default Header;