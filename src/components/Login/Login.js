import { useEffect } from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import Form from "../Form/Form";
import "./Login.css";

function Login({ toggleFooter, onChangeRoute, route, onSubmit, isInputDisabled }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  useEffect(() => {
    toggleFooter(false);
    onChangeRoute(route);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.email, values.password);
  }

  return (
    <section className="login">
      <Form
        title="Рады видеть!"
        submitText="Войти"
        navLinkText="Еще не зарегистрированы?"
        navLinkButtonText="Регистрация"
        route="/signup"
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <div className="form__input-container">
          <p className="form__input-label">E-mail</p>
          <input
            className={`form__input ${errors.email !== '' && "form__input_invalid"}`}
            name="email"
            pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            onChange={handleChange} 
            disabled={isInputDisabled}
          />
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
            disabled={isInputDisabled}
          />
        </div>
        <span className={`form__error ${errors.password !== '' && 'form__error_active'}`}>{errors.password}</span>
      </Form>
    </section>
  );
}

export default Login;
