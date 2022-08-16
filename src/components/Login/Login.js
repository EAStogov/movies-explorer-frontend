import { useEffect, useState } from "react";
import Form from "../Form/Form";
import "./Login.css";

function Login({ toggleFooter }) {
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [password, setPassword] = useState('');

  useEffect(() => {
    toggleFooter(false);
  }, []);

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  return(
    <section className="login">
      <Form title="Рады видеть!" submitText="Войти" navLinkText="Еще не зарегистрированы?" navLinkButtonText="Регистрация">
         <div className="form__input-container">
          <p className="form__input-label">E-mail</p>
          <input className="form__input" value={email} onChange={handleChangeEmail}/>
        </div>
        <div className="form__input-container">
          <p className="form__input-label">Пароль</p>
          <input className="form__input form__input_invalid" type="password" value={password} onChange={handleChangePassword}/>
        </div>
      </Form>
    </section>
  );
}

export default Login;