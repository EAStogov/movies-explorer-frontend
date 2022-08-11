function Navigation(isLoggedIn) {
  return(
    <>
      {isLoggedIn ? 
        <div className="header__auth">
          <button className="header__button header__button_type_register">Регистрация</button>
          <button className="header__button header__button_type_signin">Войти</button>
        </div>
                  :
        <div className="header__auth">
          <button className="header__button header__button_type_register">Регистрация</button>
          <button className="header__button header__button_type_signin">Войти</button>
        </div>
      }
    </>
  );
}

export default Navigation;