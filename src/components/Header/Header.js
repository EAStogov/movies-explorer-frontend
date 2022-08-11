import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header() {
  return(
    <section className="header">
      <button className="header__button">
        <img className="header__logo" src={headerLogo} alt="Логос" />
      </button>
      <Navigation />
    </section>
  );
}

export default Header;