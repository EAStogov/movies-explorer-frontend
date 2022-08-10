import headerLogo from "../../images/logo.svg";

function Header() {
  return(
    <section className="header">
      <button className="header__button">
        <img className="header__logo" src={headerLogo} alt="Логос" />
      </button>
      <div className="header__auth">
        <button className="header__button header__button_type_register">Регистрация</button>
        <button className="header__button header__button_type_signin">Войти</button>
      </div>
    </section>
  );
}

export default Header;