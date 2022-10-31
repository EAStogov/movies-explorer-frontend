import { useEffect } from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import Form from "../Form/Form";
import "./Register.css";

function Register({ toggleFooter, onChangeRoute, route, onSubmit }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  useEffect(() => {
    toggleFooter(false);
    onChangeRoute(route);
  }, []);

  function handleSubmitButton(evt) {
    evt.preventDefault();
    onSubmit(values.name, values.email, values.password);
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
        isValid={isValid}
      >
        <div className="form__input-container">
          <p className="form__input-label">Имя</p>
          <input 
            className={`form__input ${errors.name !== '' && "form__input_invalid"}`}
            minLength={2}
            maxLength={30}
            type="text"
            name="name"
            pattern="[a-zA-ZА-Яа-яёЁ\s_-]+$" 
            required
            onChange={handleChange} 
          />
        </div>
        <span className={`form__error ${errors.name !== '' && 'form__error_active'}`}>{errors.name}</span>
        <div className="form__input-container">
          <p className="form__input-label">E-mail</p>
          <input 
            className={`form__input ${errors.email !== '' && "form__input_invalid"}`}
            type="email"
            name="email"
            pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            onChange={handleChange} />
        </div>
        <span className={`form__error ${errors.email !== '' && 'form__error_active'}`}>{errors.email}</span>
        <div className="form__input-container">
          <p className="form__input-label">Пароль</p>
          <input
            className={`form__input ${errors.password !== '' && "form__input_invalid"}`}
            type="password"
            minLength={8}
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <span className={`form__error ${errors.password !== '' && 'form__error_active'}`}>{errors.password}</span>
      </Form>
    </section>
  );
}

export default Register;
