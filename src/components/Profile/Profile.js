import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import "./Profile.css";

function Profile({ name, email, onChangeName, onChangeEmail, onChangeRoute, route, toggleFooter, onClickLogoutButton }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    toggleFooter(false);
    onChangeRoute(route);
  }, []);

  function handleChangeName(e) {
    onChangeName(e.target.value);
  }

  function handleChangeEmail(e) {
    onChangeEmail(e.target.value);
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
      >
        <div className="form__input-container form__input-container_type_edit">
          <p className="form__input-label form__input-label_type_edit">Имя</p>
          <input
            className="form__input form__input_type_edit"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="form__input-container form__input-container_type_edit">
          <p className="form__input-label form__input-label_type_edit">E-mail</p>
          <input
            className="form__input form__input_type_edit"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
      </Form>
    </section>
  );
}

export default Profile;
