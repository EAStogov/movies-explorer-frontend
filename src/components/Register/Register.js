import { useEffect, useState } from "react";
import Form from "../Form/Form";
import "./Register.css";

function Register({ toggleFooter }) {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [password, setPassword] = useState('123456789');

  useEffect(() => {
    toggleFooter(false);
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  return(
    <section className="register">
      <Form title="Добро пожаловать!" submitText="Зарегистрироваться" navLinkText="Уже зарегистрированы?" navLinkButtonText="Войти">
        <div className="form__input-container">
          <p className="form__input-label">Имя</p>
          <input className="form__input" value={name} onChange={handleChangeName}/>
        </div>
        <div className="form__input-container">
          <p className="form__input-label">E-mail</p>
          <input className="form__input" value={email} onChange={handleChangeEmail}/>
        </div>
        <div className="form__input-container">
          <p className="form__input-label">Пароль</p>
          <input className="form__input form__input_invalid" type="password" value={password} onChange={handleChangePassword}/>
        </div>
        <span className="form__error form__error_active">Что-то пошло не так...</span>
      </Form>
    </section>
  );
}

export default Register;