import { useContext, useEffect } from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import "./Profile.css";

function Profile({ onChangeRoute, route, toggleFooter, onClickLogoutButton, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation({name: currentUser.name, email: currentUser.email});

  useEffect(() => {
    toggleFooter(false);
    onChangeRoute(route);
  }, []);

  function handleChangeInput(e) {
    e.preventDefault();
    handleChange(e);
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.name, values.email)
  }

  return (
    <section className="profile">
      <Form
        isForEdit={true}
        title={`Привет, ${currentUser.name}!`}
        submitText="Редактировать"
        navLinkButtonText="Выйти из аккаунта"
        route="/"
        onClickLogoutButton={onClickLogoutButton}
        isValid={isValid}
        onSubmit={handleSubmit}
      >
        <div className="form__input-container form__input-container_type_edit">
          <p className="form__input-label form__input-label_type_edit">Имя</p>
          <input
            className="form__input form__input_type_edit"
            minLength={2}
            maxLength={30}
            type="text"
            name="name"
            pattern="[a-zA-ZА-Яа-яёЁ\s_-]+$" 
            required
            value={values.name}
            onChange={handleChangeInput}
          />
        </div>
        <span className={`form__error form__error_type_profile ${errors.email !== '' && 'form__error_active'}`}>{errors.name}</span>
        <div className="form__input-container form__input-container_type_edit">
          <p className="form__input-label form__input-label_type_edit">E-mail</p>
          <input
            className="form__input form__input_type_edit"
            type="email"
            name="email"
            pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            value={values.email}
            onChange={handleChangeInput}
          />
        </div>
        <span className={`form__error form__error_type_profile ${errors.email !== '' && 'form__error_active'}`}>{errors.email}</span>
      </Form>
    </section>
  );
}

export default Profile;
