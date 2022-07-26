import { useEffect, useState } from "react";
import Form from "../Form/Form";
import "./Profile.css";

function Profile({ onChangeRoute, route, toggleFooter }) {
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");

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

  return (
    <section className="profile">
      <Form
        isForEdit={true}
        title="Привет, Виталий!"
        submitText="Редактировать"
        navLinkButtonText="Выйти из аккаунта"
        route="/"
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
