import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ isHeaderShown, isHeaderMain, route }) {
  return(
    <section className={`header ${!isHeaderShown && 'header__hidden'} ${isHeaderMain && 'header_grey'} ${(route === '/signin' || route === '/signup') && 'header_auth'}`}>
      <NavLink to="/" className="header__button">
        <img className="header__logo" src={headerLogo} alt="Логос" />
      </NavLink>
      <Navigation isHeaderMain={isHeaderMain} route={route} />
    </section>
  );
}

export default Header;