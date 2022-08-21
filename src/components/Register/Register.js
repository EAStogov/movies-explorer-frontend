import { useEffect, useState } from "react";
import Form from "../Form/Form";
import "./Register.css";

function Register({ toggleFooter, onChangeRoute, route, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    toggleFooter(false);
    onChangeRoute(route);
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    onSubmit(name, email, password);
  }

  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
        submitText="Зарегистрироваться"
        navLinkText="Уже зарегистрированы?"
        navLinkButtonText="Войти"
        route="/signin"
        onSubmit={handleSubmitButton}
      >
        <div className="form__input-container">
          <p className="form__input-label">Имя</p>
          <input className="form__input" value={name} onChange={handleChangeName} />
        </div>
        <div className="form__input-container">
          <p className="form__input-label">E-mail</p>
          <input className="form__input" value={email} onChange={handleChangeEmail} />
        </div>
        <div className="form__input-container">
          <p className="form__input-label">Пароль</p>
          <input
            className="form__input form__input_invalid"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <span className="form__error form__error_active">Что-то пошло не так...</span>
      </Form>
    </section>
  );
}

export default Register;
